'use strict';

var cart = {

	// корзина (в долларах)
	selectedCart: [
		{ price: 20 },
		{ price: 45 },
		{ price: 67 },
		{ price: 1305 }
	],

	totalCartPrice: {
	},

    // метод sum
	// для получения общей суммы в долларах
    sum: function () {
        return this.selectedCart.map(function(product){
        	return product.price;
        }).reduce(function(acc, curVal) {return acc + curVal;});
    },

    // метод получения общей суммы корзины в разной валюте
    totalCur: function (exchangeRates) {
    	let usSum = this.sum();
    	this.totalCartPrice.rubles = usSum * exchangeRates.rubles.toFixed(2);
    	this.totalCartPrice.euros = usSum * exchangeRates.euros.toFixed(2);
    	this.totalCartPrice.usdollars = usSum;
    	this.totalCartPrice.pounds = usSum * exchangeRates.pounds.toFixed(2);
    	this.totalCartPrice.yens = usSum * exchangeRates.yens.toFixed(2);
        console.log(this.totalCartPrice);
    },

}

$.getJSON("http://www.floatrates.com/daily/usd.json", function(data) {
	let exchangeRates = new Object();

    exchangeRates.rubles = data.rub.rate;
    exchangeRates.euros = data.eur.rate;
    exchangeRates.pounds = data.gbp.rate;
    exchangeRates.yens = data.jpy.rate;

    cart.totalCur(exchangeRates);
});
