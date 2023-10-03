$(document).ready(function(){
        $("li").click(function() {
            const checkbox = $(this).find("input[type='checkbox']");
            checkbox.prop("checked", !checkbox.prop("checked"));
            
            calculateSum();
        });
    
        $("input[type='checkbox']").change(function() {
            calculateSum();
        });

        $("input[type='checkbox']").click(function(e) {
            e.stopPropagation(); // 이벤트 전파 방지
            
            const checkbox = $(this).find("input[type='checkbox']");;
            checkbox.prop("checked", !checkbox.prop("checked"));
            
            calculateSum();
         });
    
        function calculateSum() {
            let sum = 0;
        
            $("input[type='checkbox']:checked").each(function() {
                const value = parseInt($(this).val());
                if (!isNaN(value)) {
                    sum += value;
                }
            });
            sum = Number(sum).toLocaleString();
            $(".sum").text(sum);
        }
})