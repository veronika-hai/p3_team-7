// PICS
let img1 = document.getElementById("beginning");
let img2 = document.createElement("img");
img2.src = "Sound.png";
let img3 = document.createElement("img");
img3.src = "Catcalling.png";
let img4 = document.createElement("img");
img4.src = "Grenze.png";
let img5 = document.createElement("img");
img5.src = "Quizstart.png";
let img6 = document.createElement("img");
img6.src = "People.png";
let img7 = document.createElement("img");
img7.src = "task1.png";
img7.setAttribute("class", "tasks");
let img8 = document.createElement("img");
img8.src = "Answer1.png";

// BUTTONS
let btnstart = document.getElementById("startbtn");
let btnsound = document.createElement("button");
btnsound.id = "soundan";
btnsound.innerHTML = "Sound an!";
btnsound.setAttribute("onclick", "startVid()");

let btncatcall1 = document.createElement("button");
btncatcall1.id = "catcalls";
btncatcall1.innerHTML = "nichts Schlimmes";
btncatcall1.setAttribute("onclick", "startVid2()");
let btncatcall2 = document.createElement("button");
btncatcall2.id = "catcalls2";
btncatcall2.innerHTML = "Catcalling";
btncatcall2.setAttribute("onclick", "startVid2()");

let btnquiz = document.createElement("button");
btnquiz.id = "quizstart";
btnquiz.innerHTML = "Ja!";
btnquiz.setAttribute("onclick", "quizstart()");

// BUTTONS TASK 1
let btnanswer1 = document.createElement("button");
btnanswer1.id = "answer1";
btnanswer1.innerHTML = "Hola Chica! Geiler Arsch";
btnanswer1.setAttribute("onclick", "answer1()");
let btnanswer2 = document.createElement("button");
btnanswer2.id = "answer2";
btnanswer2.innerHTML = "*Pfeifen*";
btnanswer2.setAttribute("onclick", "answer2()");
let btnanswer3 = document.createElement("button");
btnanswer3.id = "answer3";
btnanswer3.innerHTML = "Lecker, lecker.";
btnanswer3.setAttribute("onclick", "answer3()");

// VIDEOS VOR QUIZ
let vid1 = document.getElementById("catcallvid1");
let vid2 = document.createElement("video");
vid2.src = "cat2.mp4";
vid2.id = "catcallvid2";
vid2.setAttribute("controls", "controls");
let vid3 = document.createElement("video");
vid3.src = "cat3.mp4";
vid3.id = "definitionvid";
vid3.setAttribute("controls", "controls");
// VIDEOS QUIZ
let vid4 = document.createElement("video");
vid4.src = "cat4.mp4";
vid4.id = "systemvid";
vid4.setAttribute("controls", "controls");

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
}
window.changeImg = changeImg;

function startVid() {
  vid1.style.display = "block";
  if (btnsound.style.display === "none") {
    btnsound.style.display = "block";
  } else {
    btnsound.style.display = "none";
  }
  vid1.animate(
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

  vid1.onended = function playvid2() {
    vid1.replaceWith(vid2);
  };

  vid2.onended = function replace2() {
    img2.animate(
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
    setTimeout(function replace3() {
      img2.replaceWith(img3);
      btnsound.replaceWith(btncatcall1);
      document.body.appendChild(btncatcall2);
      img3.animate(
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
      btncatcall1.animate(
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
      btncatcall2.animate(
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
  };
}
window.startVid = startVid;

function startVid2() {
  vid2.replaceWith(vid3);
  vid2.style.display = "none";

  img3.animate(
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
  btncatcall1.animate(
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
  btncatcall2.animate(
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

  setTimeout(function replace4() {
    img3.replaceWith(img4);
    btncatcall1.style.display = "none";
    btncatcall2.style.display = "none";
    img4.animate(
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

  vid3.onended = function startquiz() {
    vid3.style.display = "none";
    img4.animate(
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

    setTimeout(function replace5() {
      img4.replaceWith(img5);
      btncatcall1.replaceWith(btnquiz);
      btnquiz.style.display = "block";
      img5.animate(
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

      btnquiz.animate(
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
  };
}
window.startVid2 = startVid2;

function quizstart() {
  img5.animate(
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
  btnquiz.animate(
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

  setTimeout(function replace6() {
    img5.replaceWith(img6);
    btnquiz.style.display = "none";
    vid3.replaceWith(vid4);
    img6.animate(
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
    vid4.animate(
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

  vid4.onended = function task1() {
    vid4.replaceWith(img7);
    btnquiz.replaceWith(btnanswer1);
    document.body.appendChild(btnanswer2);
    document.body.appendChild(btnanswer3);
    btnanswer2.style.display = "block";
    btnanswer3.style.display = "block";
  };
}
window.quizstart = quizstart;

function answer1() {
  img7.remove();
  img6.animate(
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
  setTimeout(function picanswer1() {
    img6.replaceWith(img8);
  }, 1500);
}
