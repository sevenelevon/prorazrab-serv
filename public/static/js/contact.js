
const TOKEN = "5614669162:AAFJpTWBTAlJ8ZgUj7BIuJioeGGdeO7topQ";
const CHAT_ID = "-1001546488324";
const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
const success = document.getElementById("success");

document.getElementById("message").addEventListener("submit", function (e) {
  e.preventDefault();

  let message = `<b>Клиент с сайта</b>\n`;
  message += `<b>Отправитель: </b> ${this.name.value}\n`;
  message += `<b>Почта: </b> ${this.email.value}\n`;
  message += `<b>Сообщение: </b> ${this.message.value}`;

  axios
    .post(URI_API, {
      chat_id: CHAT_ID,
      parse_mode: "html",
      text: message,
    })
    .then((res) => {
      this.name.value = "";
      this.email.value = "";
      success.style.display = "block";
    })
    .catch((err) => {
      console.warn(err);
    })
    .finally(() => {
      console.log("Выполнился запрос");
    });
});
