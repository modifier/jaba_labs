package org.laba;

import java.util.ArrayList;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.SessionScoped;
import javax.faces.event.ActionEvent;

@ManagedBean(name="checker")
@SessionScoped
public class AreaChecker {    
    private ArrayList<PointResult> results = new ArrayList<PointResult>();
    
    @ManagedProperty(value="#{x}")
    private double x = 0;
    
    public void setX(double value)
    {
        x = value;
    }
    
    public double getX()
    {
        return x;
    }
    
    @ManagedProperty(value="#{y}")
    private double y = 0;
    
    public void setY(double value)
    {
        y = value;
    }
    
    public double getY()
    {
        return y;
    }
    
    @ManagedProperty(value="#{r}")
    private double r = 3;
    
    public void setR(double value)
    {
        r = value;
    }
    
    public double getR()
    {
        return r;
    }
    
    public void handle(ActionEvent event) {
        PointResult point = new PointResult();
        point.x = x;
        point.y = y;
        point.r = r;
        point.result = checkPoint(x, y, r);
        results.add(point);
    }
    
    private boolean checkPoint(double x, double y, double r)
    {
        return true;
    }
}
