// step 10 function mencari musik
async function searchMusic() {
  // step 11
  const query = document.getElementById("searchInput").value;
  const resultsDiv = document.getElementById("results");

  if (!query) {
    alert("Silakan masukkan judul lagu.");
    return;
  }

  // step 12 memanggil API music menggunakan javascript
  resultsDiv.innerHTML =
    "<p class='text-center'><i class='bi bi-hourglass-split me-2'></i>Sedang mencari...</p>";

  const apiUrl = `https://api.deezer.com/search?q=${encodeURIComponent(
    query
  )}&output=jsonp`;
  const script = document.createElement("script");
  const callbackName = "jsonp_callback_" + Math.round(100000 * Math.random());
  // step 13
  window[callbackName] = function (data) {
    // step 14 menampilkan daftar lagu
    document.body.removeChild(script);
    delete window[callbackName];

    resultsDiv.innerHTML = "";
    if (data.data.length === 0) {
      resultsDiv.innerHTML =
        "<p class='text-center'>Tidak ada lagu yang ditemukan.</p>";
      return;
    }

    data.data.forEach((song) => {
      const songDiv = document.createElement("div");
      songDiv.className = "song";

      songDiv.innerHTML = `
  <div class="d-flex align-items-center">
    <img src="${song.album.cover_medium}" alt="Cover" class="rounded me-3" style="width:70px;height:70px;object-fit:cover;">
      <div class="flex-grow-1">
        <p class="song-title mb-1">${song.title}</p>
        <p class="text-muted mb-2">${song.artist.name} - ${song.album.title}</p>
        <button class="btn btn-sm btn-danger" onclick="playPreview('${song.preview}', '${song.title}', '${song.artist.name}', '${song.album.cover_medium}')">
          <i class="bi bi-play-fill me-1"></i>Putar
        </button>
      </div>
  </div>
  `;
      resultsDiv.appendChild(songDiv);
    });
  };

  // step 15
  script.src = `${apiUrl}&callback=${callbackName}`;
  document.body.appendChild(script);
}

// step 16 memutar lagu
function playPreview(previewUrl, title, artist, coverUrl) {
  // step 17
  const audioPlayer = document.getElementById("audioPlayer");
  const nowPlaying = document.getElementById("nowPlaying");
  const artistName = document.getElementById("artistName");

  nowPlaying.textContent = title;
  artistName.textContent = artist;

  audioPlayer.src = previewUrl;
  audioPlayer.play();
}
