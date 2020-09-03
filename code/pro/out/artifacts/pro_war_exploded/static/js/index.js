$(function(){
    init()
    insertOption()
    setList()
    choiceItem(1)
})

var options = ["1","2","3","4","5"]
var list = []
var checkItem = []

function init(){
    $.ajax({
        type : "POST",
        contentType: "application/json",
        url : "list",
        dataType: 'json',
        success : function (data){
            console.log(data)
        },
        err : function (err){
            console.log(err)
        }
    })
}

function setList(){
    for(var i=0;i<40;i++){
        list.push({
            id : i+1,
            name : "sahlksaf"+i,
            space : Math.round(2312/1024*10)/10+"G",
            isNew : true,
            m_name : i+1
        })
    }

    var htmlStr = ""
    for(var j=0;j<list.length;j++){
        htmlStr+="<tr class='table_tr'>" +
            "<td class='table_td'><input class='td_checkbox' onclick='javascript:choiceBox(this.value)' type='checkbox' value='"+list[j].id+":"+list[j].name+"'/></td>"+
            "<td class='table_td'>"
        if(!list[j].isNew){
            htmlStr += list[j].name+"</td>"
        }else{
            htmlStr += "<span class='td_new'>New</span>" + list[j].name+"</td>"
        }
        htmlStr += "<td class='table_td'>"+list[j].space+"</td>" +
            "</tr>"
    }
    $(".table_boby").append(htmlStr)
}

function insertOption(){
    var htmlStr = "";
    for(var i=0;i<options.length;i++){
        htmlStr += "<div class='option_div'>"
        if(i==0){
            htmlStr += "<input type='radio' class='option_item' onclick='choiceItem(this.value)' name='option_item' value='"+options[i]+"' checked></input>"
        }else{
            htmlStr += "<input type='radio' class='option_item' onclick='choiceItem(this.value)' name='option_item' value='"+options[i]+"'></input>"
        }
        htmlStr += "<label class='option_lable'>"+options[i]+"</label></div>";

    }
    $(".top_boby_option").append(htmlStr)
}

function choiceItem(e){
    checkItem = [];
    var value = parseInt(e);
    for(var i=0;i<$("tr").length;i++){
        var input_value = $(".td_checkbox:eq("+i+")").val()
        var id = input_value.split(":")[0]
        var name = input_value.split(":")[1]
        if(i != 0 && list[i].name == name && list[i].m_name!=value){
            $("tr:eq("+i+")").css("display","none")
        }else{
            $("tr:eq("+i+")").css("display","table-row")
        }
    }
}

function choiceBox(e){

    console.log(e)
}