(function calculator(){
  'use strict';

  let documentReady = () => {

    let $output = $('.output');
    let result = 0;
    let firstNum;
    let secondNum = 0;
    let operands = [false, false];


    function checkOperands(){
      return operands.every(function(elem){
        return !elem;
      });
    }
    console.log(checkOperands());

    $('.box').on('click', clickHandler);

    function clickHandler(event){

      let input = event.target.innerHTML;

      //numbers controller
      if (parseInt(input)){

        let number = parseInt(input);

        // if no operands active
        if (checkOperands()){

          if (firstNum) {
            console.log('firstNum', firstNum, 'result', result, 'number', number);
            result = parseInt(result.toString() + number.toString());
            firstNum = result;
          } else {
            firstNum = number;
            result = number;
            console.log('firstNum', firstNum, 'result', result);
          }


        // if operands active
        } else {
          // result = '';
          // $output.text(result);
          if (secondNum) {
            result = parseInt(result.toString() + number.toString());
            secondNum = result;
          } else {
            secondNum = number;
            result = secondNum;
            $output.text(result);
          }
        }
      }

        var operatorIndex = operands.indexOf(true);;
        selectOperation(operatorIndex);


      function equalsKey(){

      }
      function selectOperation(i){
        if (i === 0){
          result = firstNum + secondNum;
          firstNum = result;
          operands[0] = false;
        }
      }

      // + operator controller
      if (input === '+'){
        if (checkOperands()){
          operands[0] = true;
          console.log(input);
        } else {
          // result += secondNum;
        }
      }

      $output.text(result);
    }


  }

  $(documentReady);

})();
