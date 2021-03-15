package servlet;

import javaBean.GameInfo;
import service.GetService;
import util.JsonUtil;

import javax.servlet.annotation.WebServlet;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;



@WebServlet(name = "getgreet", urlPatterns = { "/getgreet" },asyncSupported = true)
public class Getgreetservlet<String> extends javax.servlet.http.HttpServlet {

    private GetService getService;

    protected void doPost(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {
        getService = new GetService();
        List<GameInfo> list=getService.getgreet();
        response.setContentType("text/html;charset=utf-8");
        PrintWriter out = response.getWriter();
        JsonUtil ju = new JsonUtil();
        java.lang.String result = ju.toJson(list);
        out.print(result);
        out.flush();
        out.close();
    }
    protected void doGet(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {

    }
}
