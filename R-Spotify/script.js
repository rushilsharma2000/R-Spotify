console.log("Welcome to Spotify");

// Initializing the variables

let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let progressBar = document.getElementById("progressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let songs = [
  {
    songName: "Abhi Mujh Mein Kahin- AGNEEPATH",
    filePath: "songs/1.mp3",
    coverPath: "agneepath.jpg",
  },
  {
    songName: "Bhagwaan Hai kha Re Tu- PK",
    filePath: "songs/2.mp3",
    coverPath:
      "https://pagalsong.in/uploads//thumbnails/300x300/id3Picture_1713936462.jpg",
  },
  {
    songName: "Do Pal-VEER ZARA",
    filePath: "songs/3.mp3",
    coverPath:
      "https://pagalsong.in/uploads//thumbnails/300x300/id3Picture_1894597994.jpg",
  },
  {
    songName: "Main Agar Kahoon- OM SHAANTI OM",
    filePath: "songs/4.mp3",
    coverPath:
      "https://pagalsong.in/uploads//thumbnails/300x300/id3Picture_697711447.jpg",
  },
  {
    songName: "Mere Haath Mein- FANAA",
    filePath: "songs/5.mp3",
    coverPath:
      "https://pagalsong.in/uploads//thumbnails/300x300/id3Picture_1392423450.jpg",
  },
  {
    songName: "Sau Dard- JAAN-E-MANN",
    filePath: "songs/6.mp3",
    coverPath:
      "https://pagalsong.in/uploads//thumbnails/300x300/id3Picture_1600788727.jpg",
  },
  {
    songName: "Deewana Tera",
    filePath: "songs/7.mp3",
    coverPath:
      "https://pagalfree.com/images/128Deewana%20Tera%20-%20Deewana%20128%20Kbps.jpg",
  },
];

songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

//Handle Play, Pause ,Click
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterSongName.innerText = songs[songIndex].songName;
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
    gif.style.opacity = 0;
  }
});

//Listen To Events

audioElement.addEventListener("timeupdate", () => {
  //Updating Seekbar
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  progressBar.value = progress;
});

progressBar.addEventListener("input", () => {
  audioElement.currentTime = (progressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-circle-pause");
      element.classList.add("fa-circle-play");
    }
  );
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      makeAllPlays();
      songIndex = parseInt(e.target.id);
      e.target.classList.remove("fa-circle-play");
      e.target.classList.add("fa-circle-pause");
      audioElement.src = `songs/${songIndex + 1}.mp3`;
      masterSongName.innerText = songs[songIndex].songName;
      audioElement.currentTime = 0;
      gif.style.opacity = 1;

      audioElement.play();
      masterPlay.classList.remove("fa-circle-play");
      masterPlay.classList.add("fa-circle-pause");
    });
  }
);

document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= 6) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  gif.style.opacity = 1;

  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
});

document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  gif.style.opacity = 1;

  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
});
