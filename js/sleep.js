const textBox = document.getElementById("dayText");
textBox.innerText = getName();

function getName() {
  const members = ["Bob - Ice Bear",  "Daquavis - Panda", "Jr Chicken - Borgir", "John - Baguette"];

  let now = new Date();
  let start = new Date(now.getFullYear(), 0, 0);
  let diff = now - start;
  let oneDay = 1000 * 60 * 60 * 24;
  let day = Math.floor(diff / oneDay);

  return members[day % members.length];
}
