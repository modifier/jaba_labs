package org.dno1;

public class PointRecord {
    private float x;
    private float y;
    private float radius;
    private boolean result;
    
    final float centerX = 250;
    final float centerY = 250;
    final float paddingX = 50;
    final float paddingY = 50;
    
    public PointRecord (float x, float y, float radius, boolean result)
    {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.result = result;
    }
    
    public float getX()
    {
        return x;
    }
    
    public float getY()
    {
        return y;
    }
    
    public float getRadius()
    {
        return radius;
    }
    
    public boolean getResult()
    {
        return result;
    }
    
    public float getConvertedX()
    {
        return centerX + (centerX - paddingX) * x / radius;
    }
    
    public float getConvertedY()
    {
        return centerY - (centerY - paddingY) * y / radius;
    }
}
