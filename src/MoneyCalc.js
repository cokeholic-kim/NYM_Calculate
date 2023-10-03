let bufferData = '';
$(document).ready(function(){
    const body = document.querySelector("body");
    monitor = document.querySelector(".calc");
    ColorClass();
    $(".buttons").mousedown((e)=>{
        clickAnimation(e);
        
        switch(e.target.innerText){
            case "AC":
                bufferData = '0';
                monitor.innerText = "0";
                break;
            case "=":
                if(/[+\-÷*/]$/.test(bufferData) || bufferData == '') alert("숫자를 입력해주세요");
                else{
                    let result = Math.floor(calc(bufferData)).toString();
                    if(result.length < 10){
                        monitor.innerText = result;
                        bufferData = result;
                    }else{
                        monitor.innerText = "Infinity";    
                        bufferData = '';                
                    }
                }
                break;
            case "C":
                if(bufferData.length > 1){
                    bufferData = bufferData.slice(0,-1);
                    monitor.innerText = bufferData;
                }else{
                    bufferData = '0';
                    monitor.innerText = bufferData;                    
                }
                break;
            case "Dark":
            case "Light":
                $('body').toggleClass("dark light");
                if($('body .buttonMode').text() == "Dark"){
                    $('body .buttonMode').text("Light");
                }else{
                    $('body .buttonMode').text("Dark")
                }
                break;
            case "+":
            case "-":
            case "*":
            case "/":
                if(bufferData == '0' || bufferData == 'Infinity'){
                    alert("숫자를 입력해주세요");
                }else{
                    if(/[+\-÷*/]$/.test(bufferData)){
                        bufferData = bufferData.slice(0,-1);
                        bufferData += ''+e.target.innerText;
                        monitor.innerText = bufferData;
                    }
                    if(/[0-9]$/.test(bufferData)){
                        bufferData += ''+e.target.innerText;
                        monitor.innerText = bufferData;
                    }
                }
                
                break;
            default:
                if(!(bufferData == '' && e.target.innerText == '0') && e.target.nodeName == 'LI' && bufferData.length < 10){
                    if(bufferData == '0' || bufferData == 'Infinity'){
                        bufferData = e.target.innerText;
                        monitor.innerText = formatNumber(bufferData);
                    }else{
                        bufferData += ''+e.target.innerText;
                        monitor.innerText = formatNumber(bufferData);
                        console.log(formatNumber(bufferData));
                    }
                }
        }
        console.log(bufferData,typeof(bufferData))
    })
    // keydown 이벤트
    $(document).keydown((e)=>{
        clickAnimation(e);
        let key = e.key;
        console.log(key);
        switch(key){
            case "Escape":
                bufferData = '0';
                monitor.innerText = "0";
                break;
            case "=":
            case "Enter":
                if(/[+\-÷*/]$/.test(bufferData) || bufferData == '') alert("숫자를 입력해주세요");
                else{
                    let result = Math.floor(calc(bufferData)).toString();
                    if(result.length < 10){
                        monitor.innerText = result;
                        bufferData = result;
                    }else{
                        monitor.innerText = "Infinity";    
                        bufferData = '';                
                    }
                }
                break;
            case "Backspace":
                if(bufferData.length > 1){
                    bufferData = bufferData.slice(0,-1);
                    monitor.innerText = bufferData;
                }else{
                    bufferData = '0';
                    monitor.innerText = bufferData;                    
                }
                break;
            case " ":
                $('body').toggleClass("dark light");
                if($('body .buttonMode').text() == "Dark"){
                    $('body .buttonMode').text("Light");
                }else{
                    $('body .buttonMode').text("Dark")
                }
                break;
            case "+":
            case "-":
            case "*":
            case "/":
                if(bufferData == '0' || bufferData == 'Infinity'){
                    alert("숫자를 입력해주세요");
                }else{
                    if(/[+\-÷*/]$/.test(bufferData)){
                        bufferData = bufferData.slice(0,-1);
                        bufferData += ''+key;
                        monitor.innerText = bufferData;
                    }
                    if(/[0-9]$/.test(bufferData)){
                        bufferData += ''+key;
                        monitor.innerText = bufferData;
                    }
                }
                
                break;
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
            case "0":
                if(!(bufferData == '' && key == '0') && bufferData.length < 10){
                    if(bufferData == '0' || bufferData == 'Infinity'){
                        bufferData = key;
                        monitor.innerText = formatNumber(bufferData);
                    }else{
                        bufferData += ''+key;
                        monitor.innerText = formatNumber(bufferData);
                        console.log(formatNumber(bufferData));
                    }
                }
                break;
            default:
                break;
        }
        console.log(bufferData,typeof(bufferData))
    })

    // 문자열로 계산할 함수
    function calc(fomula){
        return new Function('return ' + fomula)()
    }
    function ColorClass(){
        
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            body.classList.add('dark');
        } else {
            body.classList.add('light');
        }
    }
    function clickAnimation(event){
        event.target.classList.add("active")

        setTimeout(function() {
            event.target.classList.remove('active');
        }, 300); // 일정 시간 (3초) 후에 클래스 제거
    }
    function formatNumber(number){
        const numbers = number.match(/[0-9]+|[^0-9\s]+/g);
        let formattedExpression = "";
        numbers.forEach((number,index)=>{
            const formattedNumber = Number(number).toLocaleString();
            if(index % 2 == 0){
                //홀수번째 인덱스는 연산자
                // 짝수번째는 숫자
                formattedExpression += formattedNumber;
            }else{
                formattedExpression += number;
            }
        })
        // console.log(formattedExpression)
        return formattedExpression;
    }
 });
