let audio;

//Hide Pause Button
$('#pause').hide();

//Initialize Audio

initAudio($('#playlist li:first-child'));

//Initializer Function

function initAudio(element) {
    let song = element.attr('song');
    let title = element.text();
    let cover = element.attr('cover');
    let album = element.attr('album');

//Create Audio Object

    audio = new Audio('audio/' + song);

    if(!audio.currentTime) {
        $('#duration').html('0.00');
    }

    $('#audio-player .title').text(title);
    $('#audio-player .album').text(album);

    //Insert Cover
    $('img.cover').attr('src','img/audioplayer/covers/'+ cover);

    $('#playlist li').removeClass('active');
    element.addClass('active');
}

//Play Button

$('#play').click(function() {
    audio.play();
    $('#play').hide();
    $('#pause').show();
    $('#duration').fadeIn(400);
    showDuration();
});

//Pause button

$('#pause').click(function() {
    audio.pause();
    $('#pause').hide();
    $('#play').show();
 
});

//Stop Button 
$('#stop').click(function() {
    audio.pause();
    audio.currentTime = 0;
    $('#pause').hide();
    $('#play').show();
    $('#duration').fadeOut(400);
 
});

//Next Button 
$('#next').click(function() {
    audio.pause();
    let next = $('#playlist li.active').next();
    if(next.length == 0) {
        next = $('#playlist li:first-child');
    }
    initAudio(next);
    audio.play();
    showDuration();
});

//Previous Button 
$('#prev').click(function() {
    audio.pause();
    let prev = $('#playlist li.active').prev();
    if(prev.length == 0) {
        prev = $('#playlist li:last-child');
    }
    initAudio(prev);
    audio.play();
    showDuration();
});

//Volume Control

$('#volume').change(function() {
    audio.volume = parseFloat(this.value / 10);
});

//Time Duration 

function showDuration() {
    $(audio).bind('timeupdate',function(){
        //Get hours & Minutes
        let s = parseInt(audio.currentTime % 60);
        let m = parseInt((audio.currentTime) / 60) % 60;
        //Add 0 if less than 10
        if(s < 10) {
            s = '0' + s;
        }
        $('#duration').html(m + '.' + s);
        let value = 0;
        if (audio.currentTime > 0) {
            value = Math.floor((100 / audio.duration) * audio.currentTime);
        }
        if( audio.currentTime >= audio.duration) $('#next').trigger('click');
        $('#progress').css('width', value+'%');
    });
}

// //After song ends play next song
// $(audio).on("ended", function() {
//     audio.pause();
//     let next = $('#playlist li.active').next();
//     if (next.length == 0) {
//         next = $('#playlist li:first-child');
//     }
//     initAudio(next);
//  audio.play();
//  showDuration();
// });

//Plays a song on click
$('#playlist li').click(function(){
    audio.pause();
    initAudio($(this));
    audio.play();
    showDuration();
    $('#play').hide();
    $('#pause').show();
  });

//Allows seeking by clicking progress bar
  $("#progressbar").mouseup(function (e) {

    let leftOffset = e.pageX - $(this).offset().left;
   
    let songPercents = leftOffset / $('#progressbar').width();
   
    audio.currentTime = parseFloat(songPercents * audio.duration);
   
   });