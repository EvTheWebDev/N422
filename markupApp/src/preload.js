// electron/preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Expose a function to call the 'save-file-dialog' handle
  saveFile: (content) => ipcRenderer.invoke('save-file-dialog', content),
});