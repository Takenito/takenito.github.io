const clickSound = new Audio('Files/SFX/click-sound.mp3'); // Create an audio element for the click sound
const copySound = new Audio('Files/SFX/copy-sound.mp3'); // Create an audio element for the copy sound
const FrameSound = new Audio('Files/SFX/frame_sound.mp3'); // Create an audio element for Toggle button
let canClick = true;


function generateLanguage() {
  const outputContainer = document.getElementById("output-container");
  outputContainer.innerHTML = "";

  const getCheckedValues = (name) =>
    Array.from(document.querySelectorAll(`input[name='${name}']:checked`)).map(checkbox => checkbox.value);

  const selectedLanguages = getCheckedValues("language");
  const selectedWords = getCheckedValues("word");

  if (selectedLanguages.length === 0 || selectedWords.length === 0) {
    outputContainer.style.display = "none"; // Hide the output container if no languages or words are selected
    return;
  }

  outputContainer.style.display = "block"; // Show the output container if languages and words are selected

const createListItem = (value, index) => {
  const listItem = document.createElement("li");
  if (index > -1) {
    if (index > 0) {
      listItem.textContent = `<li>&bull; ${value}</li>`;
    } else {
      listItem.textContent = `<p><strong>${value}</strong></p>`;
    }
  } else {
    listItem.textContent = value;
  }
  return listItem;
};

  selectedLanguages.forEach(language => {
    const languageBox = document.createElement("div");
    languageBox.classList.add("language-box");

    const languageHeading = document.createElement("h3");
    languageHeading.textContent = language;
    languageBox.appendChild(languageHeading);

    const wordList = document.createElement("ul");
    wordList.classList.add("word-list");

    selectedWords.forEach((word, index) => {
      const wordValue = word_library[language][word];
      const listItem = createListItem(wordValue, index);

      if (index === 0) {
        const ulListItem = createListItem("<ul>");
        wordList.appendChild(listItem);
        wordList.appendChild(ulListItem);
      } else {
        wordList.appendChild(listItem);
      }
    });

    const closingListItem = createListItem("</ul>");
    wordList.appendChild(closingListItem);

    const copyButton = document.createElement("button");
    copyButton.textContent = "Copy!";
    copyButton.classList.add("copy-button");
    copyButton.addEventListener("click", function () {
      const textToCopy = Array.from(wordList.querySelectorAll("li")).map(li => li.textContent).join("\n");
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          copySound.play(); // Play the copy sound effect

          copyButton.textContent = "Copied!";
          setTimeout(() => {
            copyButton.textContent = "Copy!";
            // Remove the language query after 2 seconds
            languageBox.remove();
          }, 250);
        })
        .catch(error => {
          console.error("Unable to copy text: ", error);
        });
    });

    languageBox.appendChild(wordList);
    languageBox.appendChild(copyButton);
    outputContainer.appendChild(languageBox);
  });

  clickSound.play(); // Play the click sound effect
}

document.addEventListener("DOMContentLoaded", function() {
  const generateBtn = document.getElementById("generate-btn");
  generateBtn.addEventListener("click", generateLanguage);

  const toggleIframeBtn = document.getElementById("toggle-iframe-btn");
  const cosmicIframe = document.getElementById("cosmic-iframe");

  const clickSound = new Audio('Files/SFX/click-sound.mp3');
  let canClick = true;

  toggleIframeBtn.addEventListener('click', function() {
    if (canClick) {
      cosmicIframe.style.display = cosmicIframe.style.display === 'none' ? 'block' : 'none';
      FrameSound.play();
      
      canClick = false;
      setTimeout(function() {
        canClick = true;
      }, 500); // Delay between clicks in milliseconds (adjust as needed)
    }
  });
});
