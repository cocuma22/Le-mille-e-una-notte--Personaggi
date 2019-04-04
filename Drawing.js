//------------------------------------------------
function drawGraph() {

    drawLinks();
    
    drawFirstCircle(); 
    
    drawCharacters(); //draws each character

    drawStories(); 


}

//------------------------------------------------
//draw character circles 
function drawCharacters() { 
    for(var i = 0; i < characters.length; i++) {
        stroke(strokeColor);
        fill(colors[characters[i].indexColor]);
        characters[i].show(charactersRadius); //draw a circle for each character
        
        fill(colorText);
        characters[i].showText(colorText); //write the name of each character
    } 
}

////------------------------------------------------
function drawFirstCircle() {
    //color and stroke settings 
    strokeWeight(2);
    fill(colors[0]); 

    circle(centralCircleX, centralCircleY, centralRadius); //central circle

    fill(colorText);
    textAlign(CENTER, CENTER);
    text("Personaggi", centralCircleX, centralCircleY);
}

//------------------------------------------------
//draw a line between position (centralX, centralY) and each element of the array
function links(startX, startY, startR, arrayCircles) {
    var distort = 500;
    stroke(strokeColor);
    for(var i = 0; i < arrayCircles.length; i++) {
        strokeWeight(2);
        noFill();
        curve(startX + startR - distort, startY, startX + startR, startY, arrayCircles[i].x - arrayCircles[i].radius, arrayCircles[i].y, arrayCircles[i].x - arrayCircles[i].radius + distort, arrayCircles[i].y);
    }
}

//------------------------------------------------
function drawLinks() {
    links(centralCircleX, centralCircleY, centralRadius, characters); //draws lines from the central circle to every character circle

    for(var i = 0; i < characters.length; i++) {
        links(characters[i].x, characters[i].y, characters[i].radius, characters[i].stories);
    }
}

//------------------------------------------------
//draw stories circles 
function drawStories() {
    for(var i = 0; i < characters.length; i++) {
        for(var j = 0; j < characters[i].stories.length; j++) { 

            fill(characters[i].stories[j].colorHSB);
            characters[i].stories[j].show(storiesRadius);

            fill(colorText);
            characters[i].stories[j].showText(colorText);
        }
    }
}


