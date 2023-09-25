function setbackground(content) {
    if (content.status) {
        let list = Object.values(content.data);

        let card_box = document.createElement("div");
        let card_box_class = document.createAttribute("class");
        card_box_class.nodeValue = "card-box";
        card_box.attributes.setNamedItem(card_box_class);



        let body = document.querySelector("body");
        body.appendChild(card_box);

        for (let i = 0; i < 10; i++) {
            let card = document.createElement("div");
            let card_class = document.createAttribute("class");
            card_class.nodeValue = "card";
            card.attributes.setNamedItem(card_class);
            let img = document.createElement("img");
            let img_src = document.createAttribute("src");

            let title = document.createElement("a");
            let copyright = document.createElement("p");

            let luckynums =Math.floor(Math.random() * list.length)
            img_src.nodeValue = "https://www.bing.com" + list[luckynums].url;
            copyright.innerHTML=list[luckynums].copyright;
            title.innerHTML=list[luckynums].title;

            let title_href = document.createAttribute("href");
            title_href.nodeValue=list[luckynums].copyrightlink;
            title.attributes.setNamedItem(title_href);

            img.attributes.setNamedItem(img_src);
            card.appendChild(img);
            card.appendChild(title);
            card.appendChild(copyright);
            card_box.appendChild(card);

        }


    }
}

fetch("https://raw.onmicrosoft.cn/Bing-Wallpaper-Action/main/data/zh-CN_all.json")
    .then((response) => response.json())
    .then((data) => setbackground(data));
