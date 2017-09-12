# React & Redux

바닐라 Redux는 createStore()를 사용하여 store()를 생성하고 `reduce` 함수를 전달했다. 그런 다음 `dispatch()`, `getState()` 및 `subscribe()` 에 액세스하기 위해 `store`를 주 컴포넌트로 전달했다. 작은 규모의 애플리케이션에는 잘 작동하지만 컴포넌트가 확장되면 무리가 있기 때문에 Redux와 React를 함께 사용할 수 있는 좋은 추상화된 것이 필요하다. `react-redux` 가장 큰 장점은 액션을 디스패치하고 React 컴포넌트 내부에서 Redux 스토어에 액서스 할 때이다. 이것은 react-redux의 Provider 구성 요소와 `connect()` 메소드를 통해 모두 가능하다. `connect()`를 사용하면 store에서 어떤 데이터를 수신해야하는지 컴포넌트를 지정하고 Provider는 `connect()`를 올바르게 작동하게 만든다.

## Provider
```javascript
npm install --save react-redux

```

## Curring

## Connect 

