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
const history=document.querySelector('#history-screen');

const Library = 
{
"+":  (a,b) => a+b,
"-": (a,b) => a-b,
"*": (a,b) => a*b,
"/": (a,b) =>  a/b,
"^": (a, b) => a ** b,
"√": (a) => Math.sqrt(a),
}

const updateValue = (e) => {

    const input=e.target.dataset.value;

    if (input=='.' && (currentOperator===null?valueA:valueB).includes('.'))   return;
    
       
    if (currentOperator===null) 
    {
        valueA += input; 
        console.log({valueA});;
    } else 
    {
        valueB += input; 
        console.log({valueB});
    }   

    updateScreen(currentOperator == null? valueA:valueB);
}


const operate = (operator, a, b) => Library[operator](Number(a), Number(b));

const getResult = () =>
{
    if (valueA!=="" && currentOperator=="√") 
    {
        historyScreen("√"+valueA);
        const result= Library["√"](Number(valueA));
        valueA=result.toFixed(5).toString();
        updateScreen(valueA);
        
        return; 
    }
    
    
    if (valueA!=="" && valueB!=="" && currentOperator!==null) 
    {
        if (currentOperator=="/" && Number(valueB)==0)
        {
        updateScreen('Error: Divide by Zero');
        reset();
        return;
        }

        const result=operate(currentOperator, valueA, valueB);
        historyScreen(Number(valueA)+" "+currentOperator+" "+Number(valueB)+ " = ");
        resultShown=true;
        valueA=result.toFixed(5);
        valueB="";
        currentOperator=null;
        updateScreen (Number(valueA));
    } 
    
}

const reset = () => {
    valueA="";
    valueB="";
    currentOperator=null;
    resultShown=false;

    updateScreen('0');
    historyScreen("");
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

const historyScreen = (content) => {
    history.textContent = content;
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
        if (valueA === "") return;

        if (valueB !=="") getResult();

        currentOperator = e.target.dataset.operator;
        resultShown=false;
    });
});



