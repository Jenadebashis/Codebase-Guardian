
// vulnerable-code.js

// 1. Weak Password Hashing
import crypto from 'crypto';

export function hashPassword(password) {
  // Using a weak hashing algorithm (MD5)
  const hash = crypto.createHash('md5').update(password).digest('hex');
  return hash;
}

// 2. Use of eval()
export function executeCode(userInput) {
  // Directly using eval() on user input is extremely dangerous
  eval(userInput);
}

// 3. Exposed API Key
export function getWeatherData() {
  const apiKey = 'YOUR_SUPER_SECRET_API_KEY'; // Hardcoded API key
  // ... fetch weather data using the apiKey
}

// 4. SQL Injection
import db from '../config/db.js';

export async function getUser(username) {
  // Vulnerable to SQL injection
  const query = `SELECT * FROM users WHERE username = '${username}'`;
  const [rows] = await db.execute(query);
  return rows[0];
}
