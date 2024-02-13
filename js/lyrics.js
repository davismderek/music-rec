document.addEventListener("DOMContentLoaded", function () {
    const lyricResults = document.querySelector("#lyricResults");
    const headingResults = document.querySelector("#headingResults");
    const lyricsForm = document.querySelector("#lyricsForm");
    const artistInput = document.querySelector('input[name="artistInput');
    const songInput = document.querySelector('input[name="songInput');
    const searchButton = document.querySelector("#searchButton");
    const downloadButton = document.getElementById("downloadButton");

    // var request = new XMLHttpRequest();

    const get = async (url) => {
        return await fetch(url, {
            method: "GET",
            headers: {
                "User-Agent": "Derek/3.0",
            },
        })
            .then((response) => response.json())
            .then((data) => data);
    };

    const getLyrics = (url) => {
        get(url).then((data) => {
            console.log({ data });
            const { lyrics } = data;
            console.log(lyrics);
            lyricResults.innerHTML = `<pre>${lyrics}</pre>`;
            downloadButton.disabled = false;
            downloadButton.addEventListener("click", () => {
                downloadLyrics(
                    lyrics,
                    `${artistInput}_${songInput}_lyrics.txt`
                );
            });
            return lyrics;
        });
    };

    const generateNewText = (e) => {
        const fetchUrl = `https://api.lyrics.ovh/v1/${artistInput.value}/${songInput.value}`;
        console.log({ fetchUrl });
        e.preventDefault();
        getLyrics(fetchUrl);
        const inputValue = songInput.value;
        headingResults.innerHTML = `<h3>${inputValue} Lyrics</h3>`;
        clearInput(songInput);
        clearInput(artistInput);
    };

    const downloadLyrics = (lyrics, filename) => {
        const blob = new Blob([lyrics], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const clearInput = (input) => {
        input.value = "";
    };

    lyricsForm.addEventListener("submit", generateNewText);
});
