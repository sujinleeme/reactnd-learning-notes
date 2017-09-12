# Redux Store

* [UdaciMeals 샘플 코드](https://github.com/udacity/reactnd-udacimeals-complete/

Store를 생성하기 위해 Redux의 `createStore()` 메소드를 첫 번째 인자로 전달해야한다. 

createStore()에서 반환되는 것은 store 그 자체이며 세 개의 속성이 있.

* `getState()`
* `dispatch()`
* `subscribe()`

```javascript
const immaStore = Redux.createStore(<reducer>)
immaStore.getState()
immaStore.dispatch(<action object>)
immaStore.subscribe(<listener function>)
```

## `getState()`
`store.getState()`은 인자를 받지 않고 현재 state를 리턴한다.

## `dispatch()`
`store.dispatch(action)`는 action 객체를 가져 와서 reducer 함수를 호출하여 현재 state와 action을 전달한다.

e.g)

```javascript
// store.js
import { createStore } from 'redux';
import reducer from '../reducers/reducer';

let store = createStore(reducer);

const receiveComment = comment => ({
  type: 'RECEIVE_COMMENT',
  comment
});

export default store;
```

```javascript
store.getState(); // []
store.dispatch(receiveComment('Redux is great!'));
store.getState(); // ['Redux is great!']
subscribe()
```

## `subscribe()`
`store.subscribe(cb)`는 store 내 state 변경 될 때마다 호출되는 리스너 콜백 함수를 사용한다.

- [ ] `npm install redux` 설치 후 개발 서버 실행 `npm run start`
- [ ] `index.js` 내 `createStroe()`, reducer import 한다.
- [ ] `store` 변수에 `createStore()` 내 `reducer`를 인자로 준다.

## Redux DevTools
크롬 익스텐션에 있는 [Redux Devtools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)는 Redux 개발 플로우를 위한 파워풀한 기능을 제공한다 디스패치된 액션에 따른 상태 변화와 현재 상태를 볼 수 있다.

createStore() 인자 안에 ` window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()`를 추가한다.

```javascript
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
```

- [ ] `APP` 컴포넌트 내 `store`를 props로 전달한다
```javascript
ReactDOM.render(<App store={store}/>, document.getElementById('root'))
```
- [ ] `App.js` 내 `addRecipe` action을 import 한다.
- [ ] lifecycle 메소드인 `componentDidMount`를 생성한다.
- [ ] `submitFood` 메소드를 생성한다.
- [ ] `App`에 state 프로퍼티를 추가한다.
- [ ] input form을 컨트롤하면 재 렌더링된다.
- [ ] `App` 컴포넌트를 export 한다.

### `ref`
ref 속성은 React에서 제공하는 특별한 속성으로, DOM에 액세스 할 수 있다. [[Refs and the DOM[(https://facebook.github.io/react/docs/refs-and-the-dom.html)]

초기에 스토어는 리듀서를 호출해 state를 얻는다. 그런 다음 store 내 상태가 변경 될 때마다 action이 reducer에 전달되어야 한다.

Steps:

* User array를 반환하는 reducer를 만든다.
* `createStore(reducer)`를 호출한다.
* `Store.dispatch(addUser)`로 액션을 반환한다.
* `Result = store.getState()`로 업데이트 된 상태를 불러온다.
* 새로운 유저 리스트를 보여준다.

## 요약
* Actions은 Store의 Reducer로 전달되어 어떤 정보를 업데이트해야하는지 알려준다. Action, Store, Reducer 세 요소가 애플리케이션 상태 관리를 돕기 위해 상호 연결되어 있다.
* Reducer은 Store의 초기 state를 결정하고 Action이 전달되면 반환하는 state가 Store의 새 state가 된다
* Redux의 state는 sotre에 저장된다.
* Action은 애플리케이션 내 발생하는 state 변동 이벤트를 설명하는 페이로드이다.
* Store를 사용해 action을 보내고 store의 상태값을 얻어 변경 내용을 확인할 수 있다.
