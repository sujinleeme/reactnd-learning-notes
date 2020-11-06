# Redux

[Udacimeals](https://github.com/udacity/reactnd-udacimeals-complete)

## Redux란 무엇인가

### Redux : A predictable state container for JavaScript apps
Redux는 자바스크립트 앱의 프론트엔드 State를 관리한다.

단일 웹 애플리케이션이 복잡해지면서 상태가 잘못 관리되어 버그가 발생될 수 있다.

e.g)
* 서버 응답
* 캐시 데이터 (유저)
* 로컬 데이터가 아직 서버에 보관되지 않음

UI 상태
* 라우터(Active routes)
* 현재 선택된 탭
* 페이지네이션 컨트롤

리덕스는 함수형 프로그래밍의 "순수 함수(pure function)"에 의존한다.

__예측가능성(Predictability)__: 리덕스 앱의 전역 상태(Global State)로 상태 업데이트가 엄격하게 제어되므로 Redux를 예측 가능하게 한다.


### The Store: A Single Source of Truth
스토어는 애플리케이션의 전역 상태 값을 가진다

* 스토어(Store)에는 응용 프로그램의 전역 상태가 포함되며 모두 단일 개체 트리(singble object tree)에 보관된다. 실행 취소/다시 실행 기능을 구현한다고 할 때, 상태 값이 여러 컴포넌트에 분산되지 않고 단일 트리에 저장됨으로 구현과 디버깅이 수훨해진다

* Redux 앱의 상태는 읽기 전용. Redux 상태는 변경 불가능하다 컴포넌트는 상태를 업데이트 해야한다고 알려줄 수 있다. `Reducer`를 통해서만 상태 값을 바꿀 수 있다.

## Readux 예측 가능성 향상

### React의 단방향 데이터 흐름(Unidirectional Data Flow)
React의 핵심 기능은 단방향 데이터 흐름이다. 데이터는 상위 구성 요소에서 하위 구성 요소로 전달됩니다. 부모가 실제 변경을 수행하는 부모 구성 요소로 데이터 업데이트가 전송됩니다. 하위 구성 요소가 해당 데이터를 사용해야하는 경우 해당 데이터를 하위 구성 요소로 전달할 수 있습니다. 모든 업데이트는 변경된 부모에게 다시 전송되며, 업데이트 된 데이터는 자식에게 다시 전달된다.
React의 단방향 데이터 흐름은 잘 작동하지만 복잡하게 중첩된 컴포넌트 구조를 다룰 때 문제가 발생한다.

Redux는 여러 가지 방법으로 웹 앱의 예측 가능성을 향상 시킨다.

* 데이터가 하나의 중앙위치에 통합한다.
* 컴포넌트는 해당 데이터에 대한 액세스를 요청한다. 
* 스토어의 데이터는 한 방향으로 흐른다.
* 스토어 업데이트를 위해 엄격한 규칙이 설정된다.

## Redux Stores vs React Component State

* React : 전체적으로 앱 또는 컴포넌트에 영향을 주지 않고 복잡하지 않은 local 값 (e.g UI 토글, form 입력 상태 값)
* Redux : 전역에 영향을 주며 복잡하게 상태가 변화하는 global 값

Redux는 웹 애플리케이션을 위한 강력한 state 컨테이너이지만, 모든 상태가 Redux store에 저장되야 하는 엄격한 규칙이 있는 것은 아니다 일부 데이터를 (React) 구성 요소 상태로 저장하는 것이 좋지만, 특별한 공통 규칙이 없어 어떤 상태값을 어느 쪽에 저장하여 사용할지는 각자의 몫이다.

### Redux 상태는 읽기 전용
Redux Store은 읽기만 가능하다. 이러한 제약에는 아래와 같은 장점이 있다.

* 예측 가능성(Pre) 및 안정성 향상
* 부작용 예방
* 상태를 쓰는 외부 리소스의 갯수가 방해를 받는다
* 모든 변경 사항은 중앙 집중방식으로 엄격한 순서에 따라 하나씩 발생한다.

상태를 변경할 수 있는 방법은 **action**을 내보내는 것이다.

Redux는 상태를 관리하지만 React 컴포넌트 일부에 데이터를 저장해서 사용해도 괜찮다.


#### 읽기자료
* [State is Read-Only](
https://github.com/reactjs/redux/blob/master/docs/introduction/ThreePrinciples.md#state-is-read-only)
* [How to choose between Redux's store and React's state?](https://github.com/reactjs/redux/issues/1287)
* [Organizing State](http://redux.js.org/docs/faq/OrganizingState.html)


## 순수함수(Pure Functions)
순수함수의 정의는 아래와 같다.

1. 동일한 인자가 전달되면 동일한 결과를 반환합니다.
2. 전달된 인자만 전적으로 의존한다.
3. 부수 효과(side effects)가 없다

```javascript
const square = x => x * x;
```
`square()`는 동일한 인수가 전달되면 매번 같은 값을 출력하기 때문에 순수한 함수이다. 함수는 주어진 입력으로 계산하는 것 이외에 프로그램의 실행에 영향을 미치지 않아야 하며, 부수 효과(side effect)가 없어야 한다

`calculateTip()`은 불완전 함수(impure function)이다.

```javascript
const tipPercentage = 0.15;

const calculateTip = cost => cost * tipPercentage;
```

함수 밖에 있는 변수 `tipPercentage`에 의존에 결과값을 리턴한다. 이 변수를 두 번째 인자로 넣으면 순수 함수 조건에 부합할 수 있다.

```javascript
const calculateTip = (cost, tipPercentage = 0.15) => cost * tipPercentage;
```

#### No Side Effects
부수 효과는 함수와 함수 밖의 인터렉션이다. side effect가 없어야 순수 함수다.
아래 기능은 side effect가 있는 함수들이다.

* HTTP 호출하기
* 외부 상태 변경
* 오늘 날짜 가져 오기
* `Math.random()`
* 콘솔에 메시지 인쇄하기
* 데이터베이스에 추가하기

#### 순수 함수 사용
순수 함수는 함수형 프로그래밍의 핵심이다. 데이터 변경과 부수 효과를 피하는 것과 더불어, 순수 함수는 함수 컴포지션의 개념과 비슷하다. 순수 함수는 본질적으로 모듈화되어 있어 테스트하기 쉽다. 순수 함수는 항상 동일한 인자를 사용하여 동일한 결과를 생성하기 때문에, 출력 데이터에 영향을 주는 앱의 다른 부분에 대해 걱정할 필요가 없다. 디버깅 및 검사 중에 앱에서 잘 정의 된 추가 지점을 제공합니다.

게다가 순수 함수는 코드를 훨씬 간단하게 유지한다. 순수 함수는 side effect를 일으키지 않는다. 즉, 앱을 리팩터링 할 때 순수 함수를 바뀌어도 외부에 악영향을 미치지 않는다.

응용 프로그램에서 순수 함수를 사용하면 많은 이점이 있지만, 빌드한 응용 프로그램에은 순수 함수나 불순수 함수 모두 사용할 수 있다. 순수 함수가 아닌 함수를 사용한다고 해서 반드시 "나쁜 프로그래밍"이라고 할 수는 없다. 예를 들어 DOM을 업데이트하는 이벤트 핸들러가 있는 버튼이 있다고 해보자. 순수함수를 사용해 이벤트 핸들러가 DOM을 업데이트하는 것은 좋은 방법이 아니다.

순수 함수는 더 나은 품질의 코드를 제공 함으로 앱을 개발할 때 이 것을 염두해두면 더 좋은 프로그래머가 될 수 있다.

#### 읽기자료
* [What is a Pure Function?](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-pure-function-d1c076bec976)
* [What is Functional Programming?](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0)
* [The Case for Purity](https://drboolean.gitbooks.io/mostly-adequate-guide/ch3.html#the-case-for-purity)

## `.reduce()`

.reduce ()의 핵심은 많은 양의 데이터라도 단일 값을 반환한다는 것이다. `.reduce()`는 **higher-order** 함수로, 함수(즉, 콜백)를 인자로 받는다.

**고차 함수()Higher-Order Functions)** : `.map()` 및 `.filter()` 메소드도 고차 함수로, 두 함수 모두 첫 번째 인자에 콜백 함수를 허용한다.


### 연습문제
1. 데이터 객체 중 sales 값을 합산

```javascript

const musicData = [
    { artist: 'Adele', name: '25', sales: 1731000 },
    { artist: 'Drake', name: 'Views', sales: 1608000 },
    { artist: 'Beyonce', name: 'Lemonade', sales: 1554000 },
    { artist: 'Chris Stapleton', name: 'Traveller', sales: 1085000 },
    { artist: 'Pentatonix', name: 'A Pentatonix Christmas', sales: 904000 },
    { artist: 'Original Broadway Cast Recording', name: 'Hamilton: An American Musical', sales: 820000 },
    { artist: 'Twenty One Pilots', name: 'Blurryface', sales: 738000 },
    { artist: 'Prince', name: 'The Very Best of Prince', sales: 668000 },
    { artist: 'Rihanna', name: 'Anti', sales: 603000 },
    { artist: 'Justin Bieber', name: 'Purpose', sales: 554000 }
];


let totalAlbumSales = musicData.filter((album) =>
    album.artist.length + album.name.length <= 25
).reduce((sum, current) => {
    return sum + current.sales
}, 0)

console.log(totalAlbumSales) //
```

2. 전체 favoriteIceCreams 리스트 내 중복 요소 값을 계산한 Object 출력

```javascript

const data = [
    { name: 'Tyler', favoriteIceCreams: ['Strawberry', 'Vanilla', 'Chocolate', 'Cookies & Cream'] },
    { name: 'Richard', favoriteIceCreams: ['Cookies & Cream', 'Mint Chocolate Chip', 'Chocolate', 'Vanilla'] },
    { name: 'Amanda', favoriteIceCreams: ['Chocolate', 'Rocky Road', 'Pistachio', 'Banana'] },
    { name: 'Andrew', favoriteIceCreams: ['Vanilla', 'Chocolate', 'Mint Chocolate Chip'] },
    { name: 'David', favoriteIceCreams: ['Vanilla', 'French Vanilla', 'Vanilla Bean', 'Strawberry'] },
    { name: 'Karl', favoriteIceCreams: ['Strawberry', 'Chocolate', 'Mint Chocolate Chip'] }
];


const flavors = data.reduce((total, current) => {
    return total.concat(current.favoriteIceCreams)
}, [])

const reducer = (arr, index) => {
    console.log(arr, index)
    arr[index] = (arr[index] || 0) + 1
    return arr
}

const iceCreamTotals = flavors.reduce(reducer, {})

console.log(iceCreamTotals)
/*
{ Strawberry: 3,
  Vanilla: 4,
  Chocolate: 5,
  'Cookies & Cream': 2,
  'Mint Chocolate Chip': 3,
  'Rocky Road': 1,
  Pistachio: 1,
  Banana: 1,
  'French Vanilla': 1,
  'Vanilla Bean': 1 }
 */
```