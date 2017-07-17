# symbol
`symbol`은 변경 불가능한 데이터 형식으로서 개체 속성을 식별할 수 있다.

```javascript
const sym1 = Symbol('apple');
console.log(sym1); // Symbol(apple) 
```

이렇게하면 고유한 `symbol`이 만들어져 `sym1`에 저장된다. 변수 `"apple"`은 `symbol`을 나타내지만 `symbol` 자체에 액세스 할 수 없다.

두 `symbol`을 비교하면 아래와 같다.

```javascript
const sym2 = Symbol('banana');
const sym3 = Symbol('banana');
console.log(sym2 === sym3); // false
```

해당 symbol 자체를 가리키기 때문에 결과는 `false`이다. 

아래 코드에서 두번째 `banana`를 추가하면 문제가 발생한다.
```javascript
const bowl = {
  'apple': { color: 'red', weight: 136.078 },
  'banana': { color: 'yellow', weight: 183.15 },
  'orange': { color: 'orange', weight: 170.097 }
};
```
새로 `banana`를 추가하면 이전 `banana`는 새 `banana`로 덮어쓰게 된다. 


```javascript
const bowl = {
  'apple': { color: 'red', weight: 136.078 },
  'banana': { color: 'yellow', weight: 183.151 },
  'orange': { color: 'orange', weight: 170.097 },
  'banana': { color: 'yellow', weight: 176.845 }
};
console.log(bowl); // Object {apple: Object, banana: Object, orange: Object}
```

이를 해결하기 위해 `symbol`을 사용할 수 있다. 
```javascript
const bowl = {
  [Symbol('apple')]: { color: 'red', weight: 136.078 },
  [Symbol('banana')]: { color: 'yellow', weight: 183.15 },
  [Symbol('orange')]: { color: 'orange', weight: 170.097 },
  [Symbol('banana')]: { color: 'yellow', weight: 176.845 }
};
console.log(bowl); // Object {Symbol(apple): Object, Symbol(banana): Object, Symbol(orange): Object, Symbol(banana): Object}
```
`bowl`의 프로퍼티를 `symbol`을 사용하면 각 속성은 고유하게 되어, 첫 번째 `banana`가 두 번째 `banana`로 대체되지 않는다.

# Iteration & Iterable Protocol
ES6에는 객체 내부를 순회할 수 있도록 반복 프로토콜(Iteration protocol)이라는 기능이 구현되어있다. 반복 프로토콜은 반복 가능 프로토콜(Iterable protocol)과 반복자 프로토콜(Iterator protocol)로 분류된다.

## 반복 가능한 프로토콜 Iterable Protocol
iterable 프로토콜은 객체의 반복 동작을 정의한다. ES6에서 객체의 값을 반복하는 방법을 지정 방법에 유연성을 갖추 었다는 것입니다. 일부 개체의 경우 이미 이러한 동작이 내장되어 있습니다. 예를 들어, 문자열과 배열은 내장 반복 가능 객체다.

```javascript
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
for (const digit of digits) {
  console.log(digit);
}
```
반복 가능한 모든 객체는 `for ... of`문을 사용할 수 있다. `Symbol.iterator`로 객체의 기본 반복자(iterator)를 반환하는 메소드로 이 속성을 통해 접근할 수 있다.

### 동작 방법
객체를 반복 가능하게하려면 __iterable__ 인터페이스를 구현해야한다. Java 나 C와 같은 언어를 사용한다면 아마도 인터페이스에 익숙하겠지만, 반복 가능한 객체를 만들기 위해서는 기본 반복자 메소드가 있어야한다. 이 메서드는 객체를 반복하는 방법을 정의한다.

`[Symbol.iterator]`에서 `iterator` 메서드는 `iterator` 개체를 반환하는데, 값이 넘어오지 않으면 자동으로 0값을 가지도록 선언되었다.(zero arguments function). iterator 객체는 iterator 프로토콜을 따르는 객체이다.


## The Iterator Protocol
The iterator protocol은 객체가 일련의 값을 생성하는 표준 방법을 정의한다. `next()` 메소드로 객체가 반복되는 방식을 정의한다.

### 동작 방법
`.next()`메서드는 `done`과 `value` 속성을 가진 객체를 반환한다. `next()` 메서드를 호출할 때, 매개변수를 제공해 그 값을 generator에 전달한다.s

* `value` : 객체 내의 일련의 값에서 다음 값을 나타내는 데이터
* `done` : 반복자가 일련의 값을 거친다면 true를 나타내는 불리언(boolean)
  * done이 `true`의 경우, 반복자는 값의 순서의 마지막에 이른다.
  * done가 `false`의 경우, 반복자는 다음 순서 값에 접근한다.

배열의 디폴트 반복(default iterator)을 사용하여 배열의 각 값을 단계별로 접근 가능하다.

```javascript
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const arrayIterator = digits[Symbol.iterator]();

console.log(arrayIterator.next()); //Object {value: 0, done: false}
console.log(arrayIterator.next()); //Object {value: 1, done: false}
console.log(arrayIterator.next()); //Object {value: 2, done: false}
```

####### 연습문제
```javascript
/*
 * Programming Quiz: Make An Iterable Object
 *
 * Turn the `james` object into an iterable object.
 *
 * Each call to iterator.next should log out an object with the following info:
 *     - key: the key from the `james` object
 *     - value: the value of the key from the `james` object
 *     - done: true or false if there are more keys/values
 *
 * For clarification, look at the example console.logs at the bottom of the code.
 */

const james = {
    name: 'James',
    height: `5'10"`,
    weight: 185,
    [Symbol.iterator]: () => {
        let nextIndex = 0s
        return {
            next: () => {
                let key = Object.keys(james)[nextIndex++]
                return {
                    value: james[key],
                    key: key,
                    done: nextIndex >= Object.keys(james).length
                }
            }
        }
    }
}; 
```