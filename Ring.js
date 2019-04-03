//class Ring 
function Ring(name) {
	//PROPERTIES
	this.x = 0; 
	this.y = 0; 
	this.name = name; 
	this.indexColor = 0; 

	//METHODS
	//draw the object 
	this.show = function(radius) {
		fill(colors[this.indexColor]);
		noStroke();
		circle(this.x, this.y, radius); 
	}

	this.showText = function() {
		fill('#000');
		textSize(12); 
		textAlign(CENTER, CENTER);
		rectMode(CENTER);
		text(this.name, this.x, this.y, 60, 60);
	}
}