# 1. Clean Code with JavaScript

## 1.1 Overview

## 1.2 Clean Variables

#### Tip 1. Use meaningful variable names

**Bad**

```js
// Train's departure time
var time1 = new Date(2018, 1, 18)
// Train's arrival time
var time2 = new Date(2018, 1, 19)
```

**Good**
```js
// Train's departure time
var departureTime = new Date(2018, 1, 18)
// Train's arrival time
var arrivalTime = new Date(2018, 1, 19)
```

#### Tip 2. Variable names should be memorable

* It increases your productivity, easy to search and navigate func/methods/files.
* Easy to catch types and arguments

#### Tip 3. Favor descriptive names over short ones

**Bad**

```js
let person = {
  fName: 'John'
  LName: 'Smith',
  fatherName: 'Jake'
}

console.log("First name: " + person.fName) // ?
console.log("First name: " + person.fatherName) // ??
```

**Good**

```js
let person = {
  firstName: 'John'
  LastName: 'Smith',
  fatherName: 'Jake'
}
```

#### Tip 4. Avoid unnecessary context 

**Bad**
```js
export class Student {
  constructor(studentAcademicId, studentFirstName, studentLastName, studentUniversity) {
    this.studentAcademicId = studentAcademicId;
    this.studentFirstName = studentFirstName;
    this.studentLastName = studentLastName;
    this.studentUniversity = studentUniversity;
  }
}
```

We already know these properties inside Class Student.


**Good**

```js
export class Student {
  constructor(academicId, firstName, lastName, university) {
    this.academicId = academicId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.university = university;
  }
}
```

#### Tip 5. Be consistent with naming conventions

How to make `get()` method?

**Bad** 
```js
export class Customer {
  getCustomer() {

  }

  get_customer() {

  }
}
```

**Good**
```js
export class Customer {
  get() {
    //return customer
  }
}
```

## 1.3. Lexical Scope and let

#### Tip 6. Always favor strict mode

```js
function f1() {
  var a = 1;
  function f2() {
    var b = 2;
    function f3() {
      var c = 3;
      console.log(a); // 1
      console.log(d); // Reference Error
      d = 28; // In strict mode, Reference Error
    }
  }
}
```

#### Tip 7. Use let instead of var

Function Scope vs Block Scope - Major misconception before ES6

```js
// var i;
for (var i=0; i<10; i++) {
  console.log(i); // 0, 1, 2, 3....
}
console.log(i); // 10 , not Uncaught ReferenceError: i is not defined
```

```js
var test = true;
if (test) {
  let a = 18;
}
console.log(a); //Uncaught ReferenceError: a is not defined
```

```js
var i = 10, v = 10;
for (var i = 0; i < 5; i++) { var v = 5; }
console.log(i, v);
// output 5 5
```

```js
var i = 10, v = 10;
$.each([0, 1, 2, 3, 4], function(i) { var v = 5; });
console.log(i,v);
// output 10 10
```

* var: lexically function scoped. If it cannot find the variable inside the function body it will climb up to the chain and look at the variable scope in the function in where the function was defined. (local scope, global scope)
* let: creates a block scoped variable
* const: creates a block scoped variable which has to be initialized and cannot be reassigned

## 1.4 Clean functions

#### Tip 8. Single responsibility
* 'Is the function accomplishing a specific task?' -> If not, split function.
* Your function should do one thing only.

#### Tip 9. Reduce number of arguments
* Aims to have three arguments

**Bad**
```js
function draw(element, width, height, backgroundColor, color, margin, padding) { ... }
```

**Good**
```js
function draw(element, config) {
  element.style.width = config.width;
  element.style.height = config.height;
  element.style.backgroundColor = config.backgroundColor;
  //....
}
```

#### Tip 10. Avoid flags

**Bad**
```js
// filter = 0 prints all todos
// filter = 1 prints completed todos
// filter = 2 prints pending todos
function printTodo(toDos, filter) {
  if(filter === 0) {}
  if(filter === 1) {}
  if(filter === 2) {}
}
```

**Good**

```js
function printAllTodo(todos) {};
function printCompletedTodos(todos) {};
function printPendingTodos(todos) {};
```

#### Tip. 11. Avoid callbacks

Callback hell!

```js
function combineSensorData() {
  getSensorAData((sensorAdata) => {
    console.log("sensor A data: ", sensorAdata)
      getSensorBData((sensorAdata) => {
        console.log("sensor B data: ", sensorBdata)
        getSensorCData((sensorCdata) => {
          console.log("sensor C data: ", sensorCdata)
        })
     })
  })
};
```

Use `promise()`.

```js
function getSensorAData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                min: 8, 
                max: 118
            });
        }, 2000);
    })
}

function combineSensorData() {
    Promise.all(getSensorAData(), getSensorBData(), getSensorCData()).then(results => {
        let sensorAData = results[0];
        let sensorBData = results[1];
        let sensorCData = results[2];
    });
}
```

#### Tip. 12. Use Object.assign or the spread operator for default arguments
 
```js
function draw(element, config) {
  config.width = config.width || 200;
  config.height = config.height || 200;
  config.margin = config.margin || 28;
  config.padding = config.padding || 14;
  console.log(config);
}

draw(null, {margin: 100, padding: 50}); // { margin: 100, padding: 50, width: 200, height: 200 }
```

But, logical operator (`||)` has problem, because 0 is falsy value and it gets default value.

Falsy values evaluate to false in conditionals
* JS falsy values: Number `0`, BigInt `0n`, Keyword `null`, Keyword `undefined`, Boolean`false`, Number `NaN`, empty string ('""' or '''' or '``')

```javascript
draw(null, {margin: 0, padding: 0}); // {margin: 28, padding: 14, width: 200, height: 200}
```

```js
let c = 0 || 28 //  28
```

Better way,

```js
function draw(element, config) {
    let defaults = {
        width: 200,
        height: 200,
        margin: 28,
        padding: 14
    };
    // config = Object.assign(defaults, config); overwriting values,
    config = {
        ...defaults,
        ...config       //WARNING: config must come second!!
    }
    console.log(config);
}

draw(null, {margin: 0, padding: 0});
```

## 1.5 All about `this`

Function definition des not matter. From where the function is called matters.

```js
var 9 = 92;

var obj = {
  a: 1,
  b: 2,
  c: 3
}

function test() {
  console.log(this.a); // 92
}

test();

obj.test = test;
obj.test(); // 1
```

Let's change `var 9 = 92` to `let a = 92`.

```js
// var 9 = 92;
let a = 92;
var obj = {
  a: 1,
  b: 2,
  c: 3
}

function test() {
  console.log(this.a); // undefined
  //  this is bound to the window object by default.
}

test();

obj.test = test;
obj.test(); // 1
```

*Variables declared with `let` are not part of the global object.*

How to bind to this in object? Explicitly, Use`call()` or `apply()` to bind `this` for the function call.

```js
var a = 92;

var obj = {
  a:1,
  b:2,
  c:3
}

function test() {
  console.log(this.a);
}

test.call(obj) // 1
test.apply(obj) // 1
```

What If you need to pass a function as a callback and you want to explicitly bind this?
`call()` and `apply()` is not solution.

* Reading resources
  * Javascript Function Methods: Call vs Apply vs Bind](https://medium.com/@jhawleypeters/javascript-call-vs-apply-vs-bind-61447bc5e989)


**Hard binding**

```js
var obj = {
    a: 1,
    b: 2, 
    c: 3
}

function test() {
    console.log(this.a);
    console.log(this.b);
    console.log(this.c);
}

function callMeLater(cb) {
    setTimeout(()=> {
        cb();
    }, 3000);
}

callMeLater(test); // undefined
callMeLater(test.bind(obj)); // 1, 2, 3
```

`.bind()` does not call the function. It returns a reference to the function with this keyword set to the object.

**What's `new`?**

```js
function Person(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    console.log(this);
}

let p = new Person("John", "Smith", 43);
console.log(p);
```

When you using the new keyword to instantiate a new objet, inside the constructor function's this keyword will point to newly constructed object returned by default.
