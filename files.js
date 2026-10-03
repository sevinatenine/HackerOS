// files.js
import { fs, configure } from "./vendor/zenfs.bundle.js";
import { IndexedDB } from "./vendor/zenfs.bundle.js";

export { fs, configure, IndexedDB };

export function getFs() {
    return fs;
}

export function clearFS() {
  const files = fs.readdirSync("/");
  for (const file of files) {
    fs.rmSync(`/${file}`, { recursive: true, force: true });
  }
}

export function createStructure(structure, currentPath = '.') {
  for (const key in structure) {
    const nextPath = currentPath === '.' ? key : `${currentPath}/${key}`;
    const value = structure[key];

    if (value !== null && typeof value === 'object') {
      if (!fs.existsSync(nextPath)) {
        fs.mkdirSync(nextPath, { recursive: true });
      }
      createStructure(value, nextPath);
    } else {
      const parentDir = currentPath;
      if (parentDir !== '.' && !fs.existsSync(parentDir)) {
        fs.mkdirSync(parentDir, { recursive: true });
      }
      
      const content = typeof value === 'string' ? value : JSON.stringify(value || '');
      fs.writeFileSync(nextPath, content, 'utf8');
    }
  }
}

export const defaultFS = {
    "home": {},
    "downloads": {},
    "documents": {},
    "desktop": {},
    "apps": {}
};

export function initFS() {
    createStructure(defaultFS);
}