const textBox = document.getElementById("dayText");
textBox.innerText = getName();

function getName() {
  const date = new Date();
  const today = date.getDate() % 3;

  switch (today) {
    case 0:
      return "Bob - Ice Bear";
    case 1:
      return "Daquavis - Panda";
    case 2:
      return "Jr Chicken - Borgir";
  }
}
