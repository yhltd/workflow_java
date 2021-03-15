package servlet;

import javaBean.GameInfo;
import javaBean.UserInfo;
import service.Excel;
import service.ListService;
import util.JsonUtil;

import javax.servlet.annotation.WebServlet;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Arrays;
import java.util.List;


@WebServlet(name = "excel", urlPatterns = { "/excel" },asyncSupported = true)
public class excleServlet extends javax.servlet.http.HttpServlet {
    protected void doPost(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {
        Excel excel=new Excel();
        String[] unmbers = request.getParameter("number").split(",");
        String[] time = request.getParameter("time").split(",");
        System.out.println(unmbers.length);
        List<UserInfo> userlist=excel.getList(unmbers,time);
        response.setContentType("text/html");
        response.setCharacterEncoding("utf-8");
        request.setCharacterEncoding("utf-8");
        PrintWriter out = response.getWriter();
        JsonUtil ju = new JsonUtil();
        String result = ju.toJson(userlist);
        out.print(result);
        out.flush();
        out.close();
    }

    protected void doGet(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {

    }
}
