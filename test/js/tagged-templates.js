function hightLight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    return result + str + (values[i] ? `<mark>${values[i]}</mark>` : '')
  }, '')
}

const firstName = 'John';
const age = 30;
const output = hightLight`Hello, my name is ${firstName} and I am ${age} years old.`;
console.log(output); // Hello, my name is <mark>John</mark> and I am <mark>30</mark> years old.