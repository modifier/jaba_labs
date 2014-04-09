<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link href="style.css" rel="stylesheet" type="text/css" />
        <title>Group 4125</title>

<script>
var point=false;
var r=1;
function SetPos(Obj){
Obj.setSelectionRange(Obj.value.length,Obj.value.length);
}
function ChangeR(Value){
    r=Value;
    //alert(Value);
}
function ChangeSel(trans_vall){
    document.getElementById("zn1").value = trans_vall;
    //alert(Value);
}
function mousePageXY(e){
var x = 0, y = 0;
  if (!e) e = window.event;
  if (e.pageX || e.pageY){
    x = e.pageX;
    y = e.pageY;
  }
  else if (e.clientX || e.clientY){ 
        x = e.clientX + (document.documentElement.scrollLeft ||
        document.body.scrollLeft) - document.documentElement.clientLeft;
        y = e.clientY + (document.documentElement.scrollTop ||
        document.body.scrollTop) - document.documentElement.clientTop;
  }
 //alert(r);
 // 265 - R y=190 x=360
 //  190+265/2 = 0 y  360+265/2= 0 x
  var R=265*1.0/2;
  var xx=((x-(R+20))*r*1.0/R).toFixed(5);
  var yy=(((R+410)-y)*r*1.0/R).toFixed(5);
  document.getElementById("zn1").value = xx;
  document.getElementById("2").value = yy;
  document.form1.submit();
}
function message(Ob) { 
var ch = document.getElementsByName('zn1');
var error = 1;
for (var i=0; i<9; i++)
{
if (ch[i].checked) { error = 0; break; }
}
if (error) 
{alert('Выберите значение aбсциссы');
event.returnValue=false;}
str = Ob.value;
if(isNaN(parseFloat(str))&& (str.toString() !== ""))
{
alert('Введите верное числовое значение!');
event.returnValue=false;
}
if (str.toString() === "")
{
alert('Введите значение ординаты');
event.returnValue=false;
}
i=parseFloat(str);
if(i > 5 || i < -5)
{
alert('Введите чило от -5 до 5');
event.returnValue=false;
}
}
function checkform(f){
var ch = document.getElementsByName('zn1');
var error = 1;
for (var i=0; i<9; i++)
{
if (ch[i].checked) { error = 0; break; }
}
if (error) 
{return alert('Выберите значение aбсциссы');
event.returnValue=false;}

str = document.getElementById('2').value;
if(!isNaN(str))
{
    i=parseFloat(str);
    if(i > 5 || i < -5)
        {
        return alert('Введите чило от -5 до 5');
        event.returnValue=false;
        }
}
else return alert('Введите верное значение ординаты');
    
f.submit();
return true;
}
var check = 0;
var kolvo = 9; // количество чекбоксов  в нашей форме
function checkChbox(objj) {
     // если ставим галочку +1, если убираем галочку с чекбокса -1 
    if (objj.checked) 
    {
       check += 1; 
    }
    else
    {
       check -= 1; 
    }
      if (check === 1)    //   чек больше или равен 2, надо дизаблить все НЕ отмеченные!!
      {
        for (var i = 1; i <= kolvo; i++) 
        {
          var my = 'chek'+ i;
          if (document.getElementById(my).checked === false)
          {
              document.getElementById(my).disabled=true;
          }
        }
      }
      else    // чек не равен 2, надо раздизаблить все чекбоксы!!
      {
        for (var i = 1; i <= kolvo; i++) 
        {
          var my = 'chek'+ i;
          document.getElementById(my).disabled=false;
        } 
      }
}
</script>
  </head>
    <div class="header">Работу выполнили: Захарова Ася Александровна, Сиразетдинова Гульнара Ринатовна
        <br/>Группа 4125, вариант #1200 </div>

<table  width="490px" id="Tab_result" valign="top" bgcolor="#D3D3D3" border="1px" class="table1">
      <tr>
         <td width="30px"> X </td>
         <td width="30px"> Y </td>
         <td width="30px"> R </td>
         <td width="60px"> Результат </td>
       </tr>
<%
    String str;
    if (request.getParameter("zn1")==null) str="";
    else  {
    str = request.getParameter("zn4");
    double x= Double.parseDouble(request.getParameter("zn1"));
    double y= Double.parseDouble(request.getParameter("zn2"));
    double r= Double.parseDouble(request.getParameter("zn3"));
    boolean act=false;
    if (((x>=0)&&(y>=0)&&(y<=((r-x)*0.5)))||((x>=0)&&(y<=0)&&(x<=r*0.5)&&(y>=-r))||((x<=0)&&(y>=0)&&(y*y+x*x)<=(r/2)*(r/2)))
        act=true;
    str+=request.getParameter("zn1")+";"+request.getParameter("zn2")+";"+request.getParameter("zn3")+";";
    if (act) str+="tt;";
    else str+="ff;";
    int n=str.length();
    int count=0;
    String[] s= new String [5];
    for (int i=0;i<4;i++) s[i]="";
    for(int i=0;i<n;i++){
        if (str.charAt(i)==';') {
            count++;
        }
        else s[count]+=str.charAt(i);
        if (count==4) {
          count=0;
%>
    <tr>
        <td><%= s[0] %></td>
        <td><%= s[1] %></td>
        <td><%= s[2] %></td>
        <td><% if (s[3].charAt(0)=='t') {%> 'Входит' <%} else {%> 'Не входит' <%}%></td>
    </tr>
<%
    for (int k=0;k<4;k++) s[k]="";
   } }} %>
</table>
<form id="form1" name="form1" method="GET" action="" onSubmit = "checkform(this);return false;" >
<Label class="label9">Координаты абсциссы:</Label>
<input type="checkbox" class="ch1" name="zn1" id="chek1" value="-4" onclick="checkChbox(this)"> <Label class="la1">-4</Label>
<input type="checkbox" class="ch2" name="zn1" id="chek2" value="-3" onclick="checkChbox(this)"> <Label class="la2">-3</Label>
<input type="checkbox" class="ch3" name="zn1" id="chek3" value="-2" onclick="checkChbox(this)"> <Label class="la3">-2</Label>
<input type="checkbox" class="ch4" name="zn1" id="chek4" value="-1" onclick="checkChbox(this)"> <Label class="la4">-1</Label>
<input type="checkbox" class="ch5" name="zn1" id="chek5" value="0" onclick="checkChbox(this)"> <Label class="la5">0</Label>
<input type="checkbox" class="ch6" name="zn1" id="chek6" value="1" onclick="checkChbox(this)"> <Label class="la6">1</Label>
<input type="checkbox" class="ch7" name="zn1" id="chek7" value="2" onclick="checkChbox(this)"> <Label class="la7">2</Label>
<input type="checkbox" class="ch8" name="zn1" id="chek8" value="3" onclick="checkChbox(this)"> <Label class="la8">3</Label>
<input type="checkbox" class="ch9" name="zn1" id="chek9" value="4" onclick="checkChbox(this)"> <Label class="la9">4</Label>
<input id="zn1" type="hidden" name="zn1" value="0">
<Label class="label2">Координаты ординаты:</Label>

<input type="text" id="2" name="zn2" maxlength="7" class="input"  onclick="SetPos(document.getElementById('2'))" required />
<Label class="label3">Значение R:</Label>
<input type="radio" name="zn3"  value="1" CHECKED class="radiobut1" onclick="ChangeR(this.value)"> <Label class="label4">1</Label>
<input type="radio" name="zn3"  value="2" class="radiobut2" onclick="ChangeR(this.value)"> <Label class="label5">2</Label>
<input type="radio" name="zn3"  value="3" class="radiobut3" onclick="ChangeR(this.value)"> <Label class="label6">3</Label>
<input type="radio" name="zn3"  value="4" class="radiobut4" onclick="ChangeR(this.value)"> <Label class="label7">4</Label>
<input type="radio" name="zn3"  value="5" class="radiobut5" onclick="ChangeR(this.value)"> <Label class="label8">5</Label>
<img src="img/pic1.jpg" alt="Фигура по заданию (для определения попадания точки)" class="img1" onclick="mousePageXY(event)">
<input name="button1" id="sub" class="button1" type="submit" value="Проверить"  />
<Label class="label10">Заданная область на координатной<br/>плоскости:</Label>
<Label class="label11">Таблица результатов:</Label>
<BR><BR><BR>
<input id="zn4" type="hidden" name="zn4" value=<%= str %>>
</form>
</table>
</body>
</html>