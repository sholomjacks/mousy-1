const { ipcRenderer } = require('electron')
const draggable = evt => {
    var svg = evt.target;
    svg.addEventListener('mousemove', drag);
    svg.addEventListener('mousedown', toggle);
    // svg.addEventListener('mouseup', stop);
}
var open = 0
const toggle = (evt) => {
    if (open) {
        document.getElementById('bubble').classList.remove('on')
        document.getElementById('bubble').classList.add('off')
        document.getElementById('bubble').setAttribute('r', '160')
    
    } else {
        
        document.getElementById('bubble').classList.add('on')
        document.getElementById('bubble').classList.remove('off')
        document.getElementById('bubble').setAttribute('r', '142vh')
    }
    open = 1 - open
}
const drag = evt => {
    const bubble = document.getElementById('bubble')
    bubble.setAttributeNS(null, 'cx', evt.x)
    bubble.setAttributeNS(null, 'cy', evt.y)
}
ipcRenderer.on('toggle', (e, arg) => {
    toggle()
})
ipcRenderer.on('pos', (e, arg) => {
    // console.log(arg.x,arg.y);
    drag(arg)
})