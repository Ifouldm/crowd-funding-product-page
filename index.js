const iconButtons = document.getElementsByClassName('button icon');
const backProjectButton = document.getElementById('backProject');
const rewardButtons = document.getElementsByClassName('button reward');
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

function formatNum(val) {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatCurr(val) {
    return '$'+formatNum(val);
}

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

// Reward select buttons
Array.prototype.forEach.call(rewardButtons, (button, index) => {
    if (!button.classList.contains('disabled')){
        button.addEventListener('click', () => openSelectionModal(index + 1));
    }
});


// radio buttons
Array.prototype.forEach.call(selectionRadios, (radioButton => {
    const block = radioButton.parentElement;
    if (!block.classList.contains('disabled')){
        radioButton.addEventListener('click', () => {
            selectRewardInModal(block);
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
Array.prototype.forEach.call(continueButtons, ((element, index) => {
    element.addEventListener('click', () => {
        closeAllModals();
        const amount = element.parentElement.getElementsByClassName('value')[1];
        recordPledge(index - 1, amount.value);
        openSuccessModal();
    });
}));

// onClick for "back project" button
backProjectButton.addEventListener('click', openSelectionModal);

function openSelectionModal(selection) {
    selectionModal.style.display = 'flex';
    if (selection && selectionRadios[selection]) {
        selectRewardInModal(selectionModal.getElementsByClassName('inner-block')[selection]);
    }
}

function recordPledge(index, amount) {
    const totalAmount = document.getElementById('totalAmount');
    const totalBackers = document.getElementById('totalBackers');
    const progBar = document.getElementById('bar');
    const inventory = document.getElementsByClassName('qty')[index];
    const modalInventory = selectionModal.getElementsByClassName('qty')[index];
    const currentAmount = Number(totalAmount.textContent.replace(/[^\d]/g, ''));
    const newAmount = formatCurr(currentAmount + +amount);
    totalAmount.textContent = newAmount;
    const currentBackers = Number(totalBackers.textContent.replace(/[^\d]/g, ''));
    const newBackers = formatNum(currentBackers + 1);
    totalBackers.textContent = newBackers
    inventory.textContent = Number.parseInt(inventory.textContent) - 1;
    modalInventory.textContent = Number.parseInt(modalInventory.textContent) - 1;
    const perc = (currentAmount + +amount) / 1000;
    progBar.style.width = perc+'%';
}

function selectRewardInModal(block) {
    selectNone();
    block.classList.add('selected');
    const radio = block.getElementsByClassName('radio')[0];
    radio.classList.add('selected');
    const pledge = block.getElementsByClassName('pledge')[0];
    if (pledge) {
        pledge.classList.add('selected');
    }
}

function openSuccessModal() {
    successModal.style.display = 'flex';
}

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