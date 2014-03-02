import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class AreaServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String s_x = request.getParameter("coord_x");
        String s_y = request.getParameter("coord_y");
        String s_r = request.getParameter("radius");

        float x = Float.valueOf(s_x);
        float y = Float.valueOf(s_y);
        float r = Float.valueOf(s_r);

        Area area = new Area(r);
        boolean result = area.check(x, y);

        PrintWriter writer = response.getWriter();
        writer.print("<html>");
        writer.print("<head>");
        writer.print("<title>Result</title>");
        writer.print("</head>");
        writer.print("<body>");
        writer.print("<table>");
        writer.print("<tr><td>x</td><td>y</td><td>r</td><td>result</td></tr>");
        writer.print(String.format("<tr><td>%s</td><td>%s</td><td>%s</td><td>%b</td></tr>", x, y, r, result));
        writer.print("</table>");
        writer.print("</body>");
        writer.print("</html>");
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
