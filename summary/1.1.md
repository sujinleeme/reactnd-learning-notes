# Composition

간단한 함수를 결합하여 더 복잡한 함수를 작성하는 것
ex)
```
* getProfileLink - 사용자의 GitHub 프로필 링크 문자열을 작성
* getProfilePic - 사용자의 GitHub 프로필 그림을 문자열로 구성
* getProfileData - 새 객체를 반환
```

## React & Composition
React는 컴포넌트(component)를 사용해 UI 구성
```
<Page>
  <Article />
  <Sidebar />
</Page>
```

* Imperative Code : 명령형(commanding) 코드 : 각 단계마다 명료한 명령형으로 작성 
* Declarative Code : 선언적 코드 : 최종 결과에 이르는 모든 단계를 코드화하지 않음

### Imperative Code
```javascript
const people = ['Amanda', 'Geoff', 'Michael', 'Richard', 'Ryan', 'Tyler']
const excitedPeople = []

for (let i = 0; i < people.length; i++) {
  excitedPeople[i] = people[i] + '!'
}
```

### Declarative Code
```javascript
const people = ['Amanda', 'Geoff', 'Michael', 'Richard', 'Ryan', 'Tyler']
const longNames = people.filter(name => name.length > 6)
```

리액트는 명령형으로 작성한다
```javascript
<button onClick={activateTeleporter}>Activate Teleporter</button>
```

## 리액트 데이터 흐름
데이터는 부모 컴포넌트에서 자식 컴포넌트로만 전달한다.
자식 컴포넌트가 데이터를 변경해야할 경우 부모 컴포넌트에 데이터가 갱신되고 다시 자식 컴포넌트로 전달된다.

```
<FlightPlanner>

  <LocationPicker>
    <OriginPicker />
    <DestinationPicker />
  </LocationPicker>

  <DatePicker />

</FlightPlanner>
```
<FlightPlanner>, <LocationPicker> 컴포넌트가 업데이트를 담당한다.

### map()
```
const names = ['Michael', 'Ryan', 'Tyler'];
const nameLengths = names.map( name => name.length );
```
### filter()

```
const names = ['Michael', 'Ryan', 'Tyler'];

const shortNames = names.filter( name => name.length < 5 );
```

### filter().map()

`filter()`을 먼저쓰는 것이 좋다. `map()`은 배열의 각 요소마다 함수를 한 번씩 실행하기 떄문에 이미 필터링된 배열에서 실행하는 경우 더 빠르다.

```
const names = ['Michael', 'Ryan', 'Tyler'];

const shortNamesLengths = names.filter( name => name.length < 5 ).map( name => name.length );

```
기존 코드를 살펴보고 `for` 루프를 `map()` 호출로 변환하거나 `filter()`를 사용하여 `if` 문을 제거 할 수 있는지 확인하라
