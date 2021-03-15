<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2021/3/3
  Time: 17:54
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="static/js/jquery.js" type="text/javascript"></script>
    <script src="static/js/Insert.js" type="text/javascript" charset="utf-8"></script>
    <link rel="stylesheet" href="static/css/insertuser.css" type="text/css"/>
    <link rel="stylesheet" href="static/iframe_d/iframe_d.css" type="text/css">
</head>
<body>
    <div id="insethtml">
    <table class="ins_table" style="width: 100%">
        <tr class="ins_tr">
            <td class="ins_td">
                请输入用户名：<input id="username"  type="text" value="请输入用户名">
            </td>
        </tr>
        <tr class="ins_tr">
            <td class="ins_td">
                请输选择游戏名称：
                <div class="game" style="width: 100%;margin-top: 0px;height:200px;overflow-y: scroll"></div>
            </td>
        </tr>
        <tr class="ins_tr">
            <td class="ins_td">
                请填写电话号码:
                <input name="tabnum" type="text" value="请填写电话号码">
            </td>
        </tr>
        <tr>
            <td style="text-align: center">
                <input class="insbutton" type="button"  value="确定">
            </td>
        </tr>
    </table>
    </div>
</body>
</html>
