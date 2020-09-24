package javaBean;

import java.util.Date;

public class GameInfo {

    private int isNewTime = 10;//天

    private int id;
    private String name;
    private int space;
    private boolean isNew;
    private Date date;
    private Model model;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getSpace() {
        return space;
    }

    public void setSpace(int space) {
        this.space = space;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        if(!date.equals("")){
            long time_old = date.getTime();
            long time_now = new Date().getTime();
            this.isNew = !(time_old+this.isNewTime*86400000<time_now);
            this.date = date;
        }
    }

    public Model getModel() {
        return model;
    }

    public void setModel(Model model) {
        this.model = model;
    }
}
