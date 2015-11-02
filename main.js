'use strict'

let operand;
let firstNum = "";
let secondNum = "";
let result;

$(document).ready(init);

function init(){

  $('.table').click(clickHandler);

}

function clickHandler(event){
  let e = $(event.target);

  let input = e.text();
  let $display = $('#display');

console.log('before the switch', 'input', input, 'display', $display.text(), 'operand', operand, 'firstNum', firstNum, 'secondNum', secondNum, 'result', result);
  switch (input) {
    case "=":
      equalsHandler(input, $display);
      break;
    case "+":
      plusHandler(input, $display);
      break;
    case "-":
      minusHandler(input, $display);
      break;
    case "x":
      multiplyHandler(input, $display);
      break;
    case "÷":
      divideHandler(input, $display);
      break;
    case "%":
      percentHandler(input, $display);
      break;
    case "+/-":
      plusMinusHandler(input, $display);
      break;
    case "AC":
      clearHandler(input, $display);
      break;
    case ".":
      decimalHandler(input, $display);
      break;
    default:
      numbersHandler(input, $display);
      break;
  }

if ($display.text()[0] === ".") {
  $display.text("0" + $display.text());
}
console.log('after the switch', 'input', input, 'display', $display.text(), 'operand', operand, 'firstNum', firstNum, 'secondNum', secondNum, 'result', result);

}

function equalsHandler() {
  if (firstNum && secondNum && !result){
    performOperation();
  } else if (firstNum && secondNum && result){
    firstNum = result;
    performOperation();
  } else {
    resetAll();
  }
}

function plusHandler() {
  chainOperations();
  if (firstNum !== ""){
    operand = "+";
  }
}

function minusHandler() {
  chainOperations();
  if (firstNum !== ""){
    operand = "-";
  }
}

function multiplyHandler() {
  chainOperations();
  if (firstNum !== "") {
    operand = "x";
  }
}

function divideHandler() {
  chainOperations();
  if (firstNum !== "") {
    operand = "÷";
  }
}

function percentHandler(input, $display) {

  var newDisplay = parseFloat($display.text()) * 0.01;
  $display.text(newDisplay);

  if (!secondNum) {
    firstNum = newDisplay;
  } else {
    secondNum = newDisplay;
  }
}

function plusMinusHandler(input, $display) {
  var newDisplay = parseFloat($display.text()) * -1;
  $display.text(newDisplay);

  if (!secondNum) {
    firstNum = newDisplay;
  } else {
    secondNum = newDisplay;
  }
}

function clearHandler() {

  $('#display').text('0');
  resetAll();

}

function decimalHandler(input, $display) {

  if ($display.text().match(/[.]/) && !operand){
    return;
  } else if (operand && !secondNum) {
    secondNum = "0";
  } else if (operand && $display.text().match(/[.]/)){
    return;
  }

  $display.text($display.text() + ".");
  numbersHandler(input, $display);

}

function numbersHandler(input, $display) {
  console.log($display.text());
  if ($display.text() === "0" && input === "0"){
    return;
  }

  if (!operand) {
    firstNum += input;
    $display.text(firstNum);
  } else if (operand && !result){
    secondNum += input;
    $display.text(secondNum);
  } else if (operand && result && input === "0") {
    console.log('here');
    resetAll();
    $display.text('0');
  } else if (operand && result) {
    firstNum = input;
    secondNum = "";
    result = undefined;
    operand = undefined;
    $display.text(firstNum);
  }

}

function performOperation() {
  switch (operand) {
    case "+":
      result = parseFloat(firstNum) + parseFloat(secondNum);
      break;
    case "-":
      result = parseFloat(firstNum) - parseFloat(secondNum);
      break;
    case "x":
      result = parseFloat(firstNum) * parseFloat(secondNum);
      break;
    case "÷":
      secondNum !== "0" ? result = parseFloat(firstNum)/parseFloat(secondNum) : result = "Error";
      break;
  }

  $('#display').text(result);

}

function resetAll() {
  firstNum = "";
  secondNum = "";
  result = undefined;
  operand = undefined;

}

function chainOperations() {
  if (firstNum && secondNum){
    performOperation();
    firstNum = result;
    secondNum = "";
    result = "";
  }
}
