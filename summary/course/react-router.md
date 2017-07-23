# React Router

## 1. 들어가기

### 1.1 단일 페이지 응용 프로그램 Single-Page Apps

SPA에는 두가지 방법이 있다. 첫 번쨰는 전체 사이트 콘텐츠를 한번에 모두 다운로드하는 방법으로 사이트를 탐색 할 때 브라우저에서 이미 모든 것을 사용할 수 있어ㅏ 페이지를 새로 고칠 필요가 없다. 다른 방법은 사용자가 요청한 페이지를 렌더링하는 데 필요한 모든 것을 다운로드하는 것으로, 사용자가 새 페이지로 이동해 요청된 콘텐츠만 비동기 자바 스크립트에 의해 실행된다.

이상적인 SPA는 URL를 통해 페이지 콘텐츠를 제어한다. 단일 페이지 응용 프로그램은 상호 작용이 뛰어나므로 사용자는 URL을 사용하여 특정 상태로 돌아갈 수 있기를 있다. 즉 북마크가 가능하기(Bookmarkability) 때문이다. 사이트를 북마크에 추가하면 해당 북마크는 URL 일 뿐이며 해당 페이지의 상태는 기록되지 않는다.

앱에서 수행하는 모든 작업은 페이지의 URL을 업데이트하지 않는다. 따라서 북마크가 가능한 페이지를 제공하는 React 애플리케이션을 만들어야 한다.

### 1.2 React Router

React Router는 프로젝트를 SPA로 변환한다. 이 작업은 링크 생성을 관리하고 앱의 URL을 관리하며 서로 다른 URL 위치로 이동할 때 전환을 제공하는 등 다양한 특별한 기능을 제공한다.

* 참고 : https://reacttraining.com/

### 2. 동적 페이지 렌더링

#### 2.1 새 연락처 추가하기 폼 만들기 

`CreateContact`컴포넌트를 만들고 `render()`에 추가한다.

React Router를 단순히 재현하고자 this.state에 새 속성인 `sreen`를 추가하고 이 속성을 사용해 화면에 표시할 내용을 제어했다 `this.state.screen`이 `list`이면 기존의 모든 연락처 목록이 표시되고, `this.state.screen`이 `create`이면 `CreateContact` 컴포넌트가 보인다.

#### 2.2 hort-circuit Evaluation Syntax(단락 회로 평가 구문)

```
expression && expression
```
단락 회로 평가 (short-circuit evaluation)를 사용해 긱 화면 별로 보여줄 컴포넌트를 제어할 수 있다. 첫 번째 표현식이 참으로 평가되면 두 번째 표현식이 실행된다 반대로 첫 번째 표현식이 거짓으로 평가되면 두 번째 표현식은 건너뛴다. 

```javascript
{this.state.screen === 'list' && (
  <ListContacts
    contacts={this.state.contacts}
    onDeleteContact={this.removeContact}
  />
)}
```

```javascript
 {this.state.screen === 'create' && (
  <CreateContact />
)}
```
#### 2.3 추가 버튼
화면 전환하는 `onNavigate()`메소드를 추가한다.

App.js
```javascript
render() {
    //[...]
  <ListContacts
   //[...]
    onNavigate={() => {
      this.setState({ screen: 'create'})
    }}
  />
}
```
ListContacts.js
```javascript

render() {
  //[...]
  <a
    href="#create"
    onClick={this.props.onNavigate}
  >ADD</a>
  //[...]
```

이 상태에서 뒤로가기 버튼을 누르면 동일한 화면이 보이게 된다.


### 3. BrowserRouter 컴포넌트

뒤로가기 버튼을 클릭하면 페이지가 새로고침 되어야하는데, `React Router`를 통해 이를 해결할 수 있따.
아래 명령어를 입력해 설치한다.
```
npm install --save react-router-dom
```

React Router 내부 소스를 통해 하는 역할을 이해할 수 있다.

```javascript
class BrowserRouter extends React.Component {
  static propTypes = {
    basename: PropTypes.string,
    forceRefresh: PropTypes.bool,
    getUserConfirmation: PropTypes.func,
    keyLength: PropTypes.number,
    children: PropTypes.node
  }

  history = createHistory(this.props)

  render() {
    return <Router history={this.history} children={this.props.children}  />
  }
}
```

BrowserRouter의 역할은 라우터 컴포넌트를 렌더링하고 history props를 전달하는 것이다. 히스토리(history)란 [React Training가 개발한 라이브러리](https://github.com/reacttraining/history)로서 다양한 환경의 차이을 추상화하고, 히스토리(기록) 스택을 관리하고, 탐색하고, 탐색을 확인하고, 세션 간 상태를 유지하는 최소한의 API를 제공한다. 간단히 말해서 BrowserRouter를 사용하면 URL의 변경 사항을 수신해 앱의 변경 사항을 인식하도록 하는 히스토리(기록) 개체를 만든다.

요약하면 `React Router`가 제대로 작동하려면 `BrowserRouter` 컴포넌트로 전체 `<App>` 앱을 포장해야 한다. 또한 `BrowserRouter`는 앱에서 URL의 변경 사항을 인식 할 수 있게 하는 `history` 라이브러리를 래핑한다.

#### 4. Link Component
* [REACT TRAINING / REACT ROUTER - LINK](https://reacttraining.com/react-router/web/api/Link)

```javascript
import { Link } from 'react-router-dom'
<Link
  to='/create'
  className='add-contact'
>Add Contact</Link>
```

Link 컴포넌트는 응용 프로그램에 대해 선언적이고 액세스 가능한 탐색을 제공한다. `to` 속성을 `Link` 컴포넌트로 전달하면 앱에 전달할 경로를 알릴 수 있다.

```javascript
<Link to="/about">About</Link>
```
웹에서의 라우팅은 복잡한 경우가 있다. 예를 들어, 쿼리 매개 변수를 전달하거나 페이지의 특정 부분에 연결할 수 있다. 새로운 경로에 상태를 전달하고 싶다면 문자열을 Prop에 링크로 전달하는 대신 객체로 만들어 전달할 수 있다.

```javascript
<Link to={{
  pathname: '/courses',
  search: '?sort=name',
  hash: '#the-hash',
  state: { fromDashboard: true }
}}>
  Courses
</Link>
```

React Router는 선언적이고 액세스 가능한 탐색을 추가 할 수 있게 해주는 Link 구성 요소를 제공한다. 일반적으로 `<a>`태그 대신 사용한다. React Router `<Link>` 컴포넌트는 `props`를 통해 사용자를 절대 경로(예 : `/about` )로 갈 수 있게 한다.

```javascript
<Link to="/about">About</Link>
```

`<Link>` 컴포넌트는 앵커 태그(<a>)를 `href`로 완벽하게 렌더링하므로 웹에서 정상 링크가 어떻게 작동하는지 예상할 수 있다.

#### 5. Route Component
`<Route>` 컴포넌트는 `Route`의 `render prop`를 통해 URL경로를 기반으로 렌더링할 컴포넌트를 결정한다. 

* src / App.js에서 Rount를 불러온다.
* this.state.screen === 'list'코드를 Route 컴포넌트로 바꾼다
* Route 컴포넌트에 `exact prop`를 추가한다.
* `this.state.screen === create'`을 Route 컴포넌트로 바꾼다.
* `ListContacts`에서 `onNavigate` 함수를 제거한다.

```javascript
import { Route } from 'react-router-dom'

  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
          <ListContacts
            onDeleteContact={this.removeContact}
            contacts={this.state.contacts}
          />
        )}/>
        <Route path='/create' component={CreateContact}/>
      </div>
    )
  }
```
#### 6. Contact Form

##### 6.1 ImageInput.js

* [Source](https://github.com/udacity/reactnd-contacts-complete/blob/master/src/ImageInput.js)
ImageInput 컴포넌트는 데이터 URL로 서버에 제출하기 전, 이미지 파일을 동적으로 읽고 크기를 조정하는 사용자 정의 `<input>`이다. 또한 이미지 미리보기를 제공한다.

##### 6.2 Serialize The Form Data

6.1에서 만든 폼을 입력하여 제출하면 폼 필드 값인 파라미터에 따라 아래와 같은 URL이 보인다. 
사용자가 입력한 값(예 : 이름 및 이메일)을 직렬화해 URL에 검색어 문자열로 추가된 것이다.

```
http://localhost:3000/create?avatarURL=&name=sujin&email=hi
```

따라서 브라우저의 이벤트를 막기 위해 `.preventDeafult()`가 필요하다.

```javascript
handleSubmit = (e) => {
  e.preventDefault()
}
```

폼 필드를 직렬화하여 새로운 객체(연락처)를 생성하고 저장시킬 수 있게 해야한다. 

이를 위해 `form-serialize` 패키지를 사용해 입력 정보를 일반 JavaScript 객체로 출력한다.

* [from-serialize](https://www.npmjs.com/package/form-serialize) 설치 
npm install --save form-serialize


```javascript
import serializeForm from 'form-serialize'
```
`CreateContact` 컴포넌트의 `handeSubmit` 메소드를 업데이트 한다.

```javascript
  handelSubmit = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, { hash: true })
    if (this.props.onCreateContact)
      this.props.conCreateContact(values) 
  }
```

```javascript
<form onSubmit={this.handleSubmit}  className='create-contact-form'>
```

##### 6.3 새 Contact를 서버에 저장하기
직렬화된 데이터는 컴포넌트로 전달시킨다. 폼에서 입력된 연락처를 서버에 저장해야한다.

App.js
###### createContact() 추가 메소드 구현

새로운 데이터를 `.contact()`로 기존 `state.contact`에 추가한다.

```javascript
createContact(contact) {
    ContactsAPI.create(contact).then(contact => {
      this.setState(state => ({
        contacts: state.contacts.concat([ contact ])
      }))
    })
  }
```
`Route` `render` 메소드에 `history` 를 추가하고 `createContact()` 와 연결한다.
폼이 작성완료 하면 메인(`'/'`)으로 URL이 전달된다. 

```javascript
<Route path='/create' render={({ history }) => (
  <CreateContact
    onCreateContact={(contact) => {
      this.createContact(contact)
      history.push('/')
    }}
  />
)}/>
```
### 참고
* 실습자료
  * [Build your own React Router v4](https://tylermcginnis.com/build-your-own-react-router-v4/)
  * [React Router Free course](https://reacttraining.com/online/react-router)

* 읽기자료 
    * [You're missing the point of React](https://medium.com/@dan_abramov/youre-missing-the-point-of-react-a20e34a51e1a)
    * [React "Aha" Moments](https://tylermcginnis.com/react-aha-moments/)
    * [9 Things every React.js Beginner should know](https://camjackson.net/post/9-things-every-reactjs-beginner-should-know)
    * [React Elements vs React Components](https://tylermcginnis.com/react-elements-vs-react-components/)
