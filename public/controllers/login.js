const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const registerLinkveter = document.querySelector('.register-linkveter');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconCloseLogin = wrapper.querySelector('.icon-close');
const veterLink = document.querySelector('.login-veter');

const wrapperQSomos = document.querySelector('.wrapper-qsomos');
const wrapperServis = document.querySelector('.wrapper-servis');
const btnQSomos = document.querySelector('.btnqsomos');
const btnServis = document.querySelector('.btnservis');
const iconCloseQS = wrapperQSomos.querySelector('.icon-close');
const iconCloseServis = wrapperServis.querySelector('.icon-close');

const closeAllPopups = () => {
    wrapper.classList.remove('active-popup');
    wrapperQSomos.classList.remove('active-popup');
    wrapperServis.classList.remove('active-popup');
};

btnQSomos.addEventListener('click', () => {
    closeAllPopups(); 
    wrapperQSomos.classList.add('active-popup');
});

iconCloseQS.addEventListener('click', () => {
    wrapperQSomos.classList.remove('active-popup');
    wrapper.classList.remove('active');
    wrapper.classList.remove('active-veter');
});

btnServis.addEventListener('click', () => {
    closeAllPopups(); 
    wrapperServis.classList.add('active-popup');
});

iconCloseServis.addEventListener('click', () => {
    wrapperServis.classList.remove('active-popup');
    wrapper.classList.remove('active');
    wrapper.classList.remove('active-veter');
});

btnPopup.addEventListener('click', () => {
    closeAllPopups(); 
    wrapper.classList.add('active-popup');
});

iconCloseLogin.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
    wrapper.classList.remove('active');
    wrapper.classList.remove('active-veter');
});

registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
});

registerLinkveter.addEventListener('click', () => {
    wrapper.classList.add('active-veter');
});

loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

veterLink.addEventListener('click', () => {
    wrapper.classList.remove('active-veter');
});
