# Overview

## Redux의 기본 구성
* actions, reducers, store
대부분의 경우, 애플리케이션 데이터 또는 상태는 스토어에 있다. 스토어 내 데이터는 reducer에 의해 채워진다. (둘 이상의 reducer가 있기도 하다) 액션은 스토어에서 "dispatched"되어 reducer은 어떤 데이터를 출력해야하는지 결정하는 데 사용됩니다. 명확성을 위해, Redux 응용 프로그램에서 단 하나의 작업 이상을 수행할 수 있다.

### Redux 앱의 데이터 흐름 (단방향 데이터)
* Store : 업데이트 된 상태를 전달해 뷰가 다시 렌더링된다.
* View : action을 전달한다.
* Action Creator : 변화가 필요한 오브젝트를 전달한다. (payloads)
* Reducer : 액션에 따라 현재 상태를 작업으로 처리하고 응용 프로그램의 새 상태를 반환한다.
 

## Redux Action

브라우저를 사용하면 이벤트 리스너를 설정하고 특정 이벤트에 응답 할 수 있다. Redux는 이벤트를 액션이라 하는데 응용 프로그램의 상태를 업데이트해야하는 응용 프로그램의 이벤트를 설명하기 위해 설정정보 페이로드(payload: 페이로드. 데이터를 나르는 패킷, 메시지 또는 코드의 부분)와 같다

액션은 애플리케이션의 상태를 업데이트해야 하는 모든 이벤트를 설명하는 자바스크립트 객체이다. 특정 작업 유형을 구별하려면 이러한 개체에 type 속성이 있어야한다.

```javascript
const LOAD_PROFILE = 'LOAD_PROFILE';

const myAction = {
  type: LOAD_PROFILE
};
```

**Action**
* 속성값으로 문자열대신 상수를 사용하라. 문자열, 상수 모두 쓸 수 있지만 상수를 사용하면 콘솔의 철자 오류 (예 : `LAOD_PROFILE` vs `LOAD_PROFILE`)가 있으면 오류 메세지를 보낸다.
* 페이로드(payload)를 최소화하라. 필요한 데이터만 보낸다

## React Creator

Redux Action은 자바스크립트 객체이다. 하지만 이 객체는 편리성이 떨어진다.


```javascript
const LOAD_PROFILE = 'LOAD_PROFILE';

const loadProfileAction = {
  type: LOAD_PROFILE
};
```

 좀더 Acition을 편리하고 테스트를 편이하게 할 수 있도록 하기 위해 함수로 래핑할 수 있다. 이러한 기능을 **Action Creators 액션 크리에이터**라고 한다 실제로 액션을 생성하고 반환하는 함수이다.


```javascript
const LOAD_PROFILE = 'LOAD_PROFILE';

const loadProfileAction = {
  type: LOAD_PROFILE
};
```
 
```javascript
/* Create An Action Creator
 *
 * 다음을 수행해야하는 'mealCreator'라는 액션 크리에이터를 만든다.
   * - ID 수락
   * - 'type'속성 값이 'CREATE_MEAL'인 Redux 액션을 반환.
   * - 액션 생성자에게 전달된 ID를 포함.
*/

const mealCreator = id => ({
    type: 'CREATE_MEAL',
    id
})
```

- [ ] `src` 폴더 내 `actions`, `components`, `utils` 폴더 생성
- [ ] `components` 폴더로 `App.js` 파일 이동
- [ ] `utils` 폴더 내 `api.js`, `helper.js` 생성, `index.js` 및 `registerServiceWorker.js` 이동
- [ ] `actions` 폴더 내 `index.js` 파일 생성


```javascript
export const ADD_RECIPE =  'ADD RECIPE'
export const REMOVE_FROM_CALENDAR = 'REMOVE_FROM_CALENDAR'

export function addRecipe ({ day, recipe, meal}) {
    return {
        type: ADD_RECIPE,
        recipe,
        day,
        meal
    }
}

export function removeFromCalendar({ day, meal}) {
    return {
        type:REMOVE_FROM_CALENDAR,
        day,
        meal
    }
```

* Redux의 액션은 애플리케이션의 상태를 업데이트하는 이벤트를 설명하기 위해 설정한 자바스크립트 객체이다.

이제 두 가지 의문점을 가질 수 있다.

1. Redux는 이러한 액션 생성자를 호출하면 애플리케이션 상태를 수정해야한다는 것을 어떻게 알 수 있을까
2. 응용 프로그램의 상태를 변경되어야하는지 지정하려면 어떻게 해야할까?

