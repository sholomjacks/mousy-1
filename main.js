// Modules to control application life and create native browser window
const { app, Menu, BrowserWindow, screen, globalShortcut, Tray } = require('electron')
const path = require('path')
const iconPath = path.join(__dirname, "icon.png")
let tray = null

function createWindow() {

  tray = new Tray(iconPath)

  function handleClick() {
    app.quit()
  }

  const template = [
    {
      label: "Exit",
      click: handleClick
    }
  ]
  
  const ctxMenu = Menu.buildFromTemplate(template)

  tray.setContextMenu(ctxMenu)

  tray.setToolTip("Mousy")

  const window_size = screen.getPrimaryDisplay().workAreaSize

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: window_size.width,
    height: window_size.height,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    fullscreen: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })
  mainWindow.setIgnoreMouseEvents(true)
  mainWindow.setSkipTaskbar(true)
  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  var prev_pos = {x:0,y:0}
  setInterval(() => {
    const pos = screen.getCursorScreenPoint()
    if (pos.x !== prev_pos.x || pos.y !== prev_pos.y) {
      // console.log(pos)
      mainWindow.webContents.send('pos', pos)
      prev_pos = pos
    }
  }, 0)

  globalShortcut.register('F9', () => {
    mainWindow.webContents.send('toggle')

  })
  globalShortcut.register('F11', () => {
    mainWindow.setIgnoreMouseEvents(false)
    mainWindow.webContents.openDevTools()

  })
  // Open the DevTools.
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
