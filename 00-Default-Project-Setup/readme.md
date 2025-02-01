## Default Project Setup

* [Configuring Project Dependencies](#configuring-project-dependencies)
* [Compiling TypeScript](#compiling-typescript)

### Configuring Project Dependencies

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
    ...
}
```
* Start the lite development server:
```
npm start
```

* **package.json** is already configured. Conversely, just run `npm install` with `package.json` in project folder.

### Compiling TypeScript

Compile a single TypeScript file:
```
tsc app.ts
```

Compile all TypeScript files in project:
```
tsc
```

Starting TypeScript compilation in watch mode:
```
tsc -w
```

> [!TIP]
> More on the TypeScript compiler in [TypeScript Compiler](/03-TypeScript-Compiler).

<kbd> <br> [Back to Top](#default-project-setup) <br> </kbd>
---