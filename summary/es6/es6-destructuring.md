# Destructuring
Destructuring(구조분해)은 Perl과 Python과 같은 언어에서 영감을 받았다. 배열이나 객체에서 왼쪽부터 추출하려는 요소를 지정할 수 있다. 코드가 간결해지고 이해하기 쉽다.

```javascript
const point = [10, 25, -34];
const [x, y, z] = point;
```

* 특정 요소 지정 하지 않을 시 : `const [x, , z] = point;` y 값을 할당하지 않는다.

## 객체에서 구조분해 (Destructuring values from an object)
```javascript
const gemstone = {
  type: 'quartz',
  color: 'rose',
  karat: 21.29
};

const {type, color, karat} = gemstone;
```
. `gemstone`에는 `type, color, karat`이라는 속성이 있어 값은 자동으로 각 변수에 저장된다. 

* 객체의 구조를 해제 할 때 선택하려는 값을 지정할 수도 있다. 예를 들어, `{color} = gemstone`하면. `gemstone` 개체에서 `color` 속성만 선택된다.

```javascript
const circle = {
  radius: 10,
  color: 'orange',
  getArea: function() {
    return Math.PI * this.radius * this.radius;
  },
  getCircumference: function() {
    return 2 * Math.PI * this.radius;
  }
};

let {radius, getArea, getCircumference} = circle;

console.log(getArea()); //NaN
```

`getArea()`의 결과값은 `NaN`이다. 객체를 파기하고 `getArea()` 메소드를 `getArea` 변수에 저장하면 더 이상 `circle` 객체의 `this`에 접근할 수가 없다.

