// npm run start to look how calculator works
// you can change numbers and call different functions

import { Calculator } from "./Calculator";

const calculator = new Calculator();
console.log("LOG: Calculator started");

const res = calculator.sum(1, 1);
const data = calculator.multiply(10, 5, 1, 2, res);

console.log(`LOG: Result: ${data}`);

Calculator.writeToFile("src/result.txt", data);