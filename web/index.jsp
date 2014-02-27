<%-- Created by IntelliJ IDEA. --%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <title>Lab # 1 Programming Web Applications</title>
    <meta charset="utf-8" />
    <script src="http://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.js"></script>
    <script src="/js/checkbox_validator.js"></script>
    <script src="/js/text_validator.js"></script>
    <script src="/js/problem_line.js"></script>
    <script src="/js/main.js"></script>
    <link href="/css/style.css" rel="stylesheet" />
</head>
<body>
<header>
    <h1>Лабораторная работа № 1 по программированию интернет-приложений</h1>
    <div class="author">Амирасланов Евгений Шакирович, группа 4125, вариант 495</div>
</header>
<div id="errors"></div>
<form action="/" method="get" name="duck" id="duck_form">
    <div class="form-line position_x">
        <div class="label">X position:</div>
        <ul class="value" id="position_x">
            <% for(float i = -2; i <= 2; i += 0.5) { %>
            <li><input type="checkbox" value="<%=i%>" name="position_x" /><label><%=i%></label></li>
            <% } %>
        </ul>
    </div>
    <div class="form-line position_y">
        <div class="label">Y position: </div>
        <div class="value"><input type="text" value="0" name="position_y" id="position_y" /></div>
    </div>
    <div class="form-line radius">
        <div class="label">Radius: </div>
        <ul class="value">
            <% for(float i = 1; i <= 3; i += 0.5) { %>
            <li><input type="submit" value="<%=i%>" name="radius" id="radius" /></li>
            <% } %>
        </ul>
    </div>
</form>
</body>
</html>