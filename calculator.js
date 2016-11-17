var input ='0';
var memory = '0';
//adds an operator
function addOperator(operator) {
  memory += input
  if ( /\d$/g.test(memory[memory.length -1]) ) {
    memory += operator;
  }
  input = '';
}
function percent() {
  input = parseFloat(input)/100;
  input = formatNum(input)
  if (isNaN(input)) {
    memory = parseFloat(memory)/100
    memory = formatNum(memory)
    memory += ''
    printLn(memory)
    input = ''
    return
  }
  printLn(input)
}
// prints input  to screen
function printLn(number) {
  var output = document.getElementById('output');
  output.innerHTML = number;
}
//adds a number to the input
function insert(number) {
  input+= number;
  // removes a leading zero
  if (input[0] === '0') {
    input = input.slice(1)
  }
  printLn(input)
}
function aClear() {
  input = '0';
  printLn(input)
}
function allClear() {
  input = '0';
  memory = 0;
  printLn(input);
}
function toggleSign() {
  input *= -1;
  input = formatNum(input)
  if (input === 0) {
    memory*= -1
    memory = formatNum(memory)
    printLn(memory)
    return
  }
  printLn(input)

}
function equals() {
  memory += input;
  // removes leading zero that messes up eval
  if (memory[0] === '0') {
    memory = memory.slice(1)
  }
  // my thinking is eval should be safe to use here, because it would be used only on front end
  memory = eval(memory);

  memory = formatNum(memory)
  printLn(memory);
  input = '';
  memory += ''
}
function formatNum(number) {
  if ((number +'').length > 7) {
    number = number.toPrecision(7)
    number = parseFloat(number)
  }
  if (Math.abs(number) > 9999999999999) {
      number = number.toExponential(7)
  }
  return number
}
//========= keyboard listeners========
document.addEventListener("keyup", function(e) {
  if ("+-/*".match(String.fromCharCode(92)+e.key)) {
    addOperator(e.key)
    return
  }
  if( "0123456789.".match(e.key) ){
    insert(e.key)
  }
  if (e.key === 'Enter') {
    equals()
  }
})
