(() => {
  console.log('Loaded');

  var map = {
      cols: 8,
      rows: 8,
      tsize: 64,
      layers: [[
          3, 3, 3, 3, 3, 3, 3, 3,
          3, 1, 1, 1, 1, 1, 1, 3,
          3, 1, 1, 1, 1, 2, 1, 3,
          3, 1, 1, 1, 1, 1, 1, 3,
          3, 1, 1, 2, 1, 1, 1, 3,
          3, 1, 1, 1, 2, 1, 1, 3,
          3, 1, 1, 1, 2, 1, 1, 3,
          3, 3, 3, 1, 2, 3, 3, 3
      ], [
          4, 3, 3, 3, 3, 3, 3, 4,
          4, 0, 0, 0, 0, 0, 0, 4,
          4, 0, 0, 0, 0, 0, 0, 4,
          4, 0, 0, 5, 0, 0, 0, 4,
          4, 0, 0, 0, 0, 0, 0, 4,
          4, 0, 0, 0, 0, 0, 0, 4,
          4, 4, 4, 0, 5, 4, 4, 4,
          0, 3, 3, 0, 0, 3, 3, 3
      ]],
      getTile: function (layer, col, row) {
          return this.layers[layer][row * map.cols + col];
      }
  };

// Load Images
Game.load = function () {
    return [
        Loader.loadImage('tiles', 'images/tileset.png'),
        Loader.loadImage('hero', 'images/heroset.png')
    ];
};

// Initialize Game
Game.init = function () {
    this.tileAtlas = Loader.getImage('tiles');
    this.hero = {x: 128, y: 384, image: Loader.getImage('hero')};
};

// Draw the Canvas
Game._drawLayer = function (layer) {
    for (var c = 0; c < map.cols; c++) {
        for (var r = 0; r < map.rows; r++) {
            var tile = map.getTile(layer, c, r);
            if (tile !== 0) { // 0 => empty tile
                this.ctx.drawImage(
                    this.tileAtlas, // image
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
};

// Render the Game
Game.render = function () {
    // draw map background layer
    this._drawLayer(0);
    // draw game sprites
    this.ctx.drawImage(this.hero.image, this.hero.x, this.hero.y);
    // draw map top layer
    this._drawLayer(1);
};

    // let game = new Game(settings);
  // game.run();


//
// 	// Background image
// 	var bgReady = false;
// 	var bgImage = new Image();
// 	bgImage.onload = function () {
// 		bgReady = true;
// 	};
// 	bgImage.src = "images/canvas.png";
//
// 	// Hero image
// 	var heroReady = false;
// 	var heroImage = new Image();
// 	heroImage.onload = function () {
// 		heroReady = true;
// 	};
// 	heroImage.src = "images/hero.png";
//
// 	// Bug image
// 	var bugReady = false;
// 	var bugImage = new Image();
// 	bugImage.onload = function () {
// 		bugReady = true;
// 	};
// 	bugImage.src = "images/bug.png";
//
// 	// Bullet image
// 	var bulletReady = false;
// 	var bulletImage = new Image();
// 	bulletImage.onload = function () {
// 		bulletReady = true;
// 	};
// 	bulletImage.src = "images/bullet.png";
//
//   // Game Elements
//   var hero = {
//   	speed: 256, // movement in pixels per second
//   	x: 0,
//   	y: 0
//   };
//
//   var bug = {
//   	x: 0,
//   	y: 0
//   };
//   var bugsCaught = 0;
// 	var bullet = {};
//
//   // Handle keyboard controls
//   var keysDown = {};
//
//   addEventListener("keydown", function (e) {
//   	keysDown[e.keyCode] = true;
//   }, false);
//
//   addEventListener("keyup", function (e) {
//   	delete keysDown[e.keyCode];
//   }, false);
//
//   // Reset the game when the hero catches a bug
// var reset = function () {
// 	hero.x = canvas.width / 2;
// 	hero.y = canvas.height / 2;
//
// 	// Throw the bug somewhere on the screen randomly
// 	bug.x = 32 + (Math.random() * (canvas.width - 64));
// 	bug.y = 32 + (Math.random() * (canvas.height - 64));
// };
//
// // Update game objects
// var update = function (modifier) {
// 	if (38 in keysDown) { // Arrow up
// 		hero.y -= hero.speed * modifier;
// 	}
// 	if (40 in keysDown) { // Arrow down
// 		hero.y += hero.speed * modifier;
// 	}
// 	if (37 in keysDown) { // Arrow left
// 		hero.x -= hero.speed * modifier;
// 	}
// 	if (39 in keysDown) { // Arrow right
// 		hero.x += hero.speed * modifier;
// 	}
//
// 	//Spacebar bullet shot
// 	if (32 in keysDown) { // Spacebar
// 		bullet.x = hero.x;
// 		bullet.y = hero.y;
// 	}
//
// 	//move bullet
// 	bullet.y -= hero.speed * modifier;
//
// 	// Was it hit?
// 	if (
// 		bullet.x <= (bug.x + 40)
// 		&& bug.x <= (bullet.x + 40)
// 		&& bullet.y <= (bug.y + 40)
// 		&& bug.y <= (bullet.y + 40)
// 	) {
// 		++bugsCaught;
// 		reset();
// 	}
// };
//
// // Draw everything
// var render = function () {
// 	if (bgReady) {
// 		ctx.drawImage(bgImage, 0, 0);
// 	}
//
// 	if (heroReady) {
// 		ctx.drawImage(heroImage, hero.x, hero.y);
// 	}
//
// 	if (bugReady) {
// 		ctx.drawImage(bugImage, bug.x, bug.y);
// 	}
//
// 	if (bulletReady) {
// 		ctx.drawImage(bulletImage, bullet.x, bullet.y);
// 	}
//
// 	// Score
// 	ctx.textAlign = "left";
// 	ctx.textBaseline = "top";
// 	ctx.fillStyle = "rgb(0, 0, 0)";
// 	ctx.font = "24px Helvetica";
// 	ctx.fillText("Death count: " + bugsCaught, 32, 80);
// };
//
// // The main game loop
// var main = function () {
// 	var now = Date.now();
// 	var delta = now - then;
//
// 	update(delta / 1000);
// 	render();
//
// 	then = now;
//
// 	// Request to do this again ASAP
// 	requestAnimationFrame(main);
// };
//
// // Initialize
// var then = Date.now();
// reset();
// main();

})();
