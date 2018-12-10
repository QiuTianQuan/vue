<template>
    <div id="Nav">
        <mt-tabbar v-model="selected">
            <mt-tab-item id="homepage">
                <img slot="icon" src="../assets/imgs/homepage.png">
                首页
            </mt-tab-item>
            <mt-tab-item id="post">
                <img slot="icon" src="../assets/imgs/sendPost.png">
                发贴
            </mt-tab-item>
            <mt-tab-item id="myinfo">
                <img slot="icon" src="../assets/imgs/myinfo.png">
                我的
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>

<script>
export default {
    data (){
        return {
            selected:""
        }
    },
    watch: {
        selected (newV,oleV){
             this.$router.push({
                 name: newV
             })
        }
    }
}
</script>

