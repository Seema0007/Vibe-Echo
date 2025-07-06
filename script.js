let songIndex = 0;
let isShuffle = false;
const audioElement = new Audio('songs/1.mp3');

const masterPlay = document.getElementById('masterPlay');
const myProgressBar = document.getElementById('myProgressBar');
const gif = document.getElementById('gif');
const masterSongName = document.getElementById('masterSongName');
const currentTimeElement = document.getElementById('currentTime');
const durationElement = document.getElementById('duration');
const shuffleBtn = document.getElementById('shuffle');
const volumeBtn = document.getElementById('volumeBtn');
const songItems = Array.from(document.getElementsByClassName('songItem'));

const songs = [
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

const playSong = () => {
  // reset active classes
  songItems.forEach(el => el.classList.remove('active'));
  // set new src + UI
  audioElement.src = songs[songIndex].filePath;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.replace('fa-play-circle', 'fa-pause-circle');
  gif.style.opacity = 1;
  // pulse the current cover
  songItems[songIndex].classList.add('active');
};

// next / prev logic
const playNextSong = () => {
  songIndex = isShuffle
    ? Math.floor(Math.random() * songs.length)
    : songIndex < songs.length - 1
      ? songIndex + 1
      : 0;
  playSong();
};
const playPreviousSong = () => {
  songIndex = songIndex > 0 ? songIndex - 1 : songs.length - 1;
  playSong();
};

// initialize items
songItems.forEach((element, i) => {
  element.querySelector('img').src = songs[i].coverPath;
  element.querySelector('.songName').innerText = songs[i].songName;
  element.addEventListener('click', () => {
    songIndex = i;
    playSong();
  });
});

// event listeners
masterPlay.addEventListener('click', () => {
  if (audioElement.paused) {
    playSong();
  } else {
    audioElement.pause();
    masterPlay.classList.replace('fa-pause-circle', 'fa-play-circle');
    gif.style.opacity = 0;
  }
});

audioElement.addEventListener('timeupdate', () => {
  if (!isNaN(audioElement.duration)) {
    myProgressBar.value = (audioElement.currentTime / audioElement.duration) * 100;
    currentTimeElement.innerText = formatTime(audioElement.currentTime);
    durationElement.innerText = formatTime(audioElement.duration);
  }
});

myProgressBar.addEventListener('change', () => {
  audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

audioElement.addEventListener('ended', playNextSong);

shuffleBtn.addEventListener('click', () => {
  isShuffle = !isShuffle;
  shuffleBtn.classList.toggle('active');
});

volumeBtn.addEventListener('click', () => {
  if (audioElement.volume === 0) {
    audioElement.volume = 1;
    volumeBtn.classList.replace('fa-volume-off', 'fa-volume-up');
  } else {
    audioElement.volume = 0;
    volumeBtn.classList.replace('fa-volume-up', 'fa-volume-off');
  }
});

document.getElementById('next').addEventListener('click', playNextSong);
document.getElementById('previous').addEventListener('click', playPreviousSong);

// helper
function formatTime(t) {
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}
