import ValidaCPF from "./ValidaCPF";

const geraCPF = () => {
  const button = document.getElementById("generator-button");
  const div = document.querySelector(".result");
  const result = div.querySelector("span");

  button.addEventListener("click", () => {
    let randValue = "";
    let digit = "";

    for (let i = 1; i <= 9; i++) {
      randValue += rand();
    }

    digit = ValidaCPF.getDigits(randValue);
    randValue += digit;
    digit = ValidaCPF.getDigits(randValue);
    randValue += digit;

    randValue = `${randValue.slice(0, 3)}.${randValue.slice(
      3,
      6
    )}.${randValue.slice(6, 9)}-${randValue.slice(9)}`;
    setMsg(result, randValue);
    result.style.color = "#008000";
  });
};

const setMsg = (span, msg) => {
  if (msg) {
    span.innerText = msg;
    return;
  }
};

const rand = (min = 0, max = 9) => {
  return String(Math.floor(Math.random() * (max - min) + min));
};

export default geraCPF;
