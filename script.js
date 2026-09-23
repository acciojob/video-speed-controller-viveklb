const player = document.querySelector(".player");
const video = player.querySelector(".player__video");

const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");

const toggle = player.querySelector(".toggle");

const ranges = player.querySelectorAll(".player__slider");

const skipButtons = player.querySelectorAll("[data-skip]");

function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  toggle.textContent = video.paused ? "►" : "❚ ❚";
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;

  progressBar.style.flexBasis = percent + "%";
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function skip() {
  video.currentTime += Number(this.dataset.skip);
}

function scrub(e) {
  const scrubTime =
    (e.offsetX / progress.offsetWidth) * video.duration;

  video.currentTime = scrubTime;
}

video.addEventListener("click", togglePlay);

toggle.addEventListener("click", togglePlay);

video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);

video.addEventListener("timeupdate", handleProgress);

ranges.forEach(range => {
  range.addEventListener("change", handleRangeUpdate);
  range.addEventListener("input", handleRangeUpdate);
});

skipButtons.forEach(button => {
  button.addEventListener("click", skip);
});

let mouseDown = false;

progress.addEventListener("click", scrub);

progress.addEventListener("mousemove", e => {
  if (mouseDown) {
    scrub(e);
  }
});

progress.addEventListener("mousedown", () => {
  mouseDown = true;
});

progress.addEventListener("mouseup", () => {
  mouseDown = false;
});