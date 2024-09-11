const display = document.getElementById("result");

function calc(number) {
  display.value += number;
}

function Eval() {
  try {
    display.value = eval(display.value);
  } catch (e) {
    display.value = "Error";
  }
}

function del() {
  display.value = "";
}

function minus() {
  display.value = display.value.slice(0, -1);
}
