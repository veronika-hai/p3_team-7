let video; // webcam

// Objekterkennung => Personen und ihre Positionen
let detector;
let detections = [];

// Bilderkennung => Gestenerkennung
let mobilenet;
let classifier;
let label;
let helpButton;   // wenn man die Hilfe Geste macht
let endButton;    // wenn man die Projektion auflöst
let normalButton; // wenn man gar keine Geste macht 
let saveButton;


function modelReady() {
  console.log('Model is ready!!!');
 // classifier.load('model.js', customModelReady);
}

function customModelReady(){
  console.log('Custom Model is ready!');
}

function videoReady() {
  console.log('Video is ready!!!');
}

function setup() {
  createCanvas(1280, 720);
  video = createCapture(VIDEO);
  video.size(1280, 720);
  video.hide();
  //
  detector = ml5.objectDetector('cocossd');
  detector.detect(video, gotDetections);
  //
  mobilenet = ml5.featureExtractor('MobileNet', modelReady);
  classifier = mobilenet.classification(video, videoReady);
  

// Buttons zum lernen 
  helpButton = createButton('Hilfe');
  helpButton.mousePressed(function() {
    classifier.addImage('Hilfe');
  });

  endButton = createButton('Ende');
  endButton.mousePressed(function() {
    classifier.addImage('Ende');
  });

  normalButton = createButton('Normal');
  normalButton.mousePressed(function(){
    classifier.addImage('Normal');
  })

  trainButton = createButton('train');
  trainButton.mousePressed(function() {
    classifier.train(whileTraining);
  });
  
  saveButton = createButton('save');
  saveButton.mousePressed(function() {
    classifier.save();
  });
}

function whileTraining(loss) {
  if (loss == null) {
    console.log('Training Complete');
    classifier.classify(gotResults);
  } else {
    console.log(loss);
  }
}

//BILDERKENNUNG

function gotResults(error, result) {
  if (error) {
    console.error(error);
  } else {
    // updated to work with newer version of ml5
    // label = result;
    label = result[0].label;
    classifier.classify(gotResults);
  }
}

// OBJEKTERKENNUNG 

function gotDetections(error, results) {
  if (error) {
    console.error(error);
  }
  detections = results;
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
    stroke(255,0,0);
    ellipse (object.x+object.width/2,object.y+object.height,50);
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