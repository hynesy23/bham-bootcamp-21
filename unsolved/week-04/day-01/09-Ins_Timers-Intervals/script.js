const timeEl = document.querySelector(".time");
const mainEl = document.getElementById("main");

let secondsLeft = 10;

const setTime = function () {
  const callback = function () {
    secondsLeft--;
    timeEl.textContent = secondsLeft + " seconds left till colorsplosion.";

    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      sendMessage();
    }
  };
  const timerInterval = setInterval(callback, 1000);
};

const sendMessage = function () {
  timeEl.textContent = " ";
  const imgEl = document.createElement("img");
  imgEl.setAttribute("src", "images/image_1.jpg");
  mainEl.appendChild(imgEl);
};

setTime();
