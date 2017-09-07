# 생명주기 (Lifecycle)

* React 공식문서 : [The Component Lifecycle](https://facebook.github.io/react/docs/react-component.html#the-component-lifecycle)

__`render()`은 렌더링만!__

데이터를 `render()` 메서드에서 가져오면 절대로 안된다! 컴포넌트 `render()` 메소드는 컴포넌트를 그리기 위한 목적으로 사용되어야한다. HTTP 요청을하거나 콘텐츠를 표시하는 데 사용되는 데이터를 가져 오거나 DOM을 변경해서는 안된다. `render()` 내 다른 함수를 호출해서도 안된다.

따라서 Ajax 요청 코드는 생명주기 이벤트에 넣어야 한다.

라이프 사이클 이벤트의 메소드는 컴포넌트 인스턴스에 자동으로 바인딩되며, React는 컴포넌트 수명동안 특정 시간에 알아서 메소드를 호출한다. 가장 일반적으로 사용하는 이벤트는 아래와 같다.

* `componentWillMount()` : 컴포넌트가 DOM에 삽입되기 직전.
* `componentDidMount()` : 컴포넌트가 DOM에 삽입 된 직후.
* `componentWillUnmount ()` : DOM으로부터 컴퍼넌트가 삭제되기 직전.
* `componentWillReceiveProps()` : 컴포넌트가 새로운 props를 받을 때마다.


* 컴포넌트가 DOM에 추가 될 때 호출되는 생명주기 이벤트
```
constructor()
componentWillMount()
render()
componentDidMount()
Re-rendering
```

* 컴포넌트가 DOM으로 다시 렌더링 될 때 호출되는 생명주기 이벤트

```
componentWillReceiveProps()
shouldComponentUpdate()
componentWillUpdate()
render()
componentDidUpdate()
```

* 컴포넌트가 DOM에서 제거 될 때 호출되는 생명주기 이벤트

```
componentWillUnmount()
```

가장 많이 사용하는 이벤트는 `componentDidMount()`, `componentWillMount()`, `componentWillUnmount()`, `componentWillReceiveProps()` 이다.

### ajax 요청

`componentDidMount()`는 컴포넌트가 DOM에 추가 된 직후 실행되는 라이프 사이클이므로 원격 데이터를 가져 오거나 Ajax 요청을 수행하는 경우 사용해야 한다. 다음은 React 공식 문서에서는 아래와 같이 기술했다.

> `componentDidMount()`는 컴포넌트가 마운트 된 직후에 호출된다 DOM 노드의 초기화는 이 메소드 내 있어야 한다. 원격 엔드포인트에서 데이터를 불러야하는 경우 네트워크 요청을 인스턴스화하기 좋다 이 메소드의 상태를 설정하면 재 렌더링이 된다.


```javascript
import React, { Component } from 'react';
import fetchUser from '../utils/UserAPI';

class User extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      age: ''
    }
  }

  componentDidMount() {
    fetchUser().then((user) => this.setState({
      name: user.name,
      age: user.age
    }))
  }

  render() {
    return (
      <div>
        <p>Name: {this.state.name}</p>
        <p>Age: {this.state.age}</p>
      </div>
    )
  }
}

export default User;

```

위의 코드가 실행되는 과정을 요약하면 아래와 같다.

1. `render()` 메서드가 호출되면 페이지 내 <div>를 업데이트 합니다. `this.state.name`과 `this.state.age`가 (처음에는) 빈 문자열 이므로 이름과 나이가 실제로 표시되지 않는다.
2. 컴포넌트가 마운트되면 `componentDidMount()` 생명주기 이벤트가 발생한다.
  1. 사용자 데이터베이스에 요청을 보내는 UserAPI의 `fetchUser` 요청이 실행된다.
  2. 데이터가 반환되면 `setState()`가 호출되고 `name` 및 `age` 속성이 업데이트 된다.
3. 상태가 변경되었으므로 render()이 다시 호출된다. 페이지가 다시 렌더링되나 `this.state.name` 및 `this.state.age`는 값을 가지고 있다.

####### 실습예제
```javascript
class App extends Component {
  state = {
    contacts: []
  }
  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
      this.setState({ contacts })
    })
  }
  //[.....]
}
```

지금까지 Contacts API에서 모든 목록을 가져 와서 `this.state.contacts`에 추가했다.

*  App.js내 `.state.contacts`를 빈 배열로 설정한다.
* `App.js`에서 `ContactsAPI.js` 파일을 가져온다.
* `componentDidMount` 생명주기 이벤트를 `App.js`에 추가한다.
* `componentDidMount`가 contacts API의 `getAll()` 메소드에서 반환된 결과값을 `this.state.contacts`로 업데이트 한다.

## 벡엔드 데이터베이스 삭제
`this.state.contacts`에서 제거되지만 백엔드 데이터베이스에는 여전히 존재한다.
Contacts API 내 `remove()` 메소드를 사용해 백엔드를 업데이트한다. ` ContactsAPI.remove(contact)`

```javascript
class App extends Component {
  //[...]
  removeContact = (contact) => {
    this.setState((state) => ({
      contacts: state.contacts.filter((c) => c.id !== contact.id)
    }))

    ContactsAPI.remove(contact)
  }
    //[...]
}
```

백엔드 데이터가 모두 삭제될 경우 다시 백엔드 서버를 실행하면 된다.