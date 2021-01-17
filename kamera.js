let video; // webcam

// Objekterkennung => Personen und ihre Positionen
let detector;
let detections = [];

// Bilderkennung => Gestenerkennung
let mobilenet;
let classifier;
let label;
let helpButton; // wenn man die Hilfe Geste macht
let endButton; // wenn man die Projektion auflöst
let normalButton; // wenn man gar keine Geste macht
let saveButton;

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
    counth += 1;
    classifier.addImage("Hilfe");
    console.log("Hilfe-Bilder: " + counth);
  });

  endButton = createButton("Ende");
  endButton.mousePressed(function () {
    counte += 1;
    classifier.addImage("Ende");
    console.log("Ende_Bilder: " + counte);
  });

  normalButton = createButton("Normal");
  normalButton.mousePressed(function () {
    countn += 1;
    classifier.addImage("bliblablub");
    console.log("Normal-Bilder: " + countn);
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
  //classifier.load('model.json', customModelReady);
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
    label = result[0].label;
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
    stroke(255, 0, 0);
    ellipse(object.x + object.width / 2, object.y + object.height, 50);
    // fill (0);
    // stroke(0);
    // ellipse (object.x+object.width/2,object.y+object.height/8, object.width/2);
    pop();
    noStroke();
    fill(255);
    textSize(24);
    text(object.label, object.x + 10, object.y + 24);
  }

  fill(255);
  textSize(16);
  text(label, 10, height - 10);
}
