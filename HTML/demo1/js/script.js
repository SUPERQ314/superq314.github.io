//先获取按钮
var btn = document.getElementById("btn");
//再获取图片 是数组
var img = document.getElementsByTagName("img")[0];
btn.onclick = function () {
    //点击事件的方法
    //如果按钮文字等于显示就执行里面的内容，如果不是显示就执行else里面的内容
    if(btn.innerHTML==='隐藏图片'){
        //图片设为不可见
        img.style.display='none';
        //同时按钮文字改为显示
        btn.innerHTML="显示图片";
    }else{
        //另一种情况    图片显示
        img.style.display='block';
        //文字按钮改为隐藏
        btn.innerHTML="隐藏图片";
    }
}