const toggleButtons = document.getElementsByClassName('button toggle');
const backProjectButton = document.getElementById('backProject');
const successModal = document.getElementById('successModal');
const selectionModal = document.getElementById('selectionModal');
const closeButtons = document.getElementsByClassName('close');
const continueButtons = document.getElementsByClassName('continue');
const modals = document.getElementsByClassName('modal');
const selectionRadios = document.getElementsByClassName('radio');
const innerBlocks = document.getElementsByClassName('inner-block');

// radio buttons
Array.prototype.forEach.call(selectionRadios, (radioButton => {
    radioButton.addEventListener('click', (event) => {
        selectNone();
        event.path[2].classList.add('selected');
        radioButton.classList.add('selected');
    });
}));

// onClick for toggle buttons
Array.prototype.forEach.call(toggleButtons, (element => {
    element.addEventListener('click', () => {
        element.classList.toggle('on');
    });
}));

// onClick for close modal buttons
Array.prototype.forEach.call(closeButtons, (element => {
    element.addEventListener('click', closeAllModals);
}));

// onClick for continue buttons
Array.prototype.forEach.call(continueButtons, (element => {
    element.addEventListener('click', () => {
        closeAllModals();
        successModal.style.display = 'flex';
    });
}));

// onClick for "back project" button
backProjectButton.addEventListener('click', () => selectionModal.style.display = 'flex');

// function to close all modals
function closeAllModals() {
    Array.prototype.forEach.call(modals, (modal => modal.style.display = 'none'));
}

// function to deselect all innerBlocks
function selectNone() {
    Array.prototype.forEach.call(innerBlocks, (modal => modal.classList.remove('selected')));
    Array.prototype.forEach.call(selectionRadios, (radioButton => radioButton.classList.remove('selected')));
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target === successModal || event.target === selectionModal) {
    closeAllModals();
  }
}