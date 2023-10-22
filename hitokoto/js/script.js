async function showSidebarContainer() {
    let sidebarContainer = document.querySelector("#sidebar-container");
    if (sidebarContainer.classList == "sidebar-container") {
        sidebarContainer.classList = "sidebar-container-hidden";
    } else {
        sidebarContainer.classList = "sidebar-container-hidden";
        sidebarContainer.classList = "sidebar-container";
    }
}

var clases = {
    a: "动画",
    b: "漫画",
    c: "游戏",
    d: "文学",
    e: "原创",
    f: "来自网络",
    g: "其他",
    h: "影视",
    i: "诗词",
    j: "网易云",
    k: "哲学",
    l: "抖机灵",
}

async function getInformation(params) {
    if (params == undefined) {
        url = "https://v1.hitokoto.cn/"
    } else {
        url = "https://v1.hitokoto.cn/?c=" + params
    }
    fetch(url).then(resp => resp.json()).then(data => {
        document.querySelector("#a").innerHTML = data.hitokoto
        document.querySelector(".hitokoto").innerHTML = data.hitokoto
        document.querySelector("#b").innerHTML = clases[data.type]
        document.querySelector("#c").innerHTML = data.from_who
        document.querySelector(".from-who").innerHTML = data.from_who
        document.querySelector("#d").innerHTML = data.from
        if(data.from==null){
            document.querySelector(".from").innerHTML = data.from
        }else{
            document.querySelector(".from").innerHTML = "『"+data.from+"』"
        }
        document.querySelector("#e").innerHTML = data.length
    })
}

getInformation()
