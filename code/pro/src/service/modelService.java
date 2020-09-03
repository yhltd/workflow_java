package service;

import dao.BaseDao;
import javaBean.GameInfo;
import javaBean.Model;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class modelService {
    private BaseDao dao;

    public List<Model> getList(){
        dao = new BaseDao();
        String sql = "select * from zheng_020826_model order by id";
        ResultSet rs = dao.SelectAll(sql,null);

        List<Model> list = new ArrayList<Model>();
        try {
            while(rs.next()){
                Model model = new Model();
                model.setId(rs.getInt("id"));
                model.setName(rs.getString("name"));
                list.add(model);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            dao.closeAll(null,null,rs);
        }
        return list;
    }
}
