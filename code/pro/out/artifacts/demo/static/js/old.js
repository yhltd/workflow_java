
function sel(){
    $.ajax({
        type : "POST",
        url : "info",
        dataType: 'json',
        data : {
            type : "his",
            number : $("#number").val()=="" || $("#number").val()==0 ? -1 : $("#number").val()
        },
        success : function (data){
            if(data.res.length!=0){
                setTable(data.res)
            }else{
                emptyUl()
                showEmpty()
            }
        },
        err : function (err){
            console.log(err)
        }
    })
}

function setTable(list){
    emptyUl()
    hideEmpty()
    let html_table = ""
    for(let i=0;i<list.length;i++){
        html_table +=
            "<ul class='table_ul'>" +
                "<li class='table_li'>"+list[i].infoList[0].name+"</li>" +
                "<li class='table_li'>"+list[i].infoList[0].model.name+"</li>" +
                "<li class='table_li'>"+list[i].createTime.split(".")[0]+"</li>" +
            "</ul>"
    }
    $(".table_main").append(html_table)
}

function emptyUl(){
    $(".table_ul").remove();
}

function showEmpty(){
    $(".table_main").addClass("empty")
    $("#empty_select").css("display","block")
}

function hideEmpty(){
    $(".table_main").removeClass("empty")
    $("#empty_select").css("display","none")
}

