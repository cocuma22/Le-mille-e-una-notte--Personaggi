//------------------------------------------------
function drawGraph() {

    drawLinks(TWO_PI/characters.length, centralRadius, centralCircleX, 
                centralCircleY, charactersRadius, characters); //draws lines from the central circle to every character circle
    
    drawCentralCircle(); 
    
    drawCharacters(); //draws each character

    drawStories(); 
}

//------------------------------------------------
//draw character circles 
function drawCharacters() { 
    for(var i = 0; i < characters.length; i++) {
        fill(colors[characters[i].indexColor]);
        characters[i].show(charactersRadius); //draw a circle for each character
        characters[i].showText(colorText); //write the name of each character
    } 
}

////------------------------------------------------
function drawCentralCircle() {
    //color and stroke settings 
    fill(colors[0]); 
    stroke(strokeColor);
    strokeWeight(5);

    circle(centralCircleX, centralCircleY, centralRadius); //central circle
}

//------------------------------------------------
//draw a line between position (centralX, centralY) and each element of the array
function drawLinks(stepAngle, centralRadius, centralX, centralY, radius, array) {
    var angle, startX, startY, endX, endY;

    stroke(strokeColor); 

    angle = -PI/2; 

    //the line starts from the endge of the central circle 
    //and it ends to the edge of each character circle
    for(var i = 0; i < array.length; i++){
        startX = cos(angle) * centralRadius + centralX; 
        startY = sin(angle) * centralRadius + centralY;  
        endX = cos(angle - PI) * radius + array[i].x; 
        endY = sin(angle - PI) * radius + array[i].y;
        line(startX, startY, endX, endY);
        angle += stepAngle;
    }
}

//------------------------------------------------
//draw stories circles 
function drawStories() {
    for(var i = 0; i < characters.length; i++) {
        for(var j = 0; j < characters[i].stories.length; j++) { 

            fill(colors[characters[i].stories[j].indexColor]);
            characters[i].stories[j].show(storiesRadius);
        }
    }
}


