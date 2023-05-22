let aS = 2;
let bS = 4;
let cS = 8;
const decimalRounding = 10000;

let inputs = document.querySelectorAll('input');

inputs.forEach(element => {
    element.addEventListener('input', () => {
        element.style.width = element.value.length + "ch";

        aS = parseInt(ElementId("a").value);
        bS = parseInt(ElementId("b").value);
        cS = parseInt(ElementId("c").value);

        calcVertForm();
    })
});

calcVertForm = () => {

    let finalVertFormString = "y = ";

    if (isNaN(aS) || isNaN(bS) || isNaN(cS)) {
        return;
    }
    
    let p = (bS * -1) / (2 * aS);
    // console.log("P: " + p);
    let q = (aS * Math.pow(p, 2)) + (bS * p) + (cS);
    // console.log("Q: " + q);

    finalVertFormString = finalVertFormString.concat(aS + "(x ");

    if (p < 0) { 
        finalVertFormString = finalVertFormString.concat("- " + Math.round(Math.abs(p) * decimalRounding) / decimalRounding  + ")&sup2");
    } else {
        finalVertFormString = finalVertFormString.concat("+ " + Math.round(p * decimalRounding) / decimalRounding + ")&sup2 + ");
    }

    if (q < 0) {
        finalVertFormString = finalVertFormString.concat("- " + Math.round(Math.abs(q) * decimalRounding) / decimalRounding);
    } else {
        finalVertFormString = finalVertFormString.concat(" + " + Math.round(q * decimalRounding) / decimalRounding);
    }

    ElementId("vertForm").innerHTML = finalVertFormString;
}

calcVertForm();
