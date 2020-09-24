package servlet;

import javaBean.UserInfo;
import service.InfoService;
import util.JsonUtil;

import javax.servlet.annotation.WebServlet;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.IdentityHashMap;
import java.util.List;
import java.util.Map;


@WebServlet(name = "info", urlPatterns = { "/info" },asyncSupported = true)
public class InfoServlet extends javax.servlet.http.HttpServlet {

    private InfoService infoService;

    protected void doPost(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {
        String action = request.getParameter("type");
        String json = "";

        switch (action){
            case "new":
                json = newInfo(request.getParameter("infoList"));
                break;
            case "sel":
                json = selInfo();
                break;
            case "getGame":
                json = getGameInfo(request.getParameter("number"),request.getParameter("time"));
                break;
            case "del":
                json = delInfo(request.getParameter("delList"));
                break;
            case "upd":
                json = updInfo(request.getParameter("updList"),request.getParameter("oldNumber"),request.getParameter("oldTime"));
                break;
        }

        PrintWriter out = response.getWriter();
        out.print(json);
        out.flush();
        out.close();
    }

    protected void doGet(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {

    }

    public String newInfo(String infoList){
        infoService = new InfoService();
        int result = infoService.newInfo(infoList);
        Map<String,Boolean> map = new HashMap<>();
        map.put("res",result>0);
        JsonUtil ju = new JsonUtil();
        String json = ju.toJson(map);
        return json;
    }

    public String selInfo(){
        infoService = new InfoService();
        List<UserInfo> list = infoService.getList();
        JsonUtil ju = new JsonUtil();
        String json = ju.toJson(list);
        return json;
    }

    public String getGameInfo(String number,String time){
        infoService = new InfoService();
        String json = infoService.getGameInfo(number,time);
        return json;
    }

    public String delInfo(String delList){
        infoService = new InfoService();
        int result = infoService.delList(delList);
        Map<String,Boolean> map = new HashMap<>();
        map.put("res",result>0);
        JsonUtil ju = new JsonUtil();
        String json = ju.toJson(map);
        return json;
    }

    public String updInfo(String updList,String oldNumber,String oldTime){
        infoService = new InfoService();
        int result = infoService.updList(updList,oldNumber,oldTime);
        Map<String,Boolean> map = new HashMap<>();
        map.put("res",result>0);
        JsonUtil ju = new JsonUtil();
        String json = ju.toJson(map);
        return json;
    }
}
