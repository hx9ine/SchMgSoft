// Toast Notification
const toastNotification = document.getElementById("toast-notification");
const toastCloseBtn = document.querySelector("#toast button");

toastCloseBtn.addEventListener("click", () => {
  toastNotification.style.display = "none";
});
