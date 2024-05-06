document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.buttons-container button');
  
    let firstOperand = null;
    let operator = null;
    let waitingForSecondOperand = false;
  
    function addNumber(number) {
      if (waitingForSecondOperand) {
        display.value = ''; // Очистити поле вводу перед додаванням нового числа
        waitingForSecondOperand = false;
      }
      display.value += number;
    }
  
    function addOperator(op) {
      const currentOperand = parseFloat(display.value);
      if (firstOperand === null) {
        firstOperand = currentOperand;
      } else if (operator) {
        performOperation();
      }
      operator = op;
      waitingForSecondOperand = true;
    }
  
    function performOperation() {
      const currentOperand = parseFloat(display.value);
      switch (operator) {
        case '+':
          firstOperand += currentOperand;
          break;
        case '-':
          firstOperand -= currentOperand;
          break;
        case '*':
          firstOperand *= currentOperand;
          break;
        case '/':
          if (currentOperand === 0) {
            alert('Ділення на 0 неможливе!');
            clearDisplay();
            return;
          }
          firstOperand /= currentOperand;
          break;
        default:
          return;
      }
      display.value = firstOperand;
    }
  
    function clearDisplay() {
      display.value = '';
      firstOperand = null;
      operator = null;
      waitingForSecondOperand = false;
    }
  
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const { num, op } = button.dataset;
        if (num !== undefined) {
          addNumber(num);
        } else if (op !== undefined) {
          addOperator(op);
        } else if (button.classList.contains('clear')) {
          clearDisplay();
        }
      });
    });
  });
