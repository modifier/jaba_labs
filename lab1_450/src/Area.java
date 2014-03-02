public class Area {
    private float r;
    public Area(float r){
        this.r = r;
    }

    public boolean check(float x, float y){
        if(x>0&&y<0){
            if(x*x+y*y<=r*r){
                return true;
            }else{
                return false;
            }
        }else if(x<0&&y>0){
            if(y-x*2<=r){
                return true;
            }else{
                return false;
            }
        }else if(x<=0&&y<=0){
            if(y>-r&&x>-r){
                return true;
            }else{
                return false;
            }
        }
        return false;
    }
}
