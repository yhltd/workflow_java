package service;

import dao.BaseDao;

import javaBean.GameInfo;
import javaBean.Model;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ListService{

    private BaseDao dao;

    public List<GameInfo> getList(){
        dao = new BaseDao();
        String sql = "select g.*,m.name as m_name from zheng_020826_gameInfo as g,zheng_020826_model as m where g.model_id = m.id order by g.id";
        ResultSet rs = dao.SelectAll(sql,null);

        List<GameInfo> list = new ArrayList<GameInfo>();
        try {
            while(rs.next()){
                GameInfo gameInfo = new GameInfo();
                gameInfo.setId(rs.getInt("id"));
                gameInfo.setName(rs.getString("name"));
                gameInfo.setSpace(rs.getInt("space"));
                gameInfo.setDate(rs.getDate("time"));
                Model model = new Model();
                model.setId(rs.getInt("model_id"));
                model.setName(rs.getString("m_name"));
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
