<%-- Created by IntelliJ IDEA. --%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <title>Lab # 1 Programming Web Applications</title>
    <meta charset="utf-8" />
    <script src="http://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.js"></script>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.2/underscore.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone.js"></script>
    <script src="/js/main.js"></script>
</head>
<body>
<header>
    <div class="full-name">Амирасланов Евгений Шакирович</div>
    <div class="group">4125</div>
    <div class="variant">495</div>
</header>
<form action="/" method="get">
    <div class="position_x">
        <div class="label">X position:</div>
        <ul class="value">
            <li><input type="checkbox" value="-2" name="position_x" /> -2</li>
            <li><input type="checkbox" value="-1.5" name="position_x" /> -1.5</li>
            <li><input type="checkbox" value="-1" name="position_x" /> -</li>
            <li><input type="checkbox" value="-0.5" name="position_x" /> -0.5</li>
            <li><input type="checkbox" value="-0" name="position_x" /> -0</li>
            <li><input type="checkbox" value="0.5" name="position_x" /> 0.5</li>
            <li><input type="checkbox" value="1" name="position_x" /> 1</li>
            <li><input type="checkbox" value="1.5" name="position_x" /> 1.5</li>
            <li><input type="checkbox" value="2" name="position_x" /> 2</li>
        </ul>
    </div>
    <div class="position_y">
        <div class="label">Y position: </div>
        <div class="value"><input type="text" value="0" name="position_y" /></div>
    </div>
    <div class="radius">
        <div class="label">Radius: </div>
        <ul class="value">
            <input type="submit" value="1" name="radius" />
            <input type="submit" value="1.5" name="radius" />
            <input type="submit" value="2" name="radius" />
            <input type="submit" value="2.5" name="radius" />
            <input type="submit" value="3" name="radius" />
        </ul>
    </div>
</form>
</body>
</html>