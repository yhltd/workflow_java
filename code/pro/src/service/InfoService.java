package service;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import dao.BaseDao;
import javaBean.GameInfo;
import javaBean.Model;
import javaBean.UserInfo;
import util.DateAdapter;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.*;

public class InfoService {

    private BaseDao dao;

    public int newInfo(String infoList){
        dao = new BaseDao();
        Gson gson = new Gson();
        UserInfo userInfo = gson.fromJson(infoList, UserInfo.class);

        SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String time = sdf1.format(new Date());

        String sql = "";
        for(GameInfo gameInfo : userInfo.getInfoList()){
            sql += "insert into zheng_020826_userInfo(number,game_id,time) values('"+userInfo.getNumber()+"','"+gameInfo.getId()+"','"+time+"');"+
            "insert into ";
        }

        int result = dao.AllUpdate(sql,null);
        return result;
    }


    public List<UserInfo> getList(){
        dao = new BaseDao();
        String sql = "select number,convert(varchar(100), time,20) as time  from zheng_020826_userInfo GROUP BY number,time";

        List<UserInfo> list = new ArrayList<>();

        ResultSet rs = null;
        try{

            rs = dao.SelectAll(sql,null);
            while (rs.next()) {
                UserInfo userInfo = new UserInfo();
                userInfo.setNumber(Long.parseLong(rs.getString("number")));
                userInfo.setCreateTime(rs.getString("time"));
                list.add(userInfo);
            }
        }catch (Exception ex){
            ex.printStackTrace();
        }finally {
            dao.closeAll(null,null,rs);
        }
        return list;
    }

    public String getGameInfo(String number,String time){
        dao = new BaseDao();
        String sql = "select game_id from zheng_020826_userInfo where number = '"+number+"' and time = '"+time+"' GROUP BY game_id";
        ResultSet rs = dao.SelectAll(sql,null);

        String result = "";
        try {
            while(rs.next()){
                result += rs.getString("game_id")+",";
            }
            result = result.substring(0, result.length() - 1);
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            dao.closeAll(null,null,rs);
        }
        return result;
    }

    public List<UserInfo> getHistoryInfo(String number){
        dao = new BaseDao();
        String sql = "select g.name,(select name from zheng_020826_model where id = g.model_id) as model,u.[time] from zheng_020826_gameInfo as g LEFT JOIN zheng_020826_userInfo as u on g.id = u.game_id where u.number = "+number;
        ResultSet rs = dao.SelectAll(sql,null);
        List<UserInfo> uList = new ArrayList<>();

        try {
            while(rs.next()){
                UserInfo userInfo = new UserInfo();
                userInfo.setCreateTime(rs.getString("time"));

                List<GameInfo> gameInfoList = new ArrayList<>();
                GameInfo gameInfo = new GameInfo();
                gameInfo.setName(rs.getString("name"));

                Model model = new Model();
                model.setName(rs.getString("model"));

                gameInfo.setModel(model);
                gameInfoList.add(gameInfo);
                userInfo.setInfoList(gameInfoList);
                uList.add(userInfo);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            dao.closeAll(null,null,rs);
        }
        return uList;
    }


    public int delList(String delList){
        dao = new BaseDao();
        Gson gson = new Gson();
        List<UserInfo> userInfoList = gson.fromJson(delList, new TypeToken<List<UserInfo>>(){}.getType());


        String numberStr = "";
        String timeStr = "";

        for(UserInfo userInfo : userInfoList){
            numberStr += userInfo.getNumber()+",";
            String[] times = userInfo.getCreateTime().split(" ");
            timeStr += "'"+times[0]+"T"+times[1]+"',";
        }
        numberStr = numberStr.substring(0,numberStr.length()-1);
        timeStr = timeStr.substring(0,timeStr.length()-1);

        String sql = "delete from zheng_020826_userInfo where number in ("+numberStr+") and time in ("+timeStr+")";
        int result = dao.AllUpdate(sql,null);
        return result;
    }

    public int updList(String updList,String oldNumber,String oldTime){
        dao = new BaseDao();
        Gson gson = new GsonBuilder().registerTypeAdapter(Date.class, new DateAdapter()).create();
        UserInfo userInfo = gson.fromJson(updList,UserInfo.class);

        String sql = "update zheng_020826_userInfo set ";
        int lengthSql = sql.length();
        if(userInfo.getNumber() != Long.parseLong(oldNumber)){
            sql += "number = "+userInfo.getNumber()+",";
        }
        if(!userInfo.getCreateTime().equals(oldTime)){
            sql += "time = '"+userInfo.getCreateTime()+"',";
        }
        if(sql.length()==lengthSql){
            sql = "";
        }else{
            sql = sql.substring(0,sql.length()-1);
            sql += " where number = "+oldNumber+" and time = '"+oldTime+"';";
        }

        for(GameInfo gameInfo : userInfo.getInfoList()){
            if(gameInfo.getSpace()==-1){
                sql += "delete from zheng_020826_userInfo where game_id = "+gameInfo.getId()+" and number = "+userInfo.getNumber()+";";
            }else if(gameInfo.getModel().getId()==-1){
                if(gameInfo.getSpace()<0){
                    sql += "insert into zheng_020826_userInfo(game_id,time,number) values('"+gameInfo.getSpace()*-1+"','"+userInfo.getCreateTime()+"','"+userInfo.getNumber()+"');";
                }else{
                    sql += "insert into zheng_020826_userInfo(game_id,time,number) values('"+gameInfo.getId()+"','"+userInfo.getCreateTime()+"','"+userInfo.getNumber()+"');";
                }
            }else if(gameInfo.getSpace()<0){
                sql += "update zheng_020826_userInfo set game_id = "+gameInfo.getSpace()*-1+" where game_id = "+gameInfo.getId()+" and number = "+userInfo.getNumber()+";";
            }
        }
        int result = dao.AllUpdate(sql,null);
        return result;
    }
}
