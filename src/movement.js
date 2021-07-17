let direction = 1; //This is to determine the direction in the switch statement in the moveFunc(direction, xPos, yPos)
//These 3 constatnt values are for the position and the image's scale
const S_X_Y_POS = 0;
const S_WIDTH_HEIGHT = 800;
const D_WIDTH_HEIGHT = 200;
let myKey; // This variable is to determine which keyboard is pressed. In this case only W and S
let isPressed = false; //This variable is like a toggle for the drawimage() function
//The x and y position for the starting image
let xPos = 180;
let yPos = 200;
//The isAttacked is a toggle to test when the sprite is attacked. It will spin 360 degee for 2 or 3 times 
let isAttacked = false;
//The speed control how fast our spirte will move if we press W and S
const speed = 4;
//The i control how fast our sprite will be when it spins 360 degree
var i = 0;
var c = document.getElementById('canvas');
var context = c.getContext("2d");
let myIMG = new Image();


myIMG.src = '004Charmander.png';
window.requestAnimationFrame(animate);

document.addEventListener("keydown", function (event) {
// W for going up and S is for going down
  if (event.key === 's') {
    myKey = event.key;
    isPressed = true;
  }
  if (event.key === 'w') {
    myKey = event.key;
    isPressed = true;
  }
});

document.addEventListener("keyup", function (event) {
  myKey = event.key;
  isPressed = false;
});

//The functon is to change the x and y position of the sprite when we press W and S
//and also determine the direction of it
//   direction = 1; will let the sprite go down
//   direction = 2; will let the sprite go up
function animate() {
  if (myKey === 's' && isPressed) {
    if (yPos < 520) {
      yPos += speed;
    }
    direction = 1;
  }
  if (myKey === 'w' && isPressed) {
    if (yPos > -20) {
      yPos -= speed;
    }
    direction = 2;
  }
  context.clearRect(0, 0, canvas.width, canvas.height); //This function will clear the drawn images
  moveFunc(direction, xPos, yPos);
  if (isAttacked) {
    attackedAnime(xPos, yPos);
    if (i == 300) {
      isAttacked = false;
    }
  }
  window.requestAnimationFrame(animate);
}
//This function take in the direction, x, and y position of the spite and draw the image
function moveFunc(direction, xPos, yPos) {
  if (!isPressed && !isAttacked) {
    context.drawImage(myIMG, S_X_Y_POS, S_X_Y_POS, S_WIDTH_HEIGHT, S_WIDTH_HEIGHT, xPos, yPos, D_WIDTH_HEIGHT, D_WIDTH_HEIGHT);
  }
  switch (direction) {
    case 1:
      if (isPressed) {
        context.drawImage(myIMG, S_X_Y_POS, S_X_Y_POS, S_WIDTH_HEIGHT, S_WIDTH_HEIGHT, xPos, yPos, D_WIDTH_HEIGHT, D_WIDTH_HEIGHT);
      }
      break;
    case 2:
      if (isPressed) {
        context.drawImage(myIMG, S_X_Y_POS, S_X_Y_POS, S_WIDTH_HEIGHT, S_WIDTH_HEIGHT, xPos, yPos, D_WIDTH_HEIGHT, D_WIDTH_HEIGHT);
      }
      break;
  }
}



function attackedAnime(xPos, yPos) {

  context.save();
  // Translate to the center point of our image  
  context.translate(xPos, yPos);
  // Perform the rotation  
  context.rotate(i * 0.05);

  // Translate back to the top left of our image  
  context.translate(-xPos, -yPos);
  // Draw the image  
  context.drawImage(myIMG, S_X_Y_POS, S_X_Y_POS, S_WIDTH_HEIGHT, S_WIDTH_HEIGHT, xPos, yPos, D_WIDTH_HEIGHT, D_WIDTH_HEIGHT);
  // // And restore the context ready for the next loop  
  context.restore();
  i++;
}





