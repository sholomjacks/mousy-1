const { ipcRenderer } = require('electron')
const draggable = evt => {
    var svg = evt.target;
    svg.addEventListener('mousemove', drag);
    svg.addEventListener('mousedown', toggle);
    // svg.addEventListener('mouseup', stop);
}
const toggle = (evt) => { document.getElementById('bubble').classList.toggle('on') }
const drag = evt => {
    const bubble = document.getElementById('bubble')
    bubble.setAttributeNS(null, 'cx', evt.x)
    bubble.setAttributeNS(null, 'cy', evt.y)
}
ipcRenderer.on('toggle', (e, arg) => {
    toggle()
})
ipcRenderer.on('pos', (e, arg) => {
    console.log(arg.x,arg.y);
    
    drag(arg)
})