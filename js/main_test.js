(() => {
  console.log('Loaded');

//  Define the starfield class.
function Starfield() {
    this.fps = 30;
    this.canvas = null;
    this.width = 0;
    this.height = 0;
    this.minVelocity = 15;
    this.maxVelocity = 30;
    this.stars = 100;
    this.intervalId = 0;
}

//  Initialises the Object
Starfield.prototype.initialise = function(div) {

    var self = this;
 
    //  Store the div.
    this.containerDiv = div;
    self.width = 800;
    self.height = 800;

    //  Create the canvas.
    var canvas = document.createElement('canvas');
    div.appendChild(canvas);
    this.canvas = canvas;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
};

})();
