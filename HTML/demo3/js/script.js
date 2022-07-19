window.onload = function () {

    var count = 0; // 记录开始后当前的毫秒数
    var timer; // 定时器返回值，用于停止定时器
    var timer_color; // 定时器返回值，用于停止跑马灯
    var flag = false; // 增加判断，防止重复点击开始导致有多个定时器同时计数
    /* 计时 */
    var id_M = document.getElementById("id_M");
    var id_S = document.getElementById("id_S");
    var id_MS = document.getElementById("id_MS");
    /* 跑马灯 */
    var td1 = this.document.getElementById("tr1").getElementsByTagName("td");
    var td2 = this.document.getElementById("tr2").getElementsByTagName("td");
    var td3 = this.document.getElementById("tr3").getElementsByTagName("td");
    var td4 = this.document.getElementById("tr4").getElementsByTagName("td");
    var color = td1[1].style.backgroundColor; // 存储跑马灯原来的颜色，用于还原

    /* 开始按钮 */
    var start = this.document.getElementById("start");
    start.onclick = function () {
        start.blur(); // 移除焦点
        if (flag) {
            clearInterval(timer); // 处理没按空格键停止就再次点击"START"的情况
        }
        flag = true;
        /* 计时器 */
        var ms = new Date().getTime();
        timer = setInterval(function () {
            count = new Date().getTime() - ms;
            id_M.innerText = handleTime1(parseInt(count / 1000 / 60));
            id_S.innerText = handleTime1(parseInt(count / 1000 % 60));
            id_MS.innerText = handleTime2(count % 1000);
        }, 103);
        /* 跑马灯 */
        clear(0); // 先全部清除
        row = 4; // 初始化行
        col = 4; // 初始化列
        timer_color = setInterval(paomadeng, 200);
    }
    /* 处理时间(分、秒) */
    function handleTime1(num) {
        if (num < 10) {
            return '0' + num;
        }
        return num;
    }
    /* 处理时间(毫秒) */
    function handleTime2(num) {
        if (num < 10) {
            return "00" + num;
        } else if (num < 100) {
            return '0' + num;
        }
        return num;
    }
    /* 跑马灯 */
    var row = 4,
        col = 4;
    function paomadeng() {
        if (col == -1) {
            clear(col + 1);
            col = 4;
        }
        if (row == 4) {
            clear(col + 1);
            td4[col].style.backgroundColor = "green";
            row--;
        } else if (row == 3) {
            td3[col].style.backgroundColor = "red";
            row--;
        } else if (row == 2) {
            td2[col].style.backgroundColor = "blue";
            row--;
        } else if (row == 1) {
            td1[col].style.backgroundColor = "#47DE00";
            row = 4;
            col--;
        }
    }
    /* 清除跑马灯 */
    function clear(n) {
        for (; n <= 4; n++) {
            td1[n].style.backgroundColor = color;
            td2[n].style.backgroundColor = color;
            td3[n].style.backgroundColor = color;
            td4[n].style.backgroundColor = color;
        }
    }




    /* 点击空格键停止 */
    this.document.onkeypress = function (ev) {
        // 32对应空格
        if (ev.keyCode == 32 && flag) {
            clearInterval(timer);
            clearInterval(timer_color);
            flag = false;
            // 表格添加行
            addRow();
        }
    }

    // 排行榜
    var table = this.document.getElementById("leaderboard");
    // 玩家最终时间差记录
    var players = [];
    /* 表格添加行 */
    function addRow() {
        var rows = table.rows.length;
        var insertTr;

        var before_time_diff = count - 10 * 1000; // 基础时间差
        var after_time_diff; // 最终时间差
        if (before_time_diff < 0) {
            after_time_diff = Math.abs(before_time_diff) * 2;
        } else {
            after_time_diff = before_time_diff;
        }
        // rows==1，说明是第一个玩家；否则遍历全部玩家
        if (rows != 1) {
            for (var i = 0; i < players.length; i++) {
                if (after_time_diff < players[i]) {
                    console.log(after_time_diff, players[i])
                    insertTr = table.insertRow(i + 1);
                    break;
                }
            }
            if (insertTr == null) {
                insertTr = table.insertRow(rows);
            }
        } else {
            insertTr = table.insertRow(rows);
        }

        // 排名
        var inserTd = insertTr.insertCell(0);
        inserTd.innerText = rows
        // 玩家名
        var inserTd = insertTr.insertCell(1);
        inserTd.innerText = "玩家" + rows
        // 时间记录
        var inserTd = insertTr.insertCell(2);
        inserTd.innerText = id_M.innerText + ":" + id_S.innerText + ":" + id_MS.innerText
        // 是否罚时
        var inserTd = insertTr.insertCell(3);
        if (before_time_diff < 0) {
            inserTd.innerText = "是"
        } else {
            inserTd.innerText = "否"
        }
        // 最终时间差
        var inserTd = insertTr.insertCell(4);
        var M = handleTime1(parseInt(after_time_diff / 1000 / 60));
        var S = handleTime1(parseInt(parseInt(after_time_diff / 1000 % 60)));
        var MS = handleTime2(parseInt(parseInt(after_time_diff % 1000)));
        inserTd.innerText = M + ":" + S + ":" + MS

        // 将玩家最终时间差信息加入数组players，并排序
        players.push(after_time_diff);
        players.sort(sortNum); // 注意，sort是对数组中的字符串进行排序，如果是数字需要自定义
        // 重置排名
        resetRank();
    }
    /* 数组中数字的排序（从小到大） */
    function sortNum(a, b) {
        return a - b;
    }
    /* 重置排名 */
    function resetRank() {
        var tr = document.getElementById("leaderboard").getElementsByTagName("tr");
        for (var i = 1; i < tr.length; i++) {
            tr[i].getElementsByTagName("td")[0].innerText = String(i);
        }
    }
}
