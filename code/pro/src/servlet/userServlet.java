package servlet;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import javaBean.Model;
import service.userService;
import util.JsonUtil;

import javax.servlet.annotation.WebServlet;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@WebServlet(name = "user", urlPatterns = { "/user" },asyncSupported = true)
public class userServlet extends javax.servlet.http.HttpServlet {

    private userService us;
    private static boolean isFirst = true;

    protected void doPost(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {

        String action = request.getParameter("action");
        String json = "";

        switch (action){
            case "selPwd":
                json = selPwd(request.getParameter("pwd"));
                break;
            case "updPwd":
                json = updPwd(request.getParameter("pwd"));
                break;
            case "updModel":
                json = updModel(request.getParameter("updList"));
                break;
            case "delModel":
                json = delModel(request.getParameter("delList"));
                break;
            case "updList":
                json = updList(request.getParameter("updList"));
                break;
            case "delList":
                json = delList(request.getParameter("delList"));
                break;
            default:
                response.sendError(404);
                return;
        }

        PrintWriter out = response.getWriter();
        out.print(json);
        out.flush();
        out.close();
    }

    protected void doGet(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {

    }

    private String selPwd(String pwd){
        us = new userService();
        Boolean result = us.checkPwd(pwd);
        Map<String,Boolean> map = new HashMap<>();
        map.put("res",result);
        map.put("is",isFirst);
        JsonUtil ju = new JsonUtil();
        isFirst = false;
        return ju.toJson(map);
    }

    private String updPwd(String pwd){
        us = new userService();
        int result = us.updPwd(pwd);
        Map<String,Integer> map = new HashMap<>();
        map.put("res",result);
        JsonUtil ju = new JsonUtil();
        return ju.toJson(map);
    }

    private String updModel(String updList){
        us = new userService();
        int result = us.updModel(updList);
        Map<String,Integer> map = new HashMap<>();
        map.put("res",result);
        JsonUtil ju = new JsonUtil();
        return ju.toJson(map);
    }

    private String delModel(String delList){
        us = new userService();
        int result = us.delModel(delList);
        Map<String,Integer> map = new HashMap<>();
        map.put("res",result);
        JsonUtil ju = new JsonUtil();
        return ju.toJson(map);
    }

    private String updList(String updList){
        us = new userService();
        int result = us.updList(updList);
        Map<String,Integer> map = new HashMap<>();
        map.put("res",result);
        JsonUtil ju = new JsonUtil();
        return ju.toJson(map);
    }

    private String delList(String delList){
        us = new userService();
        int result = us.delList(delList);
        Map<String,Integer> map = new HashMap<>();
        map.put("res",result);
        JsonUtil ju = new JsonUtil();
        return ju.toJson(map);
    }
}
