let bufferData = '';
$(document).ready(function(){
    const body = document.querySelector("body");
    monitor = document.querySelector(".calc");
    ColorClass();
    // console.log(monitor.innerHTML)
    $(".buttons").mousedown((e)=>{
        console.log(e.target.innerText);
        clickAnimation(e);
        
        switch(e.target.innerText){
            case "AC":
                bufferData = '';
                monitor.innerText = "0";
                break;
            case "=":
                if(/[+\-÷*/]$/.test(bufferData)) alert("숫자를 입력해주세요");
                let result = Math.floor(calc(bufferData)).toString();
                if(result.length < 10){
                    monitor.innerText = result;
                    bufferData = result;
                }else{
                    monitor.innerText = "Infinity";    
                    bufferData = '';                
                }
                
                break;
            case "C":
                bufferData = bufferData.slice(0,-1);
                monitor.innerText = bufferData;
                console.log(bufferData);
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
                if(/[+\-÷*/]$/.test(bufferData)){
                    bufferData = bufferData.slice(0,-1);
                    bufferData += ''+e.target.innerText;
                    monitor.innerText = bufferData;
                }
                if(/[0-9]$/.test(bufferData)){
                    bufferData += ''+e.target.innerText;
                    monitor.innerText = bufferData;
                }
                break;
            default:
                if(!(bufferData == '' && e.target.innerText == '0') && e.target.nodeName == 'LI' && bufferData.length < 10){
                    bufferData += ''+e.target.innerText;
                    monitor.innerText = bufferData;
                    console.log(e.target.nodeName)
                }
        }
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
        console.log(event.target.classList)

        setTimeout(function() {
            event.target.classList.remove('active');
        }, 300); // 일정 시간 (3초) 후에 클래스 제거
    }
 });
