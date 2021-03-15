$(function (){
    var location = window.location.href.split('?')[1]
    if(location=="" || location==undefined){
        window.location.replace("/pro");
        return ;
    }
    var param = location.split("=")
    if(param[0]=="pwd" && (param[1]!="" || param[1]!=undefined)){
        $.ajax({
            type : "POST",
            url : "user",
            dataType: 'json',
            data : {
                action : 'selPwd',
                pwd : param[1]
            },
            success : function (data){
                if(data.res){
                    $(".mask").css("display","none");
                    if(data.is){
                        alert("欢迎管理员")
                    }
                    $(".updPwd_input").val(param[1])
                    $(".boby").css("height",window.innerHeight+window.innerHeight*0.2+"px")
                }else{
                    window.location.replace("/pro");
                }
            },
            err : function (err){
                console.error(err)
            }
        })
    }else{
        window.location.replace("/pro");
    }
    getOption();
    getUserList();
})

function delTable(className,delList){
    for(let i=0;i<delList.length;i++){
        var del_id = delList[i].id
        for(let j=0;j<$("."+className).length;j++){
            var value = parseInt($("."+className+":eq("+(j+1)+") td:eq(0) input").val())
            if(value==del_id){
                $("."+className+":eq("+(j+1)+")").remove();
            }
        }
    }
}

var options = []
var list = []

function getOption(){
    $.ajax({
        type : "POST",
        contentType: "application/json",
        url : "model",
        dataType: 'json',
        success : function (data){
            options = data
            setOption()
            getList();
        },
        err : function (err){
            console.error(err)
        }
    })
}

function setOption(){
    var htmlStr = "";
    for(var i=0;i<options.length;i++){
        htmlStr +=
        "<tr class='option_table_tr'>" +
            "<td class='option_table_td'>" +
                "<input class='option_table_td_checkBox' type='checkbox' value='"+options[i].id+"' onclick='javascript:choiceCheck_option(this.value)'/>" +
            "</td>" +
            "<td class='option_table_td'><input class='td_input' value='"+options[i].name+"'/></td>" +
        "</tr>"
    }
    $(".option_table").append(htmlStr)
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
            console.error(err)
        }
    })
}

function setList(){
    var htmlStr = ""
    for(var i=0;i<list.length;i++){
        htmlStr += "<tr class='list_table_tr'>" +
            "<td class='list_table_td'>" +
                "<input class='list_table_td_checkbox' type='checkbox' value='"+list[i].id+"' onclick='javascript:choiceCheck_list(this.value)'/>" +
            "</td>" +
            "<td class='list_table_td'>" +
                "<input class='td_input' value='"+list[i].name+"'/>" +
            "</td>" +
            "<td class='list_table_td'>" +
                "<input class='td_input' type='number' value='"+list[i].space+"'/>" +
            "</td>" +
            "<td class='list_table_td'>" +
                "<select class='list_table_td_option'>";
        for(var j=0;j<options.length;j++){
            if(options[j].id == list[i].model.id){
                htmlStr += "<option value='"+options[j].id+"' selected='selected'>"+options[j].name+"</option>"
            }else{
                htmlStr += "<option value='"+options[j].id+"'>"+options[j].name+"</option>"
            }

        }

        htmlStr += "</select>" +

            "</td>" +
        "</tr>"
    }

    $(".list_table").append(htmlStr)
}


function updPwd(){
    var newPwd = $(".updPwd_input").val()
    $.ajax({
        type : "POST",
        url : "user",
        dataType: 'json',
        data : {
            action : 'updPwd',
            pwd : newPwd
        },
        success : function (data){
            if(data.res>0){
                alert("修改成功")
                window.location.replace(window.location.href.split("?")[0]+"?pwd="+newPwd);
            }else{
                window.location.replace("/pro");
            }
        },
        err : function (err){
            console.error(err)
        }
    })
}


function new_option(){
    var htmlStr =  "<tr class='option_table_tr'>" +
        "<td class='option_table_td'>" +
        "<input class='option_table_td_checkBox' type='checkbox' value='-"+$(".option_table_tr").length+"' onclick='javascript:choiceCheck_option(this.value)'/>" +
        "</td>" +
        "<td class='option_table_td'><input class='td_input' value=''/></td>" +
        "</tr>"
    $(".option_table").append(htmlStr)
}


function save_option(){
    var updList = [];

    if($(".option_table_tr").length>options.length-1){
        for(var j=0;j<$(".option_table_tr").length-options.length-1;j++){
            var table_value2 = $(".option_table_tr:eq("+(j+1+options.length)+") td:eq(1) input").val();
            updList.push({id:-1,name:table_value2})
        }
    }

    for(var i=0;i<options.length;i++){
        var table_value = $(".option_table_tr:eq("+(i+1)+") td:eq(1) input").val();
        if(table_value!=options[i].name){
            updList.push({id:options[i].id,name:table_value})
        }
    }

    if(updList.length==0){
        alert("未修改")
        return;
    }

    $.ajax({
        type : "POST",
        url : "user",
        dataType: 'json',
        data : {
            action : 'updModel',
            updList : JSON.stringify(updList)
        },
        success : function (data){
            if(data.res>0){
                alert("保存成功")
                window.location.href = window.location.href
            }else{
                alert("保存失败")
            }
        },
        err : function (err){
            console.error(err)
        }
    })
}

var optionCheckItems= [];

function choiceCheck_option(e,i){
    if(optionCheckItems.length==0){
        optionCheckItems.push({id:parseInt(e),name:""})
    }else{
        for(var i=0;i<optionCheckItems.length;i++){
            if(optionCheckItems[i].id==e){
                optionCheckItems.splice(i,1)
                return ;
            }
        }
        optionCheckItems.push({id:parseInt(e),name:""})
    }
}

function del_option(){
    $.ajax({
        type : "POST",
        url : "user",
        dataType: 'json',
        data : {
            action : 'delModel',
            delList : JSON.stringify(optionCheckItems)
        },
        success : function (data){
            if(data.res>0){
                alert("删除成功")
                delTable("option_table_tr",optionCheckItems)
                optionCheckItems = []
            }else{
                alert("删除失败")
            }
        },
        err : function (err){
            console.error(err)
        }
    })
}


function save_list(){
    var updList = [];

    if($(".list_table_tr").length>list.length-1){
        for(var j=0;j<$(".list_table_tr").length-list.length-1;j++){
            var name = $(".list_table_tr:eq("+(j+1+list.length)+") td:eq(1) input").val();
            var space = $(".list_table_tr:eq("+(j+1+list.length)+") td:eq(2) input").val();
            var model_id = $(".list_table_tr:eq("+(j+1+list.length)+") td:eq(3) select").val();

            updList.push({id:-1,name : name,space : space!=''?space:0,model : {id : model_id,name : ''}})
        }
    }

    for(var i=0;i<list.length;i++){
        var name = $(".list_table_tr:eq("+(i+1)+") td:eq(1) input").val();
        var space = $(".list_table_tr:eq("+(i+1)+") td:eq(2) input").val();
        var model_id = $(".list_table_tr:eq("+(i+1)+") td:eq(3) select").val();

        if(name!=list[i].name || space!=list[i].space || model_id!= list[i].model.id){
            updList.push({id:list[i].id,name : name,space : space,model : {id : model_id,name : ''}})
        }
    }

    if(updList.length==0){
        alert("未修改")
        return
    }

    $.ajax({
        type : "POST",
        url : "user",
        dataType: 'json',
        data : {
            action : 'updList',
            updList : JSON.stringify(updList)
        },
        success : function (data){
            if(data.res>0){
                alert("保存成功")
            }else{
                alert("保存失败")
            }
        },
        err : function (err){
            console.error(err)
        }
    })
}

function new_list(){
    var htmlStr = "<tr class='list_table_tr'>" +
        "<td class='list_table_td'>" +
            "<input class='list_table_td_checkbox' type='checkbox' value='-"+$(".list_table_tr").length+"' onclick='javascript:choiceCheck_list(this.value)'/>" +
        "</td>" +
        "<td class='list_table_td'>" +
            "<input class='td_input' value=''/>" +
        "</td>" +
        "<td class='list_table_td'>" +
            "<input class='td_input' value=''/>" +
        "</td>" +
        "<td class='list_table_td'>" +
        "<select class='list_table_td_option'>";
    for(var j=0;j<options.length;j++){
        if(j==0){
            htmlStr += "<option value='"+options[j].id+"' selected='selected'>"+options[j].name+"</option>"
        }else{
            htmlStr += "<option value='"+options[j].id+"'>"+options[j].name+"</option>"
        }
    }
    htmlStr += "</select>" +
        "</td>" +
    "</tr>"

    $(".list_table").append(htmlStr)
}

var listCheckItems = [];

function choiceCheck_list(e){
    if(listCheckItems.length==0){
        listCheckItems.push({id:parseInt(e)})
    }else{
        for(var i=0;i<listCheckItems.length;i++){
            if(listCheckItems[i].id==e){
                listCheckItems.splice(i,1)
                return ;
            }
        }
        listCheckItems.push({id:parseInt(e)})
    }
}

function del_list(){
    $.ajax({
        type : "POST",
        url : "user",
        dataType: 'json',
        data : {
            action : 'delList',
            delList : JSON.stringify(listCheckItems)
        },
        success : function (data){
            if(data.res>0){
                alert("删除成功")
                delTable("list_table_tr",listCheckItems)
                listCheckItems = []
            }else{
                alert("删除失败")
            }
        },
        err : function (err){
            console.error(err)
        }
    })
}

var userList = []

function getUserList(){
    $.ajax({
        type : 'POST',
        url : 'info',
        data : {
            type : 'sel'
        },
        data_type : 'json',
        success : function (data){
            userList = JSON.parse(data)
            setUserList();
        }
    })
}

function setUserList(){
    var htmlStr = "";

    for(let i=0;i<userList.length;i++){
        htmlStr +=
            "<tr class='list_table_tr_user'>" +
                "<td class='list_table_td_user'>" +
                    "<input class='list_table_td_checkbox_user' type='checkbox' value='"+i+"' onclick='javascript:choiceCheck_userlist(this.value)'/>" +
                "</td>" +
                "<td class='list_table_td_user'>" +
                        userList[i].number +
                "</td>" +
                "<td class='list_table_td_user' >" +
                    "<input class='choiceGame_bt' id='Excel2' type='button' onclick='javascript:choiceGame("+i+")' value='点击查看'/>" +
                "</td>" +
                "<td class='list_table_td_user'>" +
                    userList[i].createTime +
                "</td>" +
            "</tr>"
    }

    $(".list_table_user").append(htmlStr)
}

function choiceGame(listIndex){
    var number = userList[listIndex].number;
    var time = userList[listIndex].createTime;
    $.ajax({
        type : 'POST',
        url : 'info',
        data : {
            type : 'getGame',
            number : number,
            time : time
        },
        data_type : 'json',
        success : function (data){
            let result = data.split(",")
            for(let i=1;i<$(".list_table_tr").length;i++){
                let value = parseInt($(".list_table_tr:eq("+i+") td:eq(0) input").val())
                for(let j=0;j<result.length;j++){
                    let id = parseInt(result[j]);
                    if(value==id){
                        $(".list_table_tr:eq("+i+")").css("display","table-row")
                        break;
                    }else{
                        $(".list_table_tr:eq("+i+")").css("display","none")
                    }
                }
            }

            show();
        }
    })
}

function show(){
    $(".mask").css({"display":"block","z_index":"50","opacity":"0.7"})
    $(".boby_right:eq(0)").css("z-index",51)
    $(".top_fun:eq(1)").css("display","none")
    $(".list_table_td_option").attr("disabled","disabled")
    $(".list_table_td input").attr("disabled","disabled")
}

function hide(){
    $(".mask").css({"display":"none","z_index":"0","opacity":"1"})
    $("#list").css({"z_index":"1"})
    $(".top_fun:eq(1)").css("display","flex")
    $(".list_table_td_option").removeAttr("disabled")
    $(".list_table_td input").removeAttr("disabled")
    for(let i=1;i<$(".list_table_tr").length;i++){
        $(".list_table_tr:eq("+i+")").css("display","table-row")
    }
}

infoCheckItems  = []
function choiceCheck_userlist(e){
    let index = parseInt(e);
    for(let i=0;i<infoCheckItems.length;i++){
        if(infoCheckItems[i].number==userList[i].number){
            infoCheckItems.splice(i,1)
            return ;
        }
    }
    infoCheckItems.push({
        number:userList[index].number,
        createTime:userList[index].createTime,
        index :index
    })
}

function del_list_user(){
    $.ajax({
        type : "POST",
        url : "info",
        dataType: 'json',
        data : {
            type : 'del',
            delList : JSON.stringify(infoCheckItems)
        },
        success : function (data){
            if(data.res>0){
                alert("删除成功")
                for(let i=0;i<infoCheckItems.length;i++){
                    let number = infoCheckItems[i].number
                    let time = infoCheckItems[i].createTime
                    for(let j=1;j<$(".list_table_tr_user").length;j++){
                        let number1 = $(".list_table_tr_user:eq("+j+") td:eq(0)").text();
                        let time1 = $(".list_table_tr_user:eq("+j+") td:eq(2)").text();
                        if(number==number1 && time==time1){
                            $(".list_table_tr_user:eq("+j+")").remove();
                        }
                    }
                }
                infoCheckItems = []
            }else{
                alert("删除失败")
            }
        },
        err : function (err){
            console.error(err)
        }
    })
}


function selInput(e){
    for(let i=1;i<$(".option_table_tr").length;i++){
        let value = $(".option_table_tr:eq("+i+") .option_table_td:eq(1) input").val();
        if(value.indexOf(e) == -1){
            $(".option_table_tr:eq("+i+")").css("display","none")
        }else{
            $(".option_table_tr:eq("+i+")").css("display","table-row")
        }
    }
}

function selInput_games(e){
    for(let i=1;i<$(".list_table_tr").length;i++){
        let value = $(".list_table_tr:eq("+i+") .list_table_td:eq(1) input").val();
        if(value.indexOf(e) == -1){
            $(".list_table_tr:eq("+i+")").css("display","none")
        }else{
            $(".list_table_tr:eq("+i+")").css("display","table-row")
        }
    }
}

function selInput_users(e){
    for(let i=1;i<$(".list_table_tr_user").length;i++){
        let value = $(".list_table_tr_user:eq("+i+") .list_table_td_user:eq(1)").text();
        if(value.indexOf(e) == -1){
            $(".list_table_tr_user:eq("+i+")").css("display","none")
        }else{
            $(".list_table_tr_user:eq("+i+")").css("display","table-row")
        }
    }
}

function upd_list_user(){
    if(infoCheckItems.length==0){
        alert("请选择某一订单")
        return;
    }else if(infoCheckItems.length>1){
        alert("只能修改单个订单")
        return;
    }


    iframe_d_open({
        id : "upd",
        title: "订单详情",//头部
        shadeClose: true, //点击遮罩层关闭
        area: {            //弹窗大小
            x: '600',
            y: '500'
        },
        content: 'updInfo.html',      //路径
        maxmin: false,      //最大化最小化按钮
        z_index: 99        //层级
    })

    let number = infoCheckItems[0].number;
    let time = infoCheckItems[0].createTime;
    $.ajax({
        type : 'POST',
        url : 'info',
        data : {
            type : 'getGame',
            number : number,
            time : time
        },
        data_type : 'json',
        success : function (data){
            let result = data.split(",")
            let gameList = [];
            for(let i=0;i<result.length;i++){
                for(let j=0;j<list.length;j++){
                    if(list[j].id==result[i]){
                        gameList.push(list[j])
                        break;
                    }
                }
            }
            let updList={
                id : infoCheckItems[0].index,
                number : number,
                infoList : gameList,
                createTime : time
            }
            $("#upd")[0].contentWindow.gameList = list
            $("#upd")[0].contentWindow.updList = updList
            $("#upd")[0].contentWindow.showList()
        }
    })
}

/*
* 增加数据方法
* */
function ins_list_user(){

    iframe_d_open({
        id : "upd",
        title: "新增用户信息",//头部
        shadeClose: true, //点击遮罩层关闭
        area: {            //弹窗大小
            x: '600',
            y: '500'
        },
        content: 'insert.jsp',      //路径
        maxmin: false,      //最大化最小化按钮
        z_index: 99        //层级
    })
}

function base64 (content) {
    return window.btoa(unescape(encodeURIComponent(content)));
}
/*
*@tableId: table的Id
*@fileName: 要生成excel文件的名字（不包括后缀，可随意填写）
*/
function tableToExcel(tableID,fileName){
    var number="";
    var timeqw="";
    for(let i=1;i<$(".list_table_tr_user").length;i++){
        var numnew=$(".list_table_tr_user:eq("+i+") .list_table_td_user:eq(1)").text()
        var timenew=$(".list_table_tr_user:eq("+i+") .list_table_td_user:eq(3)").text()
        if (i!=$(".list_table_tr_user").length-1){
            number=numnew+","+number
            timeqw=timenew+","+timeqw
        }else {
            number=number+numnew
            timeqw=timeqw+timenew
        }
    }
  inuserlist=[];
    $.ajax({
        type : "POST",
        url : "excel",
        dataType: 'json',
        data : {
            number : number,
            time:timeqw
        },
        success : function (data){
            inuserlist=data;
            getexcel(inuserlist,fileName);
        },
        err : function (err){
            console.log(err)
        }
    })
    function getexcel(inuserlist,fileName){
        alert("正在导出请稍等")
        var str = '<tr><td>电话号码</td><td>创建订单时间</td><td>游戏名称</td><td>内存</td></tr>';
        // 循环遍历，每行加入tr标签，每个单元格加td标签
        for(var i = 0 ; i < inuserlist.length ; i++ ){
            str=str+'<tr>';
            str=str+"<td style='vnd.ms-excel.numberformat:@'>"+inuserlist[i].number+"</td>";
            str=str+"<td style='vnd.ms-excel.numberformat:yyyy-mm-dd hh:mm:ss'>"+inuserlist[i].createTime+"</td>";
            str=str+"<td>"+inuserlist[i].infoList[i].name+"</td>";
            str=str+"<td>"+inuserlist[i].infoList[i].space+"</td>";
            str=str+'</tr>';
        }
        // Worksheet名
        const Sheet1= 'Sheet1'
        var table = document.getElementById(tableID);
        var excelContent = table.innerHTML;
        var excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
        excelFile += "<head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head>";
        excelFile += "<body><table>";
        excelFile += str;
        excelFile += "</table></body>";
        excelFile += "</html>";
        var link = "data:application/vnd.ms-excel;base64," + base64(excelFile);
        var a = document.createElement("a");
        a.download = fileName+".xls";
        a.href = link;
        a.click();
    }
}


