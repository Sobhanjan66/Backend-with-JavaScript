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



# Introducing Middleware

In this section, we'll explore **middleware** in Express.js. Middleware functions are essential for handling various aspects of the request-response cycle, such as logging, authentication, and data processing. We'll demonstrate how to create a middleware that logs request details to a file before processing each request.

## What is Middleware?

Middleware functions in Express.js are functions that have access to the request (`req`) and response (`res`) objects, as well as the next middleware function in the application's request-response cycle. They can execute code, make changes to the request and response objects, end the request-response cycle, or call the next middleware in the stack.

**Key Characteristics of Middleware:**

- **Sequential Execution:** Middleware functions are executed in the order they are defined.
- **Control Flow:** Each middleware function must either end the request-response cycle or pass control to the next middleware using the `next()` function.
- **Reusability:** Middleware can be reused across different routes and applications.

## Implementing Middleware for Logging

In the previous sections, we set up middleware to handle URL-encoded and JSON data. Now, we'll add another middleware to log details of every incoming request, such as the timestamp, HTTP method, and request path. This middleware will append these details to a log file (`log.txt`) before the request is processed by the route handlers.

### Step-by-Step Implementation

1. **Import Required Modules:**

   Ensure that you have the necessary modules imported, including `express` and `fs`.

   ```js
   const express = require("express");
   const fs = require('fs');
   const app = express();
   const PORT = 8000;
   ```

2. **Set Up Existing Middleware:**

   Include middleware to parse URL-encoded and JSON data.

   ```js
   // Middleware to parse URL-encoded data
   app.use(express.urlencoded({ extended: false }));

   // Middleware to parse JSON data
   app.use(express.json());
   ```

3. **Create Logging Middleware:**

   Add a middleware function that logs the timestamp, HTTP method, and request path to `log.txt`. This middleware should be placed **before** defining your routes to ensure it executes for every incoming request.

   ```js
   // Middleware to log request details
   app.use((req, res, next) => {
       const logEntry = `\n${new Date().toLocaleString()}: ${req.method} ${req.path}\n`;
       
       fs.appendFile("log.txt", logEntry, (err) => {
           if (err) {
               console.error("Failed to write to log file:", err);
           }
           // Proceed to the next middleware or route handler
           next();
       });
   });
   ```

   **Explanation of the Logging Middleware:**

   - **Function Signature:** `(req, res, next) => { ... }`
     - `req`: The incoming request object.
     - `res`: The response object.
     - `next`: A function to pass control to the next middleware.

   - **Creating the Log Entry:**
     - `new Date().toLocaleString()`: Generates a human-readable timestamp.
     - `${req.method}`: Captures the HTTP method (e.g., GET, POST).
     - `${req.path}`: Captures the request path (e.g., `/api/users`).

   - **Appending to `log.txt`:**
     - `fs.appendFile`: Asynchronously appends data to a file, creating the file if it doesn't exist.
     - The log entry is written to `log.txt`. If an error occurs during this process, it is logged to the console.

   - **Calling `next()`:**
     - After logging, the middleware calls `next()` to pass control to the next middleware function or route handler in the stack.

4. **Define Routes:**

   After setting up the middleware, define your routes as usual. The logging middleware will automatically log details for every request to these routes.

   ```js
   // Example Route
   app.get("/api/users", (req, res) => {
       // Your route handler logic
       res.json({ message: "List of users" });
   });

   // Other routes...
   ```

5. **Start the Server:**

   ```js
   app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
   ```

### Complete Example with Logging Middleware

Below is the complete `server.js` file incorporating the logging middleware:

```js
const express = require("express");
const fs = require('fs');
const app = express();
const PORT = 8000;

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: false }));

// Middleware to parse JSON data
app.use(express.json());

// Middleware to log request details
app.use((req, res, next) => {
    const logEntry = `\n${new Date().toLocaleString()}: ${req.method} ${req.path}\n`;
    
    fs.appendFile("log.txt", logEntry, (err) => {
        if (err) {
            console.error("Failed to write to log file:", err);
        }
        // Proceed to the next middleware or route handler
        next();
    });
});

// Example Routes

// GET all users
app.get("/api/users", (req, res) => {
    // Replace with actual logic to retrieve users
    res.json({ message: "List of users" });
});

// POST a new user
app.post("/api/users", (req, res) => {
    const body = req.body;
    // Replace with actual logic to add a new user
    res.json({ status: "success", data: body });
});

// Start the server
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
```

## Testing the Logging Middleware

To verify that the logging middleware is functioning correctly, follow these steps:

1. **Start the Server:**

   ```bash
   node server.js
   ```

   You should see the message:

   ```
   Server started at port 8000
   ```

2. **Make a Request Using Postman or a Browser:**

   - **Example GET Request:**

     ```
     GET http://localhost:8000/api/users
     ```

3. **Check the `log.txt` File:**

   After making the request, open the `log.txt` file in your project directory. You should see an entry similar to:

   ```
   9/28/2024, 10:15:30 AM: GET /api/users
   ```

   This entry indicates the date and time of the request, the HTTP method used, and the request path.

## Advantages of Using Middleware

- **Modularity:** Middleware allows you to separate concerns, making your codebase more organized and maintainable.
- **Reusability:** Common functionalities like logging, authentication, and error handling can be implemented once and reused across multiple routes.
- **Flexibility:** You can easily add, remove, or modify middleware to change how your application handles requests.

## Summary

In this section, you've learned about:

- **Middleware in Express.js:** Understanding what middleware is and how it fits into the request-response cycle.
- **Implementing a Logging Middleware:** Creating a middleware function that logs request details to a file.
- **Middleware Execution Order:** Ensuring middleware is defined before routes to guarantee it runs for every incoming request.
- **Advantages of Middleware:** Enhancing the modularity, reusability, and flexibility of your Express.js applications.

By effectively utilizing middleware, you can build robust and scalable server-side applications with Express.js.

# MongoDB Commands Guide

MongoDB is a powerful NoSQL database known for its flexibility, scalability, and performance. This guide provides a comprehensive overview of essential MongoDB commands, covering everything from installation to advanced operations. Whether you're a beginner or looking to refresh your knowledge, this guide will help you navigate MongoDB effectively.

---

## Table of Contents

1. [Installation and Setup](#installation-and-setup)
2. [Basic Commands](#basic-commands)
3. [CRUD Operations](#crud-operations)
4. [Indexes](#indexes)
5. [Aggregation](#aggregation)
6. [User Management](#user-management)
7. [Backup and Restore](#backup-and-restore)
8. [Administration Commands](#administration-commands)
9. [Additional Resources](#additional-resources)

---

## Installation and Setup

Before diving into MongoDB commands, ensure that MongoDB is installed and properly set up on your machine.

### Installing MongoDB

#### Using Official Packages

1. **Download MongoDB:**
   - Visit the [MongoDB Download Center](https://www.mongodb.com/try/download/community) and select the appropriate version for your operating system.

2. **Install MongoDB:**
   - Follow the installation instructions specific to your OS:
     - **Windows:** Use the MSI installer.
     - **macOS:** Use Homebrew or download the `.tgz` file.
     - **Linux:** Use package managers like `apt`, `yum`, or download the `.tgz` file.

### Connecting to MongoDB

Use the `mongo` shell to connect to your MongoDB instance.

```bash
mongo
```

By default, this connects to `mongodb://localhost:27017`.

---

## Basic Commands

### Starting the Mongo Shell

```bash
mongo
```

### Exiting the Mongo Shell

```javascript
exit
```

### Displaying Available Databases

```javascript
show dbs
```

### Creating or Switching to a Database

```javascript
use myDatabase
```

- **Note:** MongoDB creates the database when you first store data in it.

### Displaying Current Database

```javascript
db
```

### Dropping a Database

```javascript
db.dropDatabase()
```

### Displaying Collections in a Database

```javascript
show collections
```

### Dropping a Collection

```javascript
db.myCollection.drop()
```

---

## CRUD Operations

CRUD stands for Create, Read, Update, and Delete. These operations are fundamental for interacting with MongoDB.

### Create

#### Inserting a Single Document

```javascript
db.users.insertOne({
    name: "John Doe",
    email: "john.doe@example.com",
    age: 30
})
```

#### Inserting Multiple Documents

```javascript
db.users.insertMany([
    {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        age: 25
    },
    {
        name: "Bob Johnson",
        email: "bob.johnson@example.com",
        age: 35
    }
])
```

### Read

#### Finding All Documents in a Collection

```javascript
db.users.find()
```

#### Pretty Print Results

```javascript
db.users.find().pretty()
```

#### Finding Documents with Specific Criteria

```javascript
db.users.find({ age: { $gt: 25 } })
```

#### Selecting Specific Fields

```javascript
db.users.find({ age: { $gt: 25 } }, { name: 1, email: 1, _id: 0 })
```

### Update

#### Updating a Single Document

```javascript
db.users.updateOne(
    { name: "John Doe" },
    { $set: { age: 31 } }
)
```

#### Updating Multiple Documents

```javascript
db.users.updateMany(
    { age: { $lt: 30 } },
    { $set: { status: "active" } }
)
```

#### Renaming a Field

```javascript
db.users.updateOne(
    { name: "Jane Smith" },
    { $rename: { email: "contactEmail" } }
)
```

### Delete

#### Deleting a Single Document

```javascript
db.users.deleteOne({ name: "Bob Johnson" })
```

#### Deleting Multiple Documents

```javascript
db.users.deleteMany({ status: "inactive" })
```

---

## Indexes

Indexes improve the efficiency of query operations in MongoDB.

### Creating an Index

```javascript
db.users.createIndex({ email: 1 })
```

- **`1`**: Ascending order.
- **`-1`**: Descending order.

### Listing All Indexes in a Collection

```javascript
db.users.getIndexes()
```

### Dropping an Index

```javascript
db.users.dropIndex("email_1")
```

### Creating a Compound Index

```javascript
db.users.createIndex({ name: 1, age: -1 })
```

### Creating a Unique Index

```javascript
db.users.createIndex({ email: 1 }, { unique: true })
```

---

## Aggregation

Aggregation operations process data records and return computed results. MongoDB provides the aggregation framework for data aggregation.

### Basic Aggregation Pipeline

```javascript
db.orders.aggregate([
    { $match: { status: "shipped" } },
    { $group: { _id: "$customerId", total: { $sum: "$amount" } } }
])
```

### Common Aggregation Stages

1. **`$match`**: Filters documents.
2. **`$group`**: Groups documents by a specified identifier.
3. **`$sort`**: Sorts documents.
4. **`$project`**: Reshapes documents by including or excluding fields.
5. **`$limit`**: Limits the number of documents.
6. **`$skip`**: Skips a specified number of documents.

### Example: Grouping and Sorting

```javascript
db.sales.aggregate([
    { $group: { _id: "$product", totalSales: { $sum: "$quantity" } } },
    { $sort: { totalSales: -1 } }
])
```

### Using `$lookup` for Joins

```javascript
db.orders.aggregate([
    {
        $lookup:
            {
                from: "customers",
                localField: "customerId",
                foreignField: "id",
                as: "customerDetails"
            }
    }
])
```

---

## User Management

Managing users and roles is crucial for database security.

### Creating an Administrative User

```javascript
use admin

db.createUser({
    user: "adminUser",
    pwd: "securePassword",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
})
```

### Creating a Database-Specific User

```javascript
use myDatabase

db.createUser({
    user: "dbUser",
    pwd: "anotherSecurePassword",
    roles: [ { role: "readWrite", db: "myDatabase" } ]
})
```

### Listing All Users

```javascript
db.getUsers()
```

### Updating a User's Password

```javascript
db.updateUser(
    "dbUser",
    { pwd: "newSecurePassword" }
)
```

### Deleting a User

```javascript
db.dropUser("dbUser")
```

---

## Backup and Restore

Ensuring data integrity through backups is essential.

### Backup Using `mongodump`

```bash
mongodump --db myDatabase --out /path/to/backup/
```

- **`--db`**: Specifies the database to dump.
- **`--out`**: Specifies the output directory.

### Restore Using `mongorestore`

```bash
mongorestore --db myDatabase /path/to/backup/myDatabase
```

- **`--db`**: Specifies the database to restore.
- **`/path/to/backup/myDatabase`**: Path to the backup files.

### Backup Entire MongoDB Instance

```bash
mongodump --out /path/to/backup/
```

### Restore Entire MongoDB Instance

```bash
mongorestore /path/to/backup/
```

---

## Administration Commands

Managing the MongoDB server involves various administrative tasks.

### Checking Server Status

```javascript
db.serverStatus()
```

### Displaying Current Operations

```javascript
db.currentOp()
```

### Viewing Replication Status

```javascript
rs.status()
```

### Initiating Replication

```javascript
rs.initiate()
```

### Adding a Member to a Replica Set

```javascript
rs.add("hostname:port")
```

### Removing a Member from a Replica Set

```javascript
rs.remove("hostname:port")
```

### Sharding Commands

#### Enabling Sharding on a Database

```javascript
sh.enableSharding("myDatabase")
```

#### Sharding a Collection

```javascript
sh.shardCollection("myDatabase.myCollection", { shardKey: 1 })
```

---

## Additional Resources

- [Official MongoDB Documentation](https://docs.mongodb.com/)
- [MongoDB University](https://university.mongodb.com/)
- [MongoDB Shell Commands](https://docs.mongodb.com/manual/reference/mongo-shell/)
- [MongoDB CRUD Operations](https://docs.mongodb.com/manual/crud/)

---

## Summary

This guide covered essential MongoDB commands, including:

- **Installation and Setup**: Installing MongoDB and starting the service.
- **Basic Commands**: Navigating databases and collections.
- **CRUD Operations**: Creating, reading, updating, and deleting documents.
- **Indexes**: Improving query performance.
- **Aggregation**: Processing and analyzing data.
- **User Management**: Securing your databases.
- **Backup and Restore**: Ensuring data integrity.
- **Administration Commands**: Managing the MongoDB server.

By mastering these commands, you'll be well-equipped to handle a wide range of tasks in MongoDB, from basic data manipulation to complex data processing and server management.

# Getting Started with Mongoose Package to Connect Your Project with MongoDB

Mongoose is an elegant MongoDB object modeling tool designed to work in an asynchronous environment. It provides a straightforward, schema-based solution to model your application data, offering built-in type casting, validation, query building, and more.

In this guide, we'll walk through the steps to integrate Mongoose into your Node.js project, define schemas and models, and perform CRUD operations using Express.js routes.

## Table of Contents

1. [Installation](#installation)
2. [Connecting to MongoDB](#connecting-to-mongodb)
3. [Defining Schemas and Models](#defining-schemas-and-models)
4. [CRUD Operations with Mongoose](#crud-operations-with-mongoose)
    - [Creating Entries](#creating-entries)
    - [Reading Entries](#reading-entries)
    - [Updating Entries](#updating-entries)
    - [Deleting Entries](#deleting-entries)
5. [Testing with Postman](#testing-with-postman)
6. [Viewing Data in MongoDB Shell](#viewing-data-in-mongodb-shell)
7. [Complete Server Example](#complete-server-example)
8. [Summary](#summary)

---

## Installation

First, install Mongoose using npm:

```bash
npm install mongoose
```

Ensure that you have already initialized your Node.js project with `npm init` and have Express.js set up.

## Connecting to MongoDB

To connect your project to MongoDB using Mongoose, add the following code snippet to your server file (e.g., `server.js`):

```javascript
const mongoose = require("mongoose");

// Connection
mongoose.connect("mongodb://localhost:27017/DB-Name", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected!!"))
.catch((err) => console.log("Mongo Error:", err));
```

- **`mongoose.connect`**: Establishes a connection to the MongoDB database.
- **`mongodb://localhost:27017/DB-Name`**: Replace `DB-Name` with your desired database name. If the database doesn't exist, MongoDB will create it upon first data insertion.
- **Options**:
  - **`useNewUrlParser`**: Uses the new URL string parser.
  - **`useUnifiedTopology`**: Uses the new Server Discover and Monitoring engine.

## Defining Schemas and Models

### Schema

A Mongoose schema defines the structure of the documents within a collection. Here's how to define a `User` schema:

```javascript
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    jobTitle: {
        type: String,
    },
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically
```

- **`timestamps: true`**: Automatically adds `createdAt` and `updatedAt` fields to the schema.

### Model

A Mongoose model provides an interface to interact with the database for a specific collection. Create a `User` model based on the schema:

```javascript
const User = mongoose.model("User", userSchema);
```

- **`"User"`**: The name of the model. Mongoose will create a collection named `users` (pluralized) in the database.

## CRUD Operations with Mongoose

### Creating Entries

To create new user entries in the database, define a POST route in your Express.js application:

```javascript
// Creating entries in the database
app.post("/api/users", async (req, res) => {
    const body = req.body;

    // Validate request body
    if (
        !body ||
        !body.firstName ||
        !body.lastName ||
        !body.email ||
        !body.gender ||
        !body.jobTitle
    ) {
        return res.status(400).json({ msg: "All fields are required!!!" });
    }

    try {
        // Create a new user
        await User.create({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            gender: body.gender,
            jobTitle: body.jobTitle,
        });

        return res.status(201).json({ msg: "Success" });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
});
```

- **Validation**: Ensures all required fields are present in the request body.
- **`User.create`**: Creates and saves a new user document in the database.

### Reading Entries

#### Fetching All Users

To retrieve all user entries from the database:

```javascript
// Showing entries from the database
app.get("/api/users", async (req, res) => {
    try {
        const allDbUsers = await User.find({});
        res.setHeader("X-Myname", "Sobhanjan Mahanta"); // Custom Header (Always add 'X' to custom headers)
        return res.json(allDbUsers);
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
});
```

- **`User.find({})`**: Retrieves all documents in the `users` collection.
- **Custom Header**: Adds a custom header `X-Myname` to the response.

#### Rendering Users in HTML

To display users in an HTML format:

```javascript
// Showing specific information from the database
app.get("/users", async (req, res) => {
    try {
        const allDbUsers = await User.find({});
        const html = `
        <ul>
            ${allDbUsers
                .map((user) => `<li>${user.firstName} - ${user.email}</li>`)
                .join("")}
        </ul>
        `;

        res.send(html);
    } catch (error) {
        console.error("Error rendering users:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
});
```

- **HTML Response**: Generates an unordered list of users with their first names and emails.

#### Fetching a User by ID

```javascript
// Showing information by ID
app.get("/api/users/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: "User not found" });
        return res.json(user);
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
});
```

- **`User.findById`**: Retrieves a user document by its unique ID.
- **Error Handling**: Returns a 404 error if the user is not found.

### Updating Entries

#### Updating a User by ID

```javascript
// Updating information by ID
app.patch("/api/users/:id", async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { lastName: "Changed" },
            { new: true } // Returns the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.json({ status: "Success", user: updatedUser });
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
});
```

- **`User.findByIdAndUpdate`**: Updates a user document by its ID.
- **Options**:
  - **`new: true`**: Returns the updated document instead of the original.

### Deleting Entries

#### Deleting a User by ID

```javascript
// Deleting information by ID
app.delete("/api/users/:id", async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.json({ status: "Success", msg: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
});
```

- **`User.findByIdAndDelete`**: Deletes a user document by its ID.
- **Response**: Confirms successful deletion.

## Testing with Postman

To test your API endpoints, use Postman to send HTTP requests.

### Creating a User (POST)

1. **URL**: `http://localhost:8000/api/users`
2. **Method**: POST
3. **Headers**:
   - `Content-Type`: `application/json`
4. **Body**:
   ```json
   {
       "firstName": "Alice",
       "lastName": "Johnson",
       "email": "alice.johnson@example.com",
       "gender": "Female",
       "jobTitle": "Software Engineer"
   }
   ```
5. **Response**:
   ```json
   {
       "msg": "Success"
   }
   ```

### Fetching All Users (GET)

1. **URL**: `http://localhost:8000/api/users`
2. **Method**: GET
3. **Headers**:
   - `X-Myname`: `Sobhanjan Mahanta` (automatically added by the server)
4. **Response**:
   ```json
   [
       {
           "_id": "64a7f9b5e1b4c2f1d4e6f8a9",
           "firstName": "Alice",
           "lastName": "Johnson",
           "email": "alice.johnson@example.com",
           "gender": "Female",
           "jobTitle": "Software Engineer",
           "createdAt": "2023-10-10T10:00:00.000Z",
           "updatedAt": "2023-10-10T10:00:00.000Z",
           "__v": 0
       },
       // More users...
   ]
   ```

### Fetching a User by ID (GET)

1. **URL**: `http://localhost:8000/api/users/<user_id>`
2. **Method**: GET
3. **Response**:
   ```json
   {
       "_id": "64a7f9b5e1b4c2f1d4e6f8a9",
       "firstName": "Alice",
       "lastName": "Johnson",
       "email": "alice.johnson@example.com",
       "gender": "Female",
       "jobTitle": "Software Engineer",
       "createdAt": "2023-10-10T10:00:00.000Z",
       "updatedAt": "2023-10-10T10:00:00.000Z",
       "__v": 0
   }
   ```

### Updating a User (PATCH)

1. **URL**: `http://localhost:8000/api/users/<user_id>`
2. **Method**: PATCH
3. **Body**:
   ```json
   {
       "lastName": "Smith"
   }
   ```
4. **Response**:
   ```json
   {
       "status": "Success",
       "user": {
           "_id": "64a7f9b5e1b4c2f1d4e6f8a9",
           "firstName": "Alice",
           "lastName": "Smith",
           "email": "alice.johnson@example.com",
           "gender": "Female",
           "jobTitle": "Software Engineer",
           "createdAt": "2023-10-10T10:00:00.000Z",
           "updatedAt": "2023-10-10T10:05:00.000Z",
           "__v": 0
       }
   }
   ```

### Deleting a User (DELETE)

1. **URL**: `http://localhost:8000/api/users/<user_id>`
2. **Method**: DELETE
3. **Response**:
   ```json
   {
       "status": "Success",
       "msg": "User deleted successfully"
   }
   ```

## Viewing Data in MongoDB Shell

After performing CRUD operations, you can view the data directly in the MongoDB shell.

### Steps:

1. **Switch to Your Database**:

    ```bash
    use DB-Name
    ```

2. **Show Collections**:

    ```bash
    show collections
    ```

3. **Find All Users**:

    ```javascript
    db.users.find({})
    ```

    **Pretty Print**:

    ```javascript
    db.users.find({}).pretty()
    ```

## Complete Server Example

Below is the complete `server.js` file integrating Mongoose with Express.js for handling CRUD operations.

```javascript
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 8000;

// Middleware to parse URL-encoded and JSON data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connecting to MongoDB
mongoose.connect("mongodb://localhost:27017/DB-Name", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected!!"))
.catch((err) => console.log("Mongo Error:", err));

// Schema Definition
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    jobTitle: {
        type: String,
    },
}, { timestamps: true });

// Model Creation
const User = mongoose.model("User", userSchema);

// Creating Entries in Database
app.post("/api/users", async (req, res) => {
    const body = req.body;

    // Validate request body
    if (
        !body ||
        !body.firstName ||
        !body.lastName ||
        !body.email ||
        !body.gender ||
        !body.jobTitle
    ) {
        return res.status(400).json({ msg: "All fields are required!!!" });
    }

    try {
        // Create a new user
        await User.create({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            gender: body.gender,
            jobTitle: body.jobTitle,
        });

        return res.status(201).json({ msg: "Success" });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
});

// Fetching All Users
app.get("/api/users", async (req, res) => {
    try {
        const allDbUsers = await User.find({});
        res.setHeader("X-Myname", "Sobhanjan Mahanta"); // Custom Header
        return res.json(allDbUsers);
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
});

// Rendering Users in HTML
app.get("/users", async (req, res) => {
    try {
        const allDbUsers = await User.find({});
        const html = `
        <ul>
            ${allDbUsers
                .map((user) => `<li>${user.firstName} - ${user.email}</li>`)
                .join("")}
        </ul>
        `;

        res.send(html);
    } catch (error) {
        console.error("Error rendering users:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
});

// Fetching a User by ID
app.get("/api/users/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: "User not found" });
        return res.json(user);
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
});

// Updating a User by ID
app.patch("/api/users/:id", async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { lastName: "Changed" },
            { new: true } // Returns the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.json({ status: "Success", user: updatedUser });
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
});

// Deleting a User by ID
app.delete("/api/users/:id", async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.json({ status: "Success", msg: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
});

// Starting the Server
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
```

### Explanation of the Complete Server Example

1. **Imports and Setup**:
    - **Express.js**: Framework for building web applications.
    - **Mongoose**: ODM for MongoDB.
    - **Middleware**: Parses incoming request bodies in a middleware before your handlers.

2. **Connecting to MongoDB**:
    - Establishes a connection to the MongoDB database named `DB-Name`.

3. **Schema and Model**:
    - Defines the `User` schema with fields: `firstName`, `lastName`, `email`, and `jobTitle`.
    - Creates the `User` model based on the schema.

4. **Routes**:
    - **POST `/api/users`**: Creates a new user after validating the request body.
    - **GET `/api/users`**: Retrieves all users and sets a custom header.
    - **GET `/users`**: Renders users in an HTML unordered list.
    - **GET `/api/users/:id`**: Retrieves a user by their unique ID.
    - **PATCH `/api/users/:id`**: Updates a user's `lastName` by their ID.
    - **DELETE `/api/users/:id`**: Deletes a user by their ID.

5. **Starting the Server**:
    - Listens on port `8000` and logs a confirmation message upon successful startup.

## Summary

In this guide, you've learned how to integrate Mongoose into your Node.js and Express.js project to interact with MongoDB effectively. The key takeaways include:

- **Installation**: Setting up Mongoose using npm.
- **Connection**: Establishing a connection to a MongoDB database.
- **Schema and Model**: Defining data structures and creating models to interact with collections.
- **CRUD Operations**: Implementing Create, Read, Update, and Delete functionalities using Express.js routes.
- **Testing**: Using Postman to test your API endpoints.
- **Data Verification**: Viewing and verifying data directly in the MongoDB shell.

By leveraging Mongoose, you can streamline your database interactions, enforce data schemas, and build scalable and maintainable applications with ease.

# Structuring Your Node.js Project with MVC Architecture

Adopting the **Model-View-Controller (MVC)** architecture for your Node.js and Express.js project can significantly enhance the scalability, maintainability, and organization of your codebase. MVC separates your application into three interconnected components:

- **Model**: Manages data and business logic.
- **View**: Handles the presentation layer (often minimal in API-centric applications).
- **Controller**: Processes incoming requests, interacts with models, and returns responses.

In this guide, we'll restructure your existing code into an MVC architecture, providing a clear directory structure and organized code snippets for each component.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Installation and Setup](#installation-and-setup)
3. [Connecting to MongoDB with Mongoose](#connecting-to-mongodb-with-mongoose)
4. [Defining the Model](#defining-the-model)
5. [Creating Controllers](#creating-controllers)
6. [Setting Up Routes](#setting-up-routes)
7. [Middleware](#middleware)
8. [Server Initialization](#server-initialization)
9. [Testing with Postman](#testing-with-postman)
10. [Summary](#summary)

---

## Project Structure

A well-organized project structure is crucial for maintaining a scalable application. Here's a recommended MVC directory layout for your Node.js project:

```
my-mvc-project/
├── controllers/
│   └── userController.js
├── models/
│   └── userModel.js
├── routes/
│   └── userRoutes.js
├── middleware/
│   └── logger.js
├── config/
│   └── db.js
├── utils/
│   └── responseHandler.js
├── .env
├── package.json
├── server.js
└── README.md
```

### Directory Breakdown

- **controllers/**: Contains controller files that handle request logic.
- **models/**: Contains Mongoose schemas and models.
- **routes/**: Defines application routes and associates them with controllers.
- **middleware/**: Contains custom middleware functions.
- **config/**: Holds configuration files, such as database connections.
- **utils/**: Utility functions or helpers.
- **.env**: Environment variables.
- **server.js**: Entry point of the application.
- **README.md**: Project documentation.

---

## Installation and Setup

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v12 or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance)

### Initialize the Project

1. **Create Project Directory**

   ```bash
   mkdir my-mvc-project
   cd my-mvc-project
   ```

2. **Initialize npm**

   ```bash
   npm init -y
   ```

3. **Install Dependencies**

   ```bash
   npm install express mongoose dotenv
   ```

4. **Install Development Dependencies**

   ```bash
   npm install --save-dev nodemon
   ```

5. **Configure `package.json`**

   Add a start script for development using `nodemon`:

   ```json
   // package.json
   {
     "name": "my-mvc-project",
     "version": "1.0.0",
     "description": "",
     "main": "server.js",
     "scripts": {
       "start": "node server.js",
       "dev": "nodemon server.js"
     },
     // ... other configurations
   }
   ```

6. **Create `.env` File**

   Store environment variables securely.

   ```env
   PORT=8000
   MONGODB_URI=mongodb://localhost:27017/DB-Name
   ```

---

## Connecting to MongoDB with Mongoose

### Configuration File

Create a `config` directory and add a `db.js` file to manage the database connection.

```bash
mkdir config
touch config/db.js
```

```javascript
// config/db.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Connected!!");
    } catch (err) {
        console.error("MongoDB Connection Error:", err);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
```

### Integrate Database Connection

Modify `server.js` to connect to MongoDB when the server starts.

```javascript
// server.js
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const logger = require("./middleware/logger");

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse URL-encoded and JSON data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Custom Logging Middleware
app.use(logger);

// Routes
app.use("/api/users", userRoutes);

// Root Route
app.get("/", (req, res) => {
    res.send("Welcome to the MVC Structured API!");
});

// Error Handling Middleware (Optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});

// Start the Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
```

---

## Defining the Model

Create a `models` directory and define the `User` model using Mongoose.

```bash
mkdir models
touch models/userModel.js
```

```javascript
// models/userModel.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, "Email is invalid"],
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        default: "Other",
    },
    jobTitle: {
        type: String,
        trim: true,
    },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt

const User = mongoose.model("User", userSchema);

module.exports = User;
```

**Explanation:**

- **Schema Fields**:
  - **`firstName`**: Required string with trimming.
  - **`lastName`**: Optional string with trimming.
  - **`email`**: Required, unique, lowercase string with validation.
  - **`gender`**: Enumerated string with default value.
  - **`jobTitle`**: Optional string with trimming.
- **Timestamps**: Adds `createdAt` and `updatedAt` fields automatically.

---

## Creating Controllers

Controllers handle the logic for each route. Create a `controllers` directory and define `userController.js`.

```bash
mkdir controllers
touch controllers/userController.js
```

```javascript
// controllers/userController.js
const User = require("../models/userModel");

// Create a new user
exports.createUser = async (req, res) => {
    const { firstName, lastName, email, gender, jobTitle } = req.body;

    // Validate required fields
    if (!firstName || !email) {
        return res.status(400).json({ msg: "First name and email are required!" });
    }

    try {
        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ msg: "Email already exists!" });
        }

        // Create new user
        const user = await User.create({
            firstName,
            lastName,
            email,
            gender,
            jobTitle,
        });

        return res.status(201).json({ msg: "User created successfully", user });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.setHeader("X-Developer", "Your Name"); // Custom Header
        return res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

// Get user by ID
exports.getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ error: "User not found" });
        return res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

// Update user by ID
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        if (!updatedUser) return res.status(404).json({ error: "User not found" });
        return res.status(200).json({ msg: "User updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

// Delete user by ID
exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) return res.status(404).json({ error: "User not found" });
        return res.status(200).json({ msg: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};
```

**Explanation:**

- **`createUser`**: Validates input, checks for existing email, and creates a new user.
- **`getAllUsers`**: Retrieves all users and sets a custom header.
- **`getUserById`**: Fetches a user by their unique ID.
- **`updateUser`**: Updates user details by ID with validation.
- **`deleteUser`**: Deletes a user by ID.

---

## Setting Up Routes

Routes define the endpoints and associate them with corresponding controller functions. Create a `routes` directory and define `userRoutes.js`.

```bash
mkdir routes
touch routes/userRoutes.js
```

```javascript
// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Create a new user
router.post("/", userController.createUser);

// Get all users
router.get("/", userController.getAllUsers);

// Get a user by ID
router.get("/:id", userController.getUserById);

// Update a user by ID
router.patch("/:id", userController.updateUser);

// Delete a user by ID
router.delete("/:id", userController.deleteUser);

module.exports = router;
```

**Explanation:**

- **`POST /api/users`**: Create a new user.
- **`GET /api/users`**: Retrieve all users.
- **`GET /api/users/:id`**: Retrieve a user by ID.
- **`PATCH /api/users/:id`**: Update a user by ID.
- **`DELETE /api/users/:id`**: Delete a user by ID.

---

## Middleware

Middleware functions process requests before they reach the route handlers. Create a `middleware` directory and define `logger.js` for logging purposes.

```bash
mkdir middleware
touch middleware/logger.js
```

```javascript
// middleware/logger.js
const fs = require("fs");
const path = require("path");

const logger = (req, res, next) => {
    const logEntry = `${new Date().toLocaleString()}: ${req.method} ${req.originalUrl}\n`;

    fs.appendFile(path.join(__dirname, "..", "log.txt"), logEntry, (err) => {
        if (err) {
            console.error("Failed to write to log file:", err);
        }
        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = logger;
```

**Explanation:**

- **Logging Middleware**:
  - **`req.method`**: HTTP method (GET, POST, etc.).
  - **`req.originalUrl`**: The requested URL.
  - **Logs**: Appends each request's method and URL with a timestamp to `log.txt`.
  - **Error Handling**: Logs errors if writing to the file fails.
  - **`next()`**: Passes control to the next middleware or route handler.

---

## Server Initialization

Ensure that your `server.js` correctly initializes the application with MVC components.

```javascript
// server.js
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const logger = require("./middleware/logger");

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse URL-encoded and JSON data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Custom Logging Middleware
app.use(logger);

// Routes
app.use("/api/users", userRoutes);

// Root Route
app.get("/", (req, res) => {
    res.send("Welcome to the MVC Structured API!");
});

// Error Handling Middleware (Optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});

// Start the Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
```

**Key Points:**

- **Environment Variables**: Managed via `.env` and `dotenv`.
- **Database Connection**: Established before handling requests.
- **Middleware**: Parsed request bodies and custom logging.
- **Routes**: Organized under `/api/users`.
- **Error Handling**: Catches and responds to unexpected errors.
- **Server Startup**: Listens on the specified port.

---

## Testing with Postman

Use Postman to interact with your API endpoints and verify their functionality.

### 1. Creating a User (POST)

- **URL**: `http://localhost:8000/api/users`
- **Method**: `POST`
- **Headers**:
  - `Content-Type`: `application/json`
- **Body**:
  ```json
  {
      "firstName": "Alice",
      "lastName": "Johnson",
      "email": "alice.johnson@example.com",
      "gender": "Female",
      "jobTitle": "Software Engineer"
  }
  ```
- **Response**:
  ```json
  {
      "msg": "User created successfully",
      "user": {
          "_id": "64a7f9b5e1b4c2f1d4e6f8a9",
          "firstName": "Alice",
          "lastName": "Johnson",
          "email": "alice.johnson@example.com",
          "gender": "Female",
          "jobTitle": "Software Engineer",
          "createdAt": "2024-09-28T10:00:00.000Z",
          "updatedAt": "2024-09-28T10:00:00.000Z",
          "__v": 0
      }
  }
  ```

### 2. Fetching All Users (GET)

- **URL**: `http://localhost:8000/api/users`
- **Method**: `GET`
- **Headers**:
  - `X-Developer`: `Your Name` (automatically added by the server)
- **Response**:
  ```json
  [
      {
          "_id": "64a7f9b5e1b4c2f1d4e6f8a9",
          "firstName": "Alice",
          "lastName": "Johnson",
          "email": "alice.johnson@example.com",
          "gender": "Female",
          "jobTitle": "Software Engineer",
          "createdAt": "2024-09-28T10:00:00.000Z",
          "updatedAt": "2024-09-28T10:00:00.000Z",
          "__v": 0
      },
      // More users...
  ]
  ```

### 3. Fetching a User by ID (GET)

- **URL**: `http://localhost:8000/api/users/<user_id>`
- **Method**: `GET`
- **Response**:
  ```json
  {
      "_id": "64a7f9b5e1b4c2f1d4e6f8a9",
      "firstName": "Alice",
      "lastName": "Johnson",
      "email": "alice.johnson@example.com",
      "gender": "Female",
      "jobTitle": "Software Engineer",
      "createdAt": "2024-09-28T10:00:00.000Z",
      "updatedAt": "2024-09-28T10:00:00.000Z",
      "__v": 0
  }
  ```

### 4. Updating a User (PATCH)

- **URL**: `http://localhost:8000/api/users/<user_id>`
- **Method**: `PATCH`
- **Headers**:
  - `Content-Type`: `application/json`
- **Body**:
  ```json
  {
      "lastName": "Smith"
  }
  ```
- **Response**:
  ```json
  {
      "msg": "User updated successfully",
      "user": {
          "_id": "64a7f9b5e1b4c2f1d4e6f8a9",
          "firstName": "Alice",
          "lastName": "Smith",
          "email": "alice.johnson@example.com",
          "gender": "Female",
          "jobTitle": "Software Engineer",
          "createdAt": "2024-09-28T10:00:00.000Z",
          "updatedAt": "2024-09-28T10:05:00.000Z",
          "__v": 0
      }
  }
  ```

### 5. Deleting a User (DELETE)

- **URL**: `http://localhost:8000/api/users/<user_id>`
- **Method**: `DELETE`
- **Response**:
  ```json
  {
      "msg": "User deleted successfully"
  }
  ```

---

## Viewing Data in MongoDB Shell

After performing CRUD operations, verify your data using the MongoDB shell.

### Steps:

1. **Access MongoDB Shell**

   ```bash
   mongo
   ```

2. **Switch to Your Database**

   ```javascript
   use DB-Name
   ```

3. **Show Collections**

   ```javascript
   show collections
   ```

   **Output:**

   ```
   users
   ```

4. **Find All Users**

   ```javascript
   db.users.find({}).pretty()
   ```

   **Output:**

   ```json
   {
       "_id" : ObjectId("64a7f9b5e1b4c2f1d4e6f8a9"),
       "firstName" : "Alice",
       "lastName" : "Smith",
       "email" : "alice.johnson@example.com",
       "gender" : "Female",
       "jobTitle" : "Software Engineer",
       "createdAt" : ISODate("2024-09-28T10:00:00Z"),
       "updatedAt" : ISODate("2024-09-28T10:05:00Z"),
       "__v" : 0
   }
   ```

---

## Complete Server Example

Below is the complete `server.js` file integrating all MVC components.

```javascript
// server.js
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const logger = require("./middleware/logger");

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse URL-encoded and JSON data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Custom Logging Middleware
app.use(logger);

// Routes
app.use("/api/users", userRoutes);

// Root Route
app.get("/", (req, res) => {
    res.send("Welcome to the MVC Structured API!");
});

// Error Handling Middleware (Optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});

// Start the Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
```

### Additional Files

#### 1. `.env`

```env
PORT=8000
MONGODB_URI=mongodb://localhost:27017/DB-Name
```

#### 2. `config/db.js`

```javascript
// config/db.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Connected!!");
    } catch (err) {
        console.error("MongoDB Connection Error:", err);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
```

#### 3. `models/userModel.js`

```javascript
// models/userModel.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, "Email is invalid"],
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        default: "Other",
    },
    jobTitle: {
        type: String,
        trim: true,
    },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt

const User = mongoose.model("User", userSchema);

module.exports = User;
```

#### 4. `controllers/userController.js`

```javascript
// controllers/userController.js
const User = require("../models/userModel");

// Create a new user
exports.createUser = async (req, res) => {
    const { firstName, lastName, email, gender, jobTitle } = req.body;

    // Validate required fields
    if (!firstName || !email) {
        return res.status(400).json({ msg: "First name and email are required!" });
    }

    try {
        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ msg: "Email already exists!" });
        }

        // Create new user
        const user = await User.create({
            firstName,
            lastName,
            email,
            gender,
            jobTitle,
        });

        return res.status(201).json({ msg: "User created successfully", user });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.setHeader("X-Developer", "Your Name"); // Custom Header
        return res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

// Get user by ID
exports.getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ error: "User not found" });
        return res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

// Update user by ID
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        if (!updatedUser) return res.status(404).json({ error: "User not found" });
        return res.status(200).json({ msg: "User updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

// Delete user by ID
exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) return res.status(404).json({ error: "User not found" });
        return res.status(200).json({ msg: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};
```

#### 5. `routes/userRoutes.js`

```javascript
// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Create a new user
router.post("/", userController.createUser);

// Get all users
router.get("/", userController.getAllUsers);

// Get a user by ID
router.get("/:id", userController.getUserById);

// Update a user by ID
router.patch("/:id", userController.updateUser);

// Delete a user by ID
router.delete("/:id", userController.deleteUser);

module.exports = router;
```

#### 6. `middleware/logger.js`

```javascript
// middleware/logger.js
const fs = require("fs");
const path = require("path");

const logger = (req, res, next) => {
    const logEntry = `${new Date().toLocaleString()}: ${req.method} ${req.originalUrl}\n`;

    fs.appendFile(path.join(__dirname, "..", "log.txt"), logEntry, (err) => {
        if (err) {
            console.error("Failed to write to log file:", err);
        }
        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = logger;
```

---

## Testing with Postman

After restructuring your project, use Postman to test the API endpoints as described earlier. Ensure that each route behaves as expected:

1. **Create User**: `POST /api/users`
2. **Get All Users**: `GET /api/users`
3. **Get User by ID**: `GET /api/users/:id`
4. **Update User**: `PATCH /api/users/:id`
5. **Delete User**: `DELETE /api/users/:id`

**Note**: Replace `<user_id>` with the actual `_id` of a user document.

---

## Summary

By restructuring your Node.js project using the MVC architecture, you've achieved:

- **Separation of Concerns**: Each component (Model, View, Controller) handles distinct responsibilities.
- **Scalability**: Easily add new features or modify existing ones without disrupting the entire codebase.
- **Maintainability**: Organized directories and files make the project easier to navigate and manage.
- **Reusability**: Controllers and models can be reused across different parts of the application.

**Key Takeaways:**

- **Models**: Define data structures and interact with the database using Mongoose.
- **Controllers**: Handle request logic, interact with models, and send responses.
- **Routes**: Map HTTP endpoints to controller functions.
- **Middleware**: Implement reusable functions like logging, authentication, etc.
- **Configuration**: Manage environment variables and database connections separately.
- **Testing**: Use tools like Postman to verify API functionality.

Adopting the MVC pattern not only makes your application more organized but also sets a solid foundation for future enhancements and team collaborations.