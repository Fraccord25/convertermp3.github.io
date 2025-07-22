async function convert() {
  const url = document.getElementById('ytUrl').value;
  const videoId = extractVideoId(url);

  if (!videoId) {
    alert("Link YouTube tidak valid!");
    return;
  }

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '53baa61626msha531ed801d25efep1900eejsnc2887cd1be37',
      'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
    }
  };

  try {
    const res = await fetch(`https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}`, options);
    const data = await res.json();

    if (data.status === "ok") {
      document.getElementById('result').innerHTML = `
        <p><strong>${data.title}</strong></p>
        <a href="${data.link}" target="_blank">⬇️ Download MP3</a>
      `;
    } else {
      document.getElementById('result').textContent = 'Gagal mengunduh.';
    }
  } catch (err) {
    console.error(err);
    alert("Terjadi kesalahan saat menghubungi API.");
  }
}

function extractVideoId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}
