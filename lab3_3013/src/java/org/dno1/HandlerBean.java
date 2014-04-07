package org.dno1;

import java.util.ArrayList;
import java.util.List;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.SessionScoped;
import javax.faces.event.ActionEvent;
import javax.faces.event.ValueChangeEvent;
import javax.faces.model.SelectItem;

@ManagedBean(name = "handler", eager = true)
@SessionScoped
public class HandlerBean
{
    private final ArrayList<PointRecord> log = new ArrayList<PointRecord>();
    private Area area;
    
    private float currentX;
    private float currentY = 0;
    private float[] currentRadius;
    
    public HandlerBean()
    {
        area = new Area();
        area.addCircle(2, 1);
        area.addRectangle(4, -1, 0.5);
        area.addTriangle(1, 0.5, 1);
    }
    
    public ArrayList<PointRecord> getLog()
    {
        return log;
    }
    
    public float getCurrentY()
    {
        return currentY;
    }
    
    public void setCurrentY(float value)
    {
        currentY = value;
    }
    
    public float[] getCurrentRadius()
    {
        return currentRadius;
    }
    
    public void setCurrentRadius(float[] radius)
    {
        currentRadius = radius;
    }
    
    public float getCurrentX()
    {
        return currentX;
    }
    
    public void setCurrentX(ActionEvent event)
    {
        String value = event.getComponent().getAttributes().get("value").toString();
        Float floatValue = Float.valueOf(value);
        currentX = floatValue;
        
        addRecord();
    }
    
    private void addRecord()
    {
        for(float radius : currentRadius)
        {
            boolean result = area.checkPoint(currentX, currentY, radius);
            log.add(0, new PointRecord(currentX, currentY, radius, result));
        }
    }
}
