let valueA="";
let valueB="";
let currentOperator=null;
let resultShown=false;


const numbers=document.querySelectorAll('.bttn-number');
const operators=document.querySelectorAll('.bttn-operator');
const equal=document.querySelector('#bttn-equal');
const clear=document.querySelector('#bttn-clear');
const del=document.querySelector('#bttn-delete');
const display=document.querySelector('#display-screen');

const Library = 
{
"+":  (a,b) => a+b,
"-": (a,b) => a-b,
"*": (a,b) => a*b,
"/": (a,b) =>  a/b,
}

const updateValue = (e) => {

    const input=e.target.dataset.value;

    if (input=='.' && (currentOperator===null?valueA:valueB).includes('.')) 
        {
            return;
        }
       
    if (currentOperator===null) 
        {
            valueA += e.target.dataset.value; 
            console.log({valueA});;
        } else 
        {
            valueB += e.target.dataset.value; 
            console.log({valueB});;   
        }

    updateScreen(currentOperator == null? valueA:valueB);
}


const operate = (operator, a, b) => Library[operator](Number(a), Number(b));

const getResult = () =>
{
    if (valueA!=="" && valueB!=="" && currentOperator!==null) 
    {
        if (currentOperator === "/" && valueB === "0")
        {
        updateScreen('Error: Divide by Zero');
       // reset();
        return;
        }

        const result=operate(currentOperator, valueA, valueB);
        console.log ({result});
        resultShown=true;
        valueA=result.toString();
        valueB="";
        currentOperator=null;
        updateScreen (valueA);
    } 
    
}

const reset = () => {
    valueA="";
    valueB="";
    currentOperator=null;
    resultShown=false;

    updateScreen('0');
}


const deleteLast = () => {
    if (valueB!=="") 
        {
            valueB=valueB.slice(0,-1);
            console.log({valueB});
        }
        else if (currentOperator!==null) 
        {
            currentOperator=null;
            console.log('Operator Deleted');
        } 
        else 
        {
            valueA=valueA.slice(0,-1);
            console.log({valueA});
        }
        updateScreen(currentOperator===null ? valueA: valueB);
}

const updateScreen = (content) => {
    display.textContent= content ===""?"0":content;
}
// listeners --------------------------------------------------------------------
equal.addEventListener('click',getResult)
clear.addEventListener('click', reset);
del.addEventListener('click',deleteLast);
//listener for assigning a,b values
numbers.forEach ((button) => 
{
    button.addEventListener('click', (e) => 
    {
        if (resultShown==true) reset ();
        updateValue (e);
    });
});

//listener for assigning operator
operators.forEach((button) => 
{
    button.addEventListener('click',(e) => 
    {    
        getResult();
        currentOperator = e.target.dataset.operator;
        resultShown=false;
    });
});



