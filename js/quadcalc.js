let a = 1;
let b = 5;
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
            return;
        }

        calcVertForm();
        calcX();
    })
});

calcVertForm = () => {

    let formString = "y = ";

    p = (b * -1) / (2 * a);
    // console.log("P: " + p);
    q = (a * p**2) + (b * p) + (c);
    // console.log("Q: " + q);

    formString = formString.concat(a + "(x ");

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
        ElementId("+").innerHTML = "";
        ElementId("-").innerHTML = "No X-Intercepts";
    } else {
        xPlus = (b*-1 + Math.sqrt(root)) / (2*a);
        xMinus = (b*-1 - Math.sqrt(root)) / (2*a);
        ElementId("+").innerHTML = "Plus: " + Math.round(xPlus * decimalRounding) / decimalRounding;
        ElementId("-").innerHTML = "Minus: " + Math.round(xMinus * decimalRounding) / decimalRounding;
    }
    
}

calcVertForm();
calcX();
