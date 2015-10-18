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

//my example album
var albumJj = {
     name: 'I, Jonathan',
     artist: 'Jonathan Richman',
     label: 'Rounder Records',
     year: '1992',
     albumArtUrl: 'assets/images/album_covers/i_jonathan.jpg',
     songs: [
         { name: 'Parties in the U.S.A.', length: '4:42' },
         { name: 'Tandem Jump', length: '2:10' },
         { name: 'You Can\'t Talk to the Dude', length: '2:49'},
         { name: 'Velvet Underground', length: '3:23' },
         { name: 'I Was Dancing in the Lesbian Bar', length: '3:40'},
         { name: 'Rooming House on Venice Beach', length: '5:04' },
         { name: 'That Summer Feeling', length: '6:02' },
         { name: 'Grunion Run (instrumental)', length: '2:31' },
         { name: 'A Higher Power', length: '3:02' },
         { name: 'Twighlight in Boston', length: '4:08' }
     ]
 };

var createSongRow = function(songNumber, songName, songLength) {
    
    var template = 
          '<tr class="album-view-song-item">'
        + ' <td class="song-item-number">' + songNumber + '</td>' 
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

window.onload = function() {
    
    setCurrentAlbum(albumPicasso);
    
};

var albumNames = [albumPicasso, albumMarconi, albumJj];

var albumIndex = 0;

function toggleAlbums() {
    if (albumIndex >= (albumNames.length - 1)) {
        albumIndex = 0; 
    }
    else {
        albumIndex++;
    }   
        
    setCurrentAlbum(albumNames[albumIndex])
};

document.getElementsByTagName('img')[1].addEventListener("click", toggleAlbums);