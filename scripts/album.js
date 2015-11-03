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
    
    var $row = $(template);
    
    var clickHandler = function() {
        var songNumber = $(this).attr('data-song-number');
        
        if (currentlyPlayingSong !== null) {
		  // Revert to song number for currently playing song because user started playing new song.
		  var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
		  currentlyPlayingCell.html(currentlyPlayingSong);
        }
	    if (currentlyPlayingSong !== songNumber) {
		  // Switch from Play -> Pause button to indicate new song is playing.
		  $(this).html(pauseButtonTemplate);
		  currentlyPlayingSong = songNumber;
	    } else if (currentlyPlayingSong === songNumber) {
		  // Switch from Pause -> Play button to pause currently playing song.
		  $(this).html(playButtonTemplate);
		  currentlyPlayingSong = null;
	    }
    };
    
    var onHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');
        
        if (songNumber !== currentlyPlayingSong) {
            songNumberCell.html(playButtonTemplate);
        }
    };
    
    var offHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');
        
        if (songNumber !== currentlyPlayingSong) {
            songNumberCell.html(songNumber);
        }
    };
    
    $row.find('.song-item-number').click(clickHandler); //finds .song-item-number class element in clicked row & executes clickHandler on click
    
    $row.hover(onHover, offHover); //combines mouseover (onHover) & mouseleave (offHover) functions
    
    return $row; //returns created row with event listeners attached
    
};

var setCurrentAlbum = function(album) {
//Selecting all of the HTML elements required to display on the album page and populating these elements by assigning the corresponding values of the album objects' properties to the HTML elements.
    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo = $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');
    
//sets the specified the text nodes (e.g. albumTitle) equal to the object property values 
    $albumTitle.text(album.name);
     $albumArtist.text(album.artist);
     $albumReleaseInfo.text(album.year + ' ' + album.label);
     $albumImage.attr('src', album.albumArtUrl);

//clearing the album song list HTML to make sure we're working with a clean slate.    
    $albumSongList.empty();

//goes through all the songs from the album and inserts them into the HTML using innerHTML property  
    for (i = 0; i < album.songs.length; i++) {
        var $newRow = createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
         $albumSongList.append($newRow);
    }
    
};

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

var currentlyPlayingSong = null; //var to store the state of playing songs

$(document).ready(function() {
    
    setCurrentAlbum(albumPicasso);
    
});