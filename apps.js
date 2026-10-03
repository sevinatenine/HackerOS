import { getFs } from "./files.js";
import mime from "./vendor/mime.bundle.js";

const g = (...args) => document.getElementById(...args);

const topbarIcon = g("topbarIcon");
const topbarTime = g("topbarTime");
const bottomBar = g("bottombar");
const desktop = g("main");


function createWindow(id, x, y, width, height, hidden) {
    var win = document.createElement("div");
    win.className = "window";
    win.id = `window_${id}`;
    win.hidden = hidden;

    win.style.position = "fixed";
    win.style.left = `${x}px`;
    win.style.top = `${y}px`;
    win.style.width = `${width}px`;
    win.style.height = `calc(${height}px + 2em)`;

    var header = document.createElement("div");
    header.className = "header";

    var buttons = document.createElement("buttons");
    buttons.className = "buttons";

    var close = document.createElement("img");
    close.src = "./icons/emblems/scalable/emblem-dropbox-unsyncable.svg";
    close.style.height = "1em";

    close.addEventListener("click", () => {
        closeApp(id);
    })
    
    var minimize = document.createElement("img");
    minimize.src = "./icons/emblems/scalable/emblem-dropbox-selsync.svg";
    minimize.style.height = "1em";

    minimize.addEventListener("click", () => {
        minifyApp(id);
    });

    header.appendChild(buttons);

    buttons.appendChild(close);
    buttons.appendChild(minimize);

    var content = document.createElement("div");
    content.className = "content";

    var resizeHandle = document.createElement("div");
    resizeHandle.className = "resize-handle";
    win.appendChild(resizeHandle);

    win.appendChild(header);
    win.appendChild(content);

    document.body.appendChild(win);

    return win;
}

class App {
    constructor (id, name, icon, open, close, x = 40, y = 40, width = 400, height = 400, overridePosition = false) {
        this.zIndex = 10;
        this.id = id;
        this.icon = icon;
        this.name = name;
        this.windowName = name;
        this.open = open;
        this.isOpen = false;
        this.close = close;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.overridePosition = overridePosition;
        this.content = "";
        this.resizing = false;
        this.window = null;
        this.isMinimized = false;

        this.hoveringContent = false;
        this.headerDragging = false;
        this.dragOffsetX = 0;
        this.dragOffsetY = 0;
    }

    makeWindow() {
        if (this.window) {
            this.window.remove();
        }

        this.window = createWindow(this.id, this.x, this.y, this.width, this.height, false);

        this.window.addEventListener("mousedown", () => {
            this.focus();
        });

        var header = this.window.querySelector(".header");
        var content = this.window.querySelector(".content");
        var resizeHandle = this.window.querySelector(".resize-handle");
        console.log(content);

        var topButtons = document.createElement("div");
        topButtons.className = "buttons";
        var appName = document.createElement("div");
        appName.className = "name flexdivider";
        appName.innerText = this.windowName;

        header.appendChild(topButtons);
        header.appendChild(appName);

        header.addEventListener("mousedown", (e) => {
            this.headerDragging = true;
            this.dragOffsetX = e.clientX - this.x;
            this.dragOffsetY = e.clientY - this.y;
        });

        resizeHandle.addEventListener("mousedown", (e) => {
            this.resizing = true;
            e.stopPropagation();
            e.preventDefault();
        });

        document.addEventListener("mousemove", (e) => {
            if (this.headerDragging) {
                this.x = e.clientX - this.dragOffsetX;
                this.y = Math.max(e.clientY - this.dragOffsetY, 0);
                this.window.style.left = `${this.x}px`;
                this.window.style.top = `${this.y}px`;
            }

            if (this.resizing) {
                const rect = this.window.getBoundingClientRect();
                this.width = Math.max(100, e.clientX - rect.left);
                this.height = Math.max(80, e.clientY - rect.top - 24);
                this.window.style.width = `${this.width}px`;
                this.window.style.height = `calc(${this.height}px + 2em)`;
            }
        });

        document.addEventListener("mouseup", () => {
            this.headerDragging = false;
            this.resizing = false;
        });

        content.addEventListener("mouseenter", () => {
            this.hoveringContent = true;
        })

        content.addEventListener("mouseleave", () => {
            this.hoveringContent = false;
        })
    }

    closeWindow() {
        if (this.window) {
            this.window.remove();
        }
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;

        this.window.style.left = `${this.x}px`;
        this.window.style.top = `${this.y}px`;

    } 

    getContent() {
        return this.content;
    }

    updateContent(d) {
        this.content = d;
        this.window.querySelector(".content").innerHTML = this.content;
    }

    queryElement(q) {
        return this.window.querySelector(".content").querySelector(q);
    }

    setWindowName(name) {
        this.windowName = name;
        this.window.querySelector(".header .name").innerText = this.windowName;
    }

    getWindowName() {
        return this.windowName;
    }

    minify() {
        this.isMinimized = true;
        this.window.hidden = true;
    }

    unminify() {
        this.isMinimized = false;
        this.window.hidden = false;
    }

    focus() {
        topZIndex += 1;
        this.zIndex = topZIndex;
        if (this.window) {
            this.window.style.zIndex = this.zIndex;
        }
    }
}

function pathExists(path) {
    try {
        fs.statSync(path);
        return true;
    } catch (e) {
        return false;
    }
}

async function prompt(q) {
    return new Promise((resolve) => {
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }

        var overlay = document.createElement("div");
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.background = "rgba(0, 0, 0, 0.4)";
        overlay.style.display = "flex";
        overlay.style.alignItems = "center";
        overlay.style.justifyContent = "center";
        overlay.style.zIndex = "9999";

        var box = document.createElement("div");
        box.style.background = "var(--bg1)";
        box.style.border = "1px solid gray";
        box.style.padding = "1em";
        box.style.minWidth = "20em";
        box.style.display = "flex";
        box.style.flexDirection = "column";
        box.style.gap = "0.75em";

        var label = document.createElement("div");
        label.innerText = q;

        var input = document.createElement("input");
        input.type = "text";
        input.style.background = "var(--bg2)";
        input.style.border = "1px solid gray";
        input.style.color = "var(--font1)";
        input.style.padding = "0.4em";
        input.style.font = "inherit";
        input.style.outline = "none";

        var buttons = document.createElement("div");
        buttons.style.display = "flex";
        buttons.style.justifyContent = "flex-end";
        buttons.style.gap = "0.5em";

        var cancelBtn = document.createElement("button");
        cancelBtn.innerText = "Cancel";
        cancelBtn.style.padding = "0.4em 1em";

        var okBtn = document.createElement("button");
        okBtn.innerText = "OK";
        okBtn.style.padding = "0.4em 1em";

        function finish(result) {
            document.removeEventListener("keydown", onKeydown);
            overlay.remove();
            resolve(result);
        }

        function onKeydown(e) {
            if (e.key === "Enter") {
                e.preventDefault();
                finish(input.value);
            } else if (e.key === "Escape") {
                e.preventDefault();
                finish(null);
            }
        }

        cancelBtn.addEventListener("click", () => finish(null));
        okBtn.addEventListener("click", () => finish(input.value));
        document.addEventListener("keydown", onKeydown);

        buttons.appendChild(cancelBtn);
        buttons.appendChild(okBtn);

        box.appendChild(label);
        box.appendChild(input);
        box.appendChild(buttons);
        overlay.appendChild(box);
        document.body.appendChild(overlay);

        input.focus();
    });
}

async function alert(q, cancelButton = true) {
    return new Promise((resolve) => {
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }

        var overlay = document.createElement("div");
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.background = "rgba(0, 0, 0, 0.4)";
        overlay.style.display = "flex";
        overlay.style.alignItems = "center";
        overlay.style.justifyContent = "center";
        overlay.style.zIndex = "9999";

        var box = document.createElement("div");
        box.style.background = "var(--bg1)";
        box.style.border = "1px solid gray";
        box.style.padding = "1em";
        box.style.minWidth = "20em";
        box.style.display = "flex";
        box.style.flexDirection = "column";
        box.style.gap = "0.75em";

        var label = document.createElement("div");
        label.innerText = q;

        var buttons = document.createElement("div");
        buttons.style.display = "flex";
        buttons.style.justifyContent = "flex-end";
        buttons.style.gap = "0.5em";

        var cancelBtn;
        if (cancelButton) {
            cancelBtn = document.createElement("button");
            cancelBtn.innerText = "Cancel";
            cancelBtn.style.padding = "0.4em 1em";
        }

        var okBtn = document.createElement("button");
        okBtn.innerText = "OK";
        okBtn.style.padding = "0.4em 1em";

        function finish(result) {
            document.removeEventListener("keydown", onKeydown);
            overlay.remove();
            resolve(result);
        }

        function onKeydown(e) {
            if (e.key === "Enter") {
                e.preventDefault();
                finish(true);
            } else if (e.key === "Escape") {
                e.preventDefault();
                finish(false);
            }
        }

        if (cancelButton) {
            cancelBtn.addEventListener("click", () => finish(false));
        }

        okBtn.addEventListener("click", () => finish(true));
        document.addEventListener("keydown", onKeydown);

        if (cancelButton) {
            buttons.appendChild(cancelBtn);
        }

        buttons.appendChild(okBtn);

        box.appendChild(label);
        box.appendChild(buttons);
        overlay.appendChild(box);
        document.body.appendChild(overlay);

        okBtn.focus();
    });
}

function makeRow(icon, name, onClick) {
    const row = document.createElement("div");
    row.style.background = "var(--bg3)";
    row.style.border = "1px solid gray";
    row.style.color = "var(--font1)";
    row.style.padding = "0.4em";
    row.style.font = "inherit";
    row.style.display = "flex";
    row.style.alignItems = "center";
    row.style.gap = "0.5em";
    row.style.cursor = "pointer";

    const img = document.createElement("img");
    img.src = icon;
    img.style.width = "1em";
    img.style.height = "1em";
    img.style.flexShrink = "0";

    const label = document.createElement("span");
    label.textContent = name;

    row.appendChild(img);
    row.appendChild(label);
    row.addEventListener("click", onClick);
    return row;
}

async function promptFilePath() {
    return new Promise((resolve) => {
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }

        var overlay = document.createElement("div");
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.background = "rgba(0, 0, 0, 0.4)";
        overlay.style.display = "flex";
        overlay.style.alignItems = "center";
        overlay.style.justifyContent = "center";
        overlay.style.zIndex = "9999";

        var box = document.createElement("div");
        box.style.background = "var(--bg1)";
        box.style.border = "1px solid gray";
        box.style.padding = "1em";
        box.style.minWidth = "20em";
        box.style.display = "flex";
        box.style.flexDirection = "column";
        box.style.gap = "0.75em";

        var label = document.createElement("div");
        label.innerText = "Enter the path to a file or folder:";

        var input = document.createElement("input");
        input.type = "text";
        input.style.background = "var(--bg2)";
        input.style.border = "1px solid gray";
        input.style.color = "var(--font1)";
        input.style.padding = "0.4em";
        input.style.font = "inherit";
        input.style.outline = "none";
        input.value = "/";

        input.addEventListener("input", () => {
            updateFileView();
        });

        var fileView = document.createElement("div");
        fileView.style.background = "var(--bg2)";
        fileView.style.border = "1px solid gray";
        fileView.style.color = "var(--font1)";
        fileView.style.padding = "0.4em";
        fileView.style.font = "inherit";
        fileView.style.maxHeight = "20em";
        fileView.style.overflowY = "auto";

        updateFileView();

        var buttons = document.createElement("div");
        buttons.style.display = "flex";
        buttons.style.justifyContent = "center";
        buttons.style.gap = "0.5em";

        var cancelBtn = document.createElement("button");
        cancelBtn.innerText = "Cancel";
        cancelBtn.style.padding = "0.4em 1em";

        var okBtn = document.createElement("button");
        okBtn.innerText = "OK";
        okBtn.style.padding = "0.4em 1em";

        var inBetween = document.createElement("div");
        inBetween.style.flex = "1";

        var createFileBtn = document.createElement("button");
        createFileBtn.innerHTML = "<img src='/system_icons/file.svg' style='width: 1em; height: 1em;'>";
        createFileBtn.style.padding = "0.4em 1em";
        createFileBtn.style.display = "flex";
        createFileBtn.style.alignItems = "center";

        createFileBtn.addEventListener("click", async () => {
            const newName = await prompt("Enter file name:");
            if (newName) {
                if (newName.trim() == "") return;
                const fullPath = (input.value.trim() + "/" + newName).replaceAll("//", "/");
                if (pathExists(fullPath)) {
                    if (fs.statSync(fullPath).isDirectory()) {
                        await alert(`"${newName}" is a folder — can't overwrite it with a file.`, false);
                        return;
                    }
                    const overwrite = await alert(`"${newName}" already exists. Overwrite it?`);
                    if (!overwrite) return;
                }
                fs.writeFileSync(fullPath, "");
                input.value = fullPath;
                updateFileView();
            }
        });

        var createFolderBtn = document.createElement("button");
        createFolderBtn.innerHTML = "<img src='/system_icons/folder.svg' style='width: 1em; height: 1em;'>";
        createFolderBtn.style.padding = "0.4em 1em";
        createFolderBtn.style.display = "flex";
        createFolderBtn.style.alignItems = "center";

        createFolderBtn.addEventListener("click", async () => {
            const newName = await prompt("Enter folder name:");
            if (newName) {
                if (newName.trim() == "") return;
                const fullPath = (input.value.trim() + "/" + newName).replaceAll("//", "/");
                if (pathExists(fullPath)) {
                    await alert(`"${newName}" already exists.`, false);
                    return;
                }
                fs.mkdirSync(fullPath);
                updateFileView();
            }
        });

        function updateFileView() {
            var path = input.value.trim();
            var actualPath = String(path);

            fileView.innerHTML = "";

            if (!pathExists(path)) {
                if (!pathExists(path.substring(0, path.lastIndexOf("/")+1))) {
                    return;
                } else {
                    path = path.substring(0, path.lastIndexOf("/")+1);
                }
            }

            if (!fs.statSync(path).isDirectory()) {
                path = path.substring(0, path.lastIndexOf("/")+1);
            }

            if (fs.statSync(path).isDirectory()) {
                var files = fs.readdirSync(path);

                if (path !== "/") {
                    const parentPath = (function () {
                        var trimmed = path.replace(/\/+$/, "");
                        var idx = trimmed.lastIndexOf("/");
                        return idx <= 0 ? "/" : trimmed.substring(0, idx);
                    })();

                    fileView.appendChild(makeRow("/system_icons/folder.svg", "..", () => {
                        input.value = parentPath;
                        updateFileView();
                    }));
                }

                for (let i = 0; i < files.length; i++) {
                    const filePath = (path + "/" + files[i]).replaceAll("//", "/");
                    const fileIcon = getIcon(path, files[i]);

                    fileView.appendChild(makeRow(fileIcon, files[i], () => {
                        input.value = filePath;
                        updateFileView();
                    }));
                }
            }
        }

        function finish(result) {
            if (result) {
                result = result.trim();

                if (!pathExists(result) || fs.statSync(result).isDirectory()) {
                    return;
                }
            }

            document.removeEventListener("keydown", onKeydown);
            overlay.remove();
            resolve(result);
        }

        function onKeydown(e) {
            if (e.key === "Enter") {
                e.preventDefault();
                finish(input.value);
            } else if (e.key === "Escape") {
                e.preventDefault();
                finish(null);
            }
        }

        cancelBtn.addEventListener("click", () => finish(null));
        okBtn.addEventListener("click", () => finish(input.value));
        document.addEventListener("keydown", onKeydown);

        buttons.appendChild(createFileBtn);
        buttons.appendChild(createFolderBtn);

        buttons.appendChild(inBetween);

        buttons.appendChild(cancelBtn);
        buttons.appendChild(okBtn);

        box.appendChild(label);
        box.appendChild(input);
        box.appendChild(fileView);
        box.appendChild(buttons);
        overlay.appendChild(box);
        document.body.appendChild(overlay);

        input.focus();
    });
}

var pinned = {
    "/": {path: "/", icon: "./system_icons/computer.svg"},
    "Home": {path: "/home", icon: "./system_icons/user-home.svg"},
    "Downloads": {path: "/downloads", icon: "./system_icons/folder-downloads.svg"},
    "Documents": {path: "/documents", icon: "./system_icons/folder-documents.svg"},
    "Desktop": {path: "/desktop", icon: "./system_icons/folder.svg"},
    "Applications": {path: "/apps", icon: "./system_icons/folder.svg"},
}


function getIcon(dir, path) {
    for (var i of Object.values(pinned)) {
        if (i.path == (dir + "/" + path).replaceAll("//", "/")) {
            return i.icon;
        }
    }

    if (fs.statSync(dir + "/" + path).isDirectory()) {
        return "./system_icons/folder.svg";
    }

    var mimeType = mime.getType(path);
    if (!mimeType) {
        return `./system_icons/file.svg`;
    }

    return `./system_icons/types/${mimeType.replaceAll("/", "-")}.svg`;
}

const SHOULD_OPEN_WITH = {
    
};

const DEFAULT_OPEN_WITH = "notepad";

var fs = getFs();

async function fileBrowserOpen(app, filePath = null) {
    app.currentFolder = "/";

    var selectedPath = null;

    function updateView() {
        selectedPath = null;
        var f = app.currentFolder.replaceAll("//", "/");
        var fsContent = app.queryElement(".fs-content");
        fsContent.style.padding = "1em";

        for (var i of [...app.window.querySelectorAll(".filesystem-pinned")]) {
            i.style.backgroundColor = "transparent";
        }

        app.window.querySelectorAll(".filesystem-pinned").forEach(el => {
            if (pinned[el.dataset.key].path == f) {
                el.style.backgroundColor = "var(--bg2)";
            }
        });

        function getParentPath(path) {
            const parts = path.split("/").filter(Boolean);
            parts.pop();
            return "/" + parts.join("/");
        }

        function formatBytes(bytes) {
            if (bytes === 0) return '0 B';
            const k = 1024;
            const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        }


        var isRoot = f === "/";
        var parentRow = isRoot ? "" : `<tr style="cursor: pointer;" data-parent="true"><td style="display: flex; align-items: center; gap: 0.5em;"><img src="./system_icons/folder.svg" style="width: 1em;"> ..</td><td>—</td><td>—</td></tr>`;

        fsContent.innerHTML = `<table style="width: 100%;">
        <thead>
            <tr><th>Name</th><th>Size</th><th>Type</th><th>Date Created</th></tr>
        </thead>
        <tbody>
        ${parentRow}
        ${fs.readdirSync(f).map(e => `<tr style="cursor: pointer;" data-path="${e}"><td style="display: flex; align-items: center; gap: 0.5em;"><img src="${getIcon(f, e)}" style="width: 1em;"> ${e}</td><td>${formatBytes(fs.statSync(f + "/" + e).size)}</td><td>${fs.statSync(f + "/" + e).isDirectory() ? "Folder" : (mime.getType(e) || "Unknown")}</td><td>${fs.statSync(f + "/" + e).birthtime.toLocaleString('en-US')}</td></tr>`).join("")}
        </tbody>
        </table>`;

        var rows = app.window.querySelectorAll(".content .fs-content table tbody tr");

        rows.forEach(e => {
            const isParentRow = e.dataset.parent === "true";
            const fullpath = isParentRow
                ? getParentPath(f)
                : (f + "/" + e.dataset.path).replaceAll("//", "/");
            e.dataset.fullpath = fullpath;

            e.addEventListener("click", () => {
                rows.forEach(r => r.style.backgroundColor = "transparent");
                e.style.backgroundColor = "var(--bg2)";
                selectedPath = isParentRow ? null : fullpath;
            });

            e.addEventListener("dblclick", () => {
                if (isParentRow || fs.statSync(fullpath).isDirectory()) {
                    app.currentFolder = fullpath;
                    updateView();
                } else if (fs.statSync(fullpath).isFile()) {
                    const openWith = SHOULD_OPEN_WITH[fullpath] || DEFAULT_OPEN_WITH;
                    openApp(openWith, fullpath);
                }
            });

            if (!isParentRow) {
                e.draggable = true;
                e.addEventListener("dragstart", (ev) => {
                    ev.dataTransfer.setData("text/plain", fullpath);
                    ev.dataTransfer.effectAllowed = "move";
                });
            }

            const isValidDropTarget = isParentRow || fs.statSync(fullpath).isDirectory();

            if (isValidDropTarget) {
                e.addEventListener("dragover", (ev) => {
                    ev.preventDefault();
                    e.style.backgroundColor = "var(--bg3)";
                });

                e.addEventListener("dragleave", () => {
                    e.style.backgroundColor = "transparent";
                });

                e.addEventListener("drop", (ev) => {
                    ev.preventDefault();
                    e.style.backgroundColor = "transparent";

                    const srcPath = ev.dataTransfer.getData("text/plain");
                    const destDir = fullpath;

                    if (!srcPath) return;
                    if (destDir === srcPath || destDir.startsWith(srcPath + "/")) return;

                    const name = srcPath.split("/").pop();
                    const newPath = (destDir + "/" + name).replaceAll("//", "/");
                    if (newPath === srcPath) return;

                    try {
                        fs.renameSync(srcPath, newPath);
                        updateView();
                    } catch (err) {
                        console.error("Move failed:", err);
                    }
                });
            }
        });
    }

    app.updateContent(`
        <div class="fs-left" style="width: 12em; background: var(--bg1); border-right: 1px solid gray; padding: 0.5em; display: flex; flex-direction: column;">
            ${Object.entries(pinned).map(e => `
            <div class="filesystem-pinned" data-key="${e[0]}" style="display: flex; gap: 0.5em; align-items: center; cursor: pointer; padding: 0.5em; ${e[1].path === "/" ? "background: var(--bg2);": ""}">
                <img src="${e[1].icon}" style="width: 1.3em; height: 1.3em; flex-shrink: 0;">
                <span>${e[0]}</span>
            </div>`).join("\n")}
        </div>

        <div class="fs-right" style="flex: 1; display: flex; flex-direction: column;">
            <div class="fs-top" style="height: 5.5em; background: var(--bg2); border-bottom: 1px solid gray; padding: 0.5em; display: flex; flex-direction: column; gap: 0.5em;">
                <div style="flex: 1; display: flex; gap: 0.4em;">
                    <button class="fs-create-file" style="background: var(--bg1); border: 1px solid gray; padding: 0.3em 0.5em; cursor: pointer; display: flex; align-items: center;"><img src="./system_icons/file.svg" style="height: 1em;"></button>
                    <button class="fs-create-folder" style="background: var(--bg1); border: 1px solid gray; padding: 0.3em 0.5em; cursor: pointer; display: flex; align-items: center;"><img src="./system_icons/folder.svg" style="height: 1em;"></button>
                    <button class="fs-delete" style="background: var(--bg1); border: 1px solid gray; padding: 0.3em 0.5em; cursor: pointer; display: flex; align-items: center;"><img src="./system_icons/user-trash.svg" style="height: 1em;"></button>
                    <button class="fs-rename" style="background: var(--bg1); border: 1px solid gray; padding: 0.3em 0.5em; cursor: pointer; display: flex; align-items: center;"><img src="./system_icons/notepadqq.svg" style="height: 1em;"></button>
                </div>
                <input style="width: 100%; flex: 2; background: var(--bg1); color: var(--font1); padding: 0.25em;">
            </div>
            <div class="fs-content" style="flex: 1;"></div>
        </div>
    `);

    updateView();

    app.queryElement(".fs-create-file").addEventListener("click", async () => {
        const newName = await prompt("Enter file name:");
        if (newName) {
            if (newName.trim() == "") return;
            const fullPath = (app.currentFolder + "/" + newName).replaceAll("//", "/");
            if (pathExists(fullPath)) {
                if (fs.statSync(fullPath).isDirectory()) {
                    await alert(`"${newName}" is a folder — can't overwrite it with a file.`, false);
                    return;
                }
                const overwrite = await alert(`"${newName}" already exists. Overwrite it?`);
                if (!overwrite) return;
            }
            fs.writeFileSync(fullPath, "");
            updateView();
        }
    });
    app.queryElement(".fs-create-folder").addEventListener("click", async () => {
        const newName = await prompt("Enter folder name:");
        if (newName) {
            if (newName.trim() == "") return;
            const fullPath = (app.currentFolder + "/" + newName).replaceAll("//", "/");
            if (pathExists(fullPath)) {
                if (!fs.statSync(fullPath).isDirectory()) {
                    await alert(`"${newName}" is a file — can't overwrite it with a folder.`, false);
                    return;
                }
                var overwrite;

                if (fs.readdirSync(fullPath).length > 0) {
                    overwrite = await alert(`"${newName}" is a non-empty folder — everything inside it will be deleted. Continue?`);
                } else {
                    overwrite = await alert(`"${newName}" already exists. Overwrite it?`);
                }

                if (!overwrite) return;
                fs.rmSync(fullPath, { recursive: true, force: true });
            }
            fs.mkdirSync(fullPath);
            updateView();
        }
    });

    app.queryElement(".fs-rename").addEventListener("click", async () => {
        if (!selectedPath) {
            await alert("Select a file or folder first.");
            return;
        }

        const oldName = selectedPath.split("/").pop();
        const newName = await prompt("Enter new name:");
        if (!newName) return;
        if (newName.trim() == "") return;
        if (newName === oldName) return;

        const parentDir = selectedPath.substring(0, selectedPath.lastIndexOf("/")) || "/";
        const newPath = (parentDir + "/" + newName).replaceAll("//", "/");

        if (pathExists(newPath)) {
            const srcIsDir = fs.statSync(selectedPath).isDirectory();
            const destIsDir = fs.statSync(newPath).isDirectory();

            if (srcIsDir !== destIsDir) {
                await alert(`"${newName}" already exists as a ${destIsDir ? "folder" : "file"} — can't rename to that.`);
                return;
            }

            const overwrite = await alert(`"${newName}" already exists. Overwrite it?`);
            if (!overwrite) return;

            fs.rmSync(newPath, { recursive: true, force: true });
        }

        fs.renameSync(selectedPath, newPath);
        selectedPath = null;
        updateView();
    });

    app.queryElement(".fs-delete").addEventListener("click", async () => {
        if (!selectedPath) {
            await alert("Select a file or folder first.");
            return;
        }

        const name = selectedPath.split("/").pop();
        const isDir = fs.statSync(selectedPath).isDirectory();

        const confirmed = await alert(`Delete "${name}"? This can't be undone.`);
        if (!confirmed) return;

        fs.rmSync(selectedPath, { recursive: true, force: true });
        selectedPath = null;
        updateView();
    });

    app.window.querySelector(".content").style.display = "flex";
    app.window.querySelector(".content").style.padding = "0";

    app.window.querySelectorAll(".filesystem-pinned").forEach(el => {
        el.addEventListener("click", () => {
            // for (var i of [...app.window.querySelectorAll(".filesystem-pinned")]) {
            //     i.style.backgroundColor = "transparent";
            // }

            // el.style.backgroundColor = "var(--bg2)";

            const key = el.dataset.key;
            app.currentFolder = pinned[key].path;
            updateView();
        });
    });
}

function terminalOpen(app, filePath = null) {
    app.updateContent(`<div id="output" style="white-space: pre-wrap;">Welcome to the Web Terminal. Type 'help' for a list of commands.
</div>    <div class="input-line" style="display: flex; align-items: center;"><span class="prompt" id="prompt" style="color: #00aaff;margin-right: 8px;user-select: none;">guest@HackerOS:/$</span><input type="text" id="cmd-input" autofocus autocomplete="off" spellcheck="false" style="background: transparent;border: none;color: var(--font1);font-family: inherit;font-size: inherit;outline: none;flex: 1;padding: 0;">
    </div>`);

    const cmdInput = app.queryElement('#cmd-input');
    const output = app.queryElement('#output');
    const promptEl = app.queryElement('#prompt');

    var cwd = "/";

    function promptText() {
        return `guest@HackerOS:${cwd}$`;
    }

    function updatePrompt() {
        promptEl.textContent = promptText();
    }

    function resolvePath(base, target) {
        if (!target || target === "") return base;

        const isAbsolute = target.startsWith("/");
        const baseParts = isAbsolute ? [] : base.split("/").filter(Boolean);
        const targetParts = target.split("/").filter(Boolean);

        const stack = [...baseParts];

        for (const part of targetParts) {
            if (part === ".") {
                continue;
            } else if (part === "..") {
                stack.pop();
            } else {
                stack.push(part);
            }
        }

        return "/" + stack.join("/");
    }

    function dirExists(path) {
        try {
            return fs.statSync(path).isDirectory();
        } catch (e) {
            return false;
        }
    }

    cmdInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const input = cmdInput.value.trim();
            const rawSplit = input.split(" ").filter(Boolean);
            const cmd = (rawSplit[0] || "").toLowerCase();
            const args = rawSplit.slice(1);

            output.innerHTML += `<span style="color: #00aaff;">${promptText()}</span> ${input}\n`;

            if (cmd === 'clear') {
                output.innerHTML = '';
            } else if (cmd === 'help') {
                output.innerHTML += `Commands:\nhelp - Shows this\nclear - Clears the terminal\nls (dir) - Lists files in current directory\npwd (path) - Prints current directory\ncd &lt;dir&gt; - Changes directory to &lt;dir&gt;\ntouch (create) &lt;file&gt; - Creates an empty file\nmkdir &lt;dir&gt; - Creates a directory\nrm (delete) &lt;path&gt; - Removes a file or directory\ncat (read) &lt;path&gt; - Gets a files contents\n`;
            } else if (cmd === 'ls' || cmd === 'dir') {
                try {
                    output.innerHTML += `${fs.readdirSync(cwd).join("\n")}\n`;
                } catch (err) {
                    output.innerHTML += `${cmd}: cannot access '${cwd}'\n`;
                }
            } else if (cmd === 'pwd' || cmd === 'path') {
                output.innerHTML += `${cwd}\n`;
            } else if (cmd === 'cd') {
                const target = args[0];
                if (!target || target === "~") {
                    cwd = "/";
                } else {
                    const resolved = resolvePath(cwd, target);
                    if (dirExists(resolved)) {
                        cwd = resolved;
                    } else {
                        output.innerHTML += `${cmd}: no such directory: ${target}\n`;
                    }
                }
                updatePrompt();
            } else if (cmd === 'mkdir') {
                const target = args[0];

                const resolved = resolvePath(cwd, target);
                if (pathExists(resolved)) {
                    output.innerHTML += `${cmd}: file/folder already exists at ${target}\n`;
                } else {
                    fs.mkdirSync(resolved);
                }
                
                updatePrompt();
            } else if (cmd === 'touch' || cmd === 'create') {
                const target = args[0];

                const resolved = resolvePath(cwd, target);
                if (pathExists(resolved)) {
                    output.innerHTML += `${cmd}: file/folder already exists at ${target}\n`;
                } else {
                    fs.writeFileSync(resolved, "");
                }
                
                updatePrompt();
            } else if (cmd === 'rm' || cmd === 'delete') {
                const target = args[0];

                const resolved = resolvePath(cwd, target);
                if (pathExists(resolved)) {
                    fs.rmSync(resolved, { recursive: true, force: true });
                } else {
                    output.innerHTML += `${cmd}: file/folder does not exist at ${target}\n`;
                }
                
                updatePrompt();
            } else if (cmd === 'cat' || cmd === 'read') {
                const target = args[0];

                const resolved = resolvePath(cwd, target);
                if (pathExists(resolved)) {
                    output.innerHTML += fs.readFileSync(resolved, "utf-8");
                } else {
                    output.innerHTML += `${cmd}: file/folder does not exist at ${target}\n`;
                }
                
                updatePrompt();
            } else if (cmd !== '') {
                output.innerHTML += `Command not found: ${input}. Type 'help' for instructions.\n`;
            }

            cmdInput.value = '';
            window.scrollTo(0, document.body.scrollHeight);
        }
    });

    document.addEventListener('click', () => cmdInput.focus());
}

function terminalClose(app) {

}

function fileBrowserClose(app) {
    
}

async function notepadOpen(app, filePath = null) {
    app.updateContent(`<div class="notepad-content" style="display: flex; flex-direction: column; height: 100%;">
        <div class="notepad-toolbar" style="background: var(--bg2); border-bottom: 1px solid gray; padding: 0.5em; display: flex; gap: 0.5em;">
            <button class="notepad-save" style="background: var(--bg1); border: 1px solid gray; padding: 0.3em 0.5em; cursor: pointer; display: flex; align-items: center; color: var(--font1);">Save</button>
        </div>
        <textarea class="notepad-textarea" style="flex: 1; background: var(--bg1); color: var(--font1); border: none; padding: 0.5em; font-family: inherit; font-size: inherit; resize: none; outline: none;"></textarea>
    </div>`);

    const textarea = app.queryElement(".notepad-textarea");
    const saveBtn = app.queryElement(".notepad-save");

    if (filePath && pathExists(filePath) && fs.statSync(filePath).isFile()) {
        textarea.value = fs.readFileSync(filePath, "utf-8");
    } else {
        filePath = null;
    }

    app.setWindowName(filePath ? filePath.split("/").pop() : "Untitled");

    textarea.addEventListener("input", () => {
        app.setWindowName(filePath ? filePath.split("/").pop() + " *" : "Untitled *");
    });

    saveBtn.addEventListener("click", async () => {
        if (!filePath) {
            filePath = await promptFilePath();
            if (!filePath) return;
        }

        app.setWindowName(filePath ? filePath.split("/").pop() : "Untitled");

        fs.writeFileSync(filePath, textarea.value);
    });
}

async function aboutOpen(app, filePath = null) {
    app.updateContent(`<div>
        <h1>About HackerOS</h1>
        <p>HackerOS is a simple operating system built with HTML, CSS, and JavaScript.</p>
        <p>It features a desktop environment, file browser, terminal, and basic applications.</p>
        <p>It is open-source and is available on <a href="https://github.com/sevinatenine/hackeros" target="_blank">GitHub</a>.</p>
        <h2>Features</h2>
        <ul style="text-align: left;">
            <li>File Browser with drag-and-drop support</li>
            <li>Terminal with basic commands</li>
            <li>Notepad for editing text files</li>
            <li>Settings and customization options</li>
            <li>Resizable and movable application windows</li>
            <li>Custom alerts, prompts and a file location picker</li>
        </ul>
        <h2>Credits</h2>
        <p>Made by <a href="https://github.com/sevinatenine" target="_blank">sevinatenine</a></p>
    </div>`);
}

const apps = {
    about: new App("about", "About", "./system_icons/info.svg", aboutOpen, (app) => {}, Math.round(document.body.clientWidth/2) - 200, Math.round(document.body.clientHeight/2) - 200, 400, 400, true),
    terminal: new App("terminal", "Terminal", "./system_icons/term.svg", terminalOpen, terminalClose),
    notepad: new App("notepad", "Notepad", "./system_icons/notepadqq.svg", notepadOpen, (app) => {}),
    filebrowser: new App("filebrowser", "File Browser", "./system_icons/open_folder.svg", fileBrowserOpen, fileBrowserClose, null, null, 800, 600)
};

// settings: new App("settings", "Settings", "./system_icons/settings.svg", (app) => { app.updateContent("Settings"); }, (app) => {})


// ",
// "icons/places/16/user-trash.svg",
// "icons/places/16/user-trash-full.svg",
// "icons/places/16/user-home.svg",
// "icons/places/16/network.svg",
// ""

function updateAppDisplays() {
    bottomBar.innerHTML = "";
    desktop.innerHTML = "";

    for (const i of Object.keys(apps)) {
        var div = document.createElement("div");
        div.className = "icon";
        div.style.width = "1.3em";
        div.style.cursor = "pointer";

        var div2 = document.createElement("div");
        div2.className = "icon-desktop";
        div2.style.width = "4em";
        div2.style.cursor = "pointer";

        div.addEventListener("click", () => {
            openApp(apps[i].id);
        })

        div2.addEventListener("click", () => {
            openApp(apps[i].id);
        })

        var dot = document.createElement("div");
        dot.style.width = "0.07em";
        dot.style.height = "0.07em";
        
        dot.style.border = "2px solid";
        dot.style.borderColor = apps[i].isOpen ? "#d8dee9" : "transparent";
        dot.style.backgroundColor = apps[i].isOpen ? "#d8dee9" : "transparent";

        // if (apps[i].isOpen) {
        //     dot.style.border = "2px solid #d8dee9"
        //     dot.style.backgroundColor = "#d8dee9"
        // } else {
        //     dot.style.border = "none";
        //     dot.style.backgroundColor = "none";
        // }

        var img = document.createElement("img");
        img.style.width = "1.3em";
        img.style.height = "1.3em";
        img.src = apps[i].icon;
        img.style.display = "block";

        var img2 = document.createElement("img");
        img2.style.width = "4em";
        img2.style.height = "4em";
        img2.src = apps[i].icon;
        img2.style.display = "block";
        
        var text = document.createElement("span");
        text.innerText = apps[i].name;

        div2.appendChild(img2);
        div2.appendChild(text);

        div.appendChild(img);
        div.appendChild(dot);

        bottomBar.appendChild(div);
        desktop.appendChild(div2);
    }
}

var topZIndex = 10;
var lastPos = { x: 20, y: 20 };

function openApp(id, filePath = null) {
    if (apps[id].isOpen) {
        if (!filePath) {
            if (apps[id].isMinimized) {
                apps[id].unminify();
            }
            apps[id].focus();
            return;
        } else {
            apps[id].close();
        }
    };

    apps[id].makeWindow();
    apps[id].open(apps[id], filePath);
    if (!apps[id].overridePosition) {
        apps[id].setPosition(lastPos.x, lastPos.y);
    }
    apps[id].isOpen = true;
    apps[id].focus();
    lastPos.x += 50;
    lastPos.y += 50;
    updateAppDisplays();
}

function closeApp(id) {
    apps[id].closeWindow();
    apps[id].close(apps[id]);
    apps[id].isOpen = false;
    updateAppDisplays();
}

function minifyApp(id) {
    apps[id].minify();
}

updateAppDisplays();

openApp("about");