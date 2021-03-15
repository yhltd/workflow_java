$(function (){
    var  list=[];
    var info = {
        number: 0,
        infoList: []
    }
    var options = [];
    $.ajax({
        type : "POST",
        contentType: "application/json",
        url : "getgreet",
        dataType: 'json',
        success : function (data){
            list = data
            getOption(list)
        },
        err : function (err){
            console.log(err)
        }
    })
    $(".insbutton").click(function (){
        //验证手机号码正则表达式
        if ($("input[name='greetname']:checked").length!=0
            &&$("input[name='tabnum']").val()!=""
            &&$("input[name='tabnum']").val()!="请填写电话号码"){
                var phone =  $("input[name='tabnum']").val();
                //console.log(phone)
                var regMobilePhone = new RegExp(/^1[34578]\d{9}$/);
                var regTelephone = new RegExp(/^((0\d{2,3})-?)(\d{7,8})(-(\d{3,}))?$/);
                if (!(regMobilePhone.test(phone) || regTelephone.test(phone))) {
                   alert("对不起，手机号码无效请添加正确的手机号码")
                }
                else {
                        info.number=$("input[name='tabnum']").val();
                        $.each($("input[name='greetname']:checked") ,function (i,n){
                            info.infoList.push({id : $(this).val()});
                        })
                    $.ajax({
                        type : "POST",
                        url : "insert",
                        dataType: 'json',
                        data : {
                            infoList : JSON.stringify(info)
                        },
                        success : function (data){
                            if (data.res>0){
                                alert("添加成功")
                            }
                            else {
                                alert("添加失败")
                            }
                        },
                        err : function (err){
                            alert("提交错误")
                            console.log(err)
                        }
                    })
                }
        }
        else {
            alert("对不起，您还有选项未填写，请填写")
        }
    })
})

function getOption(list){
    $.ajax({
        type : "POST",
        contentType: "application/json",
        url : "model",
        dataType: 'json',
        success : function (data){
            options = data
            setgeet(list)
        },
        err : function (err){
            console.log(err)
        }
    })
}

function  setgeet(list){
    var html="";
        $.each(options ,function (j,o){
            if (j==0){
                html+=o.name+":"
            }
            html+="<br/>"+o.name+":"
            $.each(list ,function (i,n){
                if (o.id==n.model.id){
                    html+="<input type='checkbox' style='width: auto; height: auto;margin-left: 15px;margin-right: 5px'  name='greetname' value='"+n.id+"'>"+n.name+"</input>";
                }
            })
        })
    $(".game").append(html);
}




