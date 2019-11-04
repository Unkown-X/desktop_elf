
window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }
    const btnUrl = document.getElementById('apply');
    const ipc = require('electron').ipcRenderer
    let options = require('electron').remote.getGlobal('sharedObject').options;

    //初始化
    $('#oneName').val(options.item1.name);
    $('#onePath').val(options.item1.path);
    if(options.item1.type==1){
        $('input[name="one"]').eq(0).attr('checked',true)
    }else{
        $('input[name="one"]').eq(1).attr('checked',true)
    }
    $('#twoName').val(options.item2.name);
    $('#twoPath').val(options.item2.path);
    if(options.item2.type==1){
        $('input[name="two"]').eq(0).attr('checked',true)
    }else{
        $('input[name="two"]').eq(1).attr('checked',true)
    }
    $('#threeName').val(options.item3.name);
    $('#threePath').val(options.item3.path);
    if(options.item3.type==1){
        $('input[name="three"]').eq(0).attr('checked',true)
    }else{
        $('input[name="three"]').eq(1).attr('checked',true)
    }
    btnUrl.addEventListener('click', function (event) {
        let oneType = $('input[name="one"]:checked').val();
        let twoType = $('input[name="two"]:checked').val();
        let threeType = $('input[name="three"]:checked').val();
        let data = {
            item1: {
                type: $('input[name="one"]:checked').val(),//1是网页2是文件夹
                name: $('#oneName').val(),
                path: $('#onePath').val(),
            },
            item2: {
                type: $('input[name="two"]:checked').val(),//1是网页2是文件夹
                name: $('#twoName').val(),
                path: $('#twoPath').val(),
            },
            item3: {
                type: $('input[name="three"]:checked').val(),//1是网页2是文件夹
                name: $('#threeName').val(),
                path: $('#threePath').val(),
            },
        }
        console.log('应用', data)
        ipc.send('change',data);
    })
    ipc.on('options',function(e,data){
        $('#oneName').val(data.item1.name);
        $('#onePath').val(data.item1.path);
        $('#twoName').val(data.item2.name);
        $('#twoPath').val(data.item2.path);
        $('#threeName').val(data.item3.name);
        $('#threePath').val(data.item3.path);
    })
    for (const type of ['chrome', 'node', 'electron']) {
        replaceText(`${type}-version`, process.versions[type])
    }
})