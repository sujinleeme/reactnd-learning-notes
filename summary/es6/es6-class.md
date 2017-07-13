# Class
es6 클래스는 프로토타입 상속을 숨긴다.

```javascript
function Plane(numEngines) {
  this.numEngines = numEngines;
  this.enginesActive = false;
}

// 모든 인스턴스에 의해 상속된 메소드
Plane.prototype.startEngines = function () {
  console.log('starting engines...');
  this.enginesActive = true;
};

const richardsPlane = new Plane(1);
richardsPlane.startEngines();

const jamesPlane = new Plane(4);
jamesPlane.startEngines();
```

위의 코드에서 `Plane()`함수는 `Plane` 객체를 생성하는 생성자함수이다. 특정 Plane 객체의 데이터는 Plane 함수에 전달되고 객체에 설정된다. 각 Plane 객체에 의해 "상속된" 메소드는 `Plane.prototype` 객체에 배치됩니다. 그런 다음 `richardsPlane`은 `1`을 갖는 엔진으로 생성되고 jamesPlane은 `4`를 갖는 엔진으로 생성된다. 그러나 두 객체 모두 동일한 `startEngines()` 메소드를 사용하여 각각의 엔진을 활성화한다.

* `new()`로 생성자 함수(constructor function)가 호출된다.
* 관례에 따라 생성자 함수는 대문자로 시작한다.
* 생성자 함수는 생성 될 객체의 데이터 설정을 제어한다.
* "상속된" 메소드는 생성자 함수의 프로토 타입 객체에 배치된다.

동일한 내용을 `class`로 작성하면 아래와 같다.

```javascript
class Plane {
  constructor(numEngines) {
    this.numEngines = numEngines;
    this.enginesActive = false;
  }

  startEngines() {
    console.log('starting engines…');
    this.enginesActive = true;
  }
}
```

## 클래스도 함수다
클래스의 타입은 함수다. 메소드 사이에 쉼표(`,`)는 생략한다.

```javascript
class Plane {
  constructor(numEngines) {
    this.numEngines = numEngines;
    this.enginesActive = false;
  }

  startEngines() {
    console.log('starting engines…');
    this.enginesActive = true;
  }
}

typeof Plane; // function
``` 

## Static 메소드
정적 메서드를 추가하려면 `static` 메서드 키워드가 메서드 이름 앞에 배치한다.


```javascript
class Plane {
  constructor(numEngines) {
    this.numEngines = numEngines;
    this.enginesActive = false;
  }

  static badWeather(planes) {
    for (plane of planes) {
      plane.enginesActive = false;
    }
  }

  startEngines() {
    console.log('starting engines…');
    this.enginesActive = true;
  }
}
```
`startEngines()`는 badWeather()가 `static`이라는 키워드를 가지고 있는지 어떻게 확인할 수 있는가? `badWeather()`는 Plane 클래스에 직접 액세스 할 수 있는 메서드이므로 다음과 같이 호출 할 수 있다.

```javascript
Plane.badWeather([plane1, plane2, plane3]);
```

## 클래스의 장점
1. 적은 설정 : 함수 작성을 위한 코드가 적어진다.
2. 명확하게 정의된 생성자 함수 : 클래스 정의에서 생성자 함수를 명확하게 지정할 수 있다.
3. 모든 것을 포함한다 : 클래스에 필요한 모든 코드는 클래스 선언에 있다. 한 곳에 생성자 함수를 대신 프로토타입 메소드를 하나씩 추가한다.


### 클래스 사용시 주의 사항
1. `class`를 사용한다고 해서 모든 것이 해결되는 마법같은 일은 일어나지 않는다.
2. `class`는 프토로타입 상속 만을 사용한다.
3. `class`의 새 인스턴스를 만들 때 `new()` 키워드를 사용한다.

```javascript
class Toy {
   ...
}

const myToy1 = Toy(); // throws an error
const myToy2 = new Toy(); // this works!
```

#Subclasses

```javascript
class Tree {
  constructor(size = '10', leaves = {spring: 'green', summer: 'green', fall: 'orange', winter: null}) {
    this.size = size;
    this.leaves = leaves;
    this.leafColor = null;
  }

  changeSeason(season) {
    this.leafColor = this.leaves[season];
    if (season === 'spring') {
      this.size += 1;
    }
  }
}

class Maple extends Tree {
  constructor(syrupQty = 15, size, barkColor, leaves) {
    super(size, barkColor, leaves);
    this.syrupQty = syrupQty;
  }

  changeSeason(season) {
    super.changeSeason(season);
    if (season === 'spring') {
      this.syrupQty += 1;
    }
  }

  gatherSyrup() {
    this.syrupQty -= 3;
  }
}

const myMaple = new Maple(15, 5);
myMaple.changeSeason('fall');
myMaple.gatherSyrup();
myMaple.changeSeason('spring');
```

`Maple` 클래스는 `Tree`의 "서브 클래스"이며 `extends` 키워드를 사용하여 자신을 `subclass`로 설정한다. 하위 클래스에서 상위 클래스로 이동하려면 `super` 키워드를 쓰는데, `Maple`의 생성자 메소드(constructor method)에서 `super`는 함수이다. `Maple`의 `changeSeason()` 메소드에서 `super`가 객체로 사용된다!

## ES5 subclasses와 비교

```javascript
function Tree() {
  this.size = size || 10;
  this.leaves = leaves || {spring: 'green', summer: 'green', fall: 'orange', winter: null};
  this.leafColor;
}

Tree.prototype.changeSeason = function(season) {
  this.leafColor = this.leaves[season];
  if (season === 'spring') {
    this.size += 1;
  }
}

function Maple (syrupQty, size, barkColor, leaves) {
  Tree.call(this, size, barkColor, leaves);
  this.syrupQty = syrupQty || 15;
}

Maple.prototype = Object.create(Tree.prototype);
Maple.prototype.constructor = Maple;

Maple.prototype.changeSeason = function(season) {
  Tree.prototype.changeSeason.call(this, season);
  if (season === 'spring') {
    this.syrupQty += 1;
  }
}

Maple.prototype.gatherSyrup = function() {
  this.syrupQty -= 3;
}

const myMaple = new Maple(15, 5);
myMaple.changeSeason('fall');
myMaple.gatherSyrup();
myMaple.changeSeason('spring');
```

## subclasses
함수와 프로토타입을 사용할 수도 있으나, `class`, `super`, `extend`를 사용하면 훨씬 코드가 간단해진다.

`this`이전에 `super()`가 먼저 호출되어야 한다.

```javascript
class Apple {}
class GrannySmith extends Apple {
  constructor(tartnessLevel, energy) {
    super(energy); 
    this.tartnessLevel = tartnessLevel; // `this` before `super` will throw an error!
  }
}
```

####### 실습 예제
```javascript
class Vehicle {
	constructor(color = 'blue', wheels = 4, horn = 'beep beep') {
		this.color = color;
		this.wheels = wheels;
		this.horn = horn;
	}

	honkHorn() {
		console.log(this.horn);
	}
}

class Bicycle extends Vehicle{
  constructor(color = 'blue', wheels = 2, horn = 'honk honk') {
    super(color, wheels, horn);
    this.color = color;
    this.wheels = wheels;
    this.horn = horn;

  }
  honkHorn() {
    super.honkHorn();
  }
}

const myVehicle = new Vehicle();
myVehicle.honkHorn(); // beep beep
const myBike = new Bicycle();
myBike.honkHorn(); // honk honk
```