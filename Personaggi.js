//GLOBAL VARIABLES
var table; //contains csv file in a table structure

var characterStories = []; //array of array where each element is in the form [character, [array of stories]]
var characters = []; //array of objects 'Character' that contains characters

//colors
var colors = [];
var backgroundColor;
var strokeColor; 
var colorText; 

var centralCircleX, centralCircleY; //position of the central circle
var centralRadius, charactersRadius, storiesRadius; //radius; 

//var totalStories = 0;
//------------------------------------------------
function preload() {
    table = loadTable('data/mille_notte.csv', 'csv', 'header'); //load file csv in a table structure
}

//------------------------------------------------
function setup() {
    pixelDensity(displayDensity());
    createCanvas(windowWidth, windowHeight); 

    //central circle position settings
    centralCircleX = windowWidth/2;
    centralCircleY = windowHeight/2;

    //radius settings
    centralRadius = 30; 
    charactersRadius = 60;
    storiesRadius = 30; 

    defineColor();

    getData();

    createCharacters();
}

//------------------------------------------------
function draw() {
    background(backgroundColor); 
    drawGraph(); 
}

//------------------------------------------------
function defineColor() {
    colorMode(HSB);
    colors = [
            color(60, 80, 100), //yellow (central circle)
            color(359, 89, 89), //red
            color(207, 70, 72), //blue
            color(118, 58, 69), //green
            color(292, 52, 64), //purple
            color(30, 100, 100) //orange
            ]; 
    backgroundColor = color(60, 17, 100); //the same color of the other visualization
    strokeColor = color(0, 0, 0); //black
    colorText = color(0, 0, 0); //black
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

    filterData(); //delete from the array the character 'nessuno' and all the characters with only one story
    
    print(characterStories);
}

//------------------------------------------------
function filterData() {
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
}

//------------------------------------------------
function createCharacters() {
    var stepAngle, angle;
    var distance = 120; 

    //every character is an object 'Character'
    for(var i = 0; i < characterStories.length; i++) {
        var c = new Character(characterStories[i][0]); 
        var s = characterStories[i][1];
        c.indexColor = i+1;
        
        //every Character story is an object 'Story' and it's pushed in the property character 'stories'
        for(var j = 0; j < s.length; j++) {
            c.stories.push(new Story(s[i]));
        }

        characters.push(c); 
    }

    //compute x and y properties of every object 'Character'
    stepAngle = TWO_PI/characters.length;
    angle = -PI/2; 
    for(var i = 0; i < characters.length; i++) {
        characters[i].x = cos(angle) * distance + centralCircleX; 
        characters[i].y = sin(angle) * distance + centralCircleY;
        angle += stepAngle;
    }

    updateStories(); 

    print(characters);
}

//------------------------------------------------
function updateStories() {
    var angle = -PI * 5/6; //-PI * 8/9
    var stepAngle = TWO_PI/countStories();
    var distance = 300;
    var numStories = 0; 

    var h, s, b, newS; 

    //compute x and y properties of every object 'Story' inside each character
    for(var i = 0; i < characters.length; i++) {

        numStories = characters[i].stories.length;
        newS = floor(100/numStories);

        //update colorHSB property
        h = hue(colors[characters[i].indexColor]);
        s = newS;
        b = brightness(colors[characters[i].indexColor]);

        for(var j = 0; j < characters[i].stories.length; j++){
            characters[i].stories[j].x = cos(angle) * distance + centralCircleX; 
            characters[i].stories[j].y = sin(angle) * distance + centralCircleY; 
            angle += stepAngle; 

            //characters[i].stories[j].indexColor = i+1; //update indexColor property 

            characters[i].stories[j].colorHSB = color(h, s, b);

            s += newS; 
        }
    }
}

//------------------------------------------------
function countStories() {
    var counter = 0; 

    for(var i = 0; i < characters.length; i++) {
        counter += characters[i].stories.length; 
    }

    return counter; 
} 


