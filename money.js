const BASE_URL = "https://v6.exchangerate-api.com/v6/e8112802ca8c0dc192301926/latest/"; // API URL
const dropdowns = document.querySelectorAll("#country select");
const reload = document.querySelector("#reload");
const from = document.querySelector("#option1");
const to = document.querySelector("#option2");
const msg = document.querySelector("#message");
const reverse = document.querySelector("#reverse");
let exchangeRates = {}; // Object to store fetched rates

// Define the countryList object with currency codes and corresponding country codes


// Populate the dropdowns with options

// Event listener for reverse button
reverse.addEventListener("click", (evt) => {
  evt.preventDefault();

  // Get the current selected values of both dropdowns
  let fromValue = from.value;
  let toValue = to.value;

  // Swap the values
  from.value = toValue;
  to.value = fromValue;

  // Update the flags for both dropdowns
  updateFlag(from);
  updateFlag(to);

  // Optionally, you can also update the exchange rate after reversing
  getExchangeRates(from.value).then(() => {
    // After fetching new exchange rates, update the conversion
    convertCurrency();
  });
 
});

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;

    if (select.id === "option1" && currCode === "INR") {
      newOption.selected = "selected";
    }
    if (select.id === "option2" && currCode === "USD") {
      newOption.selected = "selected";
    }
    
    select.append(newOption);
  }
 
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
    convertCurrency();
  });
 
}

// Function to update flag based on selected country code
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode]; // Get the country code
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`; // URL for flag

  // Select the correct image corresponding to the dropdown
  let img = element.parentElement.querySelector(".img");

  // Update the background image of the corresponding img element
  img.style.backgroundImage = `url(${newSrc})`;
};

// Fetch exchange rates based on the "from" currency
const getExchangeRates = async (baseCurrency) => {
  try {
    let response = await fetch(`${BASE_URL}${baseCurrency}`);
    let data = await response.json();
    exchangeRates = data.conversion_rates; // Save conversion rates
    console.log("Rates fetched:", exchangeRates);
  } catch (error) {
    console.error("Error fetching rates:", error);
  }
};

// Function to calculate the converted amount
const convertCurrency = () => {
  const amount = document.querySelector("#amount").value;
  const fromCurrency = from.value;
  const toCurrency = to.value;

  if (exchangeRates[toCurrency]) {
    const convertedAmount = amount * exchangeRates[toCurrency];
    msg.textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
  } else {
    msg.textContent = "Unable to retrieve conversion rate.";
  }
};


// Event listener for reload button (for conversion)
reload.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent form from submitting
  convertCurrency();  // Perform currency conversion
});

// Fetch initial exchange rates when page loads for USD
getExchangeRates("USD");
