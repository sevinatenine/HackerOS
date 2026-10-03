import "./apps.js";
import { fs, configure, IndexedDB, defaultFS, initFS } from "./files.js";

await configure({
    mounts: {
        '/': IndexedDB
    },
});

var root = fs.readdirSync("/");
const expected = Object.keys(defaultFS);
for (var i of expected) {
    if (!root.includes(i)) {
        console.log("Initing FS");
        initFS();
        break;
    }
}

const timeFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'numeric',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
  hourCycle: 'h23'
});

function getTimeFormatted() {
    return timeFormatter.format(Date.now());
}

function updateTime() {
    topbarTime.innerText = getTimeFormatted();
}

setInterval(updateTime, 100);
