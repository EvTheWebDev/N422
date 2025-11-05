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

const iconNanme = path.join(__dirname, "dndIcon.png");

const icon = fs.createWriteStream(iconName);