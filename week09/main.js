const { app, BrowswerWindow, ipcMain } = require(`electron`);

const path = require("path");

const fs = require("node:fs");

const http = require("node:https");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  win.loadFile("index.html");
}

const iconName = path.join(__dirname, "dndIcon.png");

const icon = fs.createWriteStream(iconName);

fs.writeFileSync(path.join(__dirname, "dndFile.md"), "# First Test File");

http.get("https://img.icon8.com/ios/452/drag-and-drop.png", (Response) => {
  Response.pipe(icon);
});

app.whenReady().then(createWindow);

ipcMain.on("ondragstart", (event, filePath) => {
  event.sender.startDrag({
    file: filePath,
    icon: iconName,
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
