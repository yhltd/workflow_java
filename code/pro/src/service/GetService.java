package service;

import dao.BaseDao;
import javaBean.GameInfo;
import javaBean.Model;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class GetService {
    private BaseDao dao;
    public List<GameInfo> getgreet() {
        dao = new BaseDao();
        String sql = "SELECT name ,id ,model_id FROM zheng_020826_gameInfo;";
        ResultSet rs = dao.SelectAll(sql,null);
        List<GameInfo> list = new ArrayList<GameInfo>();
        try {
            while(rs.next()){
                GameInfo gameInfo=new GameInfo();
                Model model=new Model();
                gameInfo.setName(rs.getString("name"));
                gameInfo.setId(rs.getInt("id"));
                model.setId(rs.getInt("model_id"));
                gameInfo.setModel(model);
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
