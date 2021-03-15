$(function(){
    getOption()
})

var options = []
var list = []
var info = {
    number: 0,
    infoList: []
}

function getOption(){
    $.ajax({
        type : "POST",
        contentType: "application/json",
        url : "model",
        dataType: 'json',
        success : function (data){
            options = data
            setOption()
            getList()
        },
        err : function (err){
            console.log(err)
        }
    })
}

function getList(){
    $.ajax({
        type : "POST",
        contentType: "application/json",
        url : "list",
        dataType: 'json',
        success : function (data){
            list = data
            setList()
        },
        err : function (err){
            console.log(err)
        }
    })
}

function setList(){
    var htmlStr = ""
    //循环添加表格信息
    for(var j=0;j<list.length;j++){
        var space = Math.round(list[j].space/1024*10)/10 + "G"
        htmlStr+="<tr class='table_tr'>" +
            "<td class='table_td'><input class='td_checkbox' onclick='javascript:choiceBox(this.value)' type='checkbox' value='"+list[j].id+":"+list[j].name+"'/></td>"+
            "<td class='table_td'>"
        //新游戏添加New
        if(!list[j].isNew){
            htmlStr += list[j].name+"</td>";
        }else{
            htmlStr += "<span class='td_new'>New</span>" + list[j].name+"</td>";
        }
        htmlStr += "<td class='table_td'>"+space+"</td>"+"<td class='table_td'>"+list[j].num+"</td>"+
            "</tr>";
    }
    $(".table_boby").append(htmlStr)
    choiceItem(options[0].id)
}

function setOption(){
    var htmlStr = "";
    //循环添加选中平台
    for(var i=0;i<options.length;i++){
        htmlStr += "<div class='option_div'>"
        if(i==0){
            htmlStr += "<input type='radio' class='option_item' onclick='choiceItem(this.value)' name='option_item' value='"+options[i].id+"' checked></input>"
        }else{
            htmlStr += "<input type='radio' class='option_item' onclick='choiceItem(this.value)' name='option_item' value='"+options[i].id+"'></input>"
        }
        htmlStr += "<label class='option_lable'>"+options[i].name+"</label></div>";

    }
    $(".top_boby_option").append(htmlStr)
}

//选择游戏平台
function choiceItem(e){

    //选择的平台id  在setOption方法加入的click事件+this.value
    var value = parseInt(e);
    //清空选择
    info.infoList = [];
    //清空合计
    $(".sumSpace_text").text("共计：0G")

    for(var i=1;i<$("tr").length;i++){
        //取消checkbox选中状态
        $(".td_checkbox:eq("+(i-1)+")").prop("checked", false);
        //循环获取checkbox的id和name
        var input_value = $(".td_checkbox:eq("+(i-1)+")").val()
        var id = input_value.split(":")[0]
        var name = input_value.split(":")[1]

        //display：none不属于选中平台的游戏
        if(list[i-1].name == name && list[i-1].model.id!=value){
            $("tr:eq("+i+")").css("display","none")
        }else{
            $("tr:eq("+i+")").css("display","table-row")
        }
    }
}

function choiceBox(e){
    var id = e.split(":")[0];
    var name = e.split(":")[1]
    if(info.infoList.length!=0){
        for(var i=0;i<info.infoList.length;i++){
            if(info.infoList[i].id==id && info.infoList[i].name==name){
                info.infoList.splice(i,1)
                sumSpace()
                return ;
            }
        }
        info.infoList.push({id : id,name : name})
    }else{
        info.infoList.push({id : id,name : name})
    }
    sumSpace()
}

function sumSpace(){
    $(".sumSpace_text").text("")
    let sumSpace = 0;
    for(let i=0;i<list.length;i++){
        for(let j=0;j<info.infoList.length;j++){
            if(list[i].name == info.infoList[j].name && list[i].id == info.infoList[j].id){
                sumSpace += list[i].space
                break;
            }
        }
    }
    sumSpace = Math.round(sumSpace/1024*10)/10 + "G"

    $(".sumSpace_text").text("共计："+sumSpace)
}

function go(){
    if(info.infoList.length==0){
        alert("未选择游戏")
        return;
    }
    openGO()
}

function getPwd(e){
    info.pwd = e;
}

function openGO(){
    $(".mask").css("display","block")
    $("#go_div").css("display","block")
}

function closeGo(){
    $(".mask").css("display","none")
    $("#go_div").css("display","none")
}

function setInfo(){
    info.number = $(".form_input").val();
    var regMobilePhone = new RegExp(/^1[34578]\d{9}$/);
    var regTelephone = new RegExp(/^((0\d{2,3})-?)(\d{7,8})(-(\d{3,}))?$/);
    if (!(regMobilePhone.test(info.number) || regTelephone.test(info.number))) {
        alert("对不起，手机号码无效请添加正确的手机号码")
    }
    else {
        $.ajax({
            type : "POST",
            url : "info",
            dataType: 'json',
            data : {
                type : "new",
                infoList : JSON.stringify(info)
            },
            success : function (data){
                if(data.res){
                    alert("提交成功")
                    closeGo()
                    $(".table_boby").empty()
                    var fristtr="<tr class=\"table_tr_header\">" +
                        "                <th class=\"table_th\">选择游戏</th>" +
                        "                <th class=\"table_th\">游戏名</th>" +
                        "                <th class=\"table_th\">容量</th>" +
                        "                <th class=\"table_th\">游戏下载次数</th>" +
                        "            </tr>"
                    $(".table_boby").append(fristtr)
                    getOption()
                }else{
                    alert("提交失败")
                }
            },
            err : function (err){
                alert("提交错误")
                console.log(err)
            }
        })
    }
}

function toOld(){
    iframe_d_open({
        id : "old",
        title: "历史记录",//头部
        shadeClose: true, //点击遮罩层关闭
        area: {            //弹窗大小
            x: '600',
            y: '500'
        },
        content: 'old.html',      //路径
        maxmin: false,      //最大化最小化按钮
        z_index: 99        //层级
    })
}
