let calResult = document.getElementById("calResult");

// 최초입력 유효성검사
var isFirst = true;
calResult.innerHTML = 0;       

// Number create button
let numDiv = document.getElementById("calNumber");
let lastRowDiv = document.getElementById("lastRow");
let numArray = new Array();
for (let i = 0; i < 10; i++) {
    numArray.push(i);
}
numArray = numArray.sort(function(a,b){
    return b-a;
});

// operator
let btnCreateSource = ["←", "C", "/", "+", "-", "*","=", ...numArray]
let operatorArray = ["←", "C", "/", "+", "-", "*", "="];
let operatorDiv = document.getElementById("calOperator");
let operatorTopDiv = document.getElementById("topOpertor");

btnCreateSource.forEach((el) => {
    if(typeof el === typeof 'string'){
        el === "=" || el === "*" || el === "C"
            ? btnMaker("operator", el, lastRowDiv)
            : el === "←" 
                ? btnMaker("operator", el, operatorTopDiv)
                : btnMaker("operator", el, operatorDiv)
    }else{
        el === 0
        ? btnMaker("calNumber", el, lastRowDiv)
        : btnMaker("calNumber", el, numDiv);
    }
});
// '='  따로 클래스 아이디 부여
let equal = document.getElementById("=")
equal.className = "equal-btn"

// 숫자 0 따로 클래스 아이디 부여
let zero = document.getElementById("0");
zero.className = "num-btn";

// 숫자 0 가운데로 태그 옮기기
let lastRowChildren = lastRowDiv.children;
for(let lastVar=0; lastVar<lastRowChildren.length; lastVar++){
    lastRowDiv.append(lastRowChildren[lastVar]);
}

// btn maker
function btnMaker(type, val, parent) {
    let btn = document.createElement("button");
    btn.value = val;
    btn.innerHTML = val;
    btn.btnType = type;
    btn.accessKey = val;
    btn.id = val;
    btn.onclick = function (e) {
        handler(e.target);
    };
        parent.appendChild(btn);
    }
              
// onClick func
function handler(target) {
    switch (target.btnType) {
        case "calNumber":
            calNumberCase(target.value);
            break;
        case "operator":
            operatorCase(target.value);
            break;
    }
}

// keyboard func
function enter(e) {
    // backspace
    if(e.keyCode === 8){
        operatorCase("←");
    }
    // 초기화
    if (e.keyCode === 27) {
        operatorCase("C");
    }
    // 결과 도출
    if (e.keyCode === 13) {
        operatorCase("=");
    } else if (48 <= e.keyCode && e.keyCode <= 57 || 96 <= e.keyCode && e.keyCode <= 105) {
        calNumberCase(e.key); //숫자값
    } else if (operatorArray.indexOf(e.key) !== -1) {
        operatorCase(e.key); // 연산값
    }
}
// handler funcs
function calNumberCase(val) {
    if (isFirst) {
        calResult.innerHTML = val;
        isFirst = false;
    } else {
        calResult.innerHTML += val;
    }
}
// let test = "aaa.aaa+aaa.aa"
// let separatorsDoted = ['\\\+', '\\\.', '-', '\\*', '/'];
// let testA = test.split(new RegExp(separatorsDoted.join('|'),'g'));
let toFixedCount = 0;
let dotCount = 0;
function operatorCase(val) {
    // result innerHtml value to string
    let calResultString = calResult.textContent;
    let backspaceArray= new Array()
    backspaceArray= calResultString.split('');
    // 정규표현식으로 string to array
    // let dotedArray = calResultString.split(new RegExp(separatorsDoted.join('|'),'g'));
    // 이항 check
    let binomialCheck = false;
    
    operatorArray.forEach((val)=>{
        if(calResultString.split(val).length > 1 && val !== "." && val !== "%"){
            binomialCheck = true;
        }
    });
    // if(dotedArray.length > 2){
    //     toFixedCount = dotedArray[2].length
    // } 
    if (val === "C") {
        calResult.innerHTML = "0";
        isFirst = true;
    } else if (val === "=" || binomialCheck) {
        if (operatorArray.indexOf(calResult.innerHTML[calResult.innerHTML.length - 1],) !== -1){
            // console.log("수식을 완성해주세요!");
        } else {
            // 이항인 상태에서 '='이 아닌 연산기호를 썻을 경우 
            // true: 계산된 후 연산기후 추가, false: 그냥 계산만 하기
                binomialCheck && "=" !== val ?(
                    calResult.innerHTML = eval(calResult.innerHTML).toFixed(toFixedCount),
                    calResult.innerHTML += val
                )
                : calResult.innerHTML = eval(calResult.innerHTML).toFixed(toFixedCount);
            }
    } else {
            if (isFirst === true) {
                // console.log("번호를 눌러주세요!");
            } else {
                //backspace 
                val === "←" 
                ? (
                    backspaceArray.pop(),
                    calResultString = backspaceArray.join(''),
                    // console.log('back'),
                    calResult.innerHTML = calResultString
                ) : operatorArray.indexOf(calResult.innerHTML[calResult.innerHTML.length - 1],) !== -1
                    ? True//console.log("두 개 이상의 연산기호를 넣을 수 없습니다!") 
                    :calResult.innerHTML += val;
            }
        }
}