const R = requre('ramda');

R.range(1, 5);

function getRndmFromSet(set) {
    var rndm = Math.floor(Math.random() * set.length);

    return set[rndm];
}



console.log("Random number: "+getRndmFromSet([8,6,1,7]));