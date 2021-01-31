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
let saveButton; // um das Trainingsmodell zu speichern

// Counter Bildmenge
let counth = 0;
let counte = 0;
let countn = 0;

// Farbwechsel der Kreise unterhalb der Personen
let r = 255;
let g = 255;
let b = 255;

// Bilder mit Selbstauslöser
let state = "waiting";

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

  // Buttons zum Bilder aufnehmen, mit Hilfe :)
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
    console.log("Ende-Bilder: " + counte);
  });

  normalButton = createButton("Normal");
  normalButton.mousePressed(function () {
    countn += 1;
    classifier.addImage("Normal");
    console.log("Normal-Bilder: " + countn);
  });

  // // Buttons zum Bilder aufnehmen ohne Hilfe - für die Konzeptpräsi
  // // eine Callback Hölle, da ich einen Selbstauslöser brauchte... der Laptop stand auf einem sehr hohen Schrank :D
  // // wenn ich auf den Button drücke, werden nach 5 Sekunden 50 Bilder aufgenommen (das Aufnehmen dauert 10 Sekunden)
  // // die aufgenommenen Bilder werden in ein Array gepusht, welches dann später für die Erkennung benutzt wird
  // helpButton = createButton("Hilfe");
  // helpButton.mousePressed(function () {
  //   setTimeout(function () {
  //     state = "collecting";
  //     console.log("collecting");

  //     if (state == "collecting") {
  //       let hilfebilder = [];
  //       for (let i = 0; i < 50; i++) {
  //         hilfebilder.push(classifier.addImage("Hilfe"));
  //         console.log("Hilfe-Bilder");
  //       }
  //     }

  //     setTimeout(function () {
  //       state = "waiting";
  //       console.log("notcollecting");
  //     }, 10000);
  //   }, 5000);
  // });

  // endButton = createButton("Ende");
  // endButton.mousePressed(function () {
  //   setTimeout(function () {
  //     state = "collecting";
  //     console.log("collecting");

  //     if (state == "collecting") {
  //       let endebilder = [];
  //       for (let i = 0; i < 50; i++) {
  //         endebilder.push(classifier.addImage("Ende"));
  //         console.log("Ende-Bilder");
  //       }
  //     }

  //     setTimeout(function () {
  //       state = "waiting";
  //       console.log("notcollecting");
  //     }, 10000);
  //   }, 5000);
  //   classifier.addImage("Ende");
  //   console.log("Ende-Bilder");
  // });

  // normalButton = createButton("Normal");
  // normalButton.mousePressed(function () {
  //   setTimeout(function () {
  //     state = "collecting";
  //     console.log("collecting");

  //     if (state == "collecting") {
  //       let normalbilder = [];
  //       for (let i = 0; i < 50; i++) {
  //         normalbilder.push(classifier.addImage("Normal")) * i;
  //         console.log("Normal-Bilder");
  //       }
  //     }

  //     setTimeout(function () {
  //       state = "waiting";
  //       console.log("notcollecting");
  //     }, 10000);
  //   }, 5000);
  // });

  // Button zum Lernen
  trainButton = createButton("train");
  trainButton.mousePressed(function () {
    classifier.train(whileTraining);
  });

  // Button um Trainingsmodell zu speichern
  saveButton = createButton("save");
  saveButton.mousePressed(function () {
    classifier.save();
  });
}

// Laden das von uns gespeicherte Modell hoch
function modelReady() {
  console.log("Model is ready!!!");
  classifier.load("model.json", customModelReady);
  classifier.classify(gotGestures);
}

// das Modell, dass man noch trainieren kann
function customModelReady() {
  console.log("Custom Model is ready!");
}

function videoReady() {
  console.log("Video is ready!!!");
}

// MACHINE LEARNING
// loss gibt uns an, wie gut die Maschine die von uns gezeigten Bilder erkennt
// Modell sagt, ich denke diese Geste ist eine Hilfe-Geste und es ist wirklich eine Hilfe-Geste => loss=0
// Modell sagt, ich denke diese Geste ist eine Ende-Geste und es ist eigentlich eine Hilfe-Geste => loss!=0
// wenn dass Modell sicher genug trainiert ist, ist loss am Ende null
function whileTraining(loss) {
  if (loss == null) {
    console.log("Training Complete");
    classifier.classify(gotGestures);
  } else {
    console.log(loss);
  }
}

// BILDERKENNUNG
// gibt uns die Namen der Gesten zurück
function gotGestures(error, result) {
  if (error) {
    console.error(error);
  } else {
    gesturelabel = result[0].label;
    classifier.classify(gotGestures);
  }
}

// OBJEKTERKENNUNG
// gibt uns nur die Objekte zurück, die auch als Personen erkannt wurden
// es gibt 80 Klassen, die man erkennen kann... wir brauchen nur Personen
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
    stroke(0, 255, 0);
    strokeWeight(4);
    noFill();
    // eine Box um das Objekt herum
    rect(object.x, object.y, object.width, object.height);
    push();
    noFill();
    // wenn Normal oder Ende Geste, dann ist Kreis weiß
    // wenn man Hilfe Geste macht, wird der Kreis farbig
    if (gesturelabel == "Normal" || gesturelabel == "Ende") {
      r = 255;
      g = 255;
      b = 255;
    } else if (gesturelabel == "Hilfe") {
      r = 150;
      g = 30;
      b = 100;
    }
    // der Kreis unter der Person
    stroke(r, g, b);
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
    // oben in der Box steht Klasse des Objekts, also Person... weil wir erkennen ja nur Personen
    noStroke();
    fill(255);
    textSize(24);
    text(object.label, object.x + 10, object.y + 24);
  }

  // unten links steht, welche Geste die Maschine erkennt
  // die Geste, mit der höchsten Wahrscheinlichkeit wird angezeigt
  fill(255);
  textSize(16);
  text(gesturelabel, 10, height - 10);
}
