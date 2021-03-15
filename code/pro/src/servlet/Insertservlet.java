package servlet;

import javaBean.UserInfo;
import service.InfoService;
import util.JsonUtil;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@WebServlet(name = "inset", urlPatterns = { "/insert" },asyncSupported = true)
public class Insertservlet extends javax.servlet.http.HttpServlet {


    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");
        String infoList= request.getParameter("infoList");
//        调用方法保存到数据库中
        InfoService infoService=new InfoService();
        int res=infoService.newInfo(infoList);
        Map<String,Integer> map = new HashMap<>();
        map.put("res",res);
        JsonUtil ju = new JsonUtil();
        String result = ju.toJson(map);
        PrintWriter out = response.getWriter();
        out.print(result);
        out.flush();
        out.close();
    }

    protected void doGet(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {

    }
}
