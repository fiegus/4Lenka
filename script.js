var spk = window.speechSynthesis
var readingInterval
var ctx
var mouth


document.addEventListener("DOMContentLoaded", function (event) {
    document.body.style.backgroundColor = getRandomColor();

    //canvas
    var c = document.getElementById("myCanvas");
    ctx = c.getContext("2d");
    var image = new Image();
    image.onload = function () {
        ctx.drawImage(image, 0, 0, 200, 250);
        drawMouth(0);
    };
    image.src = "src/rabbit.png";
    mouth = document.getElementById("mouth");
});

function read() {
    var txt = document.getElementById('input1').value//.substring(0, 30);
    var msg = new SpeechSynthesisUtterance(txt);

    msg.addEventListener('start', function () {
        console.log(txt);
        document.getElementById('input1').disabled = true;
        whenReading();
    })

    msg.addEventListener('end', function () {
        drawMouth(0);
        document.getElementById('input1').disabled = false;
        document.getElementById('input1').focus();
        clearInterval(readingInterval);
    })

    spk.speak(msg);
    setRandomColor();

}
function stop() {
    document.getElementById('input1').focus()
    spk.cancel();
}
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function setRandomColor() {
    document.body.style.backgroundColor = getRandomColor();
}

function whenReading() {
    readingInterval = setInterval(() => {
        //setRandomColor();
        drawMouth(1);
    }, 200);
}

function drawMouth(m){
    leters = ['TS','A']
    // mouth.onload = function () {
    //     console.log('m',m)
    //     ctx.drawImage(mouth, 85, 145, 25,20);
    // };
    mouth.src = `src/m${m}.png`;
}