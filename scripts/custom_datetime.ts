export function getNowDatetimeString() {
  const now = new Date();
  let year = now.getFullYear();

  let month: string | number = now.getMonth() + 1;
  month = (month < 10 ? "0" : "") + month;
  
  let day: string | number  = now.getDate();
  day = (day < 10 ? "0" : "") + day;

  let hour: string | number  = now.getHours();
  hour = (hour < 10 ? "0" : "") + hour;

  let minutes: string | number  = now.getMinutes();
  minutes = (minutes < 10 ? "0" : "") + minutes;

  let seconds: string | number  = now.getSeconds();
  seconds = (seconds < 10 ? "0" : "") + seconds;

  return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
}