# `let`, `const`, `var`

## Hoisting

```javascript
function getClothing(isCold) {
  if (isCold) {
    var freezing = 'Grab a jacket!';
  } else {
    var hot = 'It’s a shorts kind of day.';
    console.log(freezing);
  }
}
```

위 코드를 실행시, `undefiend`가 출력된다.

호이스팅(Hoisting)은 브라우저에서 Javascript를 해석할 때, JavaScript 코드가 실행되기 전에 함수 스코프의 맨 위로 모든 변수가 "끌어올라간다 (hoisted)". 런타임 시,  `getClothing()` 함수는 실제로 다음과  같이 실행된다.

```javascript
function getClothing(isCold) {
	var freezing, hot;
	if (isCold) {
		freezing = 'Grab a jacket!';
	} else {
		hot = 'It's a shorts kind of day.' ;
	}
}
```

그러나 `let` 및 `const`를 사용하면 해당 변수는 함수가 아닌 블록으로 범위가 지정되므로 호이스팅 문제를 제거할 수 있다. `var`을 사용할 때 전역 변수, 또는 전체 함수 범위 (function-scoped)내 로컬 변수가 사용된다. 

코드 블록 (`{}`) 안에 변수를 	`let` 또는 `const`로 선언한 경우, 변수 선언이 처리 될 때까지 `temporal dead zone (TDZ)`에 머문다.  스코프에 진입하면 선언부에 도달하기 전까지  접근할 수 없다. TDZ는 변수가 선언되기 전에 변수에 액세스하면 예기치 않은 동작이 발생하는 오류를 보다 쉽게 알기 위함이다.

```javascript
function getClothing(isCold) {
  if (isCold) {
    const freezing = 'Grab a jacket!';
  } else {
    const hot = 'It’s a shorts kind of day.';
    console.log(freezing);
  }
}
//ReferenceError: freezing is not defined
```
* `freezing`은 else 문, 함수 범위 또는 전역 범위 내에서 선언되지 않으므로 `ReferenceError`가 발생한다.

`let` 및 `const`로 선언된 변수는 선언 된 블록(스코프)내에서만 사용할 수 있습니다.

## `let`과 `const`의 사용

* let : 선언된 변수는 다시 할당 할 수 있지만 동일한 스코프에서 다시 선언 할 수 없다. 
* const : 선언된 변수는 초기 값을 할당해야하지만 같은 스코프에서 다시 선언 할 수는 없으므로 다시 할당 할 수 없다.

```javascript
let instructor = 'James';
instructor = 'Richard';
console.log(instructor);
//Richard
```

```javascript
let tmp = true;
if (true) { // 스코프 진입. TDZ 시작
    // 초가화되지 않은 tmp 변수의 바인딩은 생성되지 않았음.
    console.log(tmp); // ReferenceError

    let tmp; // TDZ 종료. tmp 변수는 undefined로 초기화 됨.
    console.log(tmp); // undefined

    tmp = 123;
    console.log(tmp); // 123
}
console.log(tmp); // true
```

`const`는 변수를 선언하는 가장 엄격한 방법이기 때문에 `const`를 사용하여 변수를 선언하는 것이 좋다. 식별자가 프로그램의 수명 기간 동안 변경되지 않는다는 것을 알기 때문에 코드를 쉽게 추론 할 수 있기 때문이다. 변수를 업데이트하거나 변경해야 할 필요가 있으면 `const`에서 `let`으로 전환하라.

### 이제 더이상 `var`를 더 이상 사용하지마라
전역 변수를 정의한다면 `var`를 사용할 수 있겠으나, 최대한 피하는 것이 좋다. `var`를 버리고 `let`과 `const`를 사용하라.

* 참고 : [exploring- Variables and scoping - 한국어 번역](https://github.com/ES678/Exploring-ES6/tree/master/09%20%EB%B3%80%EC%88%98%EC%99%80%20%EC%8A%A4%EC%BD%94%ED%94%84)

