'use strict';

document.addEventListener("DOMContentLoaded", function () {
    const songsForm = document.querySelector("#songs");

    songsForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const songInput = this.querySelector('input[name="songEntry"]');
        generateNewText();
        generateList(songInput);
    });

    function generateNewText() {
        const newTextContainer = document.getElementById('newSongsText');
        newTextContainer.style.display = 'block';
        newTextContainer.innerHTML = "<p>New Playlist</p>";
    }

    function generateList(songInput) {
        const songList = document.querySelector('#songList');
        const songElement = document.createElement('li');
        songElement.textContent = songInput.value
        songList.appendChild(songElement);
        clearInput(songInput);
    }

    function clearInput(input) {
        input.value = '';
        return;
    }
})
