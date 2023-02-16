let capture;
let w = 640;
let h = 480;
let model;
let face;
let eye

function preload(){
  eyeL = loadImage("eyeR.png");
  eyeR = loadImage("eyeL.png");
  lips = loadImage("botchedlips.png")
  hands = loadImage("hands.png")
  
}

function setup() {
  createCanvas(w, h);
  capture = createCapture(VIDEO);
  capture.size(w, h);
  capture.hide();
  
  loadFaceModel();
}

function draw() {
  background(220);

  push();
    translate(width, 0);
    scale(-1, 1);
    image(capture, 0, 0);
  imageMode(CORNERS);
  pop();
  
  image(hands, 0, 230, );
  
  if(capture.loadedmetadata && model !== undefined) {
    getFace();
    loop();
  }
  
  if(face !== undefined) {
    let rightEye = createVector(w-face.landmarks[0][0], face.landmarks[0][1]);
    let leftEye = createVector(w-face.landmarks[1][0], face.landmarks[1][1]);
    let mouth = createVector(w-face.landmarks[3][0], face.landmarks[3][1]);
    let d= dist(rightEye.x, rightEye.y, leftEye.x, leftEye.y);
    let size = map(d, 20, 180, 1, 200);
    
    //imageMode(CENTER);
    image(eyeR,rightEye.x-size/2, rightEye.y-size/2, size, size);
    image(eyeL,leftEye.x-size/2, leftEye.y-size/2, size, size);
    image(lips,mouth.x-size/2, mouth.y-size/2, size, size);

    
    

    for(let lm of face.landmarks)
    {
      lm = createVector(w-lm[0], lm[1]);
      
      noStroke();
      fill(0, 255, 0);
      rect(lm.x, lm.y, 10, 10);
    }
  }
}


async function getFace() {
  
  // predictions is an array of all the faces detected by the model
  const predictions = await model.estimateFaces(document.querySelector('video'), false);
  
  // if no faces, make face undefined
  if(predictions.length == 0) {
    face = undefined;
  } else {
    face = predictions[0];
  }
}


async function loadFaceModel() {
  model = await blazeface.load();
}













