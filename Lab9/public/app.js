const form = document.getElementById("palindromeform");
const ol = document.getElementById("attempts");

form.onsubmit = function(event) {
    event.preventDefault();

    const input = document.querySelector("textarea[name=phrase]");

    let phrase = input.value;

    if (!phrase) {
        alert("Please specify a phrase.");
        return;
    }

    phrase = phrase.toLowerCase();
    if(typeof phrase!='string'){
        alert("Must provide phrase of type string")
    }
    if(!phrase.replace(/\s/g,'').length){
        alert("Pharse only contains empty strings");
        return
    }

    phrase = phrase.replace(/[^0-9a-z]/g, '');

    let reversed = '';

    for (let i = phrase.length - 1; i >= 0; i--) {
        reversed += phrase[i];
    }

    const li = document.createElement("li");

    li.textContent = phrase;

    let cls = 'not-palindrome';

    if (phrase === reversed) {
        cls = 'is-palindrome';
    }

    li.setAttribute('class', cls);

    ol.appendChild(li);
}