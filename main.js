let searchBtn = document.getElementById("search-btn");
let input = document.querySelector("input");
let resultContainer = document.querySelector(".result");
let sound = document.getElementById("sound");

let url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
resultContainer.innerHTML = "";

searchBtn.addEventListener("click", async function () {
  let word = input.value;
  try {
    let response = await fetch(`${url}${word}`);
    let data = await response.json();
    console.log(data, data[0].phonetics[0]?.audio);
    resultContainer.innerHTML = `
        <div class="word">
            <h3>${word}</h3>
            <button onclick="playSound()">
                <i class="fas fa-volume-up"></i>
            </button>
        </div>
        <div class="details">
            <p>${
              data[0].meanings[0]?.partOfSpeech ||
              data[0].meanings[1]?.partOfSpeech
            }</p>
            <p>${data[0].phonetic}</p>
        </div>
        <p class="word-meaning">
            ${data[0].meanings[0].definitions[0].definition}
        </p>
        <p class="word-example">
            ${
              data[0].meanings[0].definitions[0].example ||
              `${word} is an English word`
            }    
        </p>
   `;
    sound.setAttribute(
      "src",
      `${
        data[0].phonetics[0]?.audio ||
        data[0].phonetics[1]?.audio ||
        data[0].phonetics[2]?.audio ||
        data[0].phonetics[3]?.audio
      }`
    );
  } catch (error) {
    resultContainer.innerHTML = `
        <h3 class="error">Couldn't find the word <i class="far fa-grimace"></i></h3>
    `;
  }
});

function playSound() {
  sound.play();
}
