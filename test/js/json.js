const str = '{"output":"$\\\\therefore\\\\left\\\\{\\\\begin{array}{l}z=\\\\frac{5}{3} x \\\\\\\\ y=-\\\\frac{4}{3} x\\\\end{array}\\\\right.$"}';
const obj = JSON.parse(str);
console.log('obj',obj);
console.log('obj.output',obj.output);