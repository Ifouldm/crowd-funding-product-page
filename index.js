const toggleButtons = document.getElementsByClassName('button toggle');

Array.prototype.forEach.call(toggleButtons, (element => {
    element.addEventListener('click', () => {
        element.classList.toggle('on');
    });
}));