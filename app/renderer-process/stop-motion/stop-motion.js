const Webcam = require('webcamjs')
const ipc = require('electron').ipcRenderer

var imagesArray = []
var currentFrame = 0
let playbackImage, playbackCanvas, animationFrameId

Webcam.set({
    width: 1280,
    height: 720,
    image_format: 'png'
})

Webcam.attach('#cameraView')

const btnTakeSnapshot = document.getElementById('btnTakeSnapshot')

btnTakeSnapshot.addEventListener('click', function() {
    Webcam.snap(function(data_uri, canvas, context) {
        ipc.send('save-image', data_uri)

        imagesArray.push(data_uri)

        var newHeight = 120
        var newWidth = (canvas.width * newHeight) / canvas.height

        resizeImage(data_uri, newWidth, newHeight, function(resized_data_uri) {
            document.getElementById('videoTimeline').insertAdjacentHTML('beforeend',
                '<img src="'+resized_data_uri+'"/>')
        })
    });
})

function resizeImage(url, width, height, callback) {
    var sourceImage = new Image();

    sourceImage.onload = function() {
        // Create a canvas with the desired dimensions
        var canvas = document.createElement("canvas")
        canvas.width = width;
        canvas.height = height;

        // Scale and draw the source image to the canvas
        canvas.getContext("2d").drawImage(sourceImage, 0, 0, width, height);

        // Convert the canvas to a data URL in PNG format
        callback(canvas.toDataURL());
    }

    sourceImage.src = url;
}

const btnPlay = document.getElementById('btnPlay')

btnPlay.addEventListener('click', function() {
    playbackImage = new Image();
    playbackImage.src = imagesArray[0]
    playbackCanvas = document.createElement("canvas")
    playbackCanvas.width = 1280;
    playbackCanvas.height = 720;
    playbackCanvas.id = 'playbackCanvas'

    document.getElementById('cameraView').insertAdjacentElement('afterbegin',
        playbackCanvas)

    playbackLoop()
})

function playbackLoop() {
    animationFrameId = window.requestAnimationFrame(playbackLoop);

    updateFrame();
    renderFrame();
}

function updateFrame() {
    if (currentFrame > imagesArray.length)
        currentFrame = 0
    else
        currentFrame++
}

function renderFrame() {
    playbackImage.src = imagesArray[currentFrame]

    context = playbackCanvas.getContext("2d")

    // Clear the canvas
    //context.clearRect(0, 0, 1280, 720);

    // Draw the animation
    context.drawImage(playbackImage, 0, 0)
}

const btnStop = document.getElementById('btnStop')

btnStop.addEventListener('click', function() {
    var elem = document.getElementById("playbackCanvas");
    elem.parentNode.removeChild(elem);

    window.cancelAnimationFrame(animationFrameId)
})
