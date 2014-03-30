<%--
  Created by IntelliJ IDEA.
  User: Modifier
  Date: 28.02.14
  Time: 3:27
  To change this template use File | Settings | File Templates.
--%>
<%@ page import="java.util.Map" %>
<%@ page import="java.util.List" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<table class="result-table">
    <thead>
        <th>x</th>
        <th>y</th>
        <th>radius</th>
        <th>is hit</th>
    </thead>
    <tbody>
    <% for (Map<String, String> row : (List<Map<String,String>>)request.getAttribute("table")) { %>
        <tr>
            <td><%=row.get("x")%></td>
            <td><%=row.get("y")%></td>
            <td><%=row.get("r")%></td>
            <td><%=row.get("hit")%></td>
        </tr>
    <% } %>
    </tbody>
</table>