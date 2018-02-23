(() => {
  console.log('first JS file');

  // Get the canvas
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext("2d");
	canvas.width = 512;
	canvas.height = 500;

	// Background image
	var bgReady = false;
	var bgImage = new Image();
	bgImage.onload = function () {
		bgReady = true;
	};
	bgImage.src = "images/canvas.png";

	// Hero image
	var heroReady = false;
	var heroImage = new Image();
	heroImage.onload = function () {
		heroReady = true;
	};
	heroImage.src = "images/hero.png";

	// Bug image
	var bugReady = false;
	var bugImage = new Image();
	bugImage.onload = function () {
		bugReady = true;
	};
	bugImage.src = "images/bug.png";

  // Game Elements
  var hero = {
  	speed: 256, // movement in pixels per second
  	x: 0,
  	y: 0
  };

  var bug = {
  	x: 0,
  	y: 0
  };
  var bugsCaught = 0;

  // Handle keyboard controls
  var keysDown = {};

  addEventListener("keydown", function (e) {
  	keysDown[e.keyCode] = true;
  }, false);

  addEventListener("keyup", function (e) {
  	delete keysDown[e.keyCode];
  }, false);

  // Reset the game when the hero catches a bug
var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	// Throw the bug somewhere on the screen randomly
	bug.x = 32 + (Math.random() * (canvas.width - 64));
	bug.y = 32 + (Math.random() * (canvas.height - 64));
};

// Update game objects
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
		hero.y -= hero.speed * modifier;
	}
	if (40 in keysDown) { // Player holding down
		hero.y += hero.speed * modifier;
	}
	if (37 in keysDown) { // Player holding left
		hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown) { // Player holding right
		hero.x += hero.speed * modifier;
	}

	// Are they touching?
	if (
		hero.x <= (bug.x + 50)
		&& bug.x <= (hero.x + 50)
		&& hero.y <= (bug.y + 50)
		&& bug.y <= (hero.y + 50)
	) {
		++bugsCaught;
		reset();
	}
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (bugReady) {
		ctx.drawImage(bugImage, bug.x, bug.y);
	}

	// Score
	ctx.fillStyle = "rgb(0, 0, 0)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Bugs Killed: " + bugsCaught, 32, 32);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Initialize
var then = Date.now();
reset();
main();

})();
