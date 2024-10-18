const container = document.getElementById("container");

const selectBtn = document.getElementById("select") as HTMLButtonElement;

let numFormulas: number;

let a: number, b: number, c: number;

selectBtn.innerText = "qfe";

selectBtn.onclick = () => {
  numFormulas = +(document.getElementById("forward") as HTMLInputElement).value;

  a = +(prompt("Значение переменной a:") || 0);
  b = +(prompt("Значение переменной b:") || 0);
  c = +(prompt("Значение переменной c:") || 0);
};

// container.insertAdjacentHTML("beforeend", )
