 // Example Album
 var albumPicasso = {
     name: 'The Colors',
     artist: 'Pablo Picasso',
     label: 'Cubism',
     year: '1881',
     albumArtUrl: 'assets/images/album_covers/01.png',
     songs: [
         { name: 'Blue', length: '4:26' },
         { name: 'Green', length: '3:14' },
         { name: 'Red', length: '5:01' },
         { name: 'Pink', length: '3:21'},
         { name: 'Magenta', length: '2:15'}
     ]
 };
 
 // Another Example Album
 var albumMarconi = {
     name: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { name: 'Hello, Operator?', length: '1:01' },
         { name: 'Ring, ring, ring', length: '5:01' },
         { name: 'Fits in your pocket', length: '3:21'},
         { name: 'Can you hear me now?', length: '3:14' },
         { name: 'Wrong phone number', length: '2:15'}
     ]
 };

var createSongRow = function(songNumber, songName, songLength) {
    
    var template = 
          '<tr class="album-view-song-item">'
        + ' <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>' //creating a data-song-number attribute allows me to access the data held in the attribute (using DOM) when the mouse leaves the table row
        + ' <td class="song-item-title">' + songName + '</td>'
        + ' <td class="song-item-duration">' + songLength + '</td>'
        + '</tr>'
        ;
    
    return template;
    
};

var setCurrentAlbum = function(album) {
    
//Selecting all of the HTML elements required to display on the album page and populating these elements by assigning the corresponding values of the album objects' properties to the HTML elements.
    var albumTitle = document.getElementsByClassName('album-view-title')[0];
    var albumArtist = document.getElementsByClassName('album-view-artist')[0];
    var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
    var albumImage = document.getElementsByClassName('album-cover-art')[0];
    var albumSongList = document.getElementsByClassName('album-view-song-list')[0];
    
//sets the specified the text nodes (e.g. albumTitle) equal to the object property values 
    albumTitle.firstChild.nodeValue = album.name;
    albumArtist.firstChild.nodeValue = album.artist;
    albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
    albumImage.setAttribute('src',album.albumArtUrl);

//clearing the album song list HTML to make sure we're working with a clean slate.    
    albumSongList.innerHTML = '';

//goes through all the songs from the album and inserts them into the HTML using innerHTML property  
    for (i = 0; i < album.songs.length; i++) {
        albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
    }
    
};

var findParentByClassName = function(element, targetClass) {
    var currentParent = element.parentElement;
    
    if (currentParent !== null) {    
        while (currentParent.className != targetClass) {
            currentParent = currentParent.parentElement;
        }
    } else {
        alert("No parent found");
    }
    
    if (currentParent !== null) {
        return currentParent;
    } else {
        alert("No parent found with that class name");
    }
};


var getSongItem = function (element) {
    switch (element.className) {
        case "album-view-song-item": 
            return element.querySelector(".song-item-number");
        default:
            var songRow = findParentByClassName(element, "album-view-song-item");
            return songRow.querySelector(".song-item-number");
    }
};

var clickHandler = function(targetElement) {
    
    var songItem = getSongItem(targetElement);
    
    if (currentlyPlayingSong === null) {
        songItem.innerHTML = pauseButtonTemplate;
        currentlyPlayingSong = songItem.getAttribute('data-song-number');
    } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
        songItem.innerHTML = playButtonTemplate;
        currentlyPlayingSong = null;
    } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
        var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
        currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
        songItem.innerHTML = pauseButtonTemplate;
        currentlyPlayingSong = songItem.getAttribute('data-song-number');
    }
    
};

// Elements to which we will add listeners
var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

var currentlyPlayingSong = null; //var to store the state of playing songs

window.onload = function() {
    
    setCurrentAlbum(albumPicasso);
    
    songListContainer.addEventListener('mouseover',function(event) {
        var songItem = getSongItem(event.target); //caching the song item and number in variables
        var songItemNumber = songItem.getAttribute('data-song-number');
        
        if (songItemNumber !== currentlyPlayingSong) {
            songItem.innerHTML = playButtonTemplate;
        }
    });
    
    for (i = 0; i < songRows.length; i++) {
        songRows[i].addEventListener('mouseleave', function(event) {  // Revert the content back to the number
            var songItem = getSongItem(event.target); //caching the song item and number in variables
            var songItemNumber = songItem.getAttribute('data-song-number');
            
            if (songItemNumber !== currentlyPlayingSong) {  //checks that the item the mouse is leaving is not the current song 
                songItem.innerHTML = songItemNumber;        //only changes content if isn't current song 
            }
        });
        
        songRows[i].addEventListener('click', function(event) {
            clickHandler(event.target); // event handler call
        });
    }
    
};