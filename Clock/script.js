document.addEventListener("DOMContentLoaded", () => {
  const hourHand = document.querySelector(".hour-hand");
  const minuteHand = document.querySelector(".minute-hand");
  const secondHand = document.querySelector(".second-hand");
  const minuteMarkContainer = document.querySelector(".minute-marks");

  function createMinuteMarks() {
    for (let i = 0; i < 60; i++) {
      const mark = document.createElement("div");
      mark.classList("minute-mark");
      mark.style.transform = `rotate(${i * 6}deg) translate(0, -140px)`;
      minuteMarkContainer.appendChild(mark);
    }
  }
  function updateClock() {
    const now = new Date();

    const seconds = now.getSeconds();
    const secondsDegrees = (seconds / 60) * 360 + 90;
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

    const minutes = now.getMinutes();
    const minutesDegrees = (minutes / 60) * 360 + (seconds / 60) * 6 + 90;
    minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;

    const hours = now.getHours();
    const hoursDegrees = ((hours % 12) / 12) * 360 + (minutes / 60) * 30 + 90;
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
  }
  function initializeClock() {
    setInterval(updateClock, 1000);
    updateClock();
    createMinuteMarks();
  }
  initializeClock();
});
