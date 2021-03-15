package servlet;

import javaBean.GameInfo;
import javaBean.Model;
import service.GameService;
import service.GetService;
import service.modelService;
import util.JsonUtil;

import javax.servlet.annotation.WebServlet;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;


@WebServlet(name = "game", urlPatterns = { "/game" },asyncSupported = true)
public class Gameservlet<String> extends javax.servlet.http.HttpServlet {
    protected void doPost(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {
        GameService gameService=new GameService();
        List<GameInfo> list = gameService.getList();
        System.out.println("list.get(1).getNum()");
        response.setContentType("text/html");
        response.setCharacterEncoding("utf-8");
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
