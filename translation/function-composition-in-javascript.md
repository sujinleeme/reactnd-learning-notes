# 자바스크립트 함수 컴포지션

원문 :  [Compose me That: Function Composition in JavaScript](https://www.linkedin.com/pulse/compose-me-function-composition-javascript-kevin-greene) - Kevin Greene (링크드인 시니어 소프트웨어 개발자)

## 누가 이렇게 그림을 그린 거야?

개발자는 코드로 그림을 그리는 사람이다. 개발자는 함수로 선을 그린다. 함수 컴포지션은 소프트웨어 개발의 공식화된 방법으로 함수를 짧게, 단일 목적으로, 명확하게 유지하기 위함이다. 무엇보다 기능 테스트 및 추론에 용이하며, 추후 내가 짠 코드를 사용할 이들을 위해 문서화시키기도 쉽다.

함수 컴포지션은 수학에서 합성함수의 개념이다. 합성함수는 (°) 도트 기호를 쓴다. 두 함수 사이의 원 기호는(°) 오른쪽에 있는 함수의 결과를 가져 와서 왼쪽에 있는 함수에 인자로 전달하는 것을 의미한다. 두 함수의 조합되어 새로운 함수가 된다.  함수 A(3) = 15, 함수 B (15) = 22가 있고, 함수 C는 A (C = B ° A)가 있다 가정하자. 인자 3을 사용하면 22 (C (3) = 22)를 반환한다.

요약하자면 단일 목적인 함수는 많은 일을 하지 않는다. 이 것이 이 함수의 아름다움이다.  함수 구성하는데 만드는데 특별한 방법이 있는 것은 아니다.  

예를 들어 문자열에서 공백을 제거하는 함수가 있다고 해보자. 이 함수는 두 점의 거리를 계산한다. 이 함수는 숫자 목록의 표준 편차를 찾는다. 이렇듯 함수가 수행하는 일을 쉽게 설명할 수 있어야 한다. 간단하고 명료하게 함수를 선언하기 어렵거나 명확하게 설명할 수 없다면 이 함수를 여러 함수로 분기처리해 리팩토링하거나 실제로 하고자 하는 의도를 다시 한번 정리하는 것이 좋다. 내가 하고자 하는 일을 일련의 논리적이고 명료하게 기술할 수 있어야 한다. 우리는 컴퓨터와 이야기 하고 있는 것이다. 내가 하고자 하는 말이 컴퓨터가 이해할 수 있는 언어인 바이너리로 변환할 수 있어야 한다. 이와 같은 단계들이 바로 함수를 만드는 과정이다. 궁극적으로 애플리케이션은 많은 함수의 구성이다.

## 간단한 예제를 살펴보자

간단한 예제로 시작하자. 어떤 문자열 내에 있는 단어를 찾아 처음 글자만 대문자로 변환하는 함수를 만든다고 가정해보자. 어떻게 해야할까? 

1. 문자열 중 단어를 찾는다.
2. 모든 단어의 첫 번째 알파벳을 대문자로 치환한다.
3. 새로운 문자열을 반환한다.

정규표현식(regex)를 사용해 간단히 해결할 수 있지만, 사용하지 않고 단계를 따라 함수를 작성해보자. 아래와 같이 작성할 수 있을 것이다.
```javascript
/**
*@name titleCase
*@param {String} str - 변환될 문자열
*@returns {String} 모든 단어가 대문자로 시작되는 새 문자열
*/
function titleCase(str) {
	// 문자열을 단어 단위로 분절한다
	const parts = str.trim().split(' ');
	// 공백을 제거한다
	const trimmed = parts.filter((next) => next.length > 0);
	// 각 단어의 첫 번째 알파벳을 대문자로 바꾼다 
	const capitalized = trimmed.map((next) => {
		return next[0].toUpperCase() + next.substring(1);
	});
	// 모든 단어들을 다시 붙인 문자열을 반환한다
	return capitalized.join(' ');
}
```
복잡하지 않다.  모든 과정이 논리적이고 이전 단계와 연결된다. 추상화가 필요한 부분이 많이 있다. 기본적인 해야할 일과 관련없는 세부적인 실행 내용이 많이 있다. 첫번째 해야할 일은 입력된 문자열을 단어 배열로 나누는 것이다. 이 함수를 이렇게 만들 수 있다.
```javascript
/**
 * @name words
 * @param {String} str - 단어로 문자열을 분절
 * @returns {String[]} 단어로 된 배열
 */

function words(str){
	// 문자열을 단어 단위로 분절한다
    const parts = str.trim().split(' ');
    // 공백을 제거한다
    return parts.filter((next) => next.length > 0);
}
```
`titleCase()` 함수는 다음과 같이 만들 수 있다.
```javascript
/**
*@name titleCase
*@param {String} str - 변환될 문자열
*@returns {String} 모든 단어가 대문자로 시작되는 새 문자열
 */

function titleCase(str) {
	// 단어의 첫 번째 알파벳을 대문자로 바꾼다
	const capitalized = words(str).map((next) => {
	return next[0}.toUpperCase() + next.substring(1);
	});
	// 모든 단어를 붙여 한 문자열로 만들고 반환한다
	return capitalized.join(' ');
	}
	
```

`titleCase()`는 단어를 대문자로 변환하는지 확인할까? 그렇지 않다. 이 함수의 기능을 분리해 단어가 대문자로 시작하는지를 판별하고, 대문자로 치환할 수 있게 해보자.

```javascript
/**
*@name capitalized
*@param {String} str - 대문자로 변환되는 문자열
*@returns {String} 첫번째 알파벳이 대문자로 바뀐 새 문자열
 */

const capitalize = (str) => str[0].toUpperCase() + str.substring(1);

/**
 * @name titleCase
 * @param {String} str - 변환될 문자열
 * @returns {String} 모든 단어가 대문자로 시작하는 새 문자열 
 */
function titleCase(str) {
 // 각 단어의 시작을 대문자로 바꾼다
 const capitalized = words(str).map(capitalized);
 각 단어를 붙여 문자열로 변경하여 반환한다.  
 return capitalized.join(' ')
}
```

다음으로 각 단어가 대문자로 시작되는 배열을 반환하는 함수를 만들어보자. 궁극적 인 목표는 `titleCase()` 내 세부 기능을 떼어, 함수로 만들어 논리적인 단계를 설명할 수 있게 추상화하는 것이다.

## 추상화 지옥

아직까지 실제 구성한 것이 아무것도 없다.  titleCase()는 함수를 조합시켜 코드 한줄로 끝내야한다.
```javascript
/**
 * @name titleCase
 * @param {String} str - title case로 변환하는 문자열
 * @returns {String} 변환된 문자열
 */
const titleCase = compose(join(' '), map(capitalize), words);
```

여기서 무슨 일이 일어나는 걸까?  `compose()`가 없다고 해보자.

```javascript
/**
 * @name titleCase
 * @param {String} str - title case로 변환하는 문자열
 * @returns {String} 변환된 문자열
 */
const titleCase = function(str) {
	join(' ', capitalized(words(str));
});
```

함수 호출을 다른 함수의 인자로 사용하기 전에, 이렇게 코드를 짜본 경험이 있을 것이다. `titleCase()`에서 모든 함수가 합성된다. 이 함수를 명료하게 만들려면 추상화가 필요하다.

자바 스크립트에서는 연산자나 중위 함수를 만들 수 없다. `compose()`는 n 개의 함수를 필요로하고 해당 함수의 오른쪽에서 왼쪽으로 합성하는 새로운 함수를 반환한다. 짧게실행 내용을 살펴보자. 이 경우, `titleCase()` 가 받는 인자는 `words()` 함수의문자열이다. `Capitalize()`는 `words()`의 결과를 가져오고, `join()`은 `capitalize()`의 결과를 받는다. 마침내 `join()`의 반환 값은 컴포지션의 결과 값으로 사용된다.

앞에서 이 함수가 해야할 일을 세 단계로 나누고 명시했다. 각 단계에 해당하는 기능이 있다. 단어를 찾고, 대문자로 바꾸고, 대문자로 된 단어를 결합하여 새 문자열을 반환했다. 최종적으로 이 세 함수는 `titleCase()` 함수를 구성하게 된다.

그러나 이 세 단계가 정확히 각각 무엇을 내포하고 있을까? `words()`는 공백을 나눈 것보다 더 많은 기능을 수행한다.

1. 선행 / 후행 공백 제거
2. 공백에 문자열 분할
3. 단어 목록에서 빈 문자열 (여분의 공백) 제거

세 가지 단계가 더 있다. :

```javascript
/**
 * @name words
 * @param {String} str - 문자열을 단어로 분절한 배열
 * @returns {String[]} 단어가 나열된 배열
 */
const words = compose(removeEmpty, split(' '), trim);
```

여기에서 `trim()`과 `split()` 함수는 내장함수인 `String.prototype.trim`과 `String.prototype.split` 을 호출한다.

```javascript
/**
 * @name trim
 * @param {String} str - 분할할 문자열
 * @returns {String} - 선행 및 후행 공백이 제거 된 문자열
 */
const trim = (str) => str.trim();
```
`split()`은 curry 함수를 쓰고 있는 공백을 분리하는 함수다.

```javascript
/**
 * @name split
 * @param {String} separator - 문자열에서 분리할 문자열
 * @param {String} str - 분할할 문자열
 * @returns {String[]} 문자열로 된 배열
 */
const split = curry((separator, str) => str.split(separator));
```

아래와 같이 `breakOnSpace()` 함수를 만들 수 있다.
```javascript
/**
 * @name breakOnSpace
 * @param {String} str - 분할할 문자열
 * @returns {String[]} 문자열로 된 배열
 */
const breakOnSpace = split(' ');
```

`removeEmpty()`함수는 문자열에 여분의 공백이 있는 경우, 단일 공백으로 분할 할 때 대소문자를 처리한다. 배열에 빈 문자열이 포함된다. 때문에 이 배열에서 빈 문자열을 제거해야한다. 모든 경우에 사용될 수 있는 것이 아니지만 아래와 같이 처럼 구현해 볼 수 있다.

완성된 `emoveEmpty()`는 다음과 같다.
```javascript
/**
 * @name removeEmpty
 * @param {Array} xs - 필터된 배열
 * @returns {Array} 빈 요소가 제거된 새 배열
 */
const removeEmpty = (xs) => xs.filter(notEmpty);
```

참고 : `titleCase()`의 나머지 두 단계 (`capitalize()`, `join()`)의 설명은 생략한다. [링크](https://github.com/kevinbgreene/composition-tutorial/tree/master/src)에서 나머지 코드를 볼 수 있다.

## TDD : 강아지처럼 귀엽고 아이스크림처럼 달콤한 것이 아니다.

나는 커링과 컴포지션을 아주 과하게 사용해서 자바스크립트를 짠다. 몇 가지 내가 즐겨쓰는 이유가 있다. 첫 번째는, 아주 마이크로한 단위의 코드를 재사용하기 위해서다. 아주 작은 단위의 함수가 많을 수록 개발하고 있는 프로젝트에서 더 복잡한 함수로 사용할 수 있다. 두 가지는 내 코드를 보는 관점을 바꾸는 것이다. 작성한 코드를 추상화하고, 단순화하고, 재사용 할 수 있는 방법에 눈을 뜰 수 있다. 나는 TDD (Test Driven Development)를 추구한다. TDD를 엄격하게 따르지 않더라도 자바스크립트는 단위별로 테스트해야한다. 작은 단위의 함수일수록 테스트가 쉽다. 논리가 확실하는 가정 하에, 철저한 단위 테스트를 거친 함수들을 함께 구성한다면 프로그램이 문제 없이 작동될 것이다. 반대로 작동하지 않는다면, 이 함수가 어떤 기능을 하는지, 어디서 사용해야하는지 각 단계에 대한 나의 추론에 결함이 있음을 발견할 수 있다. 그 다음 컴포지션에 배치하고 각 유닛 테스트를 마친다. 그 후에 컴포넌트를 구성하는 함수가 올바르게 해석되고 유닛 테스트가 완료되었음으로 다른 컴포넌트에 사용할 수 있다.

유닛 테스트를 작성은 때로 고통스럽다. 테스트 코드를 위해 함수가 하는 일을 최대한 쉽고 간단하게 만드는 것이 좋다. 나의 논리가 간단하고 추론적이라면 테스트 작성은 훨씬 간단해진다. 컴포지션을 통해 함수를 작성하면 수행해야 할 단계가 일목요연하게 구성되기있 때문에 함수를 읽고 이해하기가 쉬워진다. 나 역시 복잡한 문제 앞에서도 어떻게 이를 풀어야하는지 그 방법을 곧바로 찾지 못할 때가 있다.  바로 테스트하기 쉬운 작은 함수를 만드는 것이 시작이다.

## 마법의 주문 만들기

함수 컴포지션은 그동안 알게 모르게 정말 많이 써왔을 것이다. `g(f(arg))` 와 같은 수식을 썼다면 바로 함수 합성을 사용한 것이다. 그러나 g와 f의 합성 함수를 재사용이 가능하게 만드려면 인자(arguments)가 있는 함수로 만들어야 된다.

컴포지션을 제공하는 라이브러리가 있다. 본문 글 마지막에 기본적인 커링(currying) 함수를 제공하는 라이브러리를 명시했다. 라이브러리를 사용하더라도 기본적인 작동 방법에 대해 살펴볼 필요가 있다.

```javascript
/**
 * @name compose3
 * @param {Function} third - 호출할 세 번째 함수
 * @param {Function} second - 호출할 두 번째 함수
 * @param {Function} first - 호출할 첫 번째 함수
 * @returns {*} 두 번째 함수의 결과
 */
function compose3(third, second, first) {
  return function composition(arg) {
    return third(second(first(arg)));
  };
}
```
완벽한 이상적인 코드는 아니지만, 잘 동작한다. 조립하고자 하는 모든 함수를 	`compose2 (compose4 ...)`으로 작성해야한다.

그렇다면 일반적인 함수의 구성은 어떻게 해야할까?
그리고 정확히 어떤 일을 해야할까?

1. n 개의 함수 가져온다.
2. 인자를 취하는 새 함수를 반환하고, 해당 인자인 함수를 호출한 결과를 반환한다.

이렇게 시작할 수 있다. :

```javascript
/**
 * @name compose
 * @param {...Function} fns - 구성할 함수들
 * @returns {Function} fns의 함수 컴포지션인 새로운 함수
 */
function compose(...fns) {
  return function composition(arg) {
  };
}
```
매개변수에 배열로 받는 함수를 만들 수 있다. 인자로 받는 함수를 반환한다. 함수 리스트를 어떻게 적용할 수 있을까? 이 목록을 가지고 각 결과를 반환해야한다. 배열 메소드를 사용하면 되지 않을까? 이렇게 리스트 내 항목이 하나씩 감소되는 함수를 만들어볼 수 있다.


```javascript
/**
 * @name compose
 * @param {...Function} fns - 구성할 함수들
 * @returns {Function} fns의 함수 컴포지션인 새로운 함수
 */

function compose(...fns) {
  return function composition(arg) {
    return fns.reduceRight((acc, next) => {
      return next(acc);
    }, arg);
  };
}
```

`composition()` 인자는 초기화 된 감소 누산기(accumulator of reduce) 이다. 새로운 누산기는 누산기에 다음 함수를 적용한 결과다.

`reduceRight()`를 사용한 이유는 무엇일까? 왜 왼쪽부터 시작하지 않았을까? 어느 방향을 하든지 작동된다. 왼쪽애소 오른쪽으로 방향을 설정하면 좀더 수학적인 수식이 된다.  함수 컴포지션을 제대로 읽을 수 있게 됐다.

```
compose(join(' '), capitalize, words)('this is a test');
// -> This Is A Test
```
이제 `this is a test`라는 문장이 먼저 `words`의 매개변수로 전달된다는 사실이 좀더 명확해졌다. 오른쪽에서 왼쪽은 컴포지션을 통한 데이터 흐름을 의미한다.

### 라이브러리 
1. [ramda.js](http://ramdajs.com/0.21.0/index.html)
2. [lodash.js](https://lodash.com/)
3. [underscore.js](http://underscorejs.org/)
