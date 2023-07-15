"use strict"


const BillInput = document.getElementById("bill");
const numPersonInput = document.getElementById("num-person");
const Btns = Array.from(document.querySelectorAll(".btn"));
const tipEl = document.querySelector(".tip-el");
const totalEl = document.querySelector(".total-el");
const resetBtn = document.querySelector(".reset");
const error = document.querySelector(".error");



let tip = 0.00;
let amount = 0.00;
let tip_percent = 0;
let persons = 0;
let total = 0;
let re =/[a-z]/;




check();

BillInput.addEventListener('keypress', (e) => {
        checkInput(e)
  });



numPersonInput.addEventListener("input",(e)=>{
    checkInput(e)
    if(parseInt(e.target.value) === 0){
        error.classList.add("visible")
        e.target.style.outlineColor = "red" 
    }else{
        error.classList.remove('visible')
    }
});


for(let i = 0; i < Btns.length; i++){
    Btns[i].addEventListener("click",()=>{
        if(BillInput.value && numPersonInput.value){
            tip_percent = Btns[i].dataset.number;
            calc()
        }
    })
}



resetBtn.addEventListener("click", clearInput)




function calc(){
    amount = BillInput.value;
    persons = numPersonInput.value;
    tip = (amount/persons)*(tip_percent/100);
    total = amount/persons + tip;
    displayResults(total.toFixed(2),tip.toFixed(2))
}



function displayResults(total,tip){
    tipEl.innerText = `$${tip}`
    totalEl.innerText = `$${total}`
}



function clearInput(){
    BillInput.value = "";
    numPersonInput.value = "";
    tipEl.innerText = `$0`
    totalEl.innerText = `$0`
}




function checkInput(input){
    if(re.test(input.target.value.trim())){
        input.target.style.outlineColor = "red" 
        input.preventDefault();
    }else{
        input.target.style.outlineColor = "hsl(172, 67%, 45%)"
    }
    maxlength(input.target,15)
}



function maxlength(input,n){
    if (input.value.length > n){
        input.value = input.value.slice(0,n);
    }
};


function check(){
    if(BillInput.value != 0 || numPersonInput.value != 0){
        resetBtn.classList.add("active");
    }else{
        resetBtn.classList.remove("active");
    }
}