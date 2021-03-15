package service;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import dao.BaseDao;
import javaBean.GameInfo;
import javaBean.Model;
import javaBean.UserInfo;
import servlet.userServlet;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class Excel {
    private BaseDao dao;
    public List<UserInfo> getList(String[] unmbers,String[] times) {
        dao = new BaseDao();
        List<UserInfo> newuserlList=new ArrayList<UserInfo>();
        List<GameInfo> Gamelist=new ArrayList<GameInfo>();
        String sql="";

        for (int i=0;i<unmbers.length-1;i++){
            sql = "SELECT u.number as number,u.time as time ,g.name as name ,g.space as space FROM zheng_020826_userInfo u,zheng_020826_gameInfo g WHERE u.game_id=g.id and u.number ='"+unmbers[i]+"' and u.time='"+times[i]+"';";
            ResultSet rs = dao.SelectAll(sql, null);
            UserInfo userInfo = new UserInfo();
            GameInfo gameInfo = new GameInfo();
            try {
                while (rs.next()) {
                    userInfo.setNumber(rs.getInt("number"));
                    userInfo.setCreateTime(rs.getString("time"));
                    gameInfo.setName(rs.getString("name"));
                    gameInfo.setSpace(rs.getInt("space"));
                    Gamelist.add(gameInfo);
                    userInfo.setInfoList(Gamelist);
                    newuserlList.add(userInfo);
                }
            } catch (SQLException e) {
                e.printStackTrace();
            } finally {
                dao.closeAll(null, null, rs);
            }
        }
        return newuserlList;
        }
}
