let img1 = document.getElementById("beginning");
let img2 = document.createElement("img");
img2.src = "Sound.png";

let btnstart = document.getElementById("startbtn");
let btnsound = document.createElement("button");
btnsound.id = "soundan";
btnsound.innerHTML = "Sound an!";
btnsound.setAttribute("onclick", "startVid()");

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
  if (btnstart.style.display === "none") {
    btnstart.style.display = "block";
  } else {
    btnstart.style.display = "none";
  }

  setTimeout(function replace1() {
    img1.replaceWith(img2);
    btnstart.replaceWith(btnsound);
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

    btnsound.animate(
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

  console.log(btnstart.attributes);
  console.log(btnsound.attributes);
}
window.changeImg = changeImg;

function startVid() {
  vid1.style.display = "block";
  if (btnsound.style.display === "none") {
    btnsound.style.display = "block";
  } else {
    btnsound.style.display = "none";
  }
}
window.startVid = startVid;
