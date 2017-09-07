# 디버깅 도구

## 1. `PropTypes`로 컴포넌트 `Props` 디버깅 하기

앱에 추가 기능을 구현할 때 컴포넌트를 자주 디버깅해야한다. 컴포넌트로 전달한 `props`가 의도하지 않은 데이터 유형(예 : 배열이 아닌 객체)이라면 어떻게 해야할까? [PropType 패키지](https://facebook.github.io/react/docs/typechecking-with-proptypes.html)는 `get-go`에서 바로보고 싶은 데이터 유형을 정의하고 컴포넌트로 전달된 props이 예상 한 것과 불일치한다면 개발 중에 경고 메시지를 표시한다. 

* 설치 후 서버를 재실행한다.
```
npm install --save prop-types
```

```javascript
import React from 'react'
import PropTypes from 'prop-types'

ListContacts.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired
}
```

* 참고
  * [Typechecking With Proptypes](https://facebook.github.io/react/docs/typechecking-with-proptypes.html) from the React Docs


## 2. React Developer Tools
기존 개발자도구는 React 앱을 개발하는 동안 컴포넌트에서 어떤 일이 일어나고 있는지 정확히 파악하기 어렵다. 
React Developer Tools를 사용하면 각 props 및 state와 함께 컴포넌트 계층 구조를 검사 할 수 있다.
* [Chrome extension에서 설치](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en-US)