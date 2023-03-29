// Face detection with mediapipe
// https://google.github.io/mediapipe/solutions/face_detection.html

let eyeL, eyeR, mouth;
let bg;
let r1 = 0;
let r2 = 0;
let r3 = 0;
let dup = 20;
let shapeDup = 2;
let rand;

let imgArray;
let imgs = [eyeL, eyeR, mouth];
let imgsRandom;

let sketch = function(p) {
    p.preload = function() {
    eyeL = p.loadImage("alienpiece03.png");
    eyeR = p.loadImage("alienpiece01.png");
    mouth = p.loadImage("alienpiece02.png");
      //bg = p.loadImage("wc_frame.png");
  }

  p.setup = function() {
    p.createCanvas(cam_w, cam_h);
    p.rectMode(p.CENTER);
    p.imageMode(p.CENTER);
    p.angleMode(p.DEGREES);
    
    imgArray = p.floor(p.random(0,2));

  }

  p.draw = function() {
    p.clear(0);

    if(detections != undefined) {
      if(detections.detections != undefined) {
        p.drawFaces();
      }
    }
  }

  p.drawFaces = function() {
    imgs = [eyeL, eyeR, mouth];
    p.strokeWeight(8);
    for(let i = 0; i < detections.detections.length; i++) {
      
      // it's not necessary to create this boundingBox variable, but it makes for less typing and neater coder
    //  const boundingBox = detections.detections[i].boundingBox;
    //   p.noStroke();
    //   p.fill(255, 0, 255, 80);
    //   p.rect(p.width-boundingBox.xCenter*p.width, boundingBox.yCenter*p.height, boundingBox.width * p.width, boundingBox.height * p.height);
    //  //p.image(eyeL, 0, 0);
    
    imgsRandom = p.random(imgs);
    console.log(imgsRandom);
    p.stroke(0, 255, 0);
    for(let j = 0; j < detections.detections[i].landmarks.length; j++) {
      const facePoint = detections.detections[i].landmarks[j];
      const x = p.width - (facePoint.x * p.width);
      const y = facePoint.y * p.height;
      p.image(imgsRandom,x, y,p.width/6,p.width/6);
      p.vertex(x,y);
    }
      
      const eyeLeft = detections.detections[i].landmarks[5];
        const x1 = p.width - (eyeLeft.x * p.width);
        const y1 = eyeLeft.y * p.height;
      
      const eyeRight = detections.detections[i].landmarks[2];
        const x2 = p.width - (eyeRight.x * p.width);
        const y2 = eyeRight.y * p.height;
      
      const theMouth = detections.detections[i].landmarks[0];
        const x3 = p.width - (theMouth.x * p.width);
        const y3 = theMouth.y * p.height;
      
      let d = p.dist(eyeRight.x, eyeRight.y, eyeLeft.x, eyeLeft.y);
      let size = p.map(d, 0, 1, 1, 200);
      rand = p.random(0.5,5);
      
      // p.push();
      // p.translate(x1, y1);
      // p.rotate(r1);
      // p.image(eyeL, 0, 0, size*15 +20, size*15 +20);
      // p.pop();
      
      // p.push();
      // p.translate(x2, y2);
      // p.rotate(r2);
      // p.image(eyeR, 0, 0, size*15, size*15);
      // p.pop();

      // p.push();
      // p.translate(x3, y3);
      // p.rotate(r3);
      // p.image(mouth, 500, 0, size*15, size*15);
      // p.pop();
      
      for(let xx1 = 0; xx1 < size*3; xx1 +=size){
        p.push();
      p.translate(x1+xx1, y1+xx1);
      p.rotate(r1);
      p.image(eyeL, 0, 0, size*dup +20, size*dup +20);
      p.pop();
      }
      

      for(let xx2 = 0; xx2 < size*3; xx2 +=size){
        p.push();
        p.translate(x2+xx2, y2+xx2);
        p.rotate(r2);
        p.image(eyeR, 0, 0, size*dup, size*dup);
        p.pop();
      }
      
      // if (shapeDup >1){
      //   shapeDup +=1;
      // }else{
      //   shapeDup -=1;
      // }
      
      for(let xx = 0; xx < size*shapeDup; xx +=size){
        p.push();
        p.translate(x3+xx, y3+xx);
        p.rotate(r3);
        p.image(mouth, 0, 0, size*dup, size*dup);
        p.pop();
      }
      
      r1+= 10;
      r2+= 2;
      r3+= 5;
      
      

      //console.log(detections.detections.length)
    }
  }
}

let myp5 = new p5(sketch)