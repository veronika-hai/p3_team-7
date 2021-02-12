let video; // webcam

// Bilderkennung => für Gestenerkennung
let mobilenet;
let classifier;
let gesturelabel;

// Bild als Geste -> kann Classifier in Bildern Gesten erkennen?
let bild1;

// API importieren
function preload() {
  mobilenet = ml5.featureExtractor("MobileNet", { numLabels: 3 }, modelReady);
}

function setup() {
  // Videokamera capturen
  createCanvas(640, 480);
  // video = createCapture(VIDEO);
  // video.size(640, 480);
  // video.hide();

  classifier = mobilenet.classification(bild1, imageReady);
}

// Laden das von uns gespeicherte Modell hoch
function modelReady() {
  console.log("Model is ready!!!");
  classifier.load("model.json", customModelReady);
}

function customModelReady() {
  console.log("CM ready!!");
  classifier.classify(gotGestures);
}

function videoReady() {
  console.log("Video is ready!!!");
}

// BILDERKENNUNG
// gibt uns die Namen der Gesten zurück
function gotGestures(error, result) {
  if (error) {
    console.error(error);
  } else {
    gesturelabel = result[0].label; // result[0] ist die Geste mit der höchsten Wahrscheinlichkeit
    console.log(result);
    classifier.classify(gotGestures);
  }
}

function imageReady() {
  image(bild1, 0, 0);
}

function draw() {
  //image(video, 0, 0);
  bild1 = createImg("images/hilfe.png", imageReady);
  bild1.hide();

  // unten links steht, welche Geste die Maschine erkennt
  // die Geste, mit der höchsten Wahrscheinlichkeit wird angezeigt
  fill(255);
  textSize(16);
  text(gesturelabel, 10, height - 10);
}
