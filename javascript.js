let valueA="";
let valueB="";
let currentOperator=null;


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
        console.log ({result})
    } else 
    {
         console.log("ERROR");  
    }

}


equal.addEventListener('click',getResult)


//listener for assigning a,b values
numbers.forEach ((button) => 
{
    button.addEventListener('click', (e) => 
    {
       
        if (currentOperator===null) 
        {
            getValueA(e);
            } else {
            getValueB(e);   
        }
    });
});

//listener for assinging operator
operators.forEach((button) => 
{
    button.addEventListener('click',(e) => 
    {
        currentOperator = e.target.dataset.operator;
    });
});



