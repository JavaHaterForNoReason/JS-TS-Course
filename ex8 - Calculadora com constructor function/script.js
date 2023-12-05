function Calculator(display) {
  this.display = display;

  this.start = () => {
    this.getButtonsClick();
    this.getKeyEnterPress();
  };
  this.clearDisplay = () => (this.display.value = "");

  this.deleteText = () =>
    (this.display.value = this.display.value.slice(0, -1));

  this.setDisplayText = (value) => (this.display.value += value);

  this.setResult = () => {
    let calc = this.display.value;
    if (calc) {
      try {
        calc = eval(calc);
        this.display.value = calc;
      } catch (error) {
        console.error("Operação inválida: ", error);
        alert("Operação inválida! Por favor, tente novamente");
        this.clearDisplay();
        return;
      }
    }
  };

  this.getButtonsClick = () => {
    document.addEventListener("click", (e) => {
      const button = e.target;

      if (button.classList.contains("num"))
        this.setDisplayText(button.innerText);
      if (button.classList.contains("clear")) this.clearDisplay();
      if (button.classList.contains("delete")) this.deleteText();
      if (button.classList.contains("equal")) this.setResult();
    });
  };
  this.getKeyEnterPress = () => {
    this.display.addEventListener("keyup", (e) => {
      if (e.key === "Enter") this.setResult();
    });
  };
}

const calculator = new Calculator(document.querySelector(".display"));
calculator.start();
