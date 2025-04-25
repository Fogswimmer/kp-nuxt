import { app, BrowserWindow } from 'electron'
import { join } from 'path'
import { format } from 'url'

const isDev = !app.isPackaged

app.whenReady().then(() => {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  if (isDev) {
    win.loadURL('http://localhost:3000')
  } else {
    win.loadURL(
      format({
        pathname: join(__dirname, '../.output/public/index.html'),
        protocol: 'file:',
        slashes: true
      })
    )
  }
})
