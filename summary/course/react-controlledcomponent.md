# Components 제어
제어 구성 요소를 사용하면 form 양식 자체를 기반으로 UI를 업데이트 할 수 있다.
form을 렌더링 하지만, form `state`는 DOM 내부가 아닌 컴포넌트 내부이다.

```javascript
class NameForm extends React.Component {
  state = { email: '' }
  handleChange = (event) => {
    this.setState({ email: event.target.value})
  }
  render(){
    return (
      <form>
        <input type="text" value={this.state.email} onChange={this.handleChange} />
      </form>
    )
  }
}
```

```javascript
import React, { Component } from 'react';
import PropTypes from 'prop-types'

class ListContacts extends Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  render() {
    return (
      <div className='list-contacts'>
        {JSON.stringify(this.state)}
        <div className='list-contacts-top'>
          <input
            className='search-contacts'
            type='text'
            placeholder='Search contacts'
            value={this.state.query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
        </div>
        <ol className='contact-list'>
          {this.props.contacts.map((contact) => (
            <li key={contact.id} className='contact-list-item'>
              <div className='contact-avatar' style={{
                backgroundImage: `url(${contact.avatarURL})`
              }}/>
              <div className='contact-details'>
                <p>{contact.name}</p>
                <p>{contact.email}</p>
              </div>
              <button onClick={() => this.props.onDeleteContact(contact)} className='contact-remove'>
                Remove
              </button>
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

export default ListContacts
```

사용자의 입력에 따라 `ListContacts` 컴포넌트 `state`를 업데이트하는 과정을 요약하면 아래와 같다.

1. 입력 필드에 텍스트를 입력한다
2. 이벤트 리스너는 모든 `onChange` 이벤트에 대해 `updateQuery()` 함수를 호출한다.
3. 그런 다음 `updateQuery()`가 `setState()`를 호출해새 상태에서 병합하여 컴포넌트 내부 상태를 업데이트합니다.
4. `ListContacts` 컴포넌트 `state`가 변경되어 `ListContacts` 컴포넌트가 다시 렌더링된다.

이 업데이트 된 상태를 활용하여 아래 패키지를 설치해 `state` 값을 필터할 수 있다.

* [escape-string-regexp](https://www.npmjs.com/package/escape-string-regexp)
* [sort-by](https://www.npmjs.com/package/sort-by)

```
npm install --save escape-string-regexp sort-by
```

정규 표현식 개체를 만들고 이를 사용하여 인풋 형식을 테스트한다. 또한 문자열 `.match()`와 정규식으로 텍스트패턴을 확인할 수 있다.

```javascript

import React, { Component } from 'react';
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListContacts extends Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  render() {
    let showingContacts
    if (this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query), 'i')
      showingContacts = this.props.contacts.filter((contact) => match.test(contact.name))
    } else {
      showingContacts = this.props.contacts
    }

    showingContacts.sort(sortBy('name'))

    return (
      <div className='list-contacts'>
        <div className='list-contacts-top'>
          <input
            className='search-contacts'
            type='text'
            placeholder='Search contacts'
            value={this.state.query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
        </div>
        <ol className='contact-list'>
          {showingContacts.map((contact) => (
            <li key={contact.id} className='contact-list-item'>
              <div className='contact-avatar' style={{
                backgroundImage: `url(${contact.avatarURL})`
              }}/>
              <div className='contact-details'>
                <p>{contact.name}</p>
                <p>{contact.email}</p>
              </div>
              <button onClick={() => this.props.onDeleteContact(contact)} className='contact-remove'>
                Remove
              </button>
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

export default ListContacts
```

