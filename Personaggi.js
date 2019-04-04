//GLOBAL VARIABLES
var table; //contains csv file in a table structure

var characterStories = []; //array of array where each element is in the form [character, [array of stories]]
var characters = []; //array of objects 'Character' that contains characters

//colors variables 
var colors = []; //colors to use in character circles and central circle 
var backgroundColor;
var strokeColor; 
var colorText;  

//central circle position 
var centralCircleX, centralCircleY;

//radius variables
var centralRadius, charactersRadius, storiesRadius;

var font; 
 
//------------------------------------------------
function preload() {
    table = loadTable('data/mille_notte.csv', 'csv', 'header'); //load file csv in a table structure

    font = loadFont('data/GloriaHallelujah.ttf'); //load font 
}

//------------------------------------------------
function setup() {
    pixelDensity(displayDensity());
    createCanvas(windowWidth, windowHeight); 
    textFont(font);

    //radius settings
    centralRadius = 80; 
    charactersRadius = 60;
    storiesRadius = 10; 

    //central circle position settings
    centralCircleX = centralRadius + 20;
    centralCircleY = windowHeight/2;

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
    strokeColor = color(20, 98, 33); //the same color of the other visualization //color(0, 0, 0); //black
    colorText = color(0, 0, 100); //white
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
    //every character is an object 'Character'
    for(var i = 0; i < characterStories.length; i++) {
        var c = new Character(characterStories[i][0]); 
        var s = characterStories[i][1];
        c.indexColor = i+1;
        c.radius = charactersRadius; 
        
        //every Character story is an object 'Story' and it's pushed in the property character 'stories'
        for(var j = 0; j < s.length; j++) {
            var story = new Story(s[j])
            story.radius = storiesRadius;
            c.stories.push(story);
        }

        characters.push(c); 
    }

    updateCharacters(500); //update x and y characters properties 

    updateStories(850); //update x, y and colorHSB stories properties

    print(characters);
}

//------------------------------------------------
function updateCharacters(posX) {
    var step = windowHeight/characters.length; //vertical distance from different characters
    var posY = step - charactersRadius - 10; 

    //compute x and y properties of every object 'Character' 
    for(var i = 0; i < characters.length; i++) {
        characters[i].x = posX;  
        characters[i].y = posY; 
        posY += step;
    }
}

//------------------------------------------------
function updateStories(posX) {
    var totalStories = countStories(); 
    var numStories = 0; 
    var h, s, b, newS; 
    var step = windowHeight/totalStories;
    var posY = step - storiesRadius - 5; 

    for(var i = 0; i < characters.length; i++) {

        numStories = characters[i].stories.length;
        newS = floor(100/numStories);

        //update colorHSB property
        h = hue(colors[characters[i].indexColor]);
        s = newS;
        b = brightness(colors[characters[i].indexColor]);

        //compute x and y properties of every object 'Story' inside each character
        for(var j = 0; j < characters[i].stories.length; j++){
            characters[i].stories[j].x = posX ; 
            characters[i].stories[j].y = posY; 

            characters[i].stories[j].colorHSB = color(h, s, b); //update colorHSB property

            posY += step;
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

//------------------------------------------------
function mouseClicked() {
    //check if the mouse has clicked on the central circle 
    if(checkHover(centralCircleX, centralCircleY, centralRadius)) {
        for(var i = 0; i < characters.length; i++) {
            characters[i].visible = !characters[i].visible; 
        }
    }

    //check if the mouse has clicked on a character circle
    for(var i = 0; i < characters.length; i++) {
        if(checkHover(characters[i].x, characters[i].y, characters[i].radius)) {
            for(var j = 0; j < characters[i].stories.length; j++) {
                characters[i].stories[j].visible = !characters[i].stories[j].visible;
            }
        }
    }
}

//------------------------------------------------
function checkHover(x, y, r) {
    var d = dist(mouseX, mouseY, x, y); 

    if(d < r) {
        return true; 
    } else {
        return false; 
    }
}


