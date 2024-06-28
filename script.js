let songIndex = 0;
let isShuffle = false;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let currentTimeElement = document.getElementById('currentTime');
let durationElement = document.getElementById('duration');
let shuffleBtn = document.getElementById('shuffle');
let volumeBtn = document.getElementById('volume');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: 'On & On', filePath: 'songs/1.mp3', coverPath: 'covers/1.jpg' },
    { songName: 'Invincible', filePath: 'songs/2.mp3', coverPath: 'covers/2.jpg' },
    { songName: 'Mortals', filePath: 'songs/3.mp3', coverPath: 'covers/3.jpg' },
    { songName: 'Shine', filePath: 'songs/4.mp3', coverPath: 'covers/4.jpg' },
    { songName: 'Why We Lose', filePath: 'songs/5.mp3', coverPath: 'covers/5.jpg' },
    { songName: 'Sky High', filePath: 'songs/6.mp3', coverPath: 'covers/6.jpg' },
    { songName: 'Symbolism', filePath: 'songs/7.mp3', coverPath: 'covers/7.jpg' },
    { songName: 'Heroes Tonight', filePath: 'songs/8.mp3', coverPath: 'covers/8.jpg' },
    { songName: 'Feel Good', filePath: 'songs/9.mp3', coverPath: 'covers/9.jpg' },
    { songName: 'My Heart', filePath: 'songs/10.mp3', coverPath: 'covers/10.jpg' }
];

// Function to play the next song
const playNextSong = () => {
    if (isShuffle) {
        songIndex = Math.floor(Math.random() * songs.length);
    } else {
        if (songIndex < songs.length - 1) {
            songIndex++;
        } else {
            songIndex = 0;
        }
    }
    playSong();
};

// Function to play the previous song
const playPreviousSong = () => {
    if (songIndex > 0) {
        songIndex--;
    } else {
        songIndex = songs.length - 1;
    }
    playSong();
};

// Function to play a specific song
const playSong = () => {
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
};

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        playSong();
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Listen to the 'ended' event for playing the next song
audioElement.addEventListener('ended', playNextSong);

// Function to initialize song items
const initializeSongItems = () => {
    songItems.forEach((element, i) => {
        element.getElementsByTagName("img")[0].src = songs[i].coverPath;
        element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
        element.getElementsByClassName("songItemPlay")[0].addEventListener('click', (e) => {
            makeAllPlays();
            songIndex = i;
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            playSong();
        });
    });
};

// Function to make all plays inactive
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

// Initialize song items
initializeSongItems();

// Shuffle button click listener
shuffleBtn.addEventListener('click', () => {
    isShuffle = !isShuffle;
    if (isShuffle) {
        shuffleBtn.classList.add('active');
    } else {
        shuffleBtn.classList.remove('active');
    }
});

// Volume button click listener (toggle mute/unmute)
volumeBtn.addEventListener('click', () => {
    if (audioElement.volume === 0) {
        audioElement.volume = 1.0; // Set full volume
        volumeBtn.classList.remove('fa-volume-off');
        volumeBtn.classList.add('fa-volume-up');
    } else {
        audioElement.volume = 0; // Mute volume
        volumeBtn.classList.remove('fa-volume-up');
        volumeBtn.classList.add('fa-volume-off');
    }
});

// Update progress bar as song plays
audioElement.addEventListener('timeupdate', () => {
    const { currentTime, duration } = audioElement;
    const progressPercent = (currentTime / duration) * 100;
    myProgressBar.value = progressPercent;

    // Update current time and duration display
    currentTimeElement.textContent = formatTime(currentTime);
    durationElement.textContent = formatTime(duration);
});

// Format time in MM:SS format
const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${seconds}`;
};

// Handle seek bar change
myProgressBar.addEventListener('change', () => {
    const seekTime = (myProgressBar.value * audioElement.duration) / 100;
    audioElement.currentTime = seekTime;
});

// Previous button click listener
document.getElementById('previous').addEventListener('click', playPreviousSong);

// Next button click listener
document.getElementById('next').addEventListener('click', playNextSong);
