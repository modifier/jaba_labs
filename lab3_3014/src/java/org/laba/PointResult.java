package org.laba;

public class PointResult {
    public double x;
    public double y;
    public double r;
    public boolean result;
    
    public double getX() { return x; }
    public double getY() { return y; }
    public double getR() { return r; }
    public boolean getResult() { return result; }
    
    public int getLeft(){
        int radius = 80;
        return (int)(x * radius / r);
    }
    
    public int getTop(){
        int radius = 80;
        return (int)(-y * radius / r);
    }
}
