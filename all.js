'use strict';

// // show/hide order details
let orderDetails = document.getElementById('js-order_details');
let popUp = document.getElementById('js-order-info_popup');
let closePopUp = document.getElementById('js-close-popup');

function showOrderDetails() {
        orderDetails.classList.toggle('active');
        popUp.classList.toggle('active');
}

orderDetails.addEventListener('click', showOrderDetails);
closePopUp.addEventListener('click', showOrderDetails);


// show/hide nav menu on small screens
let openNavMenu = document.getElementById('js-header_nav-sandwich');
let closeNavMenu = document.getElementById('js-close-popup-nav');
let navMenu = document.getElementById('js-nav_menu');

function showNavMenu() {
    navMenu.classList.toggle('active');
    closeNavMenu.classList.toggle('active');
}

openNavMenu.addEventListener('click', showNavMenu);
closeNavMenu.addEventListener('click', showNavMenu);


function init(){
    this.components = [
        {
            name: 'soybean',
            inputEl: document.getElementById('js-soybean-slide'),
            labelEl: document.getElementById('js-soybean-label'),
            start: 0,
            value: 0
        },
        {
            name: 'sesame',
            inputEl: document.getElementById('js-sesame-slide'),
            labelEl: document.getElementById('js-sesame-label'),
            start: 0,
            value: 0
        },
        {
            name: 'wheat',
            inputEl: document.getElementById('js-wheat-slide'),
            labelEl: document.getElementById('js-wheat-label'),
            start: 0,
            value: 0
        },
        {
            name: 'corn',
            inputEl: document.getElementById('js-corn-slide'),
            labelEl: document.getElementById('js-corn-label'),
            start: 100,
            value: 100
        },
    ];

    this.addEvents();
}

init.prototype.addEvents = function(){
    for (let i = 0; i < this.components.length; i++) {
        let item = this.components[i];

        item.slider = noUiSlider.create(item.inputEl, {
            start: 1,
            step: 1,
            range: {
                min: 0,
                max: 100
            }
        });

        item.slider.on('slide', function(values, handle){
            this.setValue(item, +values[handle]);
            if (this.sumValues() >= 100) {
                item.slider.set(+values[handle] - this.sumValues() + 100);
                this.setValue(item, +values[handle] - this.sumValues() + 100);
            }
            this.setCornValue();
        }.bind(this));
    }
};

init.prototype.setValue = function(item, value){
    item.value = +value;
    item.labelEl.innerHTML = value;
};

init.prototype.sumValues = function(){
    let sum = 0;
    for (let i = 0; i < this.components.length -1; i++) {
        sum += this.components[i].value;
    }
    return sum;
};

init.prototype.setCornValue = function(){
    this.setValue(this.components[3], Math.max(0,100 - this.sumValues()));
    this.components[3].slider.set(Math.max(0,100 - this.sumValues()));
};

new init();