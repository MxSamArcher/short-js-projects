const navbarEl = document.querySelector('.navbar');

const bottomEl = document.querySelector('.bottom-container');

// I need to measure the distance scrolled minus the height of the navbar plus the distance added above the body text

const scrollActivePoint = bottomEl.offsetTop - navbarEl.offsetHeight - 50;

// const activePoint (the point where Navbar becomes active) = 

window.addEventListener('scroll', () => {
    console.log(window.scrollY);
    if (window.scrollY > scrollActivePoint) {
        navbarEl.classList.add('active');
    } else {
        navbarEl.classList.remove('active');
    }
});