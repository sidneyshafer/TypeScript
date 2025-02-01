## Decorators

* [What are TypeScript Decorators?](#what-are-typescript-decorators)
* [When do Decorators Execute?](#when-do-decorators-execute)
* [Configuration for Using Decorators](#configuration-for-using-decorators)
* [All Decorator Concepts](#all-decorator-concepts)

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

<kbd> <br> [Back to Top](#decorators) <br> </kbd>
---