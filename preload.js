// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }
  const shell = require('electron').shell
  const btnMove = document.getElementById('move');
  const mask = document.getElementById('mask');
  let show = false;
  // 移动按钮
  btnMove.addEventListener('click', function (event) {
    if (show) {
      mask.style.display = 'none';
      btnMove.style.background = '#3498db';
      show = false;
    } else {
      mask.style.display = 'block';
      btnMove.style.background = '#FF6461';
      show = true;
    }
  })
  let options = require('electron').remote.getGlobal('sharedObject').options;
  const btnUrl = document.getElementById('jump');
  btnUrl.innerHTML = options.item1.name;
  btnUrl.addEventListener('click', function (event) {
    if (options.item1.type == 1) {
      shell.openExternal(options.item1.path);
    } else {
      shell.showItemInFolder(options.item1.path);
    }
    //shell.openExternal('https://www.baidu.com');
  })
  const btnFolder = document.getElementById('word');
  btnFolder.innerHTML = options.item2.name;
  btnFolder.addEventListener('click', function (event) {
    if (options.item2.type == 1) {
      shell.openExternal(options.item2.path);
    } else {
      shell.showItemInFolder(options.item2.path);
    }
    //shell.showItemInFolder('E:/');
  })

  const btnLearn = document.getElementById('learn');
  btnLearn.innerHTML = options.item3.name;
  btnLearn.addEventListener('click', function (event) {
    if (options.item3.type == 1) {
      shell.openExternal(options.item3.path);
    } else {
      shell.showItemInFolder(options.item3.path);
    }
    //shell.showItemInFolder('F:/learn/demo1');
  })
  const ipc = require('electron').ipcRenderer
  const btnSet = document.getElementById('setting');
  btnSet.addEventListener('click', function (event) {
    ipc.send('add');
  })
  const btnClose = document.getElementById('close');
  btnClose.addEventListener('click', function (event) {
    ipc.send('close');
  })
  ipc.on('options', function (e, data) {
    console.log('child',data)
    btnUrl.innerHTML = data.item1.name;
    btnFolder.innerHTML = data.item2.name;
    btnLearn.innerHTML = data.item3.name;
    options = data;
  })
  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})
