let video; // webcam

// Objekterkennung => Personen und ihre Positionen
let detector;
let detections = [];

// Bilderkennung => Gestenerkennung
let mobilenet;
let classifier;
let gesturelabel;

// Farbwechsel der Kreise unterhalb der Personen
let r;
let g;
let b;
let state = "Alright";

// API importieren
function preload() {
  detector = ml5.objectDetector("cocossd");
  mobilenet = ml5.featureExtractor("MobileNet", { numLabels: 3 }, modelReady);
}

function setup() {
  // Videokamera capturen
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  // den beiden APIs sagen, sie sollen im Video arbeiten
  detector.detect(video, gotDetections);
  classifier = mobilenet.classification(video, videoReady);
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

// OBJEKTERKENNUNG
// gibt uns nur die Objekte zurück, die auch als Personen erkannt wurden
// es gibt 90 Klassen, die man erkennen kann... wir brauchen nur Personen
//https://github.com/tensorflow/tfjs-models/blob/master/coco-ssd/src/classes.ts
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

  // Loop, um alle erkannten Objekte durchzugehen (wichtig, wenn wir mehrere Personen aufeinmal erkennen)
  for (let i = 0; i < detections.length; i++) {
    let object = detections[i];
    push();
    noFill();
    // wenn Normal Geste, dann ist Kreis weiß
    // wenn man Hilfe Geste macht, wird der Kreis farbig
    // nur wenn man Hilfe Geste vorher gemacht hat, beendet Ende Geste den Zustand
    if (gesturelabel == "Normal" && state !== "Help") {
      state = "Alright";
    } else if (gesturelabel == "Hilfe") {
      state = "Help";
    }
    if (gesturelabel == "Ende" && state == "Help") {
      state = "Alright";
    }
    // Kreisfarbe ändern
    if (state == "Alright") {
      r = 240;
      g = 240;
      b = 240;
    }
    if (state == "Help") {
      r = 196;
      g = 77;
      b = 255;
      let a = 255;
      for (let i = 0; i < 300; i++) {
        stroke(r, g, b, a - 35 * i);
        strokeWeight(3);
        ellipse(
          object.x + object.width / 2,
          object.y + object.height,
          object.width + 50 * i
        );
      }
    }
    // der Kreis unter der Person
    stroke(r, g, b);
    strokeWeight(3);
    ellipse(
      object.x + object.width / 2,
      object.y + object.height,
      object.width
    );
    // Kreis auf dem Gesicht der Person (is this Datenschutz? xD)
    fill(140, 140, 140);
    noStroke();
    ellipse(
      object.x + object.width / 2,
      object.y + object.height / 8,
      object.width / 2
    );
    pop();
  }

  // unten links steht, welche Geste die Maschine erkennt
  // die Geste, mit der höchsten Wahrscheinlichkeit wird angezeigt
  fill(255);
  textSize(16);
  text(gesturelabel, 10, height - 10);
}
