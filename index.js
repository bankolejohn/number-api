const express = require("express");
const app = express();
const port = 80;

// Middleware to parse JSON
app.use(express.json());

// Function to check if a number is prime
function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

// Function to check if a number is perfect
function isPerfect(n) {
  if (n < 2) return false;
  let sum = 0;
  for (let i = 1; i < n; i++) {
    if (n % i === 0) sum += i;
  }
  return sum === n;
}

// Function to check if a number is Armstrong
function isArmstrong(n) {
  const digits = String(n).split("");
  const length = digits.length;
  const sum = digits.reduce((acc, digit) => acc + Math.pow(Number(digit), length), 0);
  return sum === n;
}

// Function to get properties of a number
function getProperties(n) {
  const properties = [];
  if (isArmstrong(n)) properties.push("armstrong");
  if (n % 2 !== 0) properties.push("odd");
  else properties.push("even");
  return properties;
}

// Function to generate a fun fact
function getFunFact(n) {
  if (isArmstrong(n)) {
    const digits = String(n).split("");
    const length = digits.length;
    const fact = digits.map((d) => `${d}^${length}`).join(" + ");
    return `${n} is an Armstrong number because ${fact} = ${n}`;
  }
  return `${n} is a fascinating number with unique properties.`;
}

// API endpoint
app.get("/api/classify-number", (req, res) => {
  const number = req.query.number;

  // Validate input
  if (isNaN(number) || !Number.isInteger(Number(number))) {
    return res.status(400).json({ number: number, error: true });
  }

  const num = parseInt(number);

  // Prepare response
  const response = {
    number: num,
    is_prime: isPrime(num),
    is_perfect: isPerfect(num),
    properties: getProperties(num),
    digit_sum: String(num)
      .split("")
      .reduce((acc, digit) => acc + Number(digit), 0),
    fun_fact: getFunFact(num),
  };

  res.status(200).json(response);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});