function setup() {

}


function draw() {

}

/*//------------------------------------------------
function getData() {
    //nickname columns
    var colStory = 0; 
    var colStoryParent = 2; 

    //fill the array 'storiesParentChild'
    for(var i = 0; i < table.getRowCount(); i++) {
    var story = table.getString(i, colStory); 
    var storyParent = table.getString(i, colStoryParent);
    var isAlreadyInserted = false; 

        //check if the couple parent-child is already in the array 
        for(var j = 0; j < storiesParentChild.length; j++) {
            if(storiesParentChild[j][0] == storyParent && storiesParentChild[j][1] == story) {
                isAlreadyInserted = true;
                break;
            }
        }
        if(!isAlreadyInserted) { //if the couple parent-child is not yet in the array... 
            storiesParentChild.push([storyParent, story]);//... push the couple parent-child in the array
        }
    }

    //fill the tree 'storiesTree'
    storiesTree = new Tree(storiesParentChild[0][0]);

    for(var i = 0; i < storiesParentChild.length; i++) {
        storiesTree.add(storiesParentChild[i][1], storiesParentChild[i][0], storiesTree.traverseDF);
    }
}*/