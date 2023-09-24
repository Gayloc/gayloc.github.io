var time = document.querySelector("#time");
var date = document.querySelector("#date");
var hty = new Array()
uptime(time);
update(date);
setInterval(() => {
    uptime(time);
    update(date);
}, 1000);
history();

function check() {
    let value = document.querySelector("#word").value;
    if (value != "") {
        return true;
    } else {
        alert("搜索内容不能为空")
        return false;
    }
}

function redirect(word) {
    window.location.href = "https://www.baidu.com/s?word=" + word
}

function store() {
    let value = document.querySelector("#word").value;
    if (value != "") {
        if (hty.length < 10) {
            hty[hty.length] = value;
        } else {
            hty.shift()
            hty.push(value)
        }
        localStorage.setItem("hty", JSON.stringify(hty));
    }
}

function history() {
    if (localStorage.hty != undefined) {
        hty = JSON.parse(localStorage.hty);
    }

    let history = document.querySelector("#history");
    if (hty.length!=0) {
        for (let i = hty.length - 1; i >= 0; i--) {
            let node = document.createElement("li");
            let text = document.createTextNode(hty[i]);
            let typ = document.createAttribute("onclick")
            typ.nodeValue = "redirect('" + hty[i] + "')";
            node.appendChild(text);
            node.attributes.setNamedItem(typ)
            history.appendChild(node);
        }
    } else {
        let node = document.createElement("p");
        let text = document.createTextNode("还没有搜索记录，搜索一下吧");
        node.appendChild(text);
        history.appendChild(node);
        let btn = document.querySelector("#clear");
        let typ = document.createAttribute("style");
        typ.nodeValue = "visibility: hidden;";
        btn.attributes.setNamedItem(typ);
    }
}

function del() {
    localStorage.clear();
    localStorage.setItem("sum", "0");
    location.reload()
}

function uptime(time_el) {
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    let day_night = "上午";

    if (h > 12) {
        h = h - 12;
        day_night = "下午";
    }

    if (h < 10) { h = "0" + h; }
    if (m < 10) { m = "0" + m; }
    if (s < 10) { s = "0" + s; }

    time_el.textContent = day_night + h + ":" + m + ":" + s;

}

function update(date_el) {
    let week = ["日", "一", "二", "三", "四", "五", "六"]
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let week_index = date.getDay();
    date_el.textContent = year + "年" + month + "月" + day + "日 星期" + week[week_index];
}

function hot() {
    let search = document.querySelector("#search")
    let list = ["南⼤家园", "云家园", "家园⼯作室", "⼩家园传声机"]
    search.word.value = list[Math.floor(Math.random() * list.length)]
}