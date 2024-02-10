const textAreaElement = document.getElementById('textarea');

let characterCounterElement = document.getElementById('character-counter');
let charactersRemainingElement = document.getElementById('characters-remaining');

const updateCounter = () => {
    characterCounterElement.innerText = textAreaElement.value.length;
    charactersRemainingElement.innerText = textAreaElement.getAttribute('maxLength') - textAreaElement.value.length;
}

textAreaElement.addEventListener('input', () => {
    updateCounter()
})

updateCounter();