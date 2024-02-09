document.addEventListener("DOMContentLoaded", function () {
    const bandAPIForm = document.querySelector("#bandAPI");
    const responseContainer = document.querySelector('#responseContainer');
    const bandInfoResults = document.querySelector('#bandInfoResults')


    const generateNewText = (e) => {
        e.preventDefault();
        const inputValue = e.target[0].value
        responseContainer.style.display = 'block';
        responseContainer.innerHTML = `<p>${inputValue} Results</p>`;
    }

    const get = async (url) => {
        return await fetch(url, {
            method: 'GET',
            headers: {
                'User-Agent': 'Derek/3.0',
            }
        })
        .then((response) => response.json())
        .then((data) => data);
    }
 
    const showArtist = (artistName) => {
        const paragraph = document.createElement('p');
        paragraph.textContent = artistName;
        bandInfoResults.appendChild(paragraph);
    }


    const albumButton = document.querySelector('#artistReleases')

    const getReleases = (url) => {
        get(url).then((data) => {
            const { releases } = data;
            console.log(releases);
            releases.map((release) => {
                const { title } = release;
                const paragraph = document.createElement('p');
                albumButton.addEventListener('click', (() => {
                    paragraph.textContent = title;
                    bandInfoResults.appendChild(paragraph);
                }))
            })
        })
    }

    (function () {
        console.log("IIFE");
        get('https://api.discogs.com/artists/934830?token=oGvvoBpcYVfzcTUSrzDcubjqvYRtOaTfnQWVaTUO').then(function (data) {
            const { name, releases_url } = data;
            showArtist(name);
            getReleases(releases_url);
        });
    })();
   
    bandAPIForm.addEventListener("submit", generateNewText);

})   
// const token = "oGvvoBpcYVfzcTUSrzDcubjqvYRtOaTfnQWVaTUO"
//     const url =`https://api.discogs.com/database/search?token=${token}&artist=${artist}`

   

    // function generateList(userInput) {
    //     const ulList = document.querySelector('#ulList');
    //     const liElement = document.createElement('li');
    //     liElement.textContent = userInput.value
    //     ulList.appendChild(liElement);
    //     clearInput(userInput);
    // }

    // function clearInput(input) {
    //     input.value = '';
    //     return;
    // }

