export function formatTime(time) {
  const newTime = Math.ceil(time / 1000);
  const minute = Math.floor(newTime / 60);
  const second = newTime % 60;
  const newMinute = minute < 10 ? "0" + minute : minute;
  const newSecond = second < 10 ? "0" + second : second;
  return newMinute + ":" + newSecond;
}
