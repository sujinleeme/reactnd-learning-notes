# Sets

수학에서 `Set`은 집합이다. 예를 들어, `{2, 4, 5, 6}`은 각 숫자가 고유하고 한 번만 표시되기 때문에 `set`이다. 반대로 `{1, 1, 2, 4}`는 중복된 항목이 있기 때문에 `set`이 아니다. 자바스크립트에서는 배열에 `set`을 사용해 집합을 표현할 수 있다.

```javascript
const nums = [2, 4, 5, 6];
```
배열에 항목을 추가할 때 중복되는 값을 체크하지 않고 추가하기 때문에, 아래 배열은 수학에서의 '집합' 개념이 아니다.

```javascript
nums.push(2);
console.log(nums); //[2, 4, 5, 6, 2]
```

ES6의 `Set`수학의 집합과 같은 새로운 내장 객체이다.

* set과 배열(array)의 차이
  * set은 인덱스 기반이 아니다. set의 위치를 기준으로 세트의 항목을 참조하지 않습니다.
  * set의 항목은 개별적으로 액세스 할 수 없다.

고유 항목을 저장할 수 있는 객체로, 원시값 또는 객체를 `Set`에 추가 및 제거할 수 있다. 

## Set 생성

* 빈 `Set()` 생성
```javascript
const games = new Set();
console.log(games); // Set {}
```

* 배열로 `Set()` 생성
```javascript
const games = new Set(['Super Mario Bros.', 'Banjo-Kazooie', 'Mario Kart', 'Super Mario Bros.']);
console.log(games); //Set {'Super Mario Bros.', 'Banjo-Kazooie', 'Mario Kart'}
```

## Set 수정
`.add()`로 추가, `.delete()`로 요소를 삭제할 수 있다.

```javascript
const games = new Set(['Super Mario Bros.', 'Banjo-Kazooie', 'Mario Kart', 'Super Mario Bros.']);

games.add('Banjo-Tooie');
games.add('Age of Empires');
games.delete('Super Mario Bros.');

console.log(games); // Set {'Banjo-Kazooie', 'Mario Kart', 'Banjo-Tooie', 'Age of Empires'}
```

모든 요소를 삭제하여 초기화 한다면 `.clear()`메소드를 사용한다.

```javascript
games.clear()
console.log(games); // Set {}
```

* `set`에 `.add()`메서드로 중복 요소를 추가하거나, `.delete()`메서드로 없는 항목을 삭제하여도 오류는 발생하지 않으나, `set`에 추가/변경되지 않는다. 두 메소드는 요소가 성공적으로 추가되거나 삭제되면 `true`를 반환하고 실패하면 `false`를 반환한다.

* `.size`은 `set`의 크기를 반환한다. `set`은 배열과 같이 인텍스를 통해 요소를 접근할 수 없으므로 `.length` 대신 `.size`를 사용한다.

```javascript
const months = new Set(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
console.log(months.size); //12
```

`.has()` 메서드를 사용하여 요소가 `Set`에 있는지 확인힌디.  요소가 `Set`에 있으면 `.has()`는 `true`를 반환하고, 반대로 요소가  `Set`에 없으면 `.has()`가 `false`를 반환한다.

```javascript
console.log(months.has('September')); //true
```

## 모든 값 반환하기
`.values()`는  SetIterator 개체로서 `Set`에 있는 모든 값을 반환한다.

```javascript
console.log(months.values());
SetIterator {'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'}
```

.keys () 메서드는 새 Iterator 객체 내에서 Set 값을 반환하여 `.values ()` 메서드와 동일한 방식으로 작동한다.


## Sets & Iterators
ES6의 신규 iterable 및 iterator 프로토콜인 Sets은 내장 iterable이다. 이는 루핑 측면에서 두 가지를 의미합니다.

* Set의 default iterator으로 Set의 각 항목을 하나씩 차례로 탐색 할 수 있다.
* `for ... of` 반복문으로 Set의 각 항목을 반복할 수 있다.

### Using the SetIterator
`.values()` 메소드는 `SetIterator`인 새로운 반복자 객체를 반환하기 때문에 `iterator` 객체를 변수에 저장하고 `.next()`를 사용하여 `Set`의 각 요소를 차례대로 반복하여 액서스할 수 있다. 마지막 Set 요소에 이르면 `done: true`를 반환한다.

```javascript
const iterator = months.values();
iterator.next();
Object {value: 'January', done: false}
```

### Using a for...of Loop
`for...of`으로 `Set`내 요소를 하나씩 출력할 수 있다.

```javascript
const colors = new Set(['red', 'orange', 'yellow', 'green', 'blue', 'violet', 'brown', 'black']);
for (const color of colors) {
  console.log(color);
}
```

####### 실습문제
```javascript
/*
 * Programming Quiz: Using Sets (3-1)
 *
 * Create a Set object and store it in a variable named `myFavoriteFlavors`. Add the following strings to the set:
 *     - chocolate chip
 *     - cookies and cream
 *     - strawberry
 *     - vanilla
 *
 * Then use the `.delete()` method to remove "strawberry" from the set.
 */


const myFavoriteFlavors = new Set();
const newFlavors = ['chocolate chip', 'cookies and cream', 'strawberry', 'vanilla'];
for (const flavor of newFlavors) {
  myFavoriteFlavors.add(flavor);
};
console.log(myFavoriteFlavors, count);
myFavoriteFlavors.delete('strawberry');
```