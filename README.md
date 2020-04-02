# hashcode
A simple, yet powerful, hashcode helper

# Installation

```shell
    npm install hashcode.ts
    # or ...
    yarn add hashcode.ts
 ```

 # Usage
 
 ```typescript
    import Hashcode from "./hashcode";

    // You can use the generic form...
    const value = Hashcode.value({"hello": "world!"});

    // ... or the specific form if you know the type
    const boolean = Hashcode.boolean(true);
    const number = Hashcode.number(1337);
    const string = Hashcode.string("Hello world!");
    const date = Hashcode.date(new Date());
    const array = Hashcode.array([42, 1337]);
    const object = Hashcode.object({"hello": "world!"});

    // There is also an helper for combining hashcodes
    const hash = Hashcode.combine(boolean, number, string);
 ```
