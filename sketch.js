// Face detection with mediapipe
// https://google.github.io/mediapipe/solutions/face_detection.html

let eyeL, eyeR;
let bg;
let r1 = 0;
let r2 = 0;
let r3 = 0;
let dup = 20;
let shapeDup = 2;

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
  }

  p.draw = function() {
    p.clear(0);
    
    //p.image(bg, cam_w/2,cam_h/2, cam_w, cam_h);
  
    if(detections != undefined) {
      if(detections.detections != undefined) {
        p.drawFaces();
        //console.log(detections.detections);
        
//         let rightEye = createVector(p.width-face.landmarks[0][0], face.landmarks[0][1]);
//     let leftEye = createVector(p.width-face.landmarks[1][0], face.landmarks[1][1]);
//     //let mouth = createVector(p.width-face.landmarks[3][0], face.landmarks[3][1]);
//     let d= dist(rightEye.x, rightEye.y, leftEye.x, leftEye.y);
//     let size = map(d, 20, 180, 1, 200);
        
      }
    }
    
  }

  p.drawFaces = function() {
    p.strokeWeight(8);

    for(let i = 0; i < detections.detections.length; i++) {

      // it's not necessary to create this boundingBox variable, but it makes for less typing and neater coder
     // const boundingBox = detections.detections[i].boundingBox;
//       p.noStroke();
//       p.fill(255, 0, 255, 80);
//       p.rect(p.width-boundingBox.xCenter*p.width, boundingBox.yCenter*p.height, boundingBox.width * p.width, boundingBox.height * p.height);
//      //p.image(eyeL, 0, 0);

//       p.stroke(0, 255, 0);
      // for(let j = 0; j < detections.detections[i].landmarks.length; j++) {
      //   const facePoint = detections.detections[i].landmarks[j];
      //   const x = p.width - (facePoint.x * p.width);
      //   const y = facePoint.y * p.height;
      //   p.point(x, y);
      //   //p.image(eyeL, x, y, 300, 300);
      //   console.log(facePoint);
      // }
      
      
      
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
      //let d = dist(x1,y1,x2,y2);
      let size = p.map(d, 0, 1, 1, 200);
      //console.log(d);
      
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