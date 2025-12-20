$(document).ready(function(){
    console.log();
    
    let data = "";
    let No = 0;
    
    qustion_2024.map((value,i)=>{
    //    
        data+=`
            <div class="question-card">
            <div class="question-number">Question ${No+1}</div>
            <div class="question-text">${qustion_2024[i].question}</div>
            <div class = "my-10"><img src="${qustion_2024[i].img}"></div>

            <ul class="options-list" data-ans="${qustion_2024[i].answer}">
                
                <li class="option-item" data-whichabtn="A" >a) ${qustion_2024[i].options.A}</li>
                <li class="option-item" data-whichabtn="B" >b) ${qustion_2024[i].options.B}</li>
                <li class="option-item" data-whichabtn="C" >c) ${qustion_2024[i].options.C}</li>
                <li class="option-item" data-whichabtn="D" >d) ${qustion_2024[i].options.D}</li>
                
            </ul>
        </div>
        `
        No++;
        rightAns = qustion_2024[i].answer;
    })
    $("#allQustion").html(data);

    $(".option-item").on("click",function(e){
        let whichabtn = $(this).data("whichabtn");
        let ansIs = $(this).parent().attr("data-ans");
      
        if(whichabtn == ansIs){
            $(this).css("color","green")
            $(this).css("backgroundColor","#abe9ab")
    
        }else{
            $(this).css("color","red")
            $(this).css("backgroundColor","#ffa599ff")
        }
    })
        
        

        
        
    
    
});


