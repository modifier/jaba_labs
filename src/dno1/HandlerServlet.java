package dno1;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Modifier on 28.02.14.
 */
public class HandlerServlet extends HttpServlet
{
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		String[] PositionX = request.getParameterValues("position_x");
		String PositionY = request.getParameter("position_y");
		String Radius = request.getParameter("radius");

		float y, r;
		float[] x;

		try
		{
			y = Float.valueOf(PositionY);
			r = Float.valueOf(Radius);

			x = new float[PositionX.length];
			for (int i = 0; i < PositionX.length; i++) {
				x[i] = Float.valueOf(PositionX[i]);
			}

			if (r < 0) {
				throw new Exception();
			}
		}
		catch (Exception e)
		{
			response.setStatus(400);
			request.getRequestDispatcher("/bad_request.jsp").forward(request, response);
			return;
		}

		request.setAttribute("table", prepareArray(x, y, r));
		request.getRequestDispatcher("/handle.jsp").forward(request, response);
	}

	private List<Map<String, String>> prepareArray(float[] x, float y, float r)
	{
		List<Map<String, String>> result = new ArrayList<Map<String, String>>();
		for (float aX : x)
		{
			Map<String, String> obj = new HashMap<String, String>();
			obj.put("x", Float.toString(aX));
			obj.put("y", Float.toString(y));
			obj.put("r", Float.toString(r));
			obj.put("hit", Boolean.toString(checkPoint(aX, y, r)));

			result.add(obj);
		}

		return result;
	}

	private boolean checkPoint(float x, float y, float r)
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
