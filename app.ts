import chalk from "chalk";
import inquirer from "inquirer";


let apiLink = "https://v6.exchangerate-api.com/v6/b74b313c48b93bf3cccdedfb/latest/PKR";

let fetchData = async (data : any) => {
  let fetchData = await fetch(data);
  let response = await fetchData.json();
  return response.conversion_rates;
};

let data = await fetchData(apiLink);
let countries = Object.keys(data);

let firstCountry = await inquirer.prompt({
  type: "list",
  name: "name",
  message: "Please select the country converting from",
  choices: countries,
});

console.log(`Converting from ${chalk.greenBright.bold(firstCountry.name)}
`);
///*
// first country money
let userMoney = await inquirer.prompt({
  type: "number",
  name: "Rupee",
  message: `Please enter the amount in ${chalk.greenBright.bold(firstCountry.name)}:`,
});

let secondCountry = await inquirer.prompt({
  type: "list",
  name: "name",
  message: "Converting to",
  choices: countries,
});

// conversion rate

let cnv =
  `https://v6.exchangerate-api.com/v6/b74b313c48b93bf3cccdedfb/pair/${firstCountry.name}/${secondCountry.name}`;

// fetching data for conversion rate

let cnvData = async (data : any) => {
  let cnvData = await fetch(data);
  let response = await cnvData.json();
  return response.conversion_rate;
};

let conversionRate = await cnvData(cnv);

let convertedRate = userMoney.Rupee * conversionRate;

console.log(`your ${chalk.greenBright(firstCountry.name)} 
${chalk.greenBright(userMoney.Rupee)} 
in
${chalk.greenBright(secondCountry.name)} is ${chalk.greenBright(convertedRate)}${convertedRate}`);



  

