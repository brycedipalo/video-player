const player = document.querySelector('.player');
const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('playbtn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const fullscreenBtn = document.querySelector('.fullscreen');
const speed = document.querySelector('.player-speed');

// Play & Pause ----------------------------------- //

function showPlayIcon() {
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','Play');
}

function togglePlay() {
    if (video.paused){
        video.play();
        playBtn.classList.replace('fa-play','fa-pause');
        playBtn.setAttribute('title','Pause');
    }else {
        video.pause();
        showPlayIcon();
    }
}

// Progress Bar ---------------------------------- //

function displayTime(time){
    const minutes = Math.floor(time /60 );
    let seconds = Math.floor(time%  60);
    seconds < 10 ? seconds =`0${seconds}`:false; 
    return `${minutes}:${seconds}`;
}

function updateProgress() {
    progressBar.style.width = `${(video.currentTime / video.duration*100)}%`;
    currentTime.textContent = `${displayTime(video.currentTime)} /`;
    duration.textContent = `${displayTime(video.duration)}`;
}


function setProgress(event){
    const newTime = event.offsetX / progressRange.offsetWidth;
    progressBar.style.width = `${newTime * 100}%`;
    video.currentTime =  newTime*video.duration;
}
// Volume Controls --------------------------- //
let lastVolume = 1;

function changeVolIcon(volume) {
    if (volume > 0.7) {
        volumeIcon.classList.add('fa-solid', 'fa-volume-up');
        volumeIcon.setAttribute('title','Mute');
    }else if ( volume < 0.7 && volume > 0){
        volumeIcon.classList.add ('fa-solid', 'fa-volume-down');
        volumeIcon.setAttribute('title','Mute');
    }else if (volume === 0){
        volumeIcon.classList.add('fa-solid','fa-volume-xmark');
        volumeIcon.setAttribute('title','Unmute');
    }
}

function changeVolume(event){
    let volume = event.offsetX / volumeRange.offsetWidth;
    if (volume < 0.1 ){
        volume= 0;
    }
    if (volume > 0.9) {
        volume = 1;
    }
    volumeBar.style.width = `${volume * 100 }%`;
    video.volume = volume;
    volumeIcon.className = '';
    changeVolIcon(volume);
    lastVolume = volume;
}

function toggleMute(){
    volumeIcon.className = '';
    if (video.volume) {
        lastVolume = video.volume;
        video.volume = 0;
        volumeBar.style.width = 0;
        changeVolIcon(video.volume);
        
    }else if(video.volume ===0 && lastVolume === 0 ){
        lastVolume = 0.1;
        video.volume = lastVolume;
        volumeBar.style.width = `${lastVolume * 100 }%`;
        changeVolIcon(video.volume);
    }else {
        video.volume = lastVolume;
        volumeBar.style.width = `${lastVolume * 100 }%`;
        changeVolIcon(video.volume);
    }
}
function changeSpeed() {
    video.playbackRate = speed.value ;
}

/* View in fullscreen */
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
         elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
    video.classList.add('video-fullscreen');
}

/* Close fullscreen */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
         document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
    video.classList.remove('video-fullscreen');
}

let fullscreen = false;

function toggleFullscreen() {
    if (!fullscreen) {
        openFullscreen(player);
    }else{
        closeFullscreen();
    }
    fullscreen = !fullscreen;
}


video.addEventListener('ended', showPlayIcon);
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate',updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);
speed.addEventListener('change',changeSpeed);
fullscreenBtn.addEventListener('click', toggleFullscreen);