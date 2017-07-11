# Template Literal

함수 템플릿에 데이터 값을 인자로 넣어 문자열 리터럴로 만들 수 있다.
 
* 참고 : [MDN - Template literals](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Template_literals)

## 문자열 보간법(string interpolation)
문자열 보간은 문자열의 자리 표시자가 문자열 변수의 값으로 바뀌는 것이다.

### 1. operator (`+`) 
ex) `'Sujin' + ' have a nice day.'`
###2.  concat() : ex) 
ex)`hello.concat('Sujin', ' have a nice day.')`
### 3.  `${expression}`
주로 `${expression}`를 사용하자.

ex) 
```javascript
const name = 'Sujin';
let message = `${name} have a nice day.`; 
```

ex) 템플릿 리터럴 예제
```javascript
const cheetah = {
    name: 'Cheetah',
    scientificName: 'Acinonyx jubatus',
    lifespan: '10-12 years',
    speed: '68-75 mph',
    diet: 'carnivore',
    summary: 'Fastest mammal on land, the cheetah can reach speeds of 60 or perhaps even 70 miles (97 or 113 kilometers) an hour over short distances. It usually chases its prey at only about half that speed, however. After a chase, a cheetah needs half an hour to catch its breath before it can eat.',
    fact: 'Cheetahs have “tear marks” that run from the inside corners of their eyes down to the outside edges of their mouth.'
};

// creates an animal trading card
function createAnimalTradingCardHTML(animal) {
    const cardHTML = 
    `<div class="card">
        <h3 class="name"> ${animal.name}</h3> 
        <img src="${animal.name}.jpg" alt="${animal.name}" class="picture">
        <div class="description">
            <p class="fact">${animal.fact}</p>
            <ul class="details">
                <li><span class="bold">Scientific Name</span>:  ${animal.scientificName}</li>
                <li><span class="bold">Average Lifespan</span>: ${animal.lifespan}</li>
                <li><span class="bold">Average Speed</span>: ${animal.speed}</li>
                <li><span class="bold">Diet</span>: ${animal.diet}</li>
            </ul>
            <p class="brief">${animal.summary}</p>
        </div>
    </div>`;

    return cardHTML;
}
```