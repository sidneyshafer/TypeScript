# Section 2 - TypeScript Basics

## Core Types
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

## Installing Dependencies

```
npm install
```

## Compiling TypeScript

* Compiling a single TypeScript file.
```
tsc app.ts
```

* More on TypeScript compiler in [Section 3 - TypeScript Compiler](https://github.com/sidneyshafer/TypeScript/tree/main/Section-3-TypeScript-Compiler).