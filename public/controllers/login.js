const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const registerLinkveter = document.querySelector('.register-linkveter');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');
const veterLink = document.querySelector('.login-veter'); 

registerLink.addEventListener('click', ()=> {
    wrapper.classList.add('active');
})

registerLinkveter.addEventListener('click', ()=> {
    wrapper.classList.add('active-veter');
})


loginLink.addEventListener('click', ()=> {
    wrapper.classList.remove('active');
})

btnPopup.addEventListener('click', ()=> {
    wrapper.classList.add('active-popup');
})

iconClose.addEventListener('click', ()=> {
    wrapper.classList.remove('active-popup');
})

veterLink.addEventListener('click', () => {
    wrapper.classList.remove('active-veter');
});