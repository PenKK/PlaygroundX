let a = 2;
let b = 7;
let c = 6;

let p = 0;
let q = 0;

let root = 0;
let xPlus = 0;
let xMinus = 0;
const decimalRounding = 10000;

ElementId("a").value = a;
ElementId("b").value = b;
ElementId("c").value = c;

let inputs = document.querySelectorAll('input');
inputs.forEach(element => {
    element.addEventListener('input', () => {
        element.style.width = element.value.length + "ch";

        a = parseFloat(ElementId("a").value);
        b = parseFloat(ElementId("b").value);
        c = parseFloat(ElementId("c").value);

        if (isNaN(a) || isNaN(b) || isNaN(c) || a == 0) {
            ElementId("inputs").style.opacity = 0.5;
            return;
        }
        ElementId("inputs").style.opacity = 1;

        calcVertForm();
        calcX();
    })
});

calcVertForm = () => {

    let formString = a + "(x ";

    p = (b * -1) / (2 * a);
    // console.log("P: " + p);
    q = (a * p**2) + (b * p) + (c);
    // console.log("Q: " + q);

    if (p < 0) { 
        formString = formString.concat("+ " + Math.round(Math.abs(p) * decimalRounding) / decimalRounding  + ")&sup2");
    } else {
        formString = formString.concat("- " + Math.round(p * decimalRounding) / decimalRounding + ")&sup2");
    }

    if (q < 0) {
        formString = formString.concat(" - " + Math.round(Math.abs(q) * decimalRounding) / decimalRounding);
    } else {
        formString = formString.concat(" + " + Math.round(q * decimalRounding) / decimalRounding);
    }

    ElementId("vertForm").innerHTML = formString;
}

calcX = () => {
    root = (b**2) - (4*a*c);

    if (root < 0) {
        ElementId("+").innerHTML = "No X-Intercepts";
        ElementId("-").innerHTML = "";
    } else {
        xPlus = (b*-1 + Math.sqrt(root)) / (2*a);
        xMinus = (b*-1 - Math.sqrt(root)) / (2*a);
        ElementId("+").innerHTML = "Plus: " + Math.round(xPlus * decimalRounding) / decimalRounding;
        ElementId("-").innerHTML = "Minus: " + Math.round(xMinus * decimalRounding) / decimalRounding;
    }
}

factor = () => {
    let tempC = a*c;
    let limit = Math.abs(b*tempC);

    let num1;
    let num2;

    let finalNum1;
    let finalNum2;
    for (let i = limit * -1; i < limit; i++) {
        for (let j = limit * -1; j < limit; j++) {
            if (i * j == c && i + j == b) {
                num1 = i;
                num2 = j;
            }
        }
    }

    if (isNaN(num1)) {
        alert("not found");
    }


    
}

function reduce(numerator,denominator){
    var gcd = function gcd(a,b){
      return b ? gcd(b, a%b) : a;
    };
    gcd = gcd(numerator,denominator);
    return [numerator/gcd, denominator/gcd];
  }

calcVertForm();
calcX();
