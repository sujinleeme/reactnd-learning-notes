# React & Redux

바닐라 Redux는 createStore()를 사용하여 store()를 생성하고 `reduce` 함수를 전달했다. 그런 다음 `dispatch()`, `getState()` 및 `subscribe()` 에 액세스하기 위해 `store`를 주 컴포넌트로 전달했다. 작은 규모의 애플리케이션에는 잘 작동하지만 컴포넌트가 확장되면 무리가 있기 때문에 Redux와 React를 함께 사용할 수 있는 좋은 추상화된 것이 필요하다. `react-redux` 가장 큰 장점은 액션을 디스패치하고 React 컴포넌트 내부에서 Redux 스토어에 액서스 할 때이다. 이것은 react-redux의 Provider 구성 요소와 `connect()` 메소드를 통해 모두 가능하다. `connect()`를 사용하면 store에서 어떤 데이터를 수신해야하는지 컴포넌트를 지정하고 Provider는 `connect()`를 올바르게 작동하게 만든다.

## Provider
```javascript
npm install --save react-redux
```

"어떤 경우에는 모든 레벨에서 수동으로 props 전달하지 않고도 컴포넌트 트리를 통해 데이터를 전달할 수 있다. 이를 위해 'connect()'API를 사용한다

Provider는 전체 응용 프로그램을 감싸는 데 사용하는 React 컴포넌트이다. Store에서 props로 사용된 스토어 컨텍스트를 설정하여 모든 하위 컴포넌트에 전달한다. Provider에 의해 래핑된 컴포넌트는, 스토어 컨텍스트를 수산한다.

스토어에 접근하기 위해서는 `connect()`가 필요한데 이는 currying이라고 하는 함수형 프로그래밍 기술을 사용한다 connect()가 실제로 작동하기 전에 currying이 어떻게 작동하는지 자세히 살펴볼 필요가 있다

## Curring
```javascript
function houseBuilder(numOfStories) {
	return function buidlingColor(color) {
		return `building a ${numOfStories}-story, ${color} house`;
	}
}

const response = houseBuilder(3)('blue');
console.log(response); // building a 3-story, blue house

```

### 함수 호출

얼마나 많은 함수를 반환해야하는지 의심스럽다면 함수 호출 갯수를 살펴봐라! 일반적으로 반환되는 함수의 수는 호출된 함수의 수-1 이다. 예를 들어, 세 개의 함수 호출을 보면 두 개의 함수를 반환해야 한다.

currying은 추가 데이터가 필요한 함수에 부분적으로 입력을 제공하는 과정이다. Redux API 중 `connect()`가 커링을 사용하고 있다.

## Connect 
`connect()`는 컴포넌트가 Redux 스토어에서 state와 dispatch를 모두 수행할 수 있게 하는 함수이다.

```javascript
connect(mapStateToProps, mapDispatchToProps)(MyComponent)
```

`MyComponent`는 미리보기로서 store 내 상태, 디스패치 또는 둘 모두를 수신하는 컴포넌트이다. `mapStateToProps()`는 현재 스토어의 `current props`를 받는 함수이며, 반환되는 내용은 MyComponent에서 props로 사용할 수 있습니다. `mapDispatchToProps()`를 사용하면 action creators를 dispatch 안에 래핑 할 수 있다.


### `mapStateToProps()`
`mapStateToProps()`는 스토어에서 React 컴포넌트로 전달할 데이터를 지정할 수 있게 한다. 스토어 상태, 선택적인 ownprops 인수를 취해 객체를 반환한다.

```javascript
mapStateToProps(state, [ownProps])
```

> "인자가 지정되면 새 컴포넌트는 Redux 스토어에 업데이트에 되는 것을 안다. 즉, 스토어가 업데이트 될 때마다 mapStateToProps가 호출된다. mapStateToProps의 결과는 일반 개체로 컴포넌트의 props에 병합된다"

즉, `mapStateToProps()`에서 반환 된 객체의 속성이 props로 컴포넌트에 전달된다. `mapStateToProp()`는 `connect()`가 스토어 내 특정 상태를 사용가능한 `props`로 매핑할 수 있게 해준다.

```javascript
import { connect } from 'react-redux';

const User = ({ name, age }) => {
  // ...
};

const mapStateToProps = (state, props) => ({
  name: state.user.name,
  age: state.user.age
});

export default connect(mapStateToProps)(User);
```

위의 예제와 같이 `name`, `age`는 `User` 컴포넌트가 액서스 할 수 있는 props가 된다

## onwProps(optional argument)

`mapStateToProps()`는 추가 인자인 `ownProps`는 연결된 컴포넌트로 props를 전해준다. 부모 컴포넌트로 부터 직접적으로 props를 넘겨받는 컴포넌트가 있다고 하자.

```javascript
<ConnectedComponent firstName={'Harper'} lastName={'Lee'} />
```

이 props는 `ownProps`를 통해 다른 상태와 머지될 수 있다.

```javascript
const mapStateToProps = (state, ownProps) => ({
  occupation: state.occupation,
  userInfo: `${ownProps.firstName} ${ownProps.lastName}: ${state.occupation}.`
});

export default connect(mapStateToProps)(MyComponent);
```




