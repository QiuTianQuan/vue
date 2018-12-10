<template>
    <div>
        <input type="text" id="title" name="title" placeholder="请输入20字以内标题"  v-model="title">
        <textarea type="text" id="content" name="content" placeholder="请输入发表内容"  v-model="content"></textarea>
        <button class="sendPost" @click="sendPost">发表</button>
    </div>
</template>

<script>
import Mynav from '@/components/mynav'
export default {
    data() {
        return {
            content:"",
            title:""
        }
    },
    methods: {
        sendPost:function() {
            var content = this.content;
            var title = this.title;
            if(title==""||title.length>20){
                alert("标题字数不正确")
            }else{
                if(content==""){
                    alert("内容不能为空")
                }else{
                    var params = new URLSearchParams();
                    params.append('content', content);  
                    params.append('title', title);  
                    this.axios.post("http://localhost:8806/sendPost",params).then(res =>{
                        if(res.data.err==0)
                        {
                            this.$router.push('/homepage')
                        }else{
                            alert(res.data.msg)
                        }
                    }).catch(function (error) {
                    console.log(error)
                    })                    
                }
            }
        }
    }
}
</script>

<style scoped>
#title,#content{
    border: solid 1px #ebebeb;
    border-radius: 10px;
    width: 80vw;
    font-size: 4vw;
    outline: none;
    color: #b8b8b8;
    padding: 0 3vw;
    margin: 0 auto;
    display: block;
}

#title {
    height: 10vw;
    margin-top: 20vw;
}

#content {
    height: 50vw;
    margin-top: 5vw;
}

.sendPost{
    width: 80vw;
    margin: 0 auto;
    display: block;
    height: 11vw;
    border-radius: 30px;
    text-align: center;
    line-height: 11vw;
    background-color: #d3afce;
    color: white;
    margin-top: 7vw;
    -webkit-tap-highlight-color: rgba(255,0,0,0);
}
</style>

