updList = []
gameList = []
checkItem = []
updList = []
oldUpdList = []
oldNumber = 0;
oldTime = "";

function showList(){
    for(let i = 0;i<updList.infoList.length;i++){
        oldUpdList.push({
            id : updList.infoList[i].id,
            name : updList.infoList[i].name,
            isNew : updList.infoList[i].isNew,
            isNewTime : updList.infoList[i].isNewTime,
            model : {
                id : updList.infoList[i].model.id,
                name : updList.infoList[i].model.name,
            },
            date : updList.infoList[i].date,
            space : updList.infoList[i].space
        })
    }
    let time = updList.createTime.split(" ")
    oldNumber = updList.number
    oldTime = updList.createTime
    $("#number").val(updList.number)
    $("#time").val(time[0] + "T" + time[1])

    setTable();
}

function setTable(){
    $(".table_main").html("")
    let html_table = ""
    for(let i=0;i<updList.infoList.length;i++){
        if(updList.infoList[i].id==-1){
            continue;
        }
        html_table +=
        "<ul class='table_ul'>" +
            "<li class='table_li'><input class='li_checkbox' onchange='setCheckItem(this.value)' value='"+updList.infoList[i].id+"' type='checkbox'/></li>" +
            "<li class='table_li'>" +
                "<select class='li_select' onchange='updGameInfo(this.value)''>";

        for(let j=0;j<gameList.length;j++){
            if(gameList[j].name == updList.infoList[i].name && gameList[j].id == updList.infoList[i].id){
                html_table+=
                    "<option value='"+i+";"+gameList[j].id+"' selected='selected'>"+gameList[j].name+"</option>"
            }else{
                html_table+=
                    "<option value='"+i+";"+gameList[j].id+"'>"+gameList[j].name+"</option>"
            }
        }
        html_table +=
                "</select>" +
            "</li>" +
            "<li class='table_li'>"+updList.infoList[i].model.name+"</li>" +
        "</ul>"
    }
    $(".table_main").append(html_table)
}

function updNumber(e){
    updList.number = parseInt(e)
}
function updTime(e){
    updList.createTime = e
}


function setCheckItem(e){
    for(let i=0;i<checkItem.length;i++){
        if(checkItem[i] == e){
            checkItem.splice(i,1)
            return;
        }
    }
    checkItem.push(e)
}

function updGameInfo(e){
    let infoIndex = e.split(";")[0]
    let newId = e.split(";")[1]
    updList.infoList[infoIndex].space = newId * -1
    console.log("updList=>",updList)
}

function newUpd(){
    console.log(oldUpdList)
    updList.infoList.push({
        id : oldUpdList[0].id,
        name : oldUpdList[0].name,
        isNew : oldUpdList[0].isNew,
        isNewTime : oldUpdList[0].isNewTime,
        model : {
            id : oldUpdList[0].model.id,
            name : oldUpdList[0].model.name,
        },
        date : oldUpdList[0].date,
        space : oldUpdList[0].space
    })
    let index = updList.infoList.length-1
    updList.infoList[index].model.id = -1
    console.log(updList)
    setTable();
}

function delUpd(){
    for(let i=0;i<checkItem.length;i++){
        for(let j=0;j<updList.infoList.length;j++){
            if(checkItem[i]==updList.infoList[j].id){
                updList.infoList[i].space = -1
                $(".table_ul:eq("+j+")").remove();
                break;
            }
        }
    }
}

function save(){
    console.log(updList)
    $.ajax({
        type : "POST",
        url : "info",
        dataType: 'json',
        data : {
            type : "upd",
            updList : JSON.stringify(updList),
            oldNumber : oldNumber,
            oldTime : oldTime
        },
        success : function (data){
            if(data.res){
                alert("提交成功")
                $(window.parent.document).find(".list_table_tr_user:eq("+(updList.id+1)+") td:eq(1)").text(updList.number);
                $(window.parent.document).find(".list_table_tr_user:eq("+(updList.id+1)+") td:eq(3)").text(updList.createTime);
            }
        },
        err : function (err){
            console.log(err)
        }
    })
}