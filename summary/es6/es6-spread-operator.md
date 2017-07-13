# 전개 연산자(Spread Operator)

전개 연산자(spread operator)는 표현식(expression)을 통해, 2개 이상의 인수arguments(함수 호출 용)나 2개 이상의 요소elements(배열 리터럴 용) 또는 2개 이상의 변수(비구조화 할당 용)가 예상되는 곳에 확장하게 할 수 있다.: [MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Spread_operator)

```javascript
const books = ["Don Quixote", "The Hobbit", "Alice in Wonderland", "Tale of Two Cities"];
console.log(...books);
// Don Quixote The Hobbit Alice in Wonderland Tale of Two Cities

```
예제의 결과를 보면 배열과 세트가 개별 요소로 확장되었음을 알 수 있다.
스프레드 연산자는 배열을 결합 할 때 유용하다. 이전에는 Array의 `concat()` 메서드를 사용했다.

### `concat()`

```javascript
const fruits = ["apples", "bananas", "pears"];
const vegetables = ["corn", "potatoes", "carrots"];
const produce = fruits.concat(vegetables);
console.log(produce); //[ 'apples', 'bananas', 'pears', 'corn', 'potatoes', 'carrots' ]
```

### 약식(Shorthand)
```javascript
const produce = [fruits, vegetables];
console.log(produce);
//[ [ 'apples', 'bananas', 'pears' ], [ 'corn', 'potatoes', 'carrots' ] ]
```
* 문제점: 두 배열을 결합하는 대신이 코드는 첫 번째 인덱스에 fruits 배열을 추가하고 produce 배열의 두 번째 인덱스에 vegetables 배열을 추가된다.

* 해결방법 
```javascript
/*
 * Instructions: Use the spread operator to combine the `fruits` and `vegetables` arrays into the `produce` array.
 */

const fruits = ["apples", "bananas", "pears"];
const vegetables = ["corn", "potatoes", "carrots"];

const produce = [...fruits, ...vegetables]

console.log(...produce); //apples bananas pears corn potatoes carrots
```

## Rest 매개변수(Rest parameter)
배열 내 요소가 불명확하게 나타낼 경우 `(...parameter)`을 사용할 수 있다.

```javascript
const order = [20.17, 18.67, 1.50, "cheese", "eggs", "milk", "bread"];
const [total, subtotal, tax, ...items] = order;
console.log(total, subtotal, tax, items);
```

순서 배열의 값을 가져 와서 **구조해체(destructuring)**을 통해 개별 변수에 할당한다.
rest 매개 변수를 사용하면 배열의 나머지 항목에 값(배열)이 할당된다.

## 가변 함수(Variadic functions)
Rest Paramater 이외에 가변 함수를 사용할 있다. 가변 함수는 무한 대의 인자를 갖는 함수이다.

e.g) `sum()`

## Arguments Object(인자객체) 사용
E6S 이전에서는 arguments 객체를 사용해 함수를 호출할 때 넘긴 인자들이 배열 형태로 저장한다. 함수에 전달되는 각 인자에 대한 값(첫 번째 인자는 0, 두 번째 인자는 1)을 포함한다.

```javascript
function sum() {
  let total = 0;  
  for(const argument of arguments) {
    total += argument;
  }
  return total;
}
```
위 `sum()`함수의 문제점이 있다.

1. 매개 변수가 없다: sum () 함수가 무한정의 인수를 처리 할 수 있다는 것을 알고 있기 때문에 오해의 소지가 있습니다.
2. 이해하기 어렵다. : 인자 객체를 사용 해 본 적이 없다면, 이 코드를 살펴보고 인자 객체가 어디서 왔는지 의문이 들 수 있다.

위 코드를 전개 연산자와 `for ... of loop`를 사용해 수정해보자.

```javascript
function sum(...nums) {
  let total = 0;  
  for(const num of nums) {
    total += num;
  }
  return total;
}
```

인자가 명확해졌고 읽기가 쉬워졌다.

###### 실습 예제
```javascript
const average = (...nums) => {
  let total = 0;  
  for(const num of nums) {
    total += num;
  }
  return total/2;
}
```