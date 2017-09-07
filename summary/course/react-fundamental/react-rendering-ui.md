# 요소 및 JSX를 통한 생성 

React에서 .createElement () 메소드는 새 요소를 생성하여 일반 자바스크립트 객체를 반환한다.

```javascript
const element = React.createElement('div', null, 'helloworld');
// console.log(element);
ReactDOM.render(element, document.getElementById('root'));
```

해당 노드 확인 할 때, `$0`로 접근할 수 있다.

ex)
```javascript
const element = React.createElement('div', {
    className: 'welcome-message'
}, 'hello world')
```

```
div = $0
div.className // welcome-message
```

React를 사용하면 많은 HTML 속성을 React 요소로 전달할 수 있다. : React [HTMLDOMPropertyConfig.js](https://github.com/facebook/react/blob/master/src/renderers/dom/shared/HTMLDOMPropertyConfig.js)에서 확인 가능

### 컴포넌트 생성

#### `React.createElement();`
```javascript
React.createElement( /* type */, /* props */, /* content */ );
```

* `type` - 문자열 또는 React 컴포넌트 : 기존의 HTML 요소 (예 : `p`, `span`또는 `header`)의 문자열이거나 React 컴포넌트를 전달할 수 있다. JSX로 컴포넌트를 생성한다.
* `props` - `null` 또는 객체 : 요소에 대한 HTML 속성 및 사용자가 정의한 데이터의 객체이다.
* `content` - `null`, 문자열, React 요소(element) 또는 컴포넌트(component)

"Hello world!" 이 React 요소가 HTML로 렌더링 될 때 `<>`로 래핑되어야 한다. 
아래 예제와 같이 React 컴포넌트를 중첩할 수 있지만, 단일 컴포넌트를 반환한다.

```javascript
const element = React.createElement('div', null,
  React.createElement('strong', null, 'Hello world!')
);
```

`map()`으로 객체를 반복해 컴포넌트를 만들 수 있다.

```javascript
// index.js
import React from 'react'
import ReactDOM from 'react-dom'

const people = [
    { name: 'Michael' },
    { name: 'Ryan' },
    { name: 'Tyler' },
]

const element = React.createElement('ol', null,
    people.map((person, index)=> (
        React.createElement('li', {key: index}, person.name)
    ))
)

ReactDOM.render(element, document.getElementById('root'));
```

JSX로 컴포넌트와 템플릿 리터널로 컴포넌트를 생성할 수 있다.

```javascript
const element = <ol>
    {people.map(person => (
        <li key={person.name}> {person.name}</li>
    ))}
</ol>
```

배열이나 이터레이터로 생성하는 자식 요소는 고유한 `key`를 가지고 있어야 된다. `<li>`에 `key`가 할당되어 있지 않으면, 아래와 같은 오류가 발생한다.

`proxyConsole.js:56 Warning: Each child in an array or iterator should have a unique "key" prop.`

결국, React는 앱의 View와 밀접한 관련이 있다. 뷰는 사용자와 상호 작용이 일어나는 곳이다. `.createElement()`를 사용하여 HTML을 문서에 렌더링 할 수 있다. 이 구문을 확장 해 `UI`를 만든다. `JSX`는 브라우저에서 HTML이 렌더링 될 때, React의 `.createElement()` 메소드해 컴파일 한다.

React 앱을 만들 때 React의 모듈화 및 재사용을 고려한 컴포넌트를 만들어야 한다. 각 컴포넌트 클래스를 컴포넌트의 인스턴스를 생성하는 공장으로 생각할 수 있다. 이 컴포넌트는 단일 목적을 가져 "한 가지 역할만 수행"해야 한다. 너무 많은 일을 관리하는 컴포넌트라면 더 작은 하위 컴포넌트로 분해하는 것이 바람직하다.

* 참고자료: [Rendering Elements](https://facebook.github.io/react/docs/rendering-elements.html)

# React App 생성하기

* 이슈 해결 : [osx에서 npm global 사용법](https://johnpapa.net/how-to-use-npm-global-without-sudo-on-osx/)

초기 개발 세팅을 간소화하기 위해 Facebook의 Create React App 패키지를 사용해 모든 설정을 관리할 수 있다. Zero Configuration을 통해 필요한 모든 것을 설정 가능하다.

yarn은 npm의 단점을 보강하기 위해 페이스북이 만든 패키지 관리자이다.

```
npm install -g create-react-app
brew install yarn
```

create-react-app [app 이름]

`yarn`과 `npm` 명령어는 서로 호환되어 `npm start`와 `yarn start`는 동일하다.
```
cd [react-app 이름]
yarn start
```

## 상속(Inheritance)으로 컴포넌트 구성
"지나칠 정도로 상속을 최대한 많이 써서 컴포넌트를 구성하는 것을 좋아한다(favor composition over inheritance)"는 말이 있다. 오늘 가장 많이 사용되는 프로그래밍 언어의 대다수는 상속을 광범위하게 사용하며 Android 및 iOS SDK와 같이 널리 사용되는 UI 프레임 워크로 전승되었다.

대조적으로, React는 컴포지션을 사용하여 사용자 인터페이스를 만든다. React.Component 확장하나 절대로 두 번 이상 쓰지 않는다. 더 많은 UI 또는 동작을 추가하기 위해 기본 구성 요소를 확장하는 대신, 중첩 및 props를 사용해 컴포넌트를 만들어야 한다. 궁극적으로 UI 구성 요소가 독립적이고 집중적이며 재사용이 가능해야 한다.




