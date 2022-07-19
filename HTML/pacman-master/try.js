//最外层圆形
var c1 = document.getElementById('ccb'); //获取绘图区域
var ctx1 = c1.getContext('2d'); //让我们拿到一个CanvasRenderingContext2D对象
ctx1.beginPath(); //开始
ctx1.lineWidth = 8;
ctx1.strokeStyle = '#3af';
ctx1.arc(105, 105, 100, Math.PI / 180 * 0, Math.PI / 180 * 216);
ctx1.stroke();
//最外层背景
var c2 = document.getElementById('ccc')
var ctx2 = c2.getContext('2d');
ctx2.beginPath();
ctx2.lineWidth = 8;
ctx2.strokeStyle = 'rgba(0,0,0,.1)';
ctx2.arc(105, 105, 100, 0, 2 * Math.PI);
ctx2.stroke();

//中间圆形
var c3 = document.getElementById("cca");
var ctx3 = c3.getContext("2d");
ctx3.beginPath();
ctx3.lineWidth = 8;
ctx3.strokeStyle = '#4CAF50';
ctx3.arc(105, 105, 70, -0.5 * Math.PI, Math.PI);
ctx3.stroke();
//中间背景
var c4 = document.getElementById("ccd");
var ctx4 = c4.getContext("2d");
ctx4.beginPath();
ctx4.lineWidth = 8;
ctx4.strokeStyle = 'rgba(0,0,0,.1)';
ctx4.arc(105, 105, 70, 0, 2 * Math.PI);
ctx4.stroke();

//内层圆形
var c5 = document.getElementById("cce");
var ctx5 = c5.getContext("2d");
ctx5.beginPath();
ctx5.lineWidth = 8;
ctx5.strokeStyle = '#673AB7';
ctx5.arc(105, 105, 40, -1 * Math.PI, -0.2 * Math.PI);
ctx5.stroke();
//内层背景
var c6 = document.getElementById("ccf");
var ctx6 = c6.getContext("2d");
ctx6.beginPath();
ctx6.lineWidth = 8;
ctx6.strokeStyle = 'rgba(0,0,0,.1)';
ctx6.arc(105, 105, 40, 0, 2 * Math.PI);
ctx6.stroke();