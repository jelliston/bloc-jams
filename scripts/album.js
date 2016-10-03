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
        var songNumber = parseInt($(this).attr('data-song-number'));
        
        if (currentlyPlayingSongNumber !== null) {  // Revert to song number for currently playing song because user started playing new song.
		  var currentlyPlayingCell = parseInt($('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]'));
		  currentlyPlayingCell.html(currentlyPlayingSongNumber);
        }
        
	    if (currentlyPlayingSongNumber !== songNumber) {   // Switch from Play -> Pause button to indicate new song is playing.
		  $(this).html(pauseButtonTemplate);
		  currentlyPlayingSongNumber = songNumber;
          currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
          updatePlayerBarSong();
        
	    } else if (currentlyPlayingSongNumber === songNumber) {  // Switch from Pause -> Play button to pause currently playing song.
		  $(this).html(playButtonTemplate);   
          $('.main-controls .play-pause').html(playerBarPlayButton);
		  currentlyPlayingSongNumber = null;
          currentSongFromAlbum = null;
	    }
    };
    
    var onHover = function(event) {
        var songNumberCell = parseInt($(this).find('.song-item-number'));
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));
        
        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(playButtonTemplate);
        }
    };
    
    var offHover = function(event) {
        var songNumberCell = parseInt($(this).find('.song-item-number'));
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));
        
        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(songNumber);
        }
    };
    
    $row.find('.song-item-number').click(clickHandler); //finds .song-item-number class element in clicked row & executes clickHandler on click
    
    $row.hover(onHover, offHover); //combines mouseover (onHover) & mouseleave (offHover) functions
    
    return $row; //returns created row with event listeners attached
    
};

var setCurrentAlbum = function(album) {
    currentAlbum = album;
    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo = $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');
    
    $albumTitle.text(album.name);  //sets the specified the text nodes (e.g. albumTitle) equal to the object property values 
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);

    $albumSongList.empty();  //clearing the album song list HTML to make sure we're working with a clean slate.    


    for (i = 0; i < album.songs.length; i++) {    //goes through all the songs from the album and inserts them into the HTML using innerHTML property  
        var $newRow = createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
         $albumSongList.append($newRow);
    }
    
};

var trackIndex = function(album,song) {
    return album.songs.indexOf(song);
};


var nextSong = function() {
    
    var getLastSongNumber = function(index) {
        if (index == 0) {
            return currentAlbum.songs.length;
        }
        else {
            return index;
        }
    };
    
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    currentSongIndex++;  // incrementing the song
    
    if (currentSongIndex >= currentAlbum.songs.length) {
    currentSongIndex = 0;   
    } 
    
    //set a new current song
    currentlyPlayingSongNumber = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];
    
    //update player bar info
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + ' - ' + currentAlbum.title);
    $('.main-controls .play-pause').html(playerBarPauseButton);
    
    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $nextSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');
    
    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
    
};

var previousSong = function() {
    
    var getLastSongNumber = function(index) {
        index == (currentAlbum.songs.length - 1) ? return 1 : return index + 2;
    };
    
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    currentSongIndex--;  // decrementing the song
    
    if (currentSongIndex < 0) {
    currentSongIndex = currentAlbum.songs.length - 1;   
    } 
    
    //set a new current song
    currentlyPlayingSongNumber = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];
    
    //update player bar info
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + ' - ' + currentAlbum.title);
    $('.main-controls .play-pause').html(playerBarPauseButton);
    
    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $previousSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');
    
    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
    
};
    
var updatePlayerBarSong = function() {
    var $songName = $('.currently-playing .song-name');
    var $artistName = $('.currently-playing .artist-name');
    var $artistSongMobile = $('.currently-playing .artist-song-mobile');

    $songName.text(currentSongFromAlbum.title);
    $artistName.text(currentAlbum.artist);
    $artistSongMobile.text(currentSongFromAlbum.title + ' - ' + currentAlbum.artist);
    $('.main-controls .play-pause').html(playerBarPauseButton);
    
};
    

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';


var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null; //var to store the currently playing song object from the songs array

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

$(document).ready(function() {
    setCurrentAlbum(albumPicasso);
    $previousButton.click(previousSong);
    $nextButton.click(nextSong);
});