package service;

import dao.BaseDao;
import javaBean.GameInfo;
import javaBean.Model;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class GameService {
    private BaseDao dao;
    public List<GameInfo> getList() {
        dao = new BaseDao();
        String sql = "select name ,amount from zheng_020826_gameInfo  order by amount";
        ResultSet rs = dao.SelectAll(sql,null);
        List<GameInfo> list = new ArrayList<GameInfo>();
        try {
            while(rs.next()){
                GameInfo gameInfo = new GameInfo();
                gameInfo.setName(rs.getString("name"));
                gameInfo.setNum(rs.getInt("amount"));
                list.add(gameInfo);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            dao.closeAll(null,null,rs);
        }
        return list;
    }
}
