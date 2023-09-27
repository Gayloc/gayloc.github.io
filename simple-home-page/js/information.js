var index=0;
list=new Array;


function setCardBox(content) {
    if (content.status) {
        list = Object.values(content.data);
        let card_box = document.createElement("div");
        let card_box_class = document.createAttribute("class");
        card_box_class.nodeValue = "card-box";
        card_box.attributes.setNamedItem(card_box_class);
        let body = document.querySelector("body");
        body.appendChild(card_box);

        let more = document.createElement("div");
        let more_class = document.createAttribute("class");
        let more_action = document.createAttribute("onclick");
        more_action.nodeValue="addContent()";
        more_class.nodeValue="more";
        more.attributes.setNamedItem(more_class);
        more.attributes.setNamedItem(more_action);
        more.innerText="加载更多"
        card_box.appendChild(more);

        let body_img=document.createAttribute("style");
        body_img.nodeValue=`background: url('https://www.bing.com${list[Math.floor(Math.random() * list.length)].url}') no-repeat center center fixed;background-color: rgba(0, 0, 0, 0.3);background-blend-mode: multiply;background-size: cover;`;
        body.attributes.setNamedItem(body_img);

        addContent();
        
    }
}

function addCard(card_box, img_params, title_params, copyright_params, copyrightlink_params) {
    let card = document.createElement("div");
    let card_class = document.createAttribute("class");
    card_class.nodeValue = "card";
    card.attributes.setNamedItem(card_class);
    let img = document.createElement("img");
    let img_src = document.createAttribute("src");

    let title = document.createElement("a");
    let copyright = document.createElement("p");

    img_src.nodeValue = "https://www.bing.com"+img_params;
    copyright.innerHTML = copyright_params;
    title.innerHTML = title_params;

    let title_href = document.createAttribute("href");
    title_href.nodeValue = copyrightlink_params;
    title.attributes.setNamedItem(title_href);

    img.attributes.setNamedItem(img_src);
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(copyright);
    card_box.appendChild(card);
}

function addContent() {
    let card_box=document.querySelector(".card-box");
    for (let i=0 ; i < 5; i++) {
        if (index>=list.length){
            alert("没有更多了");
            break;
        }
        addCard(card_box,list[index].url,list[index].title,list[index].copyright,list[index].copyrightlink);
        index++;
    }

}

fetch("https://raw.onmicrosoft.cn/Bing-Wallpaper-Action/main/data/zh-CN_all.json")
    .then((response) => response.json())
    .then((data) => setCardBox(data));
