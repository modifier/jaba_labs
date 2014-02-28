import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

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

		Table table = new Table(x, y, r);
		table.setChecker(new PointChecker());

		request.setAttribute("table", table);
		request.getRequestDispatcher("/handle.jsp").forward(request, response);
	}
}
