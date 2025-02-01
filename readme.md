# Table of Contents

* **[Default Project Setup](#default-project-setup)**
* **[Getting Started with TypeScript](#getting-started-with-typescript)**
* **[TypeScript Basics](#typescript-basics)**
* **[TypeScript Compiler](#typescript-compiler)**
* **[JavaScript and TypeScript](#javascript--typescript)**
* **[Classes and Interfaces](#classes-and-interfaces)**
* **[Advanced Type Concepts](#advanced-type-concepts)**
* **[Generics](#generics)**
* **[Decorators](#decorators)**
* **[Resources](#resources)**

## Default Project Setup

* [Configuring Project Dependencies](#configuring-project-dependencies)
* [Compiling TypeScript](#compiling-typescript)

> [!NOTE]
> All examples in this section can be found in :file_folder: [Default Project Setup](/00-Default-Project-Setup)

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
> More on the TypeScript compiler in [TypeScript Compiler](#typescript-compiler).

<kbd> <br> [Back to Top](#table-of-contents) <br> </kbd>
---

## Getting Started with TypeScript

* [What is TypeScript?](#what-is-typescript)

> [!NOTE]
> All examples in this section can be found in :file_folder: [Getting Started](/01-Getting-Started)

### What is TypeScript?

* A JavaScript superset - TypeScript is a programming language built up on JavaScript.
* Not a new language.
* Takes JavaScript language and adds new features and advantages to JavaScript.
* TypeScript makes writing JavaScript code easier and more powerful.
* TypeScript cannot be executed by JavaScript environments like the web browser or Node.js.
* TypeScript code is compiled to JavaScript code.
* Features are compiled to JS "workarounds", possible errors are thrown.

<kbd> <br> [Back to Top](#table-of-contents) <br> </kbd>
---

## TypeScript Basics

* [Core Types](#core-types)

> [!NOTE]
> All examples in this section can be found in :file_folder: [TypeScript Basics](/02-TypeScript-Basics)

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

<kbd> <br> [Back to Top](#table-of-contents) <br> </kbd>
---

## TypeScript Compiler

* [Manually Compile](#manually-compile)
* [Using Watch Mode](#using-watch-mode)
* [Compile Entire Project](#compile-entire-project--multiple-files)
* [TypeScript Config File](#typescript-config-file)

> [!NOTE]
> All examples in this section can be found in :file_folder: [TypeScript Basics](/03-TypeScript-Compiler)

### Manually Compile

Compile a single TypeScript file:
```
tsc app.ts
```
* Will compile the `app.ts` file.

### Using "Watch Mode"

* TypeScript will "watch" file and recompile whenever it changes.
```
tsc app.ts --watch | --w
```

### Compile Entire Project / Multiple Files

* Define entire project to TypeScript.
* Following command is required only once in project.
```
tsc --init
tsc
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

<kbd> <br> [Back to Top](#table-of-contents) <br> </kbd>
---

## JavaScript & TypeScript

* [Declaring JavaScript Variables](#declaring-javascript-variables)

> [!NOTE]
> All examples in this section can be found in :file_folder: [JavaScript and TypeScript](/04-JavaScript-and-TypeScript)

### Declaring JavaScript Variables

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

<kbd> <br> [Back to Top](#table-of-contents) <br> </kbd>
---

## Classes and Interfaces

* [What is Object Oriented Programming?](#what-is-object-oriented-programming-oop)

> [!NOTE]
> All examples in this section can be found in :file_folder: [Classes and Interfaces](/05-Classes-and-Interfaces)

### What is Object Oriented Programming (OOP)?
* Work with (real-life) entities in your code.

**Objects & Classes**
* Objects - *"The things you work with in code"*
    * **Instances** of classes (based on classes)
    * Class-based creation is an alternative to using object literals.
* Classes - *"Blueprints for objects" (theoretical definition)"*
    * Define how objects look like, which properties and methods they have.
    * Classes make creation of multiple, similar objects much easier.

<kbd> <br> [Back to Top](#table-of-contents) <br> </kbd>
---

## Advanced Type Concepts

* [All Type Concepts](#all-type-concepts)

> [!NOTE]
> All examples in this section can be found in :file_folder: [Advanced Type Concepts](/06-Advanced-Type-Concepts)

### All Type Concepts

* Intersection Types
* Type Guards
* Discriminated Unions
* Type Casting
* Index Properties
* Function Overloads
* Optional Chaining
* Nullish Coalescing

<kbd> <br> [Back to Top](#table-of-contents) <br> </kbd>
---

## Generics

* [Generics Overview](#generics-overview)
* [All Generic Concepts](#all-generic-concepts)

> [!NOTE]
> All examples in this section can be found in :file_folder: [Generics](/07-Generics)

### Generics Overview

In TypeScript, generics allow you to write reusable code that can work with a variety of types. 

:bulb: More information on generics can be found on the **:link: [TypeScript documentation](https://www.typescriptlang.org/docs/handbook/2/generics.html)**.

### All Generic Concepts

* Built-in Generics
* Creating a Generic Function
* Working with Constraints
* More on Generic Functions
* The "keyOf" Constraint
* Generic Classes
* Generic Utility Types

<kbd> <br> [Back to Top](#table-of-contents) <br> </kbd>
---

## Decorators

* [What are TypeScript Decorators?](#what-are-typescript-decorators)
* [When do Decorators Execute?](#when-do-decorators-execute)
* [Configuration for Using Decorators](#configuration-for-using-decorators)
* [All Decorator Concepts](#all-decorator-concepts)

> [!NOTE]
> All examples in this section can be found in :file_folder: [Decorators](/08-Decorators)

### What are TypeScript Decorators?
* Decorators provide a way to add both annotations and a meta-programming syntax for class declarations and members.
* A Decorator is a special kind of declaration that can be attached to a class declaration, method, accessor, property, or parameter.
* Decorators use the form `@expression`, where `expression` must evaluate to a function that will be called at runtime with information about the decorated declaration.

### When do Decorators Execute?
* Decorators execute during the compilation process, not at runtime like regular functions.
* A property decorator executes early - when the class is defined. You don't need to construct an instance, or access the property.

### Configuration for Using Decorators
* In the `tsconfig.json` file, make sure `experimentalDecorators` is set to `true`.

### All Decorator Concepts
* Class Decorators
* Working with Decorator Factories
* Building More Decorator Examples
* Adding Multiple Decorators
* Working with Property, Accessor, Method, and Parameter Decorators
* Returning a Class in a Class Decorator
* Example Creating an "Autobind" Decorator
* Example Validation with Decorators

<kbd> <br> [Back to Top](#table-of-contents) <br> </kbd>
---

### Resources
* [TypeScript Decorators Documentation](https://www.typescriptlang.org/docs/handbook/decorators.html).

<kbd> <br> [Back to Top](#table-of-contents) <br> </kbd>
---