// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')
const ipc = require('electron').ipcMain
const fs = require("fs")

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

let mainWindow
let option = JSON.parse(fs.readFileSync('setting.json').toString());
global.sharedObject = {
  options: option
}
// 主窗口
function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 250,//窗口宽度
    //width:500,
    height: 400,//窗口高度
    frame: false,//边框
    transparent: true,//透明背景
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
      //nodeIntegration: false
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}
// 新窗口
let newWindow;
function createNewWindow() {
  newWindow = new BrowserWindow({
    width: 400,//窗口宽度
    //width: 1000,
    height: 350,//窗口高度
    frame: true,//边框
    transparent: false,//是否透明
    webPreferences: {
      preload: path.join(__dirname + '/js/', 'setting.js')
      //nodeIntegration: false
    }
  })
  newWindow.loadURL(path.join('file:', __dirname, 'setting.html')); //是新开窗口的渲染进程
  newWindow.on('closed', () => { newwin = null })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})
ipc.on('close', function(e){
  newWindow.close();
  mainWindow.close();
})
ipc.on('add', createNewWindow)
ipc.on('change', function (e, data) {
  console.log(data)
  global.sharedObject.options = data;
  fs.writeFileSync('setting.json',JSON.stringify(data))
  mainWindow.webContents.send('options', data);
  
})
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
