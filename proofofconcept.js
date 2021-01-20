let video; // webcam

// Objekterkennung => Personen und ihre Positionen
let detector;
let detections = [];

// Bilderkennung => Gestenerkennung
let mobilenet;
let classifier;
let gesturelabel;
let helpButton; // wenn man die Hilfe Geste macht
let endButton; // wenn man die Projektion auflöst
let normalButton; // wenn man gar keine Geste macht
let saveButton;

// Farbwechsel
let r = 255;
let g = 255;
let b = 255;

// Bilder mit Selbstauslöser
let state = "waiting";

function preload() {
  detector = ml5.objectDetector("cocossd");
  mobilenet = ml5.featureExtractor("MobileNet", { numLabels: 3 }, modelReady);
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  detector.detect(video, gotDetections);
  classifier = mobilenet.classification(video, videoReady);

  let counth = 0;
  let counte = 0;
  let countn = 0;

  // Buttons zum lernen
  helpButton = createButton("Hilfe");
  helpButton.mousePressed(function () {
    setTimeout(function () {
      state = "collecting";
      console.log("collecting");

      if (state == "collecting") {
        let hilfebilder = [];
        for (let i = 0; i < 50; i++) {
          hilfebilder.push(classifier.addImage("Hilfe"));
          console.log("Hilfe-Bilder");
        }
      }

      setTimeout(function () {
        state = "waiting";
        console.log("notcollecting");
      }, 10000);
    }, 5000);
  });

  endButton = createButton("Ende");
  endButton.mousePressed(function () {
    setTimeout(function () {
      state = "collecting";
      console.log("collecting");

      if (state == "collecting") {
        let endebilder = [];
        for (let i = 0; i < 50; i++) {
          endebilder.push(classifier.addImage("Ende"));
          console.log("Ende-Bilder");
        }
      }

      setTimeout(function () {
        state = "waiting";
        console.log("notcollecting");
      }, 10000);
    }, 5000);
    classifier.addImage("Ende");
    console.log("Ende-Bilder");
  });

  normalButton = createButton("Normal");
  normalButton.mousePressed(function () {
    setTimeout(function () {
      state = "collecting";
      console.log("collecting");

      if (state == "collecting") {
        let normalbilder = [];
        for (let i = 0; i < 50; i++) {
          normalbilder.push(classifier.addImage("Normal")) * i;
          console.log("Normal-Bilder");
        }
      }

      setTimeout(function () {
        state = "waiting";
        console.log("notcollecting");
      }, 10000);
    }, 5000);
  });

  trainButton = createButton("train");
  trainButton.mousePressed(function () {
    classifier.train(whileTraining);
  });

  saveButton = createButton("save");
  saveButton.mousePressed(function () {
    classifier.save();
  });
}

function modelReady() {
  console.log("Model is ready!!!");
  classifier.load("model.json", customModelReady);
}

function customModelReady() {
  console.log("Custom Model is ready!");
}

function videoReady() {
  console.log("Video is ready!!!");
}

// Machine Learning

function whileTraining(loss) {
  if (loss == null) {
    console.log("Training Complete");
    classifier.classify(gotGestures);
  } else {
    console.log(loss);
  }
}

// BILDERKENNUNG

function gotGestures(error, result) {
  if (error) {
    console.error(error);
  } else {
    gesturelabel = result[0].label;
    classifier.classify(gotGestures);
  }
}

// OBJEKTERKENNUNG

function gotDetections(error, results) {
  if (error) {
    console.error(error);
  }
  detections = results.filter((obj) => obj.label === "person");
  //console.log('result länge: ' + results.length, detections.length);
  detector.detect(video, gotDetections);
}

function draw() {
  image(video, 0, 0);

  for (let i = 0; i < detections.length; i++) {
    let object = detections[i];
    stroke(0, 255, 0);
    strokeWeight(4);
    noFill();
    rect(object.x, object.y, object.width, object.height);
    push();
    noFill();
    if (gesturelabel == "Normal" || gesturelabel == "Ende") {
      r = 255;
      g = 255;
      b = 255;
    } else if (gesturelabel == "Hilfe") {
      r = 150;
      g = 30;
      b = 100;
    }
    stroke(r, g, b);
    ellipse(
      object.x + object.width / 2,
      object.y + object.height,
      object.width
    );
    fill(140, 140, 140);
    noStroke();
    ellipse(
      object.x + object.width / 2,
      object.y + object.height / 8,
      object.width / 2
    );
    pop();
    noStroke();
    fill(255);
    textSize(24);
    text(object.label, object.x + 10, object.y + 24);
  }

  fill(255);
  textSize(16);
  text(gesturelabel, 10, height - 10);
}
