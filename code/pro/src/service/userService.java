package service;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import dao.BaseDao;
import javaBean.GameInfo;
import javaBean.Model;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

public class userService {

    private BaseDao dao;

    public boolean checkPwd(String pwd){
        dao = new BaseDao();
        String sql = "select pwd from zheng_020826_config where pwd = '"+pwd+"'";
        ResultSet rs = dao.SelectAll(sql,null);

        try{
            while (rs.next()){
                return rs.getString("pwd").equals(pwd);
            }
        }catch (SQLException e){
            e.printStackTrace();
        }finally {
            dao.closeAll(null,null,rs);
        }

        return false;
    }

    public int updPwd(String pwd){
        dao = new BaseDao();
        String sql = "update zheng_020826_config set pwd = '"+pwd+"'";
        int result = dao.AllUpdate(sql,null);
        return result;
    }

    public int updModel(String updList){
        dao = new BaseDao();
        Gson gson = new Gson();
        List<Model> modelList = gson.fromJson(updList, new TypeToken<List<Model>>(){}.getType());
        String sql = "";
        for(Model m : modelList){
            if(m.getId()<0){
                sql += "insert into zheng_020826_model(name) values('"+m.getName()+"');";
            }else{
                sql += "update zheng_020826_model set name = '"+m.getName()+"' where id = '"+m.getId()+"';";
            }

        }
        int result = dao.AllUpdate(sql,null);
        return result;
    }

    public int delModel(String delList){
        dao = new BaseDao();
        Gson gson = new Gson();
        List<Model> modelList = gson.fromJson(delList, new TypeToken<List<Model>>(){}.getType());
        String sql = "delete from zheng_020826_model where id in (";
        int i = 0;
        int is = 0;
        for(Model m : modelList){
            if(i == modelList.size()-1){
                sql += m.getId() + ")";
            }else{
                sql += m.getId() + ",";
            }
            if(m.getId()<0){
                is++;
            }
            i++;
        }
        if(is==modelList.size()){
            return 1;
        }
        int result = dao.AllUpdate(sql,null);
        return result;
    }

    public int updList(String updList){
        dao = new BaseDao();
        Gson gson = new Gson();
        List<GameInfo> gameInfoList = gson.fromJson(updList, new TypeToken<List<GameInfo>>(){}.getType());
        String sql = "";
        for(GameInfo g : gameInfoList){
            if(g.getId()<0){
                sql += "insert zheng_020826_gameInfo(name,space,model_id,time) values('"+g.getName()+"','"+g.getSpace()+"','"+g.getModel().getId()+"',getDate());";
            }else{
                sql += "update zheng_020826_gameInfo set name = '"+g.getName()+"',space = '"+g.getSpace()+"',model_id = '"+g.getModel().getId()+"' where id = '"+g.getId()+"';";
            }
        }
        int result = dao.AllUpdate(sql,null);
        return result;
    }

    public int delList(String delList){
        dao = new BaseDao();
        Gson gson = new Gson();
        List<GameInfo> gameInfoList = gson.fromJson(delList, new TypeToken<List<GameInfo>>(){}.getType());
        String sql = "delete from zheng_020826_gameInfo where id in (";
        int i = 0;
        int is = 0;
        for(GameInfo g : gameInfoList){
            if(i == gameInfoList.size()-1){
                sql += g.getId() + ")";
            }else{
                sql += g.getId() + ",";
            }
            if(g.getId()<0){
                is++;
            }
            i++;
        }
        if(is==gameInfoList.size()){
            return 1;
        }
        int result = dao.AllUpdate(sql,null);
        return result;
    }
}
