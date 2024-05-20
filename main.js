const firebaseConfig = {
    apiKey: "AIzaSyCcm6_HYfGtwGW_aMfd3uruSWmstQj29Tc",
    authDomain: "enclosure-63e1c.firebaseapp.com",
    databaseURL: "https://enclosure-63e1c-default-rtdb.firebaseio.com",
    projectId: "enclosure-63e1c",
    storageBucket: "enclosure-63e1c.appspot.com",
    messagingSenderId: "472001080528",
    appId: "1:472001080528:web:541397449ea49a2d3402d5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Function to fetch temperature from Firebase
function fetchTemperature() {
    const temperatureRef = database.ref('temperature');
    temperatureRef.on('value', (snapshot) => {
        const data = snapshot.val();
        document.querySelector('#currentTemperature').innerText = `Current temperature: ${data} °C`;
    });
}

document.addEventListener('DOMContentLoaded', (event) => {
    fetchTemperature();
});

// Rest of the JavaScript remains unchanged

const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const themeToggler = document.querySelector(".theme-toggler");

// Constants for multipage option
const home = document.querySelector(".home");
const manual = document.querySelector(".manual");
const automatic = document.querySelector(".automatic");
const test = document.querySelector(".test");
const joysticks = document.querySelector(".joysticks");

menuBtn.addEventListener('click', () => {
    sideMenu.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    sideMenu.style.display = 'none';
});

// Toggle theme
themeToggler.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme-variables');
    themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
    themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');
});

function updateSliderPWMmanual(element) {
    var sliderNumber = element.id.charAt(element.id.length-1);
    var sliderValue = document.getElementById(element.id).value;
    document.getElementById("sliderValue"+sliderNumber).innerHTML = sliderValue;
    websocket.send(sliderNumber+"manual"+sliderValue.toString());
}

function updateSliderPWMtest(element) {
    var sliderNumber = element.id.charAt(element.id.length-1);
    var sliderValue = document.getElementById(element.id).value;
    document.getElementById("testValue"+sliderNumber).innerHTML = sliderValue;
    websocket.send(sliderNumber+"test"+sliderValue.toString());
}

function updateSliderPWMautomatic(element) {
    var sliderNumber = element.id.charAt(element.id.length-1);
    var sliderValue = document.getElementById(element.id).value;
    document.getElementById("automaticValue"+sliderNumber).innerHTML = sliderValue;
}

function show(param_div_class) {
    if(param_div_class === "home"){
        home.style.display = 'block';
        manual.style.display = 'none';
        automatic.style.display = 'none';
        test.style.display = 'none';
        joysticks.style.display = 'none';
    } else if (param_div_class === "manual"){
        home.style.display = 'none';
        manual.style.display = 'block';
        automatic.style.display = 'none';
        test.style.display = 'none';
        joysticks.style.display = 'none';
    }
    else if (param_div_class === "automatic"){
        home.style.display = 'none';
        manual.style.display = 'none';
        automatic.style.display = 'block';
        test.style.display = 'none';
        joysticks.style.display = 'none';
    }
    else if (param_div_class === "test"){
        home.style.display = 'none';
        manual.style.display = 'none';
        automatic.style.display = 'none';
        test.style.display = 'block';
        joysticks.style.display = 'none';
    }
    else if (param_div_class === "joysticks"){
        home.style.display = 'none';
        manual.style.display = 'none';
        automatic.style.display = 'none';
        test.style.display = 'none';
        joysticks.style.display = 'block';
    }
};

function init() {
    home.style.display = 'block';
    manual.style.display = 'none';
    automatic.style.display = 'none';
    test.style.display = 'none';
    joysticks.style.display = 'none';

    document.querySelector('.rssi_4').style.display = 'none';
    document.querySelector('.rssi_3').style.display = 'none';
    document.querySelector('.rssi_2').style.display = 'none';
    document.querySelector('.rssi_1').style.display = 'block';
};

window.addEventListener("load", init, false);
