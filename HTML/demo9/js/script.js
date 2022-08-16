init()
    //用this就可以直接将值传入本函数中的所有函数中，相当于向函数中加入参数，只是为了简便
    function init() {
        //背景
        this.backX=$('.background').width();
        this.backY=$('.background').height();
        //食物
        this.foodW = 20;//食物宽
        this.foodH = 20;//食物高
        this.foodX = 0;//初始横坐标
        this.foodY = 0;//初始纵坐标
        this.snake = [[4,1,'head'],[3,1,'body'],[2,1,'body']]//初始蛇
        
        this.direct = 'right' //蛇的初始方向
        //逻辑结构
        this.left = false; 
        this.up = true;
        this.down = true;
        this.right = false;
        this.score = 0;//初始分数
        startGame() //开始游戏函数可以不放在这里，可以在div中创建一个开始框，绑定点击事件
    }
    function startGame() {
        food();
        snakeCreate();
        this.obj = setInterval(move,200);
        
    }
    function food() {
        var $food=$('<div>')
        //Math.floor()向下取最大整数，例如Math.floor(4.5)返回4，Math.random()随机生成一个0到1之间的数。
        this.foodX=Math.floor(Math.random()*this.backX/20);//随机创造食物的横坐标
        this.foodY=Math.floor(Math.random()*this.backY/20);//随机创造食物的纵坐标
        //给食物添加css属性，进行定位，添加宽高
        $food.css('width',this.foodW+'px');
        $food.css('height',this.foodH+'px');
        $food.css('position','absolute');
        $food.css('left',this.foodX*20 + 'px');
        $food.css('top',this.foodY*20 + 'px');
        $food.css('background-color','red');
        $food.addClass('food')
        $('.background').append($food)
    }
    function snakeCreate() {
            
        //蛇函数通过数组来进行拼接，构造3个div框，依次拼接在一起，数组里套数组，分别代表蛇的横纵坐标
        for (var i = this.snake.length - 1; i >= 0; i--) {
            var $snake = $('<div>');
            $snake.css({'background-color':'blue','position':'absolute','width':'20px','height':'20px','left':this.snake[i][0]*20+'px','top':this.snake[i][1]*20+'px'})
            $snake.addClass('snake')
            $('.background').append($snake)
            if(this.snake[i][2] == 'head'){
                $snake.addClass('snakeHead')
            }
        
        }
    }


