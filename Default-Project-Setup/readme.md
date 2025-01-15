# Default Project Setup

## Configuring Project Dependencies

* Install [Node.js](https://nodejs.org/en/download).
* Navigate to project folder.
* Run the following commands.

```
npm init
```

* Run the following command to install lite-server.
```
npm install --save-dev lite-server
```

* Modify start script in package.json.
```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "lite-server"
}
```

* **package.json** is already configured. Conversely, just run `npm install` with package.json in project folder.

## Compiling TypeScript
```
tsc app.ts
```