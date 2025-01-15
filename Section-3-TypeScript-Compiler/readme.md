# Section 3 - TypeScript Compiler

## Manually Compile

* Compile a single TypeScript file.
```
tsc app.ts
```

## Using "Watch Mode"

* TypeScript will "watch" file and recompile whenever it changes.
```
tsc app.ts --watch | --w
```

## Compile Entire Project / Multiple Files

* Define entire project to TypeScript.
* Following command is only required once.
```
tsc --init
```
* Creates `tsconfig.json` file.
* Only have to run `tsc` command to compile all `.ts` files TypeScript can find in the given project.
* This can also be combined with "watch mode", running `tsc --watch` or `tsc -w`.

## TypeScript Config File

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