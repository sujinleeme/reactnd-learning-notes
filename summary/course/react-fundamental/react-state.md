# State 관리
## 1. 개발 환경 세팅

### 기본 파일 삭제
앱 설치 이후, 개발을 위해 보일러플레이트(기본) 파일들을 삭제한다.

* `src/App.css` 파일 삭제
* `src/Logo.svg` 파일 삭제
* `src/index.css` 모든 내용 삭제 
* `src/App.js` 아래 코드를 제외한 모든 내용 삭제

```javascript
import React, { Component } from 'react';
class App extends Component {
    render() {  }
}
```

* 프론트엔드 개발 서버 : port 3000 (`npm start` 또는 `yarn start`)
* 백엔드 서버 : : port 5001 (`node server.js`)

함수에 인자를 전달하는 것처럼 컴포넌트에 props를 전달할 수 있다고 생각하면 된다. 자바스킯트 함수에 전달된 인자에 액서스할 수 있는 것 처럼 `this.props(상태가 없는 함수 컴포넌트(stateless functional component)에 있는 props)`를 사용하여 컴포넌트의 props에 액서스 할 수 있다.

## 2. Props로 데이터를 전달한다

`prop`는 React 컴포넌트로 입력값을 전달한다. HTML 속성과 같이 prop name과 value가 컴포넌트에 추가된다.

```javascript
// 컴포넌트로 prop를 전달
<LogoutButton text='Wanna log out?' />
```

위 코드에서 text는 prop이고 `Wanna log out`값을 갖는다.

모든 `props`는 `this.props`객체에 저장된다. `this.props.text`로 컴포넌트의 `text prop`에 접근할 수 있다.

```javascript
// 컴포넌트 안에 prop를 접근할 수 있다
...
render() {
    return <div>{this.props.text}</div>
}
...
```

## 3. 함수형 컴포넌트(Functional Component)
데이터 변경 없이 모든 컴포넌트 내용을 렌더링(`render()`)할 경우, `Stateless Functional Component`로 변환할 수 있다.

컴포넌트가 내부 상태(internal state)를 추적하지 않은 경우(즉, 실제로 렌더링 된 메소드 만있는 경우) 컴포넌트를 `Stateless Functional Component`로 선언할 수 있다.

React 컴포넌트는 렌더링을 위해 html를 반환하는 자바스크립트 함수일 뿐이다.

```javascript
class Email extends React.Component {
  render() {
    return (
      <div>
        {this.props.text}
      </div>
    );
  }
};
```
```javascript
const Email = (props) => (
  <div>
    {props.text}
  </div>
);
```

두 번째 예제에서(ES6 함수로 작성) `this.props`에서 `props`를 액서스하지 않고 함수 자체의 인자에 직접 `props`를 전달한다. 자바스크립트 함수는 `Email` 컴포넌트의 `render()` 메서드와 같이 사용하게 된다.

###### 실습예제
```javascript
function ListContacts(props) {
  return (
      <ol>
        {props.contacts.map((contact) => (
          <li key={contact.id} className="contact-list-item">{contact.name}
            <div className="contact-avatar" style={{ backgroundImage: `url(${contact.avatarURL})`
            }}></div>
            <div className="contact-details">
              <p>{contact.name}</p>
              <p>{contact.email}</p>
            </div>
            <button className="contact-remove">
              Remove
            </button>
          </li>
        ))}
      </ol>
  )
}
```

```javascript
class ListContacts extends Component {
  render() {
    return (
      <ol>
        {this.props.contacts.map((contact) => (
          <li key={contact.id} className="contact-list-item">{contact.name}
            <div className="contact-avatar" style={{ backgroundImage: `url(${contact.avatarURL})`
            }}></div>
            <div className="contact-details">
              <p>{contact.name}</p>
              <p>{contact.email}</p>
            </div>
            <button className="contact-remove">
              Remove
            </button>
          </li>
        ))}
      </ol>
    )
  }
}
```

## 4. 컴포넌트에 State 추가하기

props가 부모 컴포넌트 속성을 참조하는데, props는 불변하는 읽기 전용 데이터를 나타낸다.

컴포넌트의 상태인 `state`는 페이지에서 렌더링 되는 내용에 최종적으로 영향을 주는 __변경 가능한 데이터__를 말한다. state는 컴포넌트 자체에서 내부적으로 관리되고 사용자 입력에 의해 변동된다.

복잡한 상태 값을 개별 컴포넌트화 하여 캡슐화하는 방법을 알아야한다.

## 5. setState로 state 업데이트

__UI = fn(state)__

UI is just a function of your state : UI는 상태를 나타내는 함수이다.

ojbect를 업데이트 하는 방법
```javascript
this.setState({
    username: 'Tyler'
})
```

이전 상태 값을 인자로 받아 객체 값을 업데이트하는 방법
```javascript
this.setState((prevState) => ({
    count: prevState.count + 1
}))

``` 

### State를 세팅하기
컴포넌트는 렌더링된 출력에 최종적으로 영향을 주는 변경 가능한 정보를 반영하기 때문에, this.setState ()를 사용하면 생명주기에 따라 state를 업데이트 할 수 있다. state가 변경되면, React가 컴포넌트를 다시 렌더링 해준다.

`setState()`를 사용하는 두 가지 방법이 있다. 

첫 번째는 상태 업데이트를 병합하는 방법이다.

```javascript
class Email extends React.Component {
  state = {
    subject: '',
    message: ''
  }
  // ...
});
```
컴포넌트 state 초기값을 설정한 후, 독립적으로 state를 업데이트 할 수 있다.

```javascript
this.setState({
  subject: 'Hello! This is a new subject'
})
```

`this.state.message`는 유지하되 `this.state.subject`를 새 값으로 바꿀 수 있다.

`setState()`를 사용할 수 있는 두 번째 방법은 객체가 아닌 함수를 전달하는 것이다.

```javascript
this.setState((prevState) => ({
  count: prevState.count + 1
}))
```

여기서 전달 된 함수는 하나의 `prevState` 인자를 갖고 있다. 컴포넌트 state가 이전 state에 따라 달라지는 경우 (즉, 이전 상태에서 카운트가 1 씩 증가하는 경우)`setState()`를 사용한다.

컴포넌트는 사용자 입력으로 상태가 변경될 것을 예상하고 있음으로 컴포넌트는 `this.setState()`를 사용해 내부 상태를 변경한다. 상태가 변경될 때 마다 React를 알고 있으며 `render()`를 호출해 컴포넌트를 재 렌더링한다. 이를 통해 UI를 빠르고 효율적으로 업데이트 할 수 있는 것이다.

####### 실습예제
* 리스트 아이템 삭제하기 버튼 기능 구현

App.js
```javascript
  removeContact = (contact) => {
    this.setState((state) => ({
      contacts: state.contacts.filter((c) => c.id !== contact.id)
    }))
  }
  render() {
    return (
      <div>
        <ListContacts onDeleteContact={this.removeContact} contacts={this.state.contacts} />
      </div>
    )
  }
```
ListContact.js
```javascript
<button onClick={() => props.onDeleteContact(contact)} className="contact-remove">Remove</button>
```