//GLOBAL VARIABLES
var table; //contains csv file in a table structure

var characterStories = []; //array of array where each element is in the form [character, [array of stories]]
var characters = []; //array of objects 'Ring' that contains characters

var colors = [
            '#ffff33', //yellow (central circle)
            '#e41a1c', //red
            '#377eb8', //blue
            '#4daf4a', //green
            '#984ea3', //purple
            '#ff7f00' //orange
            ]; 

var centralCircleX, centralCircleY; //position of the central circle
var centralRadius, charactersRadius; //radius; 
//------------------------------------------------
function preload() {
    table = loadTable('data/mille_notte.csv', 'csv', 'header'); //load file csv in a table structure
}

//------------------------------------------------
function setup() {
    pixelDensity(displayDensity());
    createCanvas(windowWidth, windowHeight); 

    //set central circle
    centralCircleX = windowWidth/2;
    centralCircleY = windowHeight/2;
    centralRadius = 30; 

    charactersRadius = 60;

    getData();
    createCharacters();  
}

//------------------------------------------------
function draw() {
    background('#ffffd4'); //the same color of the other visualization
    drawGraph(); 
}

//------------------------------------------------
function getData() {
    //nickname columns
    var colStory = 0; 
    var colCharacter = 3;

    var isCharacterInserted; //flag to know if a character is already inside the array

    //fill the array 'characterStories'
    for(var i = 0; i < table.getRowCount(); i++) {

        //nickname values extracted from the table
        var character = table.getString(i, colCharacter); 
        var story = table.getString(i, colStory);
        isCharacterInserted = false;   

        //if the character is already in the array, add his story
        for(var j = 0; j < characterStories.length; j++) {

            if(characterStories[j][0] == character) {
                isCharacterInserted = true; 
                characterStories[j][1].push(story);
                break;
            }
        }

        //if the character is not in the array yet, add him and his story
        if(!isCharacterInserted) {
            characterStories.push(new Array(character, new Array(story)));
        }
    }

    //delete from the array 'characterStories' the character 'nessuno' and the characters with only one story 
    for(var i = 0; i < characterStories.length; i++) {

        //delete element with character name 'nessuno'
        if(characterStories[i][0] == "nessuno") {
            characterStories.splice(i, 1);
        }

        //delete elements with characters with only one story
        if(characterStories[i][1].length == 1) {
            characterStories.splice(i, 1);
            i--; //needed to control all indexes also when an element is removed 
        }
    }

    print(characterStories);
}

//------------------------------------------------
function drawGraph() {

    drawLinks(TWO_PI/characters.length, centralRadius, centralCircleX, centralCircleY, charactersRadius, characters);
    drawCentralCircle();
    drawCharacters();
    

    
}

//------------------------------------------------
function createCharacters() {
    var stepAngle, angle;
    var distance = 120; 

    for(var i = 0; i < characterStories.length; i++) {
        var c = new Ring(characterStories[i][0]); 
        c.indexColor = i+1;
        characters.push(c); 
    }

    stepAngle = TWO_PI/characters.length;
    angle = -PI/2; 
    for(var i = 0; i < characters.length; i++) {
        characters[i].x = cos(angle) * distance + width/2; 
        characters[i].y = sin(angle) * distance + height/2;
        angle += stepAngle;
    }

    print(characters);
}

//------------------------------------------------
//draw character circles 
function drawCharacters() { 
    for(var i = 0; i < characters.length; i++) {
        characters[i].show(charactersRadius); 
        characters[i].showText();
    } 
}

////------------------------------------------------
function drawCentralCircle() {
    fill(colors[0]); 
    stroke('#000');
    strokeWeight(5);
    circle(centralCircleX, centralCircleY, centralRadius); //central circle
}

//------------------------------------------------
//draw a line between position (centralX, centralY) and each element of the array
function drawLinks(stepAngle, centralRadius, centralX, centralY, radius, array) {
    var angle, startX, startY, endX, endY;

    stroke('#000');

    angle = -PI/2; 
    for(var i = 0; i < array.length; i++){
        startX = cos(angle) * centralRadius + centralX; 
        startY = sin(angle) * centralRadius + centralY;  
        endX = cos(angle - PI) * radius + array[i].x; 
        endY = sin(angle - PI) * radius + array[i].y;
        line(startX, startY, endX, endY);
        angle += stepAngle;
    }
} 




