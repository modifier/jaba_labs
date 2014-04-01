<%-- Created by IntelliJ IDEA. --%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <title>Lab # 2 Programming Web Applications</title>
    <meta charset="utf-8" />
    <script src="js/eaquery.js"></script>
    <script src="js/checkbox_validator.js"></script>
    <script src="js/text_validator.js"></script>
    <script src="js/problem_line.js"></script>
    <script src="js/main.js"></script>
    <link href="css/style.css" rel="stylesheet" />
</head>
<body>
<header>
    <h1>Лабораторная работа № 2 по программированию интернет-приложений</h1>
    <div class="author">Амирасланов Евгений Шакирович, Кулатова Наталья Александровна, группа 4125, вариант 2068</div>
</header>
<div id="errors"></div>
<svg width="500" height="500" id="svg_map">
    <rect width="200" height="100" x="50" y="150" style="fill:#3399FF" />
    <polygon points="250,250 250,50 350,250" style="fill:#3399FF" />
    <path d="M450,250 A 200,200 0 0,1 250,450 L 250,250" style="fill:#3399FF"></path>
    <line x1="250" y1="0" x2="250" y2="500" stroke="black" stroke-width="2" />
    <line x1="0" y1="250" x2="500" y2="250" stroke="black" stroke-width="2" />
</svg>
<form action="${pageContext.request.contextPath}/handle" method="post" name="duck" id="duck_form">
    <div class="form-line position_x">
        <div class="label">X position:</div>
        <ul class="value" id="position_x">
            <% for(float i = -2; i <= 2; i += 0.5) { %>
            <li><input type="submit" value="<%=i%>" name="position_x" /></li>
            <% } %>
        </ul>
    </div>
    <div class="form-line position_y">
        <div class="label"><label for="position_y">Y position:</label></div>
        <div class="value"><input type="text" value="0" name="position_y" id="position_y" /></div>
    </div>
    <div class="form-line radius">
        <div class="label">Radius: </div>
        <select name="radius" class="value">
            <% for(float i = 1; i <= 3; i += 0.5) { %>
            <option value="<%=i%>"><%=i%></option>
            <% } %>
        </select>
    </div>
</form>
<div id="result-wrapper">
    <table class="result-table">
        <thead>
            <th>x</th>
            <th>y</th>
            <th>R</th>
            <th>result</th>
        </thead>
        <tbody></tbody>
    </table>
</div>
</body>
</html>