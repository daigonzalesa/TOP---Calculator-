let valueA="";
let valueB="";
let currentOperator=null;
let resultShown=false;


const numbers=document.querySelectorAll('.bttn-number');
const operators=document.querySelectorAll('.bttn-operator');
const equal=document.querySelector('#bttn-equal');

const Library = 
{
"+":  (a,b) => a+b,
"-": (a,b) => a-b,
"*": (a,b) => a*b,
"/": (a,b) =>  a/b,
}

function getValueA (e) 
{
    valueA = valueA+e.target.dataset.value; 
    console.log({valueA});
}

function getValueB (e) 
{
    valueB = valueB+e.target.dataset.value; 
    console.log({valueB});
}

function operate (operator, a, b) 
{

    return Library[operator](Number(a), Number(b));

}

function getResult () 
{
 if (valueA!=="" && valueB!=="" && currentOperator!==null) 
    {
        const result=operate(currentOperator, valueA, valueB);
        console.log ({result});
        resultShown=true;
        valueA=result.toString();
        valueB="";
        currentOperator=null;
    } 

}


function startAgain () {
    valueA="";
    valueB="";
    currentOperator=null;
    resultShown=false;
}


equal.addEventListener('click',getResult)


//listener for assigning a,b values
numbers.forEach ((button) => 
{
    button.addEventListener('click', (e) => 
    {
        if (resultShown==true)
        {
            startAgain();
        }
        if (currentOperator===null) 
        {
            getValueA(e);
            } else {
            getValueB(e);   
        }
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



