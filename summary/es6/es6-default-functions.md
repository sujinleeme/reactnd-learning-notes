# 기본 함수 매개 변수(Default function parameters)
함수 `매개 변수(function parameters)`에 `기본값(Default)`을 지정해 각 함수 파라미터 리스트를 파악할 수 있다.

ex. 1
```javascript
function greet(name, greeting) {
  name = (typeof name !== 'undefined') ?  name : 'Student';
  greeting = (typeof greeting !== 'undefined') ?  greeting : 'Welcome';
  return `${greeting} ${name}!`;
}

greet(); // Welcome Student!
greet('James'); // Welcome James!
greet('Richard', 'Howdy'); // Howdy Richard!
```
예제 1에서 기본 매개 변수를 만들려면 등호(`=`)를 추가하고, 인자가 제공되지 않은 경우 매개 변수의 기본값을 지정한다.

ex. 2
```javascript
function greet(name = 'Student', greeting = 'Welcome') {
  return `${greeting} ${name}!`;
}

greet(); // Welcome Student!
greet('James'); // Welcome James!
greet('Richard', 'Howdy'); // Howdy Richard!
```

위의 코드에서 두 매개 변수는 모두 문자열의 기본값을 갖는다.

# 기본값과 배열 해체 (default and destructuring arrays)

```javascript
function createGrid([width = 5, height = 5]) {
  return `Generates a ${width} x ${height} grid`;
}

createGrid([]); // Generates a 5 x 5 grid
createGrid([2]); // Generates a 2 x 5 grid
createGrid([2, 3]); // Generates a 2 x 3 grid
createGrid([undefined, 3]); // Generates a 5 x 3 grid
```

`createGrid()` 함수의 인자는 배열이 될 것이다. 구조 해체(destructuring)를 사용해 배열의 첫 번째 항목을 `width`으로 설정하고 두 번째 항목을 `width`로 설정했다. 배열이 비어 있거나 요소가 하나라면 기본 매개 변수가 누락되고 그 기본값은 5가 된다.

이 문제가 있지만 다음 코드는 작동하지 않습니다.

```javascript
createGrid(); // throws an error
```

`createGrid()` 함수는 배열을 전달하지 않고 호출되었으므로 중단되기 때문에 에러가 발행한다. 기본 함수 매개 변수를 사용해 해결 할 수 있다.

```javascript
function createGrid([width = 5, height = 5] = []) {
  return `Generating a grid of ${width} by ${height}`;
}
```

함수의 매개변수에서 `new = []`을 보면, `createGrid()`가 인자없이 호출되면 빈 기본 배열을 세팅된다. 배열이 비어 있기 때문에 width와 height로 분해할 것이 없기 때문에 기본값이 적용된다. 따라서 `= []`를 추가하여 전체 매개 변수에 기본값을 지정한다.

# 기본값과 객체 해체
배열 기본값을 사용하는 배열 해체와 마찬가지로 함수는 객체를 기본 매개 변수로 사용하여 객체 해체를 할 수 있다.

```javascript
function createSundae({scoops = 1, toppings = ['Hot Fudge']}) {
  const scoopText = scoops === 1 ? 'scoop' : 'scoops';
  return `Your sundae has ${scoops} ${scoopText} with ${toppings.join(' and ')} toppings.`;
}

createSundae({}); // Your sundae has 1 scoop with Hot Fudge toppings.
createSundae({scoops: 2}); // Your sundae has 2 scoops with Hot Fudge toppings.
createSundae({scoops: 2, toppings: ['Sprinkles']}); // Your sundae has 2 scoops with Sprinkles toppings.
createSundae({toppings: ['Cookie Dough']}); // Your sundae has 1 scoop with Cookie Dough toppings.
```

인자없이 함수를 호출하면 기본값이 없기 때문에 에러가 발생한다.

```javascript
createSundae(); // throws an error
```

```javascript
function createSundae({scoops = 1, toppings = ['Hot Fudge']} = {}) {
  const scoopText = scoops === 1 ? 'scoop' : 'scoops';
  return `Your sundae has ${scoops} ${scoopText} with ${toppings.join(' and ')} toppings.`;
}

createSundae(); // Your sundae has 1 scoop with Hot Fudge toppings.
```

# 배열 기본 값 vs. 객체 기본값 Array defaults vs. object defaults

객체 기본값의 장점은 특정 객체를 생략하여 함수를 호출할 수 있다는 것이다.

```javascript
function createSundae({scoops = 1, toppings = ['Hot Fudge']} = {}) { … }
```

`scoops`의 기본값을 유지하고, `toppings` 값을 아래와 같이 바꿀 수 있다.

```javascript
createSundae({toppings: ['Hot Fudge', 'Sprinkles', 'Caramel']});
```

배열 기본 값으로 바꾼 함수는 아래와 같다.

```javascript
function createSundae([scoops = 1, toppings = ['Hot Fudge']] = []) { … }
```

`scoops`의 기본값은 유지하고 `toppings` 기본값을 변경하려면 `scoops`의 인자값을 `undefined`로 줘야한다.

```javascript
createSundae([undefined, toppings: ['Hot Fudge', 'Sprinkles', 'Caramel']]);
```

배열은 위치 기반이므로, `undefined`를 첫 번째 인자로 이를 건너 뛰고 (그리고 기본값을 그대로 사용) 두 번째 인자를 전달한다.

따라서 배열 기본값을 사용해야하는 명백한 이유가 없다면, 객체 기본값을 사용하는 것이 바람직하다.

###### 실습 예제
```javascript
/*
 * Programming Quiz: Using Default Function Parameters (2-2)
 */

const buildHouse = ({floor = 1, color = 'red'} = {}) => (
   `Your house has ${floor}(s) with ${color} brick walls.`
);

console.log(buildHouse()); // Your house has 1 floor(s) with red brick walls.
console.log(buildHouse({})); // Your house has 1 floor(s) with red brick walls.
console.log(buildHouse({floors: 3, color: 'yellow'})); // Your house has 3 floor(s) with yellow brick walls.
```