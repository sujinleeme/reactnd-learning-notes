# Arrow Functions (화살표 함수)
ES6에는 화살표 기능이라는 새로운 종류의 기능이 도입되었다. 간결한 구문으로 짧고, 한 줄짜리 함수를 작성이 가능하며 읽는 것이 훨씬 쉬워졌다.

ex) es6 이전
```javascript
const upperizedNames = ['Farrin', 'Kagure', 'Asser'].map(function(name) { 
  return name.toUpperCase();
});
```

1. `function` 키워드를 제거한다.
2. 함수를 감싸는 `()`를 제거한다.
3. 함수 본문 내 `{}`를 제거한다.
4. `return` 키워드를 제거한다. (`return`은 자동으로 반환된다)
5. 세미콜론`;`을 제거한다.
6. 매개 변수 목록과 함수 본문 사이에 화살표 `(=>)`를 추가한다.

ex) es6
```javascript
const upperizedNames = ['Farrin', 'Kagure', 'Asser'].map(
  name => name.toUpperCase()
);
```

### Arrow Functions 사용법
일반적인 함수는 함수선언식 또는 표현식으로 쓸 수 있으나, 화살표 함수는 표현식으로 작성해야한다.

#### Function Declarations (함수 선언식)
```javascript
functionName();
function functionName(arg0, arg1, arg2){ alert("hi"); }
```
함수 선언에서 함수 선언 __호이스팅(hosting 끌어올림)__ 됨으로 함수 선언부를 다른 코드보다 먼저 읽고 실행한다.
그렇기 때문에 함수 선언 전에 `functionName()`을 호출해도 정상적으로 동작한다.

#### Function Expression
```javascript
functionName(); //오류 발생 - 함수가 존재하지 않습니다.
var functionName = function(arg0, arg1, arg2){ alert("hi"); }
```
하지만 함수 선언 끌어올림이 없기 때문에 `functionName()` 호출 시 오류가 발생한다.

### 예제

1. 화살표 함수는 변수로 저장될 수 있다. 

```javascript
const greet = name => `Hello ${name}!`;
greet('Asser'); //Hello Asser!

```

2. 매개 변수 목록에 두 개 이상의 항목이 있거나 목록에 항목이없는 경우 목록을 괄호로 묶어야 한다.

```javascript
const sayHi = () => console.log('Hello Udacity Student!');
sayHi();
```

3. `${expression}`을 사용할 수 있다.

```javascript
const orderIceCream = (flavor, cone) => console.log(`Here's your ${flavor} ice cream in a ${cone} cone.`);
orderIceCream('chocolate', 'waffle');
```

4. 단일 매개 변수를 (`_`)로 나타내는 작성하는 개발자도 있다.

```javascript
setTimeout(_ => {
    console.log('starting the test');
    test.start();
}, 2000);
```

5. 단일 매개 변수라면 `()`사용할 수 있지만, 괄호를 생략해도 괜찮다.

```javascript
const vowels = 'aeiou'.split("");
const bigVowels = vowels.map((letter) => letter.toUpperCase());
```

```javascript
const vowels = 'aeiou'.split("");
const bigVowels = vowels.map(letter => letter.toUpperCase());
```

# 간결한 본문 구문 (concise body syntax)
화살표 함수 본문이 한 줄 이상의 코드가 필요하면, `{}` 구문을 사용할 수 있다.

* `()`를 사용하여 함수 본문을 감싼다.
* `return` 문은 실제로 함수에서 무엇인가를 반환하는 데 사용한다.

```javascript
const upperizedNames = ['Farrin', 'Kagure', 'Asser'].map(name => {
  name = name.toUpperCase();
  return `${name} has ${name.length} characters in their name`;
});
``` 

###### 실습문제
```javascript
const squares = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(square => square * square);
console.log(...squares); //1 4 9 16 25 36 49 64 81 100

```