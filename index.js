const music = document.querySelector("audio");
const img = document.querySelector("img");
const play = document.getElementById("Play");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

const songs = [
    { name: "one-love", title: "One Love", artist: "Subh" },
    { name: "marshmello", title: "Together", artist: "Marshmello" },
    { name: "Paint-The-Town-Red", title: "Paint The Town Red", artist: "Doja Cat" },
    { name: "rollin", title: "Rollin", artist: "Subh" }
];
let isPlaying = false;
//  for play funcation
const playMusic = () => {
    isPlaying = true;
    music.play();
    play.classList.replace("fa-play", "fa-pause")
    img.classList.add("anime")
};

//  for puase funcationlity


const pauseMusic = () => {
    isPlaying = false;
    music.pause();
    play.classList.replace("fa-pause", "fa-play")
    img.classList.remove("anime")
};

play.addEventListener('click', () => {
    // if(isPlaying){
    //     pauseMusic();
    // }else{
    //     playMusic();
    // }
    isPlaying ? pauseMusic() : playMusic();
})

// changing the music

const loadSong = (song) => {
    title.textContent = song.title;
    artist.textContent = song.artist;
    music.src = `assets/${song.name}.mp3`;
    img.src = `assets/${song.name}.jpg`;
};


let songIndex = 0;
const nextSong = () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
};
const prevSong = () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
}


music.addEventListener("timeupdate", () => {
    const currentTime = music.currentTime;
    const duration = music.duration;

    // Update progress bar
    const progressPercent = (currentTime / duration) * 100;
    progress.value = progressPercent;

    // Update current time and duration display
    const currentMinutes = Math.floor(currentTime / 60);
    const currentSeconds = Math.floor(currentTime % 60);
    const durationMinutes = Math.floor(duration / 60);
    const durationSeconds = Math.floor(duration % 60);

    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
    durationEl.textContent = `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;
});

// Seek through the song
progress.addEventListener("input", () => {
    const duration = music.duration;
    music.currentTime = (progress.value / 100) * duration;
});



next.addEventListener("click", nextSong);
prev.addEventListener("click", prevSong);

music.addEventListener("ended", nextSong);

document.addEventListener('keydown', function (event) {
    if (event.code === "ArrowLeft") {
        prevSong();
    } else if (event.code === "ArrowRight") {
        nextSong();
    } else if (event.code === "Space") {
        isPlaying ? pauseMusic() : playMusic();
    }
}) 