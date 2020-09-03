package dao;

import java.sql.*;

public class BaseDao {
    private static Connection conn = null;
    private static final String driver = "com.microsoft.sqlserver.jdbc.SQLServerDriver";
    private static final String url = "jdbc:sqlserver://yhocn.cn;databasename=";
    private static final String database_name = "yao";
    private static final String user_name = "sa";
    private static final String password = "Lyh07910_001";


    static {
        try {
            Class.forName(driver);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
    /**
     * 获取Connection对象
     * @return conn 数据库的连接
     */
    public static Connection getConnection(){
        try {
            conn = DriverManager.getConnection(url+database_name,user_name,password);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return conn;
    }

    /**
     * 关闭所有对象
     * @param conn 数据库的连接
     * @param stmt Statement对象
     * @param rs 结果集
     */
    public void closeAll(Connection conn, Statement stmt, ResultSet rs){
        try {
            if (rs != null) {
                rs.close();
            }
            if (stmt != null) {
                stmt.close();
            }
            if (conn != null) {
                conn.close();
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally{
            rs = null;
            stmt = null;
            conn = null;
        }
    }


    /**
     * 查询数据库
     * @param sql 预编译的sql语句
     * @param obj 参数的字符串数组
     * @return 结果集
     */
    public ResultSet SelectAll(String sql,Object[] obj){
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        conn = getConnection();
        try {
            pstmt = conn.prepareStatement(sql);
            if(obj != null){
                if (pstmt != null) {
                    for (int i = 0; i < obj.length; i++) {
                        pstmt.setObject((i + 1), obj[i]);
                    }
                }
            }
            rs = pstmt.executeQuery();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return rs;
    }

    /**
     * 增删改数据库
     * @param sql 预编译的sql语句
     * @param obj 参数的字符串数组
     * @return 影响行数
     */
    public int AllUpdate(String sql,Object[] obj){
        PreparedStatement pstmt = null;
        conn = getConnection();
        int num = 0;
        try {
            pstmt = conn.prepareStatement(sql);
            if (obj != null) {
                if (pstmt != null) {
                    for (int i = 0; i < obj.length; i++) {
                        pstmt.setObject((i + 1), obj[i]);
                    }
                }
            }
            num = pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally{
            closeAll(conn,pstmt,null);
        }
        return num;
    }
}
