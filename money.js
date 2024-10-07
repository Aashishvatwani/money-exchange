const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdowns = document.querySelectorAll("#country select");
const reload = document.querySelector("#reload");
const from = document.querySelector("#option1");
const to = document.querySelector("#option2");
const msg = document.querySelector("#message");
const reverse = document.querySelector("#reverse");

// Define the countryList object with currencies


// Loop through each dropdown (select element)
for (let select of dropdowns) {
  // Loop through the countryList object
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode; // Corrected innerText property
    newOption.value = currCode;

    // Set default selected options
    if (select.id === "option1" && currCode === "USD") {
      newOption.selected = "selected";
    }
    if (select.id === "option2" && currCode === "INR") {
      newOption.selected = "selected";
    }

    // Append the new option to the select element
    select.append(newOption);
  }
  select.addEventListener("change",(evt)=>{
    updateflag(evt.target);
  });
}
