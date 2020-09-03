package servlet;

import javaBean.GameInfo;
import service.ListService;
import util.JsonUtil;

import javax.servlet.annotation.WebServlet;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;


@WebServlet(name = "list", urlPatterns = { "/list" },asyncSupported = true)
public class listServlet extends javax.servlet.http.HttpServlet {
    protected void doPost(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {

        ListService ls = new ListService();
        List<GameInfo> list = ls.getList();


        response.setContentType("text/html");
        response.setCharacterEncoding("utf-8");
        PrintWriter out = response.getWriter();
        JsonUtil ju = new JsonUtil();
        String result = ju.toJson(list);
        out.print(result);
        out.flush();
        out.close();
    }

    protected void doGet(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {

    }
}
