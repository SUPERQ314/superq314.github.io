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
