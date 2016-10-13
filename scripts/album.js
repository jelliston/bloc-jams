var setSong = function(songNumber) {
    if (currentSoundFile) {
         currentSoundFile.stop();
     }
    
    currentlyPlayingSongNumber = parseInt(songNumber);
    currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
    currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
        formats: [ 'mp3' ],
        preload: true
    });
    
    setVolume(currentVolume);
};

var setVolume = function(volume) {
    if (currentSoundFile) {
        currentSoundFile.setVolume(volume);
    }
};

var getSongNumberCell = function(number) {
    return $('.song-item-number[data-song-number="' + number + '"]')
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
        var songNumber = parseInt($(this).attr('data-song-number'));
        
        if (currentlyPlayingSongNumber !== null) {  // Revert to song number for currently playing song because user started playing new song.
		  var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
		  currentlyPlayingCell.html(currentlyPlayingSongNumber);
        }
        
	    if (currentlyPlayingSongNumber !== songNumber) {   // Switch from Play -> Pause button to indicate new song is playing.
		  $(this).html(pauseButtonTemplate);
		  setSong(songNumber);
          currentSoundFile.play();
          updatePlayerBarSong();
        
	    } else if (currentlyPlayingSongNumber === songNumber) {  
		  if (currentSoundFile.isPaused()) {
              $(this).html(pauseButtonTemplate);
              $('.main-controls .play-pause').html(playerBarPauseButton);
              currentSoundFile.play();
          } else {
              $(this).html(playButtonTemplate);   
              $('.main-controls .play-pause').html(playerBarPlayButton);
              currentSoundFile.pause();
          }
	    }
    };
    
    var onHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));
        
        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(playButtonTemplate);
        }
    };
    
    var offHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
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
        var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
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
    
    setSong(currentSongIndex + 1);   //set a new current song
    currentSoundFile.play();
    updatePlayerBarSong();
    
    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
    
    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
    
};

var previousSong = function() {
    
    var getLastSongNumber = function(index) {
        return index == (currentAlbum.songs.length - 1) ? 1 : index + 2;
    };
    
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    currentSongIndex--;  // decrementing the song
    
    if (currentSongIndex < 0) {
    currentSongIndex = currentAlbum.songs.length - 1;   
    } 
    
    //set a new current song
    setSong(currentSongIndex + 1);
    currentSoundFile.play();
    updatePlayerBarSong();
    
    
    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
    
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

var togglePlayFromPlayerBar = function() {
     if (currentSoundFile.isPaused()) {
        $(this).html(pauseButtonTemplate);
        $playerBarPlayPause.html(playerBarPauseButton);
        currentSoundFile.play();
      } else if (currentSoundFile) {
        $(this).html(playButtonTemplate);   
        $playerBarPlayPause.html(playerBarPlayButton);
        currentSoundFile.pause();
      }   
};

var $playerBarPlayPause = $('.main-controls .play-pause');

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';


var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null; //var to store the currently playing song object from the songs array
var currentSoundFile = null;
var currentVolume = 80;

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

$(document).ready(function() {
    setCurrentAlbum(albumPicasso);
    $previousButton.click(previousSong);
    $nextButton.click(nextSong);
    $playerBarPlayPause.click(togglePlayFromPlayerBar);
});