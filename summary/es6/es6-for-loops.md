## Practice

```javascript
/*
 * Programming Quiz: Writing a For...of Loop (1-4)
 *  your code goes here
 * loops through each day in the days array
 * capitalizes the first letter of the day
 * and prints the day out to the console
*/

const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

const compose = (...fns) => {
  return function composition(arg) {
    return fns.reduceRight((acc, next) => {
      return next(acc);
    }, arg);
  };
}

const splited = (str) => str.split('');

const capitalized = (str) => {
    str[0] = str[0].toUpperCase();
    return str.join('');
}

for (let day of days) {
    const formated = compose(capitalized, splited)(day);
    console.log(formated);
}
```
