const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for (let select of dropdowns) {
    for (const code in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText=code;
        newOption.value = code;
        select.append(newOption);
        if (select.name=="from" && code === "USD") {
            newOption.selected = "selected";
        }
        else if(select.name=="to" && code === "INR") {
         newOption.selected = "selected";
     }

     select.addEventListener("change",(evt) =>{
        updateFlag(evt.target);
     });
    }
}

const updateFlag = function(element){
      let currCode=element.value;
      let countryCode=countryList[currCode];
      let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
      let img = element.parentElement.querySelector("img");
      img.src = newSrc;
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector("form input");
    let amountVal = amount.value;
    if (amountVal === "" || amountVal < 1) {
        amountVal = 1;
        amount.value = "1";
    }

  
   const URL = `https://currency-conversion-and-exchange-rates.p.rapidapi.com/convert?from=${fromCurr.value}&to=${toCurr.value}&amount=${amountVal}`;
    const options = {
      method: 'GET',
      headers: {
         'X-RapidAPI-Key': 'c927054b2cmsh7f61fa09ed846aap195e1ajsn5592c918c5c2',
         'X-RapidAPI-Host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
      }
   };
   
   let response = await fetch(URL, options);
   let data = await response.json();
   let finalAmount = data.result;
   msg.innerText = `${amountVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
});