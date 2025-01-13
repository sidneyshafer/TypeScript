# Default Project Setup

## Configuring Project Dependencies

* Install [Node.js](https://nodejs.org/en/download).
* Navigate to project folder.
* Run the following commands.

```javascript
npm init
```

* Run the following command to install lite-server.
```javascript
npm install --save-dev lite-server
```

* Modify start script in package.json.
```javascript
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "lite-server"
}
```

* **package.json** is already configured. Conversely, just run `npm install` with package.json in project folder.