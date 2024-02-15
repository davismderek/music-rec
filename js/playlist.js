"use strict";

// ********THIS IS FOR ADDING SONGS TO PLAYLIST ON MyPLAYLISTS PAGE
document.addEventListener("DOMContentLoaded", function () {
    const titleForm = document.querySelector("#playlistTitle");
    const songsForm = document.querySelector("#songs");
    const songInput = this.querySelector('input[name="songEntry"]');
    const titleInput = this.querySelector('input[name="playlistTitleEntry"]');

    titleForm.addEventListener("submit", (event) => {
        event.preventDefault();
        generateNewText(titleInput);
    });

    songsForm.addEventListener("submit", (event) => {
        event.preventDefault();
        // generateNewText(titleInput);
        generateList(songInput);
    });

    const generateNewText = (titleInput) => {
        const newTextContainer = document.getElementById("newSongsText");
        const title = document.createElement("h3");
        newTextContainer.style.display = "block";
        title.textContent = titleInput.value;
        newTextContainer.append(title);
        clearInput(titleInput);
    };

    const generateList = (songInput) => {
        const songList = document.querySelector("#songList");
        const songElement = document.createElement("li");
        songElement.textContent = songInput.value;
        songList.appendChild(songElement);
        clearInput(songInput);
    };

    const clearInput = (input) => {
        input.value = "";
    };
});
