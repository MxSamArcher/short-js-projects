const textAreaEl = document.getElementById('textarea');

const totalCounterEl = document.getElementById('total-counter');
const remainingCounterEl = document.getElementById('remaining-counter');

textAreaEl.addEventListener('input', () => {
    updateCounter();
})

function updateCounter() {
    totalCounterEl.innerText = textAreaEl.value.length;
    remainingCounterEl.innerText = textAreaEl.getAttribute('maxLength') - textAreaEl.value.length;
}

updateCounter();