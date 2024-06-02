//! Access the HTML Element in the Javascript
let imgBox = document.getElementById("imgBox");
let qrImg = document.getElementById("qrImg");
let qrText = document.getElementById("qrText");

//TODO: Function to generate QR with value of the input data given by the user
function generateQR() {
  if (qrText.value.length > 0) {
    qrImg.src =
      " https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example" +
      qrText.value;
    imgBox.classList.add("show-img");
  } else {
    qrText.classList.add("error");
    setTimeout(() => {
      qrText.classList.remove("error");
    }, 1000);
  }
}
