const paragrafos = document.querySelectorAll("p");
const bodyStyles = getComputedStyle(document.body);

for (let p of paragrafos) {
  p.style.backgroundColor = bodyStyles.backgroundColor;
  p.style.color = "white";
}
