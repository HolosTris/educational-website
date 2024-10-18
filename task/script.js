const container = document.getElementById("container");

const selectBtn = document.getElementById("select");

let numFormulas;

let a, b, c;

selectBtn.onclick = () => {
  numFormulas = +document.getElementById("formula").value;

  a = +(prompt("Значение переменной a:") || 0);
  b = +(prompt("Значение переменной b:") || 0);
  c = +(prompt("Значение переменной c:") || 0);

  for (i = 0; i < numFormulas; i++) {
    const img = document.getElementById(`formula-${i + 1}`);
    const resText = document.getElementById(`res-${i + 1}`);

    console.log(computeFormula(1, a, b, c));
    console.log(computeFormula(2, a, b, c));
    console.log(computeFormula(3, a, b, c));

    const res = computeFormula(i + 1, a, b, c);

    img.classList += "completed";
    resText.innerText = `Результат: ${res} ${res != Infinity ? "😊" : "😔"}`;

    // img.insertAdjacentHTML(
    //   "afterend",
    //   `<strong>Результат: ${res} ${res ? "😊" : "😔"}</strong>`
    // );

    if (!confirm("Продолжить вычисления?")) break;
  }
};

const computeFormula = (num, a, b, c) => {
  switch (num) {
    case 1:
      return computeFormula1(a, b, c);
    case 2:
      return computeFormula2(a, b, c);
    case 3:
      return computeFormula3(a, b, c);
  }
};

const computeFormula1 = (a, b, c) =>
  (Math.PI * Math.sqrt(a ^ 2)) / ((b ^ 2) * c);

const computeFormula2 = (a, b, c) => ((a * Math.sqrt(b)) ^ 2) / (c ^ 3);

const computeFormula3 = (a, b, c) =>
  Math.sqrt(a + b + Math.sqrt(c)) / (Math.PI * b);
