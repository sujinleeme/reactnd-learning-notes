# Reducer

액션(Action)은 어떤 이벤트가 애플리케이션에서 발생했다는 사실을 말한다. 하지만 액션에 응답하여 실제 상태가 어떻게 변경되어야하는지에 대해서는 관심이 없다 이 일을 바로 **reducer**이 한다. Reducer은 현재 상태와 전달된 액션을 받고 받은 액션을 기반으로 현재 상태를 새로운 상태로 변환하는 일을 결정한다.

Reducer은 받은 액션 유형에 따라 앱의 상태를 어떤 방식으로 수정하는지 어떻게 알 수 있는가?

Reducer은 현재 상태와 액션 생성자에서 반환된 특정 액션을 받는 함수일 뿐이다. :

```javascript
function reducer (state, action) {
  // ...
}
```

Reducer 내부에는 action의 type 속성과 일치하는 switch문 (또는 if/else 문)을 만든다 그런 다음 새로 업데이트된 상태를 반환한다.


```javascript
function reducer (state, action) {
  switch (action.type) {
    case 'SUBMIT_USER' :
      return Object.assign({}, state, {
        user: action.user
      })
  }
}
```

위의 예제에서 `submitUser` 액션 생성자가 호출되어 Reducer로 전달 될 때마다 switch문의 'SUBMIT_USER'대/소문자와 일치한다. 그 다음 새 상태가 만들어지고 사용자 속성이 원래 `submitUser` 액션 생성자에 전달된 user 속성이 새로 업데이트 된다.

Reducer은 반드시 순수함수로 작성되어야 한다.


## Reducer은 순수함수이다

순수 함수의 정의를 상기해보자.

1. 동일한 인자가 전달되면 동일한 결과를 반환한다.
2. 전달된 Arguments만 전적으로 의존한다.
3. side effect를 일으키지 않는다

Reudcer의 요점은 현재 상태, 액션을 취하여 새로운 상태를 반환한다는 것이다. 그 이상의 일을 수행할 경우 코드를 잘못 짠 것이다. Reducer은 아래와 같은 일을 해서는 안된다

* 인자 변경
* 비동기 요청, 함수 스코프 내 변수 변경 등 side effect
* 불순한 함수 사용 e.g) ` Date.now()` 같은 함수를 사용해서는 안됨

반드시 순수 함수로 작성하도록 하자


아래 예제의 경우 문제가 있다.
n the UPDATE_ITEMS 은 업데이트 된 상태를 반환하는 대신에 기존 상태를 수정해 반환하고 있다. Reducer은 상태를 절대로 수정해서는 안된다.

```javascript
function reducer(state = {}, action) {
  switch(action.type){
  	case "ADD_ITEM":
      return action.item;
    case "EMPTY_CART":
      return {};
    case "UPDATE_ITEMS":
      state.items = action.items; // 상태를 업데이트 하고 있으므로 잘못됨
      return state;
    default:
      return state;
  }
}
```


### 연습 문제

* 두 개의 인자를 허용하는 "appReducer"라는 Reducer를 만든다.
    1. 아이스크림에 대한 정보를 담고있는 배열
    2. `DELETE_FLAVOR` key가 있는 객체  (즉, 개체 내 `flavor`를 삭제함)
* Reducer이 받는 Action은 아래와 같다.
  * `{type : 'DELETE_FLAVOR', flavor : 'Vanilla'}`
* 그리고 초기 state 값은 아래와 같다. (모든 매개 변수의 기본값을 전달하지 않는다)
    * `[{flavor: 'Chocolate', count: 36}, {flavor: 'Vanilla', count: 210}]`
      

```javascript
const appReducer = (state, action) => {
  switch (action.type) {
  	case 'DELETE_FLAVOR':
  	  return state.filter(obj => obj.flavor !== action.flavor);
    default:
      return state;
    }
}

const result = appReducer(
	[{flavor: 'Chocolate', count: 36}, {flavor: 'Vanilla', count: 210}],
	{type: 'DELETE_FLAVOR', flavor: 'Vanilla'}
);

console.log(result); //[ { flavor: 'Chocolate', count: 36 } ]
```

### Reducers과 State
Redux의 Reducer은 애플리케이션 Stateㅇ를 지정하고 Action을 통해 상태가 어떻게 변경되어야 하는지를 알려준다 ES6의 기본 매개 변수 기능을 사용하여 감속기의 초기 state를 선언한다.

```javascript
function myReducer (state = initialState, action) {
  // ...
}
```
Reducer에서 반환되는 것은 애플리케이션의 신규 state임으로, 새 상태(new state)또는 이전 상태(previous state)를 항상 반환해야한다.

```javascript
function myReducer (state = initialState, action) {
  if ( /* ... */ ) {
    return {
      ...state,
      name: 'Tyler'
    };
  }

  return state;
}
```

상태를 변경 방법은 전달된(dispatched) action 타입에 기반한다.

```javascript
function myReducer (state = initialState, action) {
  if (action.type === CHANGE_NAME) {
    return {
      ...state,
      name: 'Tyler'
    };
  }

  return state;
}
```

- [ ] `src` 디렉터리 내  `reducers` 폴더 생성 후 `index.js` 파일 생성
- [ ] 생성한 두 `action`를 import한다.
- [ ] `initialCalendarState` 객체를 생성
- [ ] `calendar`이라는 Reducer 함수를 만들고 (state = initialCalendarState, action)를 매개변수로 준다 
- [ ] `ADD_RECIPE', REMOVE_FROM_CALENDAR`를 처리한다.
- [ ] `calendar()`는 state 값을 직접 변경하지 않아야 한다 
- [ ] `calendar()`는 초기 state 값을 반환한다
- [ ] `calendar()`를 export한다 

```javascript
import {
	ADD_RECIPE,
	REMOVE_FROM_CALENDAR,
} from '../actions'

const initialCalendarState = {
	sunday: {
		breakfast: null,
		lunch: null,
		dinner: null,
	},
	monday: {
		breakfast: null,
		lunch: null,
		dinner: null,
	},
	tuesday: {
		breakfast: null,
		lunch: null,
		dinner: null,
	},
	wednesday: {
		breakfast: null,
		lunch: null,
		dinner: null,
	},
	thursday: {
		breakfast: null,
		lunch: null,
		dinner: null,
	},
	friday: {
		breakfast: null,
		lunch: null,
		dinner: null,
	},
	saturday: {
		breakfast: null,
		lunch: null,
		dinner: null,
	},
}

function calendar (state = initialCalendarState, action) {
	const { day, recipe, meal } = action

	switch (action.type) {
		case ADD_RECIPE :
			return {
				...state,
				[day]: {
					...state[day],
					[meal]: recipe.label,
				}
			}
		case REMOVE_FROM_CALENDAR :
			return {
				...state,
				[day]: {
					...state[day],
					[meal]: null,
				}
			}
		default :
			return state
	}
}

export default calendar
```

## UI State

잘 구축 된 React / Redux은 언제 Redux 내 sate가 있는지, 언제 React component 내 state에 있는지 설명할 수 있어야 한다. 명확한 규칙은 없으나, state가 어디 있어야할지 결정할 때 "두 컴포넌트가 같은 state에 의존하는가"를 물어보면 된다. 만약 "그렇다"라고 답할 경우 Redux에서 관리하는 것이 좋다. Redux를 통해 두 컴포넌트의 관계 없이 각자 필요한 상태에 액세스할 수 있기 때문이다.

두 번째로 내가 하는 질문은 "State의 캐싱 스토리는 어떤한가"이다.데이터를 가져오는 작업이 부담스럽다면 redux에 넣고 컴포넌트가 마운트 될 때마다 가져오는 것이 좋다. 반대 경우라면 로컬 컴포넌트 내 state를 사용하는 것이 낫다. 
 
Reducer는 함수일 뿐이다. 반드시 현재 상태와 액션 객체를 받는 순수 함수여야 하고, 항상 새로운 상태 또는 이전 상태 중 하나를 반환해야 한다.



