const Base_URL = "pase here currency base url";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector("from select");
const toCurr = document.querySelector("to select");
const msg = document.querySelector(".msg");;


for(let select of dropdowns){
    for(currCode in countryList){
        console.log(code , countryList[code]);
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);

        select.addEventListener("change", (evt) => {
            updateFlag(evt.target);
        })
    }
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amountVal = amount.value;
    console.log(amountVal);
    if(amountVal === "" || amountVal < 1){
       amountVal = 1;
       amount.value = "1"; 
    }

    console.log(fromCurr.value , toCurr.value);
    const URL = `${Base_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    console.log(rate);

    let finalAmount = amountVal * rate;

    msg.innerText = `${amountVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

const updateFlag = (element) => {
    console.log(element);
    let currCode = element.value;
    console.log(currCode);
    let countyCode = countryList[currCode]; 
    let newSrc = `pastcode link here ${countyCode}`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click" , (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});


window.addEventListener("load" , () => {
    updateExchangeRate();
});
