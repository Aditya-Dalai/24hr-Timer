let countdown;
let remainingTime = 0;
let isPaused = false;

const countdownDisplay = document.getElementById("countdown");
const doneMessage = document.getElementById("doneMessage");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

const inputSection = document.getElementById("inputSection");
const controlButtons = document.getElementById("controlButtons");

function startTimer() {
  if (countdown) clearInterval(countdown);
  doneMessage.textContent = "";

  const hours = parseInt(document.getElementById("hours").value) || 0;
  const minutes = parseInt(document.getElementById("minutes").value) || 0;
  const seconds = parseInt(document.getElementById("seconds").value) || 0;

  const totalSeconds = hours * 3600 + minutes * 60 + seconds;

  if (totalSeconds === 0) {
    alert("Please enter a valid time.");
    return;
  }

  if (totalSeconds > 86400) {
    alert("Maximum limit is 24 hours.");
    return;
  }

  inputSection.style.display = "none";
  controlButtons.style.display = "flex";

  remainingTime = totalSeconds;
  updateDisplay();

  countdown = setInterval(() => {
    if (!isPaused && remainingTime > 0) {
      remainingTime--;
      updateDisplay();
    } else if (remainingTime === 0) {
      clearInterval(countdown);
      countdownDisplay.textContent = "00:00:00";
      doneMessage.textContent = "⏰ Time's up!";
      inputSection.style.display = "flex";
      controlButtons.style.display = "none";
    }
  }, 1000);
}

function updateDisplay() {
  const hrs = Math.floor(remainingTime / 3600);
  const mins = Math.floor((remainingTime % 3600) / 60);
  const secs = remainingTime % 60;

  countdownDisplay.textContent =
    `${String(hrs).padStart(2, '0')}:` +
    `${String(mins).padStart(2, '0')}:` +
    `${String(secs).padStart(2, '0')}`;
}

function pauseTimer() {
  isPaused = !isPaused;
  pauseBtn.textContent = isPaused ? "Resume" : "Pause";
}

function resetTimer() {
  clearInterval(countdown);
  remainingTime = 0;
  isPaused = false;
  pauseBtn.textContent = "Pause";
  countdownDisplay.textContent = "00:00:00";
  doneMessage.textContent = "";
  inputSection.style.display = "flex";
  controlButtons.style.display = "none";
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

// Hide control buttons on initial load
controlButtons.style.display = "none";
