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
let img9 = document.createElement("img");
img9.src = "task1-2.png";
img9.setAttribute("class", "tasks");
let img10 = document.createElement("img");
img10.src = "People2.png";
let img11 = document.createElement("img");
img11.src = "task2.png";
img11.setAttribute("class", "tasks");

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
btnanswer1.setAttribute("class", "a1");
let btnanswer2 = document.createElement("button");
btnanswer2.id = "answer2";
btnanswer2.innerHTML = "*pfeifen*";
btnanswer2.setAttribute("onclick", "answer2()");
btnanswer2.setAttribute("class", "a2");
let btnanswer3 = document.createElement("button");
btnanswer3.id = "answer3";
btnanswer3.innerHTML = "Lecker, lecker.";
btnanswer3.setAttribute("onclick", "answer3()");
btnanswer3.setAttribute("class", "a3");

// BUTTONS TASK 2
let btnanswer4 = document.createElement("button");
btnanswer4.id = "answer4";
btnanswer4.innerHTML = "Hola Chica! Geiler Arsch";
btnanswer4.setAttribute("onclick", "answer1wg()");
btnanswer4.setAttribute("class", "a1");
let btnanswer5 = document.createElement("button");
btnanswer5.id = "answer5";
btnanswer5.innerHTML = "*pfeifen*";
btnanswer5.setAttribute("onclick", "answer2wg()");
btnanswer5.setAttribute("class", "a2");
let btnanswer6 = document.createElement("button");
btnanswer6.id = "answer6";
btnanswer6.innerHTML = "Lecker, lecker.";
btnanswer6.setAttribute("onclick", "answer3wg()");
btnanswer6.setAttribute("class", "a3");

// BUTTON CHARAKTER
let btnbetroffene = document.createElement("button");
btnbetroffene.id = "selectb";
btnbetroffene.setAttribute("onclick", "changetotask2()");
let btntäter = document.createElement("button");
btntäter.id = "selectt";
btntäter.setAttribute("onclick", "changetotask1()");

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
let vid5 = document.createElement("video");
vid5.src = "cat5.mp4";
vid5.id = "gestenvid";
vid5.setAttribute("controls", "controls");

//AUDIO
let audio1 = document.getElementById("audio1");
let audio2 = document.getElementById("audio2");
let audio3 = document.getElementById("audio3");

let btndown;

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
  if (btnsound.style.display === "none") {
    btnsound.style.display = "block";
  } else {
    btnsound.style.display = "none";
  }
  vid1.style.display = "block";
  vid1.play();
  vid1.onended = function playvid2() {
    vid1.replaceWith(vid2);
    vid2.play();
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
  vid2.animate(
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
    vid2.replaceWith(vid3);
    vid3.animate(
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
    vid3.play();
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
    vid3.animate(
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
      vid3.style.display = "none";
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
    vid4.play();
  }, 1500);

  vid4.onended = function task1() {
    vid4.replaceWith(img7);
    document.body.appendChild(btnanswer1);
    document.body.appendChild(btnanswer2);
    document.body.appendChild(btnanswer3);
    btnanswer2.style.display = "block";
    btnanswer3.style.display = "block";
  };
}
window.quizstart = quizstart;

// TASK 1
function answer1() {
  answerstask1();
  btndown = 1;
}
window.answer1 = answer1;

function answer2() {
  answerstask1();
  btndown = 2;
}
window.answer2 = answer2;

function answer3() {
  answerstask1();
  btndown = 3;
}
window.answer3 = answer3;

function answerstask1() {
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
  img7.animate(
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
  btnanswer1.animate(
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
  btnanswer2.animate(
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
  btnanswer3.animate(
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

  setTimeout(function picanswer() {
    img7.style.display = "none";
    btnanswer1.style.display = "none";
    btnanswer2.style.display = "none";
    btnanswer3.style.display = "none";
    img6.replaceWith(img8);
    img8.animate(
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

  setTimeout(function audioplay() {
    if (btndown == 1) {
      audio1.play();
    } else if (btndown == 2) {
      audio2.play();
    } else if (btndown == 3) {
      audio3.play();
    }
  }, 2000);
}
window.answerstask1 = answerstask1;

function gestenvid() {
  vid5.style.display = "block";
  img7.replaceWith(vid5);
  vid5.animate(
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
  vid5.play();

  vid5.onended = function task2() {
    vid5.animate(
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
    img8.animate(
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

    setTimeout(function task2pic() {
      img8.replaceWith(img10);
      vid5.replaceWith(img9);
      btnanswer1.replaceWith(btnanswer4);
      btnanswer2.replaceWith(btnanswer5);
      btnanswer3.replaceWith(btnanswer6);
      document.body.appendChild(btnbetroffene);
      img9.animate(
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
      img10.animate(
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
      btnanswer4.animate(
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
      btnanswer5.animate(
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
      btnanswer6.animate(
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
window.gestenvid = gestenvid;

// TASK 2
function answer1wg() {
  answerstask1_2();
  btndown = 1;
}
window.answer1wg = answer1wg;

function answer2wg() {
  answerstask1_2();
  btndown = 2;
}
window.answer2wg = answer2wg;

function answer3wg() {
  answerstask1_2();
  btndown = 3;
}
window.answer3wg = answer3wg;

function answerstask1_2() {
  img10.animate(
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
  img9.animate(
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
  btnanswer4.animate(
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
  btnanswer5.animate(
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
  btnanswer6.animate(
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

  setTimeout(function picanswer() {
    img9.style.display = "none";
    btnanswer4.style.display = "none";
    btnanswer5.style.display = "none";
    btnanswer6.style.display = "none";
    btnbetroffene.style.display = "none";
    img10.replaceWith(img8);
    img8.animate(
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

  setTimeout(function audioplay() {
    if (btndown == 1) {
      audio1wg.play();
    } else if (btndown == 2) {
      audio2wg.play();
    } else if (btndown == 3) {
      audio3wg.play();
    }
  }, 2000);
}
window.answerstask1_2 = answerstask1_2;

function backtot2() {
  img8.animate(
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

  setTimeout(function () {
    img8.replaceWith(img10);
    img9.style.display = "block";
    btnanswer4.style.display = "block";
    btnanswer5.style.display = "block";
    btnanswer6.style.display = "block";
    btnbetroffene.style.display = "block";
    img10.animate(
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
    img9.animate(
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
    btnanswer4.animate(
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
    btnanswer5.animate(
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
    btnanswer6.animate(
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
window.backtot2 = backtot2;

function changetotask2() {
  img9.replaceWith(img11);
}
window.changetotask2 = changetotask2;
