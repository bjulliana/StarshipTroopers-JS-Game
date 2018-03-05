(() => {
console.log('Loaded');

var   canvas = document.querySelector('canvas');
      ctx = canvas.getContext('2d');
      map = {
        cols: 12,
        rows: 12,
        tsize: 64,
        tiles: [
           3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3,
           3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
           3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
           3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
           3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
           3, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 3,
           3, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 3,
           3, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 3,
           3, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 3,
           3, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 3,
           3, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 3,
           3, 4, 4, 1, 1, 2, 4, 4, 4, 4, 4, 3
        ],
        getTile: function (col, row) {
            return this.tiles[row * map.cols + col];
        }
      };
      rightPressed = false;
      leftPressed = false;
      upPressed = false;
      downPressed = false;
      heroHeight = 64;
      heroWidth = 64;
      canvasWidth = 768;
      canvasHeight = 768;
      heroX = (canvasWidth - heroWidth) / 2;
      heroY = (canvasHeight - heroHeight) / 2;
      movementSpeed = 5;

//Background image
 tileSheet = new Image();
 tileSheet.src = 'images/tileset.png';

//Hero Image
heroImage = new Image();
heroImage.src = 'images/heroset.png';


 function eventSheetLoaded() {
    drawMap(),
    drawHero(),
    move()
 }

function drawMap() {
   for (var c = 0; c < map.cols; c++) {
      for (var r = 0; r < map.rows; r++) {
           var tile = map.getTile(c, r);
           if (tile !== 0) { // 0 => empty tile
               this.ctx.drawImage(
                   this.tileSheet, // image
                   (tile - 1) * map.tsize, // source x
                   0, // source y
                   map.tsize, // source width
                   map.tsize, // source height
                   c * map.tsize,  // target x
                   r * map.tsize, // target y
                   map.tsize, // target width
                   map.tsize // target height
               );
           }
      }
   }
}

function drawHero() {
   this.ctx.drawImage(
      heroImage, // image
      64, //source x
      128, //source y
      64, //source width
      64, // source height
      128, // target x
      128, // target y
      64, // target width
      64 // target height
   );
}

// Keyboard
function keyDownHandler(event) {
    if(event.keyCode == 39) {
        rightPressed = true;
    }
    else if(event.keyCode == 37) {
        leftPressed = true;
    }
    if(event.keyCode == 40) {
    	downPressed = true;
    }
    else if(event.keyCode == 38) {
    	upPressed = true;
    }
}

function keyUpHandler(event) {
    if(event.keyCode == 39) {
        rightPressed = false;
    }
    else if(event.keyCode == 37) {
        leftPressed = false;
    }
    if(event.keyCode == 40) {
    	downPressed = false;
    }
    else if(event.keyCode == 38) {
    	upPressed = false;
    }
}
// MOVE HERO
function move() {
   console.log('move loaded');
   if(rightPressed) {
       heroX += movementSpeed;
   }
   else if(leftPressed) {
       heroX -= movementSpeed;
   }
   if(downPressed) {
       heroY += movementSpeed;
   }
   else if(upPressed) {
       heroY -= movementSpeed;
   }
};

document.addEventListener('load', eventSheetLoaded);

// KEYBOARD
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

window.onload = function()
{
	requestAnimationFrame(drawMap);
   requestAnimationFrame(drawHero);
};

})();
