# Understanding TypeScript

## :link: [Default Project Setup](https://github.com/sidneyshafer/TypeScript/tree/main/Default-Project-Setup)

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
}
```

* **package.json** is already configured. Conversely, just run `npm install` with package.json in project folder.

### Compiling TypeScript

* Compiling a single TypeScript file.
```
tsc app.ts
```

* More on TypeScript compiler in **[Section 3 - TypeScript Compiler](https://github.com/sidneyshafer/TypeScript/tree/main/Section-3-TypeScript-Compiler)**.

## :link: [Section 1 - Getting Started with TypeScript](https://github.com/sidneyshafer/TypeScript/tree/main/Section-1-Getting-Started)

### What is TypeScript?

* A JavaScript superset - TypeScript is a programming language built up on JavaScript.
* Not a new language.
* Takes JavaScript language and adds new features and advantages to JavaScript.
* TypeScript makes writing JavaScript code easier and more powerful.
* TypeScript cannot be executed by JavaScript environments like the web browser or Node.js.
* TypeScript code is compiled to JavaScript code.
* Features are compiled to JS "workarounds", possible errors are thrown.

## :link: [Section 2 - TypeScript Basics](https://github.com/sidneyshafer/TypeScript/tree/main/Section-2-TypeScript-Basics)

### Core Types
| Type | Example | Description |
| ---- | ------- | ----------- |
| number | 1, 5.3, -10 | All numbers, no differentiation between integers or floats |
| string | 'Hi', "Hi", \`Hi\` | All tex values |
| boolean | true, false | Only these two values |
| object | {age: 21} | Any JavaScript object, more specific types (type of object) are possible |
| Array | [1, 2, 3] | Any JavaScript array, type can be flexible or strict (regarding the element types) |
| Tuple | [1, 2] | Added by TypeScript: Fixed-length array |
| Enum | enum {NEW, OLD} | Added by TypeScript: Automatically enumerated global constant identifiers |
| Any | * | Any kind of value, no specific type assignment |

### Installing Dependencies

```
npm install
```

### Compiling TypeScript

* Compiling a single TypeScript file.
```
tsc app.ts
```

* More on TypeScript compiler in **[Section 3 - TypeScript Compiler](https://github.com/sidneyshafer/TypeScript/tree/main/Section-3-TypeScript-Compiler)**.

## :link: [Section 3 - TypeScript Compiler](https://github.com/sidneyshafer/TypeScript/tree/main/Section-3-TypeScript-Compiler)

### Manually Compile

* Compile a single TypeScript file.
```
tsc app.ts
```

### Using "Watch Mode"

* TypeScript will "watch" file and recompile whenever it changes.
```
tsc app.ts --watch | --w
```

### Compile Entire Project / Multiple Files

* Define entire project to TypeScript.
* Following command is only required once.
```
tsc --init
```
* Creates `tsconfig.json` file.
* Only have to run `tsc` command to compile all `.ts` files TypeScript can find in the given project.
* This can also be combined with "watch mode", running `tsc --watch` or `tsc -w`.

### TypeScript Config File

* Exclude specific files or folders.
```
"exclude": [
    "node_modules"
]
```

* Include specific files or folders.
```
"include": [
    "app.ts",
    "analytics.ts"
]
```

* Set the JavaScript language version for emitted JavaScript and include compatible library declarations.
```
"target": "ES6"
```

* Specify the root folder within your source files.
```
"rootDir": "./src"
```

* Specify an output folder for all emitted files.
```
"outDir": "./dist"
```

* Restricts TypeScript from emitting files on complication errors.
```
"noEmitOnError": true
```

## :link: [Section 4 - JavaScript & TypeScript](https://github.com/sidneyshafer/TypeScript/tree/main/Section-4-JavaScript-and-TypeScript)

### JavaScript - Declaring Variables

In JavaScript, `var`, `let`, and `const` are used to declare variables, but they differ in their scope and reassignment behavior.

**var**
* Limited to global or function scope. 
* The variable is accessible within the function it's declared in, or globally if declared outside any function. 
* Variable can be reassigned or changed.

**let**
* The variable is only accessible within the block it's declared in (block-scoped).
* Better practice to use `let` over `var`.
* Variable can be reassigned or changed.

**const**
* The variable is only accessible within the block it's declared in (block-scoped).
* Variable cannot be reassigned or changed.

## :link: [Section 5 - Classes and Interfaces](https://github.com/sidneyshafer/TypeScript/tree/main/Section-5-Classes-and-Interfaces)

### What is Object Oriented Programming (OOP)?
* Work with (real-life) entities in your code.

**Objects & Classes**
* Objects - *"The things you work with in code"*
    * **Instances** of classes (based on classes)
    * Class-based creation is an alternative to using object literals.
* Classes - *"Blueprints for objects" (theoretical definition)"*
    * Define how objects look like, which properties and methods they have.
    * Classes make creation of multiple, similar objects much easier.

## :link: [Section 6 - Advanced Type Concepts](https://github.com/sidneyshafer/TypeScript/tree/main/Section-6-Advanced-Type-Concepts)

### Concepts

* Intersection Types
* Type Guards
* Discriminated Unions
* Type Casting
* Index Properties
* Function Overloads
* Optional Chaining
* Nullish Coalescing

## :link: [Section 7 - Generics](https://github.com/sidneyshafer/TypeScript/tree/main/Section-7-Generics)

In TypeScript, generics allow you to write reusable code that can work with a variety of types. More information on generics can be found on the **:link: [TypeScript documentation](https://www.typescriptlang.org/docs/handbook/2/generics.html)**;

### Concepts Include:

* Built-in Generics
* Creating a Generic Function
* Working with Constraints
* More on Generic Functions
* The "keyOf" Constraint
* Generic Classes
* Generic Utility Types