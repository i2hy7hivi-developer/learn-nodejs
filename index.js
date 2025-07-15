const math = require('./math');
const fs = require('fs');
const user = require('./user');

console.log("Hello, Rhythm!");

console.log(__filename);

console.log(__dirname);

console.log(math.add(5, 3)); // Outputs: 8

fs.writeFileSync('hello.txt', 'Hello Node');

const newUser = user.exportUser('John Doe', 'Admin');
fs.writeFileSync('user.json', JSON.stringify(newUser));
console.log((newUser)); // Outputs: { name: 'John Doe', role: 'Admin' }