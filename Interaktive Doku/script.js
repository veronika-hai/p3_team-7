let img1 = document.getElementById("beginning");
let img2 = document.createElement("img");
img2.src = "Sound.png";

let btnstart = document.getElementById("startbtn");

let vid1 = document.getElementById("catcall1");

function changeImg() {
  img1.animate(
    [
      {
        opacity: 1,
      },
      {
        opacity: 0,
      },
    ],
    {
      duration: 1500,
      iterations: 1,
      fill: "forwards",
    }
  );

  setTimeout(function replace1() {
    img1.replaceWith(img2);
    img2.animate(
      [
        {
          opacity: 0,
        },
        {
          opacity: 1,
        },
      ],
      {
        duration: 1500,
        iterations: 1,
        fill: "forwards",
      }
    );
  }, 1500);

  if (btnstart.style.display === "none") {
    btnstart.style.display = "block";
  } else {
    btnstart.style.display = "none";
  }
}
window.changeImg = changeImg;

function startVid() {
  vid1.style.display = "block";
}
window.startVid = startVid;

console.log(btnsound.style.display);
