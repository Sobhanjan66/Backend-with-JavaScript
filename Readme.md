# Backend with JavaScript

This is a repository to learn everything about Backend with JavaScript

-[Model link](https://app.eraser.io/workspace/YtPqz1VogxGy1jzIDkzj?origin=share)

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

## Getting Started with Express.js

### Installing Express
To install Express, run the following command:
```bash
npm i express
```

### Creating a Basic Express Server
Here’s how to set up a simple server using Express:

```javascript
const http = require("http");
const express = require("express");

const app = express();

app.get('/', (req, res) => {
  return res.send("Hello From Home Page");
});

app.get('/about', (req, res) => {
  return res.send("Hey " + req.query.name + ", I'm Sobhanjan");
  // 'name' parameter query must be added manually in the URL in the browser, e.g., /about?name=John
});

// Creating an HTTP server (for beginner-level understanding)
const myServer = http.createServer(app); 
// Here, 'app' works as a handler function, but using the 'http' module is not necessary in Express.

myServer.listen(8000, () => console.log("Server Started!"));

// Alternatively, in Express, we can simply write:
app.listen(8000, () => console.log("Server Started!!"));
```

### Notes
- When using Express, you don’t need to use the `http` module as shown above. The `app.listen` method in Express is sufficient to start the server.
- The second route (`/about`) demonstrates how to use query parameters in Express. For example, you can access it via `/about?name=John` in the browser.


# Designing a REST API

To design a REST API using Express.js, follow the steps below:

## Setup

1. **Install Express.js**:
    ```bash
    npm install express
    ```
2. **Create `server.js`**:
    ```js
    const express = require("express");
    const users = require('./MOCK_DATA.json');

    const app = express();
    const PORT = 8000;

    app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
    ```

## Defining Routes

### Get All Users

```js
app.get("/api/users", (req, res) => {
    return res.json(users);
});
```

### Render Users in HTML

```js
app.get("/users", (req, res) => {
    const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
});
```

### Dynamic Path Parameters

Retrieve a user by ID:

```js
app.get("/api/users/:userId", (req, res) => {
    const id = req.params.userId;
    const user = users.find((user) => user.id === id);
    return res.json(user);
});
```

### CRUD Operations

**Create a New User**:

```js
app.post('/api/users', (req, res) => {
    // TODO: Create new user
    return res.json({ status: "Pending" });
});
```

**Update an Existing User**:

```js
app.patch('/api/users/:id', (req, res) => {
    // TODO: Edit the user with id
    return res.json({ status: "Pending" });
});
```

**Delete a User**:

```js
app.delete('/api/users/:id', (req, res) => {
    // TODO: Delete the user with id
    return res.json({ status: "Pending" });
});
```

### Chaining Route Handlers

Instead of writing the same routes multiple times, you can chain them using `app.route`:

```js
app.route("/api/users/:id")
    .get((req, res) => {
        const id = req.params.id;
        const user = users.find((user) => user.id === id);
        return res.json(user);
    })
    .patch((req, res) => {
        // TODO: Edit the user with id
        return res.json({ status: "Pending" });
    })
    .delete((req, res) => {
        // TODO: Delete the user with id
        return res.json({ status: "Pending" });
    });
```

## Running the Server

Start the server by running:

```bash
node server.js
```

You should see the message:

```
Server started at port 8000
```

Your REST API is now up and running on `http://localhost:8000`.

# Summary

In this guide, you've learned how to set up a basic REST API using Express.js, define various routes for CRUD operations, handle dynamic path parameters, and organize your routes efficiently using chaining. This structure provides a solid foundation for building more complex APIs.



# Handling POST, PATCH, DELETE Requests Using Postman

In this guide, we'll walk through handling POST, PATCH, and DELETE requests in an Express.js application using Postman for testing. We'll also explore how to process form data and interact with a JSON data file using the `fs` module.

## Prerequisites

- **Node.js** installed on your machine.
- **Express.js** installed in your project. If not, install it using:
  
  ```bash
  npm install express
  ```

- **Postman** installed for API testing.

## Setting Up Middleware

To handle incoming data from Postman, especially `urlencoded` form data and JSON data, we need to set up middleware in Express.js.

### Parsing URL-Encoded Data

```js
const express = require("express");
const app = express();

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: false }));
```

- **`express.urlencoded({ extended: false })`**: This middleware parses incoming requests with URL-encoded payloads. The `extended` option allows you to choose between parsing the URL-encoded data with the `querystring` library (`false`) or the `qs` library (`true`). Using `false` is sufficient for simple cases.

### Parsing JSON Data

To handle JSON data sent in the body of requests, add the following middleware:

```js
// Middleware to parse JSON data
app.use(express.json());
```

## Handling POST Requests

### Basic POST Request Handler

Here's how to handle a POST request to add a new user:

```js
app.post("/api/users", (req, res) => {
    const body = req.body;
    console.log("Body", body); // Output will be visible in the terminal
    return res.json({ status: "pending" });
});
```

- **`req.body`**: Contains the parsed body of the request.
- **`console.log("Body", body)`**: Logs the received data to the terminal for debugging purposes.
- **`res.json({ status: "pending" })`**: Sends a JSON response back to the client indicating the status of the request.

### Enhancing POST Request to Save Data

To save the received data to a JSON file (`MOCK_DATA.json`), use the `fs` module:

```js
const fs = require('fs');
const users = require("./MOCK_DATA.json");

// Enhanced POST request handler
app.post("/api/users", (req, res) => {
    const body = req.body;
    
    // Add a new user with a unique ID
    users.push({ ...body, id: users.length + 1 });

    // Write the updated users array back to the JSON file
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
        if (err) {
            console.error("Error writing to file", err);
            return res.status(500).json({ status: "error", message: "Internal Server Error" });
        }
        return res.json({ status: "success", id: users.length });
    });

    console.log("Body", body); // Output will be visible in the terminal
});
```

#### Explanation of `users.push({ ...body, id: users.length + 1 });`

- **Spread Operator (`...body`)**: This syntax copies all enumerable properties from the `body` object into a new object. It's a concise way to merge objects or add new properties.

- **`id: users.length + 1`**: Assigns a unique ID to the new user by taking the current length of the `users` array and adding 1. This ensures each user has a unique identifier.

**Example:**

```js
const body = { first_name: "John", last_name: "Doe" };
users.push({ ...body, id: users.length + 1 });
// Resulting object: { first_name: "John", last_name: "Doe", id: 5 } // Assuming users.length was 4 before push
```

### Notes

- **Error Handling**: Always handle potential errors, especially when dealing with file operations. In the example above, if there's an error writing to the file, the server responds with a 500 status code and an error message.

- **Data Persistence**: Using a JSON file like `MOCK_DATA.json` is suitable for simple applications or testing. For production applications, consider using a database (e.g., MongoDB, PostgreSQL) for better scalability and reliability.

## Handling PATCH Requests

PATCH requests are used to update partial data of a resource. Here's how to handle a PATCH request to update a user's information:

```js
app.patch('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const updatedData = req.body;

    // Find the user by ID
    const user = users.find(u => u.id === userId);
    if (!user) {
        return res.status(404).json({ status: "fail", message: "User not found" });
    }

    // Update user properties
    Object.assign(user, updatedData);

    // Write the updated users array back to the JSON file
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
        if (err) {
            console.error("Error writing to file", err);
            return res.status(500).json({ status: "error", message: "Internal Server Error" });
        }
        return res.json({ status: "success", message: "User updated successfully" });
    });
});
```

### Explanation

- **`app.patch('/api/users/:id', ...)`**: Defines a route to handle PATCH requests for updating a user with a specific ID.

- **`parseInt(req.params.id, 10)`**: Parses the `id` parameter from the URL to an integer.

- **`Object.assign(user, updatedData)`**: Merges the `updatedData` into the existing `user` object, updating only the provided fields.

## Handling DELETE Requests

DELETE requests are used to remove a resource. Here's how to handle a DELETE request to remove a user:

```js
app.delete('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);

    // Find the index of the user by ID
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
        return res.status(404).json({ status: "fail", message: "User not found" });
    }

    // Remove the user from the array
    users.splice(userIndex, 1);

    // Write the updated users array back to the JSON file
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
        if (err) {
            console.error("Error writing to file", err);
            return res.status(500).json({ status: "error", message: "Internal Server Error" });
        }
        return res.json({ status: "success", message: "User deleted successfully" });
    });
});
```

### Explanation

- **`users.findIndex(u => u.id === userId)`**: Finds the index of the user with the specified ID.

- **`users.splice(userIndex, 1)`**: Removes the user from the `users` array.

## Testing with Postman

### POST Request

1. **URL**: `http://localhost:8000/api/users`
2. **Method**: POST
3. **Headers**:
   - `Content-Type`: `application/json`
4. **Body**:
   ```json
   {
       "first_name": "Jane",
       "last_name": "Doe",
       "email": "jane.doe@example.com"
   }
   ```
5. **Response**:
   ```json
   {
       "status": "success",
       "id": 5
   }
   ```

### PATCH Request

1. **URL**: `http://localhost:8000/api/users/5`
2. **Method**: PATCH
3. **Headers**:
   - `Content-Type`: `application/json`
4. **Body**:
   ```json
   {
       "email": "jane.newemail@example.com"
   }
   ```
5. **Response**:
   ```json
   {
       "status": "success",
       "message": "User updated successfully"
   }
   ```

### DELETE Request

1. **URL**: `http://localhost:8000/api/users/5`
2. **Method**: DELETE
3. **Response**:
   ```json
   {
       "status": "success",
       "message": "User deleted successfully"
   }
   ```

## Complete Server Example

Here's the complete `server.js` incorporating all the above functionalities:

```js
const express = require("express");
const fs = require('fs');
const app = express();
const PORT = 8000;

// Middleware to parse URL-encoded and JSON data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Load users from JSON file
let users = require("./MOCK_DATA.json");

// GET all users
app.get("/api/users", (req, res) => {
    return res.json(users);
});

// GET user by ID
app.get("/api/users/:id", (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = users.find(u => u.id === userId);
    if (!user) {
        return res.status(404).json({ status: "fail", message: "User not found" });
    }
    return res.json(user);
});

// POST a new user
app.post("/api/users", (req, res) => {
    const body = req.body;
    users.push({ ...body, id: users.length + 1 });

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
        if (err) {
            console.error("Error writing to file", err);
            return res.status(500).json({ status: "error", message: "Internal Server Error" });
        }
        return res.json({ status: "success", id: users.length });
    });

    console.log("Body", body);
});

// PATCH to update a user
app.patch('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const updatedData = req.body;

    const user = users.find(u => u.id === userId);
    if (!user) {
        return res.status(404).json({ status: "fail", message: "User not found" });
    }

    Object.assign(user, updatedData);

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
        if (err) {
            console.error("Error writing to file", err);
            return res.status(500).json({ status: "error", message: "Internal Server Error" });
        }
        return res.json({ status: "success", message: "User updated successfully" });
    });
});

// DELETE a user
app.delete('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);

    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
        return res.status(404).json({ status: "fail", message: "User not found" });
    }

    users.splice(userIndex, 1);

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
        if (err) {
            console.error("Error writing to file", err);
            return res.status(500).json({ status: "error", message: "Internal Server Error" });
        }
        return res.json({ status: "success", message: "User deleted successfully" });
    });
});

// Start the server
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
```

## Running the Server

Start your server by running:

```bash
node server.js
```

You should see the message:

```
Server started at port 8000
```

Your API is now accessible at `http://localhost:8000`.

## Summary

In this guide, you've learned how to:

- **Set up middleware** to handle URL-encoded and JSON data.
- **Handle POST requests** to add new users.
- **Handle PATCH requests** to update existing users.
- **Handle DELETE requests** to remove users.
- **Interact with a JSON data file** (`MOCK_DATA.json`) to persist data.
- **Test your API endpoints** using Postman.

This setup provides a foundational RESTful API that can be expanded with additional features and integrated with databases for more robust applications.