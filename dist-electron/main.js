"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path_1 = require("path");
var url_1 = require("url");
var isDev = !electron_1.app.isPackaged;
electron_1.app.whenReady().then(function () {
    var win = new electron_1.BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    if (isDev) {
        win.loadURL('http://localhost:3000');
    }
    else {
        win.loadURL((0, url_1.format)({
            pathname: (0, path_1.join)(__dirname, '../.output/public/index.html'),
            protocol: 'file:',
            slashes: true
        }));
    }
});
