let today = new Date();
let year = today.getFullYear(); // 년도
let month = today.getMonth() + 1; // 월
let date = today.getDate(); // 날짜

let data = "";

if (month < 10 || date < 10) {
  data = year + "-" + "0" + month + "-" + "0" + date;
} else {
  data = year + "-" + month + "-" + date;
}

export let toDayData = data;
