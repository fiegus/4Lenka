var spk = window.speechSynthesis;
var readingInterval, ctx, mouth, myVoices, input1, select1, slider;
var initiated = false;


document.addEventListener("DOMContentLoaded", function (event) {
  document.body.style.backgroundColor = getRandomColor();
  input1 = document.getElementById('input1');
  spk.onvoiceschanged = appendVoices;
  setEscButton();
  setSliderEvent();

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
  var txt = input1.value//.substring(0, 30);
  var msg = new SpeechSynthesisUtterance(txt);

  msg.addEventListener('start', function (x) {
    console.log(x, txt);
    input1.disabled = true;
    whenReading(txt);
  })

  msg.addEventListener('end', function () {
    drawMouth(0);
    input1.disabled = false;
    input1.focus();
    clearInterval(readingInterval);
    setRandomColor();
  })

  msg.voice = myVoices[select1.value];
  msg.rate = (slider.value / 10).toFixed(1)
  spk.speak(msg);
}
function stop() {
  input1.focus()
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
  var test = true
  readingInterval = setInterval(() => {
    //setRandomColor();
    if (test) {
      drawMouth(1);
    } else {
      drawMouth(0);
    }
    test = !test
  }, 300);
}

function drawMouth(m) {
  leters = ['TS', 'A']
  // mouth.onload = function () {
  //     console.log('m',m)
  //     ctx.drawImage(mouth, 85, 145, 25,20);
  // };
  mouth.src = `src/m${m}.png`;
}

function setEscButton() {
  //clear input on ESC
  document.onkeydown = function (evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
      input1.value = '';
    }
  };
}

function appendVoices() {
  if (!initiated) {
    myVoices = spk.getVoices();
    select1 = document.getElementById('select1');

    for (var i = 0; i < myVoices.length; i++) {
      var opt = document.createElement('option');
      opt.appendChild(document.createTextNode(myVoices[i].name));
      opt.value = i;
      select1.appendChild(opt);
    }
    initiated = true;
    showSettings();
  }
}

function setSliderEvent() {
  slider = document.getElementById("speedRatio");
  var sliderOutput = document.getElementById("sliderOutput");
  slider.oninput = function () {
    sliderOutput.innerHTML = this.value;
  }
  sliderOutput.innerHTML = slider.value;
}

function showSettings(){
  document.getElementById("settings").style.display = "inherit";
}