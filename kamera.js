let video;
let poseNet;
let pose;
let skeleton;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}

function gotPoses(poses) {
  //console.log(poses);
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function modelLoaded() {
  console.log('poseNet ready');
}

function draw() {
  clear();
  push();
  // Bild spiegeln
  translate(video.width, 0);
  scale (-1,1);
  image(video, 0, 0);

// Punkte an den Keypoints (Arme, Beine, Hände, Augen...)
if (pose) {
  for (let i = 0; i < pose.keypoints.length; i++) {
    let x = pose.keypoints[i].position.x;
    let y = pose.keypoints[i].position.y;
    fill(0, 230, 200);
    ellipse(x, y, 9);
  }

// Punkte verbinden - Skeleton weiß welche Keypoints zusammen gehören
  for (let i = 0; i < skeleton.length; i++) {
    let a = skeleton[i][0];
    let b = skeleton[i][1];
    strokeWeight(2);
    stroke(255);
    line(a.position.x, a.position.y, b.position.x, b.position.y);
  }
}
pop();

noFill ();
stroke(0);
textSize(20);
// Kreis Betroffene
text("Betroffene",650,50);
ellipse (700,100,50);
// Kreis Passant
text("Passanten",650,250);
ellipse (700,300,50);
}