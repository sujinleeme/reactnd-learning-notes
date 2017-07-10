# Object literal

ES6에서 불필요한 반복을 제거하는 것을 권장한다. 불필요한 반복을 제거하면 코드가 읽기 쉽고 간결해 진다.


```javascript
let type = 'quartz';
let color = 'rose';
let carat = 21.29;

const gemstone = {
  type: type,
  color: color,
  carat: carat
};

console.log(gemstone);
```

```javascript
let type = 'quartz';
let color = 'rose';
let carat = 21.29;

const gemstone = {
  type,
  color,
  carat,
  calculateWorth: function() {
    // will calculate worth of gemstone based on type, color, and carat
  }
};
```
함수를 호출하려면 `gemstone`의 `calculateWorth` 속성을 참조하기만 하면 되므로 `function()` 키워드는 중복되어 삭제할 수 있다.

```javascript
 let gemstone = {
  type,
  color,
  carat,
  calculateWorth() { ... }
};
```