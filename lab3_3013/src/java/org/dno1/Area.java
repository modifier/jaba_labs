package org.dno1;

public class Area
{
	private int circleQuarter;
	private double circleRadiusCoefficient;

	private int triangleQuarter;
	private double triangleX;
	private double triangleY;

	private int rectangleQuarter;
	private double rectangleX;
	private double rectangleY;

	public void addCircle (int quarter, double radiusCoefficient)
	{
		circleQuarter = quarter;
		circleRadiusCoefficient = radiusCoefficient;
	}

	public void addTriangle (int quarter, double x, double y)
	{
		triangleQuarter = quarter;
		triangleX = x;
		triangleY = y;
	}

	public void addRectangle (int quarter, double x, double y)
	{
		rectangleQuarter = quarter;
		rectangleX = x;
		rectangleY = y;
	}

	public boolean checkPoint (double x, double y, double radius)
	{
		int quarter = getQuarter(x, y);
		if (quarter == circleQuarter)      return checkCircle(x, y, radius);
		if (quarter == triangleQuarter)    return checkTriangle(x, y, radius);
		if (quarter == rectangleQuarter)   return checkRectangle(x, y, radius);
		return false;
	}

	private boolean isInsideRange(double value, double range1, double range2)
	{
		double min = Math.min(range1, range2);
		double max = Math.max(range1, range2);
		return min < value && max > value;
	}

	private boolean checkRectangle(double x, double y, double radius)
	{
		return isInsideRange(x, 0, rectangleX * radius) && isInsideRange(y, 0, rectangleY * radius);
	}

	private boolean checkTriangle(double x, double y, double radius)
	{
		double x1 = triangleX * radius;
		double y1 = 0;

		double x2 = 0;
		double y2 = triangleY * radius;

		double x3 = 0;
		double y3 = 0;

		if ((x - x1) * (y1 - y2) - (y - y1) * (x1 - x2) >= 0) {
			if ((x - x2) * (y2 - y3) - (y - y2) * (x2 - x3) >= 0) {
				if ((x - x3) * (y3 - y1) - (y - y3) * (x3 - x1) >= 0) {
					return true;
				}
			}
		}

		return false;
	}

	private boolean checkCircle(double x, double y, double radius)
	{
		double r = circleRadiusCoefficient * radius;
		return r*r > x*x + y*y;
	}

	public int getQuarter (double x, double y)
	{
		if (x >= 0 && y >= 0) return 1;
		if (x >= 0 && y < 0)  return 2;
		if (x < 0 && y < 0)   return 3;
		return 4;
	}
}
