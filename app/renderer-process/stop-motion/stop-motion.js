const Webcam = require('webcamjs')
const ipc = require('electron').ipcRenderer

Webcam.set({
    width: 1280,
    height: 720,
    dest_width: 160,
    dest_height: 120
})

Webcam.attach('#cameraView')

const btnTakeSnapshot = document.getElementById('btnTakeSnapshot')

btnTakeSnapshot.addEventListener('click', function() {
    Webcam.snap(function(data_uri) {
        document.getElementById('videoTimeline').insertAdjacentHTML('beforeend',
            '<img src="'+data_uri+'"/>');
    });
})
