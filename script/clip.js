const email = document.getElementById("email");
const copy = document.getElementById("copy");

copy.addEventListener("click", function () {
  let value = email.value;
  navigator.clipboard.writeText(value);
  email.value = "Copied!";
  setInterval(() => {
    email.value = "zeusdata.dev@gmail.com";
  }, 2000);
});
