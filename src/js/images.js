const config = {
    page: 1
}

class Images {
    constructor(options) {
        Object.assign(config, options)
        this.wrap = document.getElementById(config.id);
        this.page = config.page;
        this.flag = config.flag;
        this.startY = 0;
        this.endY = 0;
        this.imgs = null;
        this.init();
    }
    init() {
        this.getImages();
    }
    getImages() {
        this.getJson("http://localhost:8088/mock").then((result) => {
            let res = JSON.parse(result);
            let img = [];
            this.imgs = res;
            if (this.flag == true) {
                res.map((item, index) => {
                    if (index > this.page - 1) return;
                    img.push(item);
                    this.loadImages(img);
                });
            } else {
                this.loadImages(res);
            }
            this.touchstrart();
        });
    }
    loadImages(img) {
        img.map((item, index) => {
            this.createImage(item.url);
        });
    }
    createImage(path) {
        return new Promise((resolve, reject) => {
            let oImg = new Image();
            oImg.onload = function() {
                resolve(oImg);
            }
            oImg.onerror = function() {
                reject("can't find image source");
            }
            oImg.src = path;
            this.wrap.append(oImg);
        });
    }
    getJson(url) {
        return new Promise((resolve, reject) => {
            let xml = new XMLHttpRequest();
            xml.open("GET", url);
            xml.onreadystatechange = function() {
                if (xml.readyState !== 4) return;
                if (xml.status == 200) {
                    resolve(xml.responseText)
                } else {
                    reject("error")
                }
            }
            xml.send(null);
        });
    }
    touchstrart() {
        document.body.addEventListener("touchstart", (event) => {
            this.startY = event.touches[0].clientY;
            this.touchmove();
        });
    }
    touchmove() {
        document.body.addEventListener("touchmove", (event) => {
            this.endY = event.touches[0].clientY;
        });
        this.touchend();
    }
    touchend() {
        let abs = Math.abs(this.startY - this.endY);
        let screen = document.body.clientHeight;
        if (abs < screen / 2) return;
        ++this.page;
        if (this.page > this.imgs.length) return;
        this.createImage(this.imgs[this.page - 1].url);
    }
}