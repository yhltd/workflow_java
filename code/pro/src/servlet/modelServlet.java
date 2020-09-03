package servlet;

import javaBean.Model;
import service.modelService;
import util.JsonUtil;

import javax.servlet.annotation.WebServlet;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;


@WebServlet(name = "model", urlPatterns = { "/model" },asyncSupported = true)
public class modelServlet extends javax.servlet.http.HttpServlet {
    protected void doPost(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {

        modelService ms = new modelService();
        List<Model> list = ms.getList();


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