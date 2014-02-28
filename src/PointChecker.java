/**
 * Created by Modifier on 28.02.14.
 */
public class PointChecker
{
	public boolean checkPoint(float x, float y, float r)
	{
		if (x >= 0 && y >= 0) {
			return x*x + y*y <= r*r;
		}

		if (x < 0 && y > 0) {
			return x > -r / 2 && y < r;
		}

		if (x > 0 && y < 0) {
			return x - y < r / 2;
		}

		return false;
	}
}
