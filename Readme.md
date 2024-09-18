# Backend with JavaScript

This is a repository to learn everything about Backend with JavaScript

-[Model link](https://app.eraser.io/workspace/YtPqz1VogxGy1jzIDkzj?origin=share)

```markdown
# Backend Project Guide

## Project Initialization
To create a backend project, start by initializing Node Package Manager with:
```bash
npm init
```
This command creates a `package.json` file, which configures the project's settings and dependencies. You can also define custom scripts for your project in this file.

## Modules in Node.js
Node.js allows you to write code in a modular way, dividing the codebase into smaller, more manageable parts for better organization and readability.

### Example
**File:** `math.js`
```javascript
function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

module.exports = { add, sub };
```

**File:** `hello.js`
```javascript
const math = require("./math");

console.log("Sum value is: ", math.add(2, 4));
console.log("Subtract value is: ", math.sub(2, 4));

// Using destructuring:
const { add, sub } = require("./math");

console.log("Sum value is: ", add(2, 4));
console.log("Subtract value is: ", sub(2, 4));
```

You can also write the `math.js` file in a shorthand way:
```javascript
exports.add = (a, b) => a + b;
exports.sub = (a, b) => a - b;
```

## File Handling in Node.js

### Create a File
```javascript
const fs = require("fs");

// Synchronous
fs.writeFileSync("./text.txt", "Hey There");

// Asynchronous
fs.writeFile("./text.txt", "Hey There Async", (err) => {});
```

### Read a File
```javascript
// Synchronous
const result = fs.readFileSync("./contacts.txt", "utf-8");
console.log(result);

// Asynchronous
fs.readFile("./contacts.txt", "utf-8", (err, result) => {
  if (err) {
    console.log("Error: ", err);
  } else {
    console.log(result);
  }
});

// Note: Asynchronous functions return nothing.
```

### Append Content to an Existing File
```javascript
// Synchronous
fs.appendFileSync("./text.txt", `\n ${new Date().toLocaleString()}`);

// Alternative Synchronous
fs.appendFileSync("./text.txt", `\n ${new Date(Date.now()).toLocaleString()}`);
```

### Copy a File
```javascript
fs.cpSync("./text.txt", "./copy.txt");
```

### Delete a File
```javascript
fs.unlinkSync("./copy.txt");
```

### Check File Stats
```javascript
console.log(fs.statSync("./text.txt"));
```

### Make a Directory
```javascript
fs.mkdirSync("my-docs/a/b", { recursive: true });
```

## Creating an HTTP Web Server
```javascript
const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
  console.log(req.headers);
  
  if (req.url === "/favicon.ico") return res.end();
  
  const log = `${Date.now()}: ${req.method} ${req.url} New Req Received\n`;
  const myURL = url.parse(req.url, true); // 'true' parses the query string
  
  fs.appendFile('log.txt', log, (err) => {
    if (err) throw err;

    switch (myURL.pathname) {
      case "/":
        res.end("Hello From Server!!");
        break;
      case "/About":
        const username = myURL.query.myname;
        res.end(`Hi, My name is ${username}`);
        break;
      default:
        res.end("404 Not Found");
    }
  });
});

myServer.listen(8000, () => console.log("Server Started!"));
```
```

