export const getNowPeriod = () => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();

  if (currentHour === 16 && currentMinutes >= 30) {
    return "8교시";
  } else if (currentHour === 17) {
    return currentMinutes > 29 ? "저녁시간" : "8교시";
  } else if (currentHour === 18) {
    return currentMinutes > 39 ? "9교시" : "저녁시간";
  } else if (currentHour === 19) {
    return currentMinutes > 29 ? "10교시" : "9교시";
  } else if (currentHour === 20 && currentMinutes <= 30) {
    return "10교시";
  } else {
    return "출결상태 변경 시간이 아닙니다.";
  }
};
