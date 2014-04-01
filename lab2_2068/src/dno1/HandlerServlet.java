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

public class HandlerServlet extends HttpServlet
{
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		String PositionX = request.getParameter("position_x");
		String PositionY = request.getParameter("position_y");
		String Radius = request.getParameter("radius");
		String Action = request.getParameter("action");

		float y, r, x;

		try
		{
			y = Float.valueOf(PositionY);
			r = Float.valueOf(Radius);
			x = Float.valueOf(PositionX);

			if (r < 0)
			{
				throw new Exception();
			}
		}
		catch (Exception e)
		{
			response.setStatus(400);
			request.getRequestDispatcher("/bad_request.jsp").forward(request, response);
			return;
		}

		request.setAttribute("x", PositionX);
		request.setAttribute("y", PositionY);
		request.setAttribute("r", Radius);
		request.setAttribute("result", Boolean.toString(checkPoint(x, y, r)));
		request.setAttribute("action", Action);
		request.getRequestDispatcher("/handle.jsp").forward(request, response);
	}

	private boolean checkPoint(float x, float y, float r)
	{
		if (x >= 0 && y >= 0)
		{
			return x*x + y*y <= r*r;
		}

		if (x < 0 && y >= 0)
		{
			return x > -r / 2 && y < r;
		}

		if (x < 0 && y < 0)
		{
			return - y / 2 - x < r / 2;
		}

		return false;
	}
}
