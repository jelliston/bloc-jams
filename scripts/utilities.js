//used for holding mutli-purpose functions that can be used many times throughout the program

//forEach function already exists, but I am testing myself to see if I can build one

function forEach(array, callback) {
    for (var i = 0; i < array.length; i++) {
        callback(array[i]);
    }     
}