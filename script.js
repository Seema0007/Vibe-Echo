let songIndex = 0;
let isShuffle = false;
const audioElement = new Audio('songs/1.mp3');

const masterPlay    = document.getElementById('masterPlay');
const myProgressBar = document.getElementById('myProgressBar');
const gif           = document.getElementById('gif');
const masterSongName= document.getElementById('masterSongName');
const currentTimeEl = document.getElementById('currentTime');
const durationEl    = document.getElementById('duration');
const shuffleBtn    = document.getElementById('shuffle');
const volumeBtn     = document.getElementById('volumeBtn');
const songItems     = Array.from(document.getElementsByClassName('songItem'));

const songs = [
  { songName: 'On & On',      filePath: 'songs/1.mp3', coverPath: 'covers/1.jpg' },
  { songName: 'Invincible',    filePath: 'songs/2.mp3', coverPath: 'covers/2.jpg' },
  { songName: 'Mortals',       filePath: 'songs/3.mp3', coverPath: 'covers/3.jpg' },
  { songName: 'Shine',         filePath: 'songs/4.mp3', coverPath: 'covers/4.jpg' },
  { songName: 'Why We Lose',   filePath: 'songs/5.mp3', coverPath: 'covers/5.jpg' },
  { songName: 'Sky High',      filePath: 'songs/6.mp3', coverPath: 'covers/6.jpg' },
  { songName: 'Symbolism',     filePath: 'songs/7.mp3', coverPath: 'covers/7.jpg' },
  { songName: 'Heroes Tonight',filePath: 'songs/8.mp3', coverPath: 'covers/8.jpg' },
  { songName: 'Feel Good',     filePath: 'songs/9.mp3', coverPath: 'covers/9.jpg' },
  { songName: 'My Heart',      filePath: 'songs/10.mp3',coverPath: 'covers/10.jpg'}
];

// reset all play icons
const makeAllPlays = () => {
  document.querySelectorAll('.songItemPlay').forEach(icon => {
    icon.classList.replace('fa-pause-circle','fa-play-circle');
  });
};

// play selected song
const playSong = () => {
  makeAllPlays();
  songItems.forEach(el => el.classList.remove('active'));
  audioElement.src = songs[songIndex].filePath;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.replace('fa-play-circle','fa-pause-circle');
  gif.style.opacity = 1;
  songItems[songIndex].classList.add('active');
  songItems[songIndex].querySelector('.songItemPlay')
    .classList.replace('fa-play-circle','fa-pause-circle');
};

// next / prev logic
const playNextSong = () => {
  songIndex = isShuffle
    ? Math.floor(Math.random()*songs.length)
    : (songIndex < songs.length-1 ? songIndex+1 : 0);
  playSong();
};
const playPreviousSong = () => {
  songIndex = songIndex>0 ? songIndex-1 : songs.length-1;
  playSong();
};

// initialize song cards
songItems.forEach((el,i) => {
  el.querySelector('img').src = songs[i].coverPath;
  el.querySelector('.songName').innerText = songs[i].songName;
  el.querySelector('.songItemPlay').addEventListener('click', e => {
    e.stopPropagation();
    songIndex = i;
    playSong();
  });
});

// master play/pause
masterPlay.addEventListener('click', () => {
  if(audioElement.paused){
    playSong();
  } else {
    audioElement.pause();
    masterPlay.classList.replace('fa-pause-circle','fa-play-circle');
    gif.style.opacity = 0;
    songItems[songIndex].classList.remove('active');
  }
});

// time update & progress
audioElement.addEventListener('timeupdate', () => {
  if(!isNaN(audioElement.duration)){  
    myProgressBar.value = (audioElement.currentTime/audioElement.duration)*100;
    currentTimeEl.innerText = formatTime(audioElement.currentTime);
    durationEl.innerText    = formatTime(audioElement.duration);
  }
});
myProgressBar.addEventListener('change', () => {
  audioElement.currentTime = (myProgressBar.value*audioElement.duration)/100;
});

audioElement.addEventListener('ended', playNextSong);

// shuffle toggle
shuffleBtn.addEventListener('click', () => {
  isShuffle = !isShuffle;
  shuffleBtn.classList.toggle('active');
});

// volume mute/unmute
volumeBtn.addEventListener('click', () => {
  if(audioElement.volume===0){
    audioElement.volume=1;
    volumeBtn.classList.replace('fa-volume-off','fa-volume-up');
  } else {
    audioElement.volume=0;
    volumeBtn.classList.replace('fa-volume-up','fa-volume-off');
  }
});

// prev/next controls
document.getElementById('next').addEventListener('click', playNextSong);
document.getElementById('previous').addEventListener('click', playPreviousSong);

// helper to format time
function formatTime(t){
  const m = Math.floor(t/60);
  const s = String(Math.floor(t%60)).padStart(2,'0');
  return `${m}:${s}`;
}
