//class Character
function Character(name) {
	//PROPERTIES
	this.x = 0; 
	this.y = 0; 
	this.name = name; 
	this.indexColor = 0;
	this.stories = []; 

	//METHODS
	//draw the object 
	this.show = function(radius) {
		//color and stroke settings 
		noStroke();

		circle(this.x, this.y, radius); 
	}

	//write name property of the object
	this.showText = function(colorText) {

		fill(colorText);
		textSize(12); 
		textAlign(CENTER, CENTER);
		rectMode(CENTER);
		text(this.name, this.x, this.y, 60, 60);
	}
}

//class Story
function Story(name) {
	//PROPERTIES
	this.x = 0; 
	this.y = 0; 
	this.name = name;
	this.indexColor = 0; 
	this.hue = 0; 

	//METHODS
	this.show = function(radius) {
		//color and stroke settings

		circle(this.x, this.y, radius);
	}
}