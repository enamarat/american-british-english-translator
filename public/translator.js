import { americanOnly } from './american-only.js';
import { britishOnly } from './british-only.js';
import { americanToBritishSpelling } from './american-to-british-spelling.js';
import { americanToBritishTitles } from './american-to-british-titles.js';

const textArea = document.getElementById('text-input');
const errorDiv = document.getElementById('error-msg');
const translatedDiv = document.getElementById('translated-sentence');
const selectedOption = document.getElementById('locale-select');

/*** functions ***/
///////////////////
const translateText = (input) => {
  /**asses input's length**/
  errorDiv.textContent = "";
  if (input.length === 0) {
    const message = "Error: No text to translate.";
    errorDiv.textContent = message;
    return message;
  }
  
  let output = "";
  let inputToModify = input;
  let wordToSubstituteDetected = false;

   ////////////////////////////////////////////////////
   //translate from American to British
  if (selectedOption.value === "american-to-british") {
    // words
    for (let property in americanToBritishSpelling) {
      let americanWord = property;
      let regex = new RegExp("\\b" + americanWord + "\\b","gi");
      if (regex.test(inputToModify) === true) {
        wordToSubstituteDetected = true;
        output = inputToModify.replace(regex, `<span class='highlight'>${americanToBritishSpelling[property]}</span>`);
        inputToModify = output;
      }
    }
    
     for (let property in americanOnly) {
      let americanWord = property;
      let regex = new RegExp("\\b" + americanWord + "\\b","gi");
      if (regex.test(inputToModify) === true) {
        wordToSubstituteDetected = true;
        output = inputToModify.replace(regex, `<span class='highlight'>${americanOnly[property]}</span>`);
        inputToModify = output;
      }
    }
    
    // titles
    for (let property in americanToBritishTitles) {
      let americanWord = property;
      let regex = new RegExp("\\b" + americanWord + "." + "\\b","gi");
        //let regex = new RegExp(americanWord,"gi");
      if (regex.test(inputToModify) === true) {
        wordToSubstituteDetected = true;
        output = inputToModify.replace(regex, `<span class='highlight'>${americanToBritishTitles[property][0].toUpperCase() + americanToBritishTitles[property].substring(1)} </span>`);
        inputToModify = output;
      }
    }
    
    // time
    const regexAmericanTime = /\d{2}:\d{2}/g;
    if (regexAmericanTime.test(inputToModify) === true) {
      const americanTimeStamps = inputToModify.match(regexAmericanTime);
      const britishTimeStamps = [];
      
      americanTimeStamps.forEach((stamp) => {
        britishTimeStamps.push(stamp.split(":").join("."));
      });
      
      for (let i = 0; i < americanTimeStamps.length; i++) {
        let regex = new RegExp(americanTimeStamps[i],"i");
        output = inputToModify.replace(regex, `<span class='highlight'>${britishTimeStamps[i]}</span>`);
        inputToModify = output;
      }
      wordToSubstituteDetected = true;
    }
  }
  
  ////////////////////////////////////////////////////
  //translate from British to American
  if (selectedOption.value === "british-to-american") {
    // words
    for (let property in americanToBritishSpelling) {
      let britishWord = americanToBritishSpelling[property];
      let regex = new RegExp("\\b" + britishWord + "\\b","gi");
      if (regex.test(inputToModify) === true) {
        wordToSubstituteDetected = true;
        output = inputToModify.replace(regex, `<span class='highlight'>${property}</span>`);
        inputToModify = output;
      }
    }
    
     for (let property in britishOnly) {
      let britishWord = property;
      let regex = new RegExp("\\b" + britishWord + "\\b","gi");
      if (regex.test(inputToModify) === true) {
        wordToSubstituteDetected = true;
        output = inputToModify.replace(regex, `<span class='highlight'>${britishOnly[property]}</span>`);
        inputToModify = output;
      }
    }
    
    // titles
    for (let property in americanToBritishTitles) {
      let britishWord = americanToBritishTitles[property];
      let regex = new RegExp("\\b" + britishWord + "\\b","gi");
      if (regex.test(inputToModify) === true) {
        wordToSubstituteDetected = true;
        output = inputToModify.replace(regex, `<span class='highlight'>${property}</span>`);
        inputToModify = output;
      }
    }
    
    // time
    const regexAmericanTime = /\d{2}.\d{2}/g;
    if (regexAmericanTime.test(inputToModify) === true) {
      const americanTimeStamps = inputToModify.match(regexAmericanTime);
      const britishTimeStamps = [];
      
      americanTimeStamps.forEach((stamp) => {
        britishTimeStamps.push(stamp.split(".").join(":"));
      });
      
      for (let i = 0; i < americanTimeStamps.length; i++) {
        let regex = new RegExp(americanTimeStamps[i],"i");
        output = inputToModify.replace(regex, `<span class='highlight'>${britishTimeStamps[i]}</span>`);
        inputToModify = output;
      }
      wordToSubstituteDetected = true;
    }
  }
  
  ////////////////////////////////////////////////////
   if (wordToSubstituteDetected === true) {
      translatedDiv.innerHTML = output;
    } else {
      translatedDiv.textContent = "Everything looks good to me!";
    }
    return translatedDiv.textContent;
}

///////////////////
const clearTextArea = () => {
  textArea.value = "";
  errorDiv.textContent = "";
  translatedDiv.textContent = "";
}

document.getElementById('translate-btn').addEventListener('click', () => {
  translateText(textArea.value);
});

document.getElementById('clear-btn').addEventListener('click', () => {
  clearTextArea();
});

/* 
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/
try {
  module.exports = {
    translateText
  }
} catch (e) {}
