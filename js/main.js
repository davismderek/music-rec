"use strict";

// ********THIS IS FOR ADDING SONGS TO PLAYLIST ON MyPLAYLISTS PAGE
document.addEventListener("DOMContentLoaded", function () {
    const songsForm = document.querySelector("#songs");

    songsForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const songInput = this.querySelector('input[name="songEntry"]');
        generateNewText();
        generateList(songInput);
    });

    const generateNewText = () => {
        const newTextContainer = document.getElementById("newSongsText");
        newTextContainer.style.display = "block";
        newTextContainer.innerHTML = "<p>New Playlist</p>";
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
