export const todayDate = () => {
  let now = new Date();
  let year = now.getFullYear();
  let month = ("0" + (now.getMonth() + 1)).slice(-2);
  let date = ("0" + now.getDate()).slice(-2);

  return `${year}-${month}-${date}`;
};

export const getNowPeriod = () => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();

  if (currentHour === 16) {
    return "8교시";
  } else if (currentHour === 17) {
    return currentMinutes > 29 ? "저녁시간" : "8교시";
  } else if (currentHour === 18) {
    return currentMinutes > 39 ? "9교시" : "저녁시간";
  } else if (currentHour === 19) {
    return currentMinutes > 29 ? "10교시" : "9교시";
  } else if (currentHour === 20) {
    return "10교시";
  }
};
