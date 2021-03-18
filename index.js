const iconButtons = document.getElementsByClassName('button icon');
const backProjectButton = document.getElementById('backProject');
const successModal = document.getElementById('successModal');
const selectionModal = document.getElementById('selectionModal');
const closeButtons = document.getElementsByClassName('close');
const continueButtons = document.getElementsByClassName('continue');
const modals = document.getElementsByClassName('modal');
const selectionRadios = document.getElementsByClassName('radio');
const innerBlocks = document.getElementsByClassName('inner-block');
const pledges = document.getElementsByClassName('pledge');
const hamburger = document.getElementById('menuIcon');
const navbarlinks = document.getElementsByClassName('navbarlinks')[0];

// Hamburger Menu
hamburger.addEventListener('click', () => {
    // Menu is open
    if (hamburger.getAttribute('src') === './images/icon-close-menu.svg') {
        hamburger.setAttribute('src', './images/icon-hamburger.svg');
        navbarlinks.style.display = 'none';
    } else {
        hamburger.setAttribute('src', './images/icon-close-menu.svg');
        navbarlinks.style.display = 'block';
    }
});

// radio buttons
Array.prototype.forEach.call(selectionRadios, (radioButton => {
    const block = radioButton.parentElement.parentElement;
    if (!block.classList.contains('disabled')){
        radioButton.addEventListener('click', () => {
            selectNone();
            block.classList.add('selected');
            radioButton.classList.add('selected');
            const pledge = block.getElementsByClassName('pledge')[0];
            if (pledge) {
                pledge.classList.add('selected');
            }
        });
    }
}));

// onClick for icon buttons
Array.prototype.forEach.call(iconButtons, (element => {
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
    Array.prototype.forEach.call(pledges, (pledgeDiv => pledgeDiv.classList.remove('selected')));
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target === successModal || event.target === selectionModal) {
    closeAllModals();
  }
}