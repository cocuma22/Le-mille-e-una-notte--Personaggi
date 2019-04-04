//------------------------------------------------
function drawGraph() {

    drawLinks(); //draw curves between circles
    
    drawFirstCircle(); 
    
    drawCharacters(); //draws each character

    drawStories(); 


}

//------------------------------------------------
//draw character circles 
function drawCharacters() { 
    for(var i = 0; i < characters.length; i++) {
        //draw circles
        stroke(strokeColor);
        fill(colors[characters[i].indexColor]);
        characters[i].show(charactersRadius); //draw a circle for each character
        
        //draw texts
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

    //text settings
    fill(colorText);
    textAlign(CENTER, CENTER);
    textSize(20);

    text("Personaggi", centralCircleX, centralCircleY);
}

//------------------------------------------------
//draw a curve between a starting circle and an array of circles
function links(startX, startY, startR, arrayCircles) {
    var distort = 500;

    //stroke and fill settings
    strokeWeight(2);
    stroke(strokeColor);
    noFill();

    for(var i = 0; i < arrayCircles.length; i++) {
        curve(startX + startR - distort, startY, 
                startX + startR, startY, //real start
                arrayCircles[i].x - arrayCircles[i].radius, arrayCircles[i].y, //real end
                arrayCircles[i].x - arrayCircles[i].radius + distort, arrayCircles[i].y);
    }
}

//------------------------------------------------
function drawLinks() {
    links(centralCircleX, centralCircleY, centralRadius, characters); //draws curves from the central circle to every character circle

    for(var i = 0; i < characters.length; i++) {
        links(characters[i].x, characters[i].y, characters[i].radius, characters[i].stories);
    }
}

//------------------------------------------------
//draw stories circles 
function drawStories() {
    for(var i = 0; i < characters.length; i++) {
        for(var j = 0; j < characters[i].stories.length; j++) { 
            //draw circles
            fill(characters[i].stories[j].colorHSB);
            characters[i].stories[j].show(storiesRadius);

            //draw texts
            fill(colorText);
            characters[i].stories[j].showText(colorText);
        }
    }
}


