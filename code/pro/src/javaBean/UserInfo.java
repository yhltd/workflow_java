package javaBean;

import java.util.Date;
import java.util.List;

public class UserInfo {
    private int id;
    private long number;
    private List<GameInfo> infoList;
    private String createTime;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public long getNumber() {
        return number;
    }

    public void setNumber(long number) {
        this.number = number;
    }

    public List<GameInfo> getInfoList() {
        return infoList;
    }

    public void setInfoList(List<GameInfo> infoList) {
        this.infoList = infoList;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }
}
