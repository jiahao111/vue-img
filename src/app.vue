<template>
    <div>
        {{msg}}
    </div>
</template>
<script>
import Dialog from "./js/dialog.js"
export default {
    name: "dilog",
    data() {
        return {
            msg: "666"
        }
    },
    mounted() {
        this.go();
    },
    methods: {
        go() {
            let dialog = new Dialog();
            console.log(666);
        }
    }
}
</script>
<style>
* {
    margin: 0;
    padding: 0;
}

.dialog {
    width: 350px;
    height: 350px;
    border: 1px solid #ccc;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
}

.dialog-title {
    height: 35px;
    line-height: 35px;
    padding-left: 15px;
    padding-right: 15px;
    border-bottom: 1px solid #ccc;
}

.dialog-content {
    padding: 15px;
}

.float-right {
    float: right;
}

.mr15 {
    margin-right: 15px;
}
</style>