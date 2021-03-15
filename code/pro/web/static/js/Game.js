$(function (){
    var  list=[];
    $.ajax({
        type : "POST",
        contentType: "application/json",
        url : "game",
        dataType: 'json',
        success : function (data){
            list = data
            setList(list)
        },
        err : function (err){
            console.log(err)
        }
    })
})


function setList(list){
    var htmlStr = ""
    //循环添加表格信息
    for(var j=0;j<list.length;j++){
        htmlStr=htmlStr+"<tr class='traddgame'>" +
            "<td class='thgame'>"+list[j].name+"</td>"+"<td class='thgame'>"+list[j].num+"</td>"
            +"<td class='thgame'>"+(j+1)+"</td>"+"</tr>";
    }
    $(".tablegame").append(htmlStr)
}

