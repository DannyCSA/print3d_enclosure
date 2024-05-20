const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const themeToggler = document.querySelector(".theme-toggler");

// Page sections
const home = document.querySelector(".home");
const manual = document.querySelector(".manual");
const test = document.querySelector(".test");

menuBtn.addEventListener('click', () => {
    sideMenu.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    sideMenu.style.display = 'none';
});

themeToggler.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme-variables');
    themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
    themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');
});

function updateSliderPWMmanual(element) {
    var sliderNumber = element.id.charAt(element.id.length - 1);
    var sliderValue = document.getElementById(element.id).value;
    document.getElementById("sliderValue" + sliderNumber).innerHTML = sliderValue;
    // Update setpoint in Firebase
    firebase.database().ref('setpoint').set({ setpoint: parseFloat(sliderValue) });
}

function show(param_div_class) {
    home.style.display = 'none';
    manual.style.display = 'none';
    test.style.display = 'none';

    if (param_div_class === "home") {
        home.style.display = 'block';
    } else if (param_div_class === "manual") {
        manual.style.display = 'block';
    } else if (param_div_class === "test") {
        test.style.display = 'block';
    }
}

function init() {
    // Initialize Firebase
    const firebaseConfig = {
        apiKey: "API_KEY_HERE",
        authDomain: "enclosure-63e1c.firebaseapp.com",
        databaseURL: "https://enclosure-63e1c-default-rtdb.firebaseio.com",
        projectId: "enclosure-63e1c",
        storageBucket: "enclosure-63e1c.appspot.com",
        messagingSenderId: "472001080528",
        appId: "1:472001080528:web:541397449ea49a2d3402d5"
    };

    firebase.initializeApp(firebaseConfig);
    const database = firebase.database();
    
    // Reference to the temperature value in the database
    const tempRef = database.ref('temperature');
    
    // Listen for temperature value changes
    tempRef.on('value', (snapshot) => {
        const temperature = snapshot.val().temperature;
        document.getElementById('currentTemperature').innerText = temperature.toFixed(2);

        var x = (new Date()).getTime(), y = parseFloat(temperature);
        if (chartADC_auto.series[0].data.length > 40) {
            chartADC_auto.series[0].addPoint([x, y], true, true, true);
        } else {
            chartADC_auto.series[0].addPoint([x, y], true, false, true);
        }
    });

    // Reference to the setpoint value in the database
    const setpointRef = database.ref('setpoint');
    
    // Listen for setpoint value changes
    setpointRef.on('value', (snapshot) => {
        const setpoint = snapshot.val().setpoint;
        document.getElementById('currentSetPoint').innerText = setpoint.toFixed(2);
        chartADC_auto.yAxis[0].removePlotLine('setpoint-line');
        chartADC_auto.yAxis[0].addPlotLine({
            id: 'setpoint-line',
            value: setpoint,
            color: 'red',
            dashStyle: 'Dash',
            width: 2,
            label: {
                text: 'Setpoint:s ' + setpoint.toFixed(2) + '°C',
                align: 'left',
                verticalAlign: 'bottom', // Set the vertical alignment to bottom
                style: {
                    color: 'red'
                }
            }
        });
    });

    show('home');
}

// Highcharts configuration for ADC auto chart
var colors = ['#470ce8'];
var chartADC_auto = new Highcharts.Chart({
    chart: { renderTo: 'chart-ADC_auto' },
    title: { text: 'Temperature Control' },
    series: [{
        data: [],
        name: 'Enclosure Temperature'
    }],
    colors: colors,
    plotOptions: {
        line: { animation: false, dataLabels: { enabled: true } },
        pie: { colors: colors }
    },
    xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: { second: '%H:%M:%S' }
    },
    yAxis: {
        title: { text: 'Temperature [°C]' },
        min: 0,
        max: 60,
        plotLines: [{
            id: 'setpoint-line',
            color: 'red',
            dashStyle: 'Dash',
            width: 2,
            label: {
                text: 'Setpoint',
                align: 'left',
                verticalAlign: 'bottom', // Set the vertical alignment to bottom
                style: {
                    color: 'red'
                }
            }
        }]
    },
    credits: { enabled: false }
});

window.onload = init;
