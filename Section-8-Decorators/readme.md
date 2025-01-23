# Section 8 - Decorators

## `tsconfig` file
* In the `tsconfig.json` file, make sure `experimentalDecorators` is set to `true`.

## What are TypeScript Decorators?
* Decorators provide a way to add both annotations and a meta-programming syntax for class declarations and members.
* A Decorator is a special kind of declaration that can be attached to a class declaration, method, accessor, property, or parameter.
* Decorators use the form `@expression`, where `expression` must evaluate to a function that will be called at runtime with information about the decorated declaration.

## When do Decorators Execute?
* Decorators execute during the compilation process, not at runtime like regular functions.
* A property decorator executes early - when the class is defined. You don't need to construct an instance, or access the property.

## Resources
* [TypeScript Decorators Documentation](https://www.typescriptlang.org/docs/handbook/decorators.html).