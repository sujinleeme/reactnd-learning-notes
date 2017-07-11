# `for .. loop`

## Iterable Protocol
[iterable protocol](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Iteration_protocols)을 사용하면 javascript 객체의 **반복 동작(iteration behavior)**을 정의하거나 커스터마이징 할 수 있다.

# `for-loop`, `for-in`, `for-of`, `each()`
## 1. `for loop`
```javascript
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (let i = 0; i < digits.length; i++) {
  console.log(digits[i]);
}
```

* 문제점 : 
** 카운터와 종료 조건을 추적해야한다. (변수 `i`를 카운터로 사용하여 루프를 추적하고 배열의 값에 액세스한다)
** `digits.length`를 사용해 루프의 종료 조건을 결정한다. 정확하게 어떤 일이 일어나고 있는지 이해하기 어렵다. 
**  `for` 루프는 배열을 반복할 때 쓰지만, 일부 데이터는 배열이 아닐 수도 있으므로 for 루프를 항상 써야하는 것은 아니다. 


## 2. `for...in`

```javascript
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (const index in digits) {
  console.log(digits[index]);
}
```

for ... in 루프는 카운터와 종료 조건을 제거하여 for 루프의 약점을 개선헀다.

* 문제점
** 배열의 각 요소에 액세스하기 위해서는 인덱스를 사용해야 한다.
** `for ... in` 루프는 배열(또는다른 객체)에 추가 메서드를 추가해야 할 때 큰 문제가 될 수 있다. `for loop` 루프 루프는 모든 열거 가능 속성을 반복하므로, 배열의 프로토타입에 추가 속성을 정의하면, 해당 속성도 루프에 나타난다.

```javascript
Array.prototype.decimalfy = function() {
  for (let i = 0; i < this.length; i++) {
    this[i] = this[i].toFixed(2);
  }
};

const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (const index in digits) {
  console.log(digits[index]);
}
```

```
Prints:
0
1
2
3
4
5
6
7
8
9
function() {
 for (let i = 0; i < this.length; i++) {
  this[i] = this[i].toFixed(2);
 }
}
```

3. `forEach()`
문제점 : `forEach()` 배열 메서드로써 배열에만 사용할 수 있다. `forEach`루프를 중지하거나 중단 할 수 있는 방법이 없으므로 대신 기본 `for`루프를 사용해야한다.
## 코드실습

```javascript
/*
 * Programming Quiz: Writing a For...of Loop (1-4)
 *  your code goes here
 * loops through each day in the days array
 * capitalizes the first letter of the day
 * and prints the day out to the console
*/

const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

const compose = (...fns) => {
  return function composition(arg) {
    return fns.reduceRight((acc, next) => {
      return next(acc);
    }, arg);
  };
}

const splited = (str) => str.split('');

const capitalized = (str) => {
    str[0] = str[0].toUpperCase();
    return str.join('');
}

for (let day of days) {
    const formated = compose(capitalized, splited)(day);
    console.log(formated); //Sunday
}
```

4. for ... of 

for ... of 루프는 모든 for 루프 중 가장 간결한 버전이다. for ... of 루프는 반복 가능한 모든 유형의 데이터를 반복하는 데 사용된다. of를 in으로 바꾸면 인덱스를 삭제할 수 있다.

```javascript
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (const digit of digits) {
  console.log(digit);
}
```

* TIP : 모든 값의 집합인 객체에 대해 복수명사를 사용하라. 이렇게 하면 컬렉션을 반복 할 때, 개별 값을 참조할 때 단수명사를 사용할 수 있다. (`const digit of digits`) 

개체에 새 속성을 추가해도, `for ... of` 루프는 객체의 값만 반복한다.

```javascript
Array.prototype.decimalfy = function() {
  for (i = 0; i < this.length; i++) {
    this[i] = this[i].toFixed(2);
  }
};

const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (const digit of digits) {
  console.log(digit);
}
```