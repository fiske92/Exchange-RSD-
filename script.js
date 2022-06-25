let inputRsd = document.getElementById("input-rsd");
let outputEur = document.getElementById("output-eur");
let kurs = document.getElementById("trenutni-kurs").classList;
let inputContainer = document.getElementById("container");
let exchangeRate = document.getElementById('exchange-rate')
let backdrop = document.getElementsByClassName('absolute')
let exchangeRateInput = document.getElementById('exchange-rate-input')
let exchangeRateInputAlert = document.getElementById('exchange-rate-alert')
const changeConverter = document.getElementById("btn-change-converter");
const editExchangeRate = document.getElementById('edit-exchange-rate')
const btnNewExchangeRate = document.getElementById('btn-new-exchange-rate')
let changeConverterStatus = true;

outputEur.disabled = true;
outputEur.classList.add("cursor-not-allowed");

// exchange rate color changer
setInterval(exchangeRateColor, 1000);

// backdrop close
backdrop[0].addEventListener('click',()=>{
    closeBackdrop()
})

// set new exchange rate
btnNewExchangeRate.addEventListener('click',()=>{
    if (exchangeRateInput.value == '') {
        exchangeRateInputAlert.innerText = 'Please enter the rate'
        return
    }
    exchangeRate.innerText = exchangeRateInput.value
    closeBackdrop()
})

//prevents user to input value bigger than 10000, and leave empty input
exchangeRateInput.addEventListener('input', (e)=>{
    if(exchangeRateInput.value > 10000) { 
        exchangeRateInput.value = 10000
    } 
})

inputRsd.addEventListener("input", () => {
  outputEur.value = parseFloat(inputRsd.value / `${+exchangeRate.innerText}`).toFixed(3);
  outputEur.value = parseFloat(outputEur.value) // deletes unnecessary zeros
});
outputEur.addEventListener("input", () => {
  inputRsd.value = parseFloat(outputEur.value * `${+exchangeRate.innerText}`).toFixed(3);
  inputRsd.value = parseFloat(inputRsd.value) // deletes unnecessary zeros
});


// Exchange changer
changeConverter.addEventListener("click", () => {
  if (changeConverterStatus === false) {
    changeConverter.innerText = "€ in RSD";
    changeConverter.style.transform = "rotate(360deg)";
    inputContainer.classList.remove("flex-col-reverse");
    outputEur.setAttribute("placeholder", "Amount of RSD in €");
    inputRsd.setAttribute("placeholder", "Enter amount in RSD");
    outputEur.classList.add("cursor-not-allowed");
    inputRsd.classList.remove("cursor-not-allowed");
    changeAndResetConverter(false)
  } else {
    changeConverter.innerText = "RSD u €";
    changeConverter.style.transform = "rotate(-360deg)";
    inputContainer.classList.add("flex-col-reverse");
    outputEur.setAttribute("placeholder", "Enter amount in €");
    inputRsd.setAttribute("placeholder", "Amount of € in RSD");
    inputRsd.classList.add("cursor-not-allowed");
    outputEur.classList.remove("cursor-not-allowed");
    changeAndResetConverter(true)
  }
});


// Button for editing the rate, and backdrop visibility change
editExchangeRate.addEventListener('click', () => {
    exchangeRateInputAlert.innerText = ''
    exchangeRateInput.value = ''
    for (let div of backdrop) {
        div.classList.remove('invisible')
    }
})

function changeAndResetConverter(status) {
  inputRsd.value = "";
  outputEur.value = "";
  inputRsd.disabled = status;
  outputEur.disabled = (!status);
  changeConverterStatus = (!status);
}

// Exchange rate color changer (for setInterval)
function exchangeRateColor() {
    if (kurs.contains("text-white")) {
        kurs.remove("text-white");
        kurs.add("text-lime-200");
      } else if (kurs.contains("text-lime-200")) {
        kurs.remove("text-lime-200");
        kurs.add("text-yellow-300");
      } else if (kurs.contains("text-yellow-300")) {
        kurs.remove("text-yellow-300");
        kurs.add("text-fuchsia-200");
      } else {
        kurs.remove("text-fuchsia-200");
        kurs.add("text-white");
      }
}

function closeBackdrop() {
    backdrop[0].classList.add('invisible')
    backdrop[1].classList.add('invisible')
}
