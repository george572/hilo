// get element which is responsible to restart the first given card
var changeCard = document.querySelector(".change-card");
var img = document.getElementById("preview-img");

// get two different cards for animation
var hiddenCard = document.querySelector(".hidden-card");
var deck  = document.querySelector(".card-back-img")

// add pre created css classes to elements so that animation applies on them.
changeCard.addEventListener("click", applyAnimation);
changeCard.addEventListener("click", getRandomCard);

function applyAnimation() {
		hiddenCard.classList.add("hidden-card-move-animation");
		deck.classList.add("back-card-move-animation");
		img.classList.add("img-hidden");

		setTimeout(function(){
			img.classList.remove("img-hidden")
			img.classList.add("preview-img-animation")
		}, 350)	

		setTimeout(function(){
		hiddenCard.classList.remove("hidden-card-move-animation");
		deck.classList.remove("back-card-move-animation");
		img.classList.remove("preview-img-animation")

		}, 600)	


}


// show different card on every click randomly

function getRandomCard(){
// get main preview img src
var img = document.getElementById("preview-img");

	var deck = [
		{"1" : "assets/img/7.png"},
		{"k" : "assets/img/k.png"},
		{"q": "assets/img/q.png"}
		// etc here should be full deck
	]
	var randomCard  = Math.floor(Math.random() * deck.length);
	var imgSrc = Object.values(deck[randomCard]);
	img.src = imgSrc;
}

getRandomCard();



// button click style

var button = document.querySelector(".bet-btn");
var buttonClear = document.querySelector(".bet-clear");

button.addEventListener("click", changeBtnStyle);
buttonClear.addEventListener("click", changeBtnStyle);



function changeBtnStyle(e) {

	if (e.target.classList.contains("bet-btn")) {
		button.classList.add("clicked");	
		setTimeout(function(){
		button.classList.remove("clicked")
	}, 200)
	}
	else if(e.target.classList.contains("bet-clear")){
		buttonClear.classList.add("clear-btn-animation");	
		buttonClear.classList.add("bet-clear-disabled");	
		setTimeout(function(){
		buttonClear.classList.remove("clear-btn-animation")
	}, 100)
	}

}


// bet input value change

var raiseBet = document.querySelector(".raise");
var lowerBet = document.querySelector(".lower");
var input = document.querySelector(".bet-input");

function changeBetAmount(evt) {
	var inputValue = parseFloat(input.value)
	if (evt.target.classList.contains("raise")) {
		inputValue += 0.10;
		input.value =inputValue.toFixed(2);
	}
	else if (evt.target.classList.contains("lower")){
		if (input.value <= 0) {
			return
		}
		else {
			inputValue -= 0.10;
			input.value = inputValue.toFixed(2);
		}


	}
}

lowerBet.addEventListener("click", changeBetAmount)
raiseBet.addEventListener("click", changeBetAmount)

// raise bet automatically

var preselectedBetAmounts = document.getElementsByClassName("bet-auto__item");

for (let i = 0 ; i < preselectedBetAmounts.length; i++) {
	preselectedBetAmounts[i].addEventListener("click", function(){
	preselectedBetAmounts[i].classList.add("bet-auto__item-active")	
	setTimeout(function(){
		preselectedBetAmounts[i].classList.remove("bet-auto__item-active")
	}, 100)

	} );
	preselectedBetAmounts[i].addEventListener("click", raiseBetAmount)
	

}
	
var inputValue = input.value = 0;

function raiseBetAmount(evt){
	var chosenNumer;
	if (!evt.target.classList.contains("bet-auto__item")) {
		chosenNumber = Number(evt.target.parentElement.dataset.amount);
	}
	else {
		chosenNumber = Number(evt.target.dataset.amount)
		
	}
	inputValue += chosenNumber;
	input.value = inputValue;
	}




// start a game


button.addEventListener("click", startGame)

function startGame(){
	var cardWrapper = document.querySelector(".cards")
	var hiddenBetDiv = document.querySelector(".hilo-wrapper");

	cardWrapper.classList.toggle("game-started")
	if (cardWrapper.classList.contains("game-started")) {
		setTimeout(function(){
			hiddenBetDiv.classList.add("enabled")
		},600)
	}
	else {
		hiddenBetDiv.classList.remove("enabled")

	}
}

// enable bet after clicking on button
var betIndicator = document.querySelector(".bet-indicator")
var betButtons = document.getElementsByClassName("hilo-button");
var disabledCards = document.getElementsByClassName("choose-card__item")
	for (var i = 0; i < betButtons.length; i++) {
 	 betButtons[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("bet-button-active");

    // If there's no active class
    if (current.length > 0) {
      current[0].className = current[0].className.replace(" bet-button-active", "");
    }

    // Add the active class to the current/clicked button
    this.className += " bet-button-active";
   // show higher or lower indicator on preview card based on choosen bet
    if (current.length) {
    	// enable three cards
    	for(let i = 0; i < disabledCards.length; i++){
    		disabledCards[i].classList.add("choose-card__item-active")
			disabledCards[i].addEventListener("click",showCards);
			button.addEventListener("click", function(){
    			betIndicator.classList.remove("bet-indicator-active");


			}) 

    	}
    	if (current[0].classList.contains("btn-lower")) {
    		betIndicator.src = "assets/img/down.svg";
    		betIndicator.classList.add("bet-indicator-active")
    	}
    	else if (current[0].classList.contains("btn-higher")) {
    		betIndicator.src = "assets/img/up.svg";
    		betIndicator.classList.add("bet-indicator-active") 
    		
    	}
    }
  });
}

// choose one card from three given
function showCards(evt) {
	evt.target.parentElement.classList.add("chosen-card");
	button.addEventListener("click", function(){
	evt.target.parentElement.classList.remove("chosen-card");
	
    }) 
}