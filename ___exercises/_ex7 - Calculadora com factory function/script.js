const createCalculator = () => {
  return {
    display: document.querySelector(".display"),
    start() {
      this.getButtonsClick;
      this.getKeyEnterPress;
    },
    clearDisplay() {
      this.display.value = "";
    },
    deleteText() {
      this.display.value = this.display.value.slice(0, -1);
    },
    setResult() {
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
    },
    setDisplayText(value) {
      this.display.value += value;
    },
    get getButtonsClick() {
      document.addEventListener("click", (e) => {
        const button = e.target;

        if (button.classList.contains("num"))
          this.setDisplayText(button.innerText);
        if (button.classList.contains("clear")) this.clearDisplay();
        if (button.classList.contains("delete")) this.deleteText();
        if (button.classList.contains("equal")) this.setResult();
      });
    },
    get getKeyEnterPress() {
      this.display.addEventListener("keyup", (e) => {
        if (e.key === "Enter") this.setResult();
      });
    },
  };
};

const calculator = createCalculator();
calculator.start();
