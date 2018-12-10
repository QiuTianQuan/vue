<template>
    <div>
        <div class="thread">
            <div @click="backto" class="topback">
                <img src='../assets/imgs/backto.png' >
            </div>
            <div class="thread_list">
                <div v-if="istitle" class="title">
                    <p>{{list[0].title}}</p>
                </div>
                <ul>
                    <li v-for="i in list">
                        <div class="content">{{i.content}}</div>
                        <div class="author">作者：{{i.nicename}}</div>
                        <div class="creattime">创作时间：{{i.posttime | getTime}}</div>
                    </li>
                </ul>
            </div>
            <div class="addComments" @click="pageShow">我要回帖</div> 
            <div v-show="isclick"  class="commentSendPage">     
                <div  @click="isclick=false" class="backto">
                    <img src='../assets/imgs/backto.png' >
                </div>
                <div class="sendit">
                    <textarea type="text" id="content" name="content" placeholder="请输入发表内容"  v-model="content"></textarea>
                    <button class="sendPost" @click="addComments">发表</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    inject:['reload'],
    data() {
        return {    
        id: this.$route.params.aid,
        list: [],
        content:"",
        istitle :false,
        isclick:false 
    }
  },
  created() {
    this.getData()
  },
  mounted(){
      document.querySelector('.mint-tabbar').style.zIndex = -1;
  },
  methods: {
    getData() {
      this.axios.get("http://localhost:8806/getThread", {
        params: {
        id: this.id
        }  
  }).then(res => {
                this.list = res.data.rs;
                if(this.list[0].title!= null){
                    this.istitle = true;
                }
            }).catch(function (error) {
            console.log(error)
        })
    },
    addComments(){
            var content = this.content;
            var id = this.id;
            if(content==""){
                    alert("内容不能为空")
            }else{
                var params = new URLSearchParams();
                params.append('content', content);  
                params.append('id', id);  
                this.axios.post("http://localhost:8806/sendComment",params).then(res =>{
                    if(res.data.err==0)
                    {
                        this.reload();
                    }else{
                        alert(res.data.msg)
                    }
                }).catch(function (error) {
                console.log(error)
                })
            }
    },
    pageShow(){
        this.isclick = true;
    },
    backto(){
         this.$router.go(-1);
         document.querySelector('.mint-tabbar').style.zIndex = 1;
    }
  }
}
</script>
<style  scoped>
.thread_list {
  margin: 0 auto;
  width: 80vw;
  margin-bottom: 10vw;
}

.thread_list ul {
 border-radius: 10px;
  padding: 0;
  margin-top: 5vw;
  border: solid 1px #d3afce;
  overflow: hidden;
  margin-bottom: 20vw;
}

.thread_list li {
  list-style-type: none;
  border-bottom: 1px solid #d3afce;
  padding: 2vw 5vw;
 background-color: #fff;
}

.content {
    padding: 2vh 0;
    color: #5a5858;
}

.author,.creattime{
    font-size: 2vw;
    color: #ada8a8;
}


#content{
    height: 50vw;
    margin-top: 5vw;
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

.addComments{
    position: fixed;
    width: 100vw;
    height: 4vh;
    text-align: center;
    bottom: 0;
    background-color: #b17275;
    line-height: 4vh;
}

.commentSendPage{
    position: absolute;
    top: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgb(231, 211, 211);
}

.sendit {
    padding-top: 20vw;
}

.backto{
    margin-top: 5vw;
    margin-left: 3vw;
}

.backto img {
     width: 5vw;
}

.title{
    border: solid 1px #7e5b5b;
    margin-top: 13vw;
    font-size: 5vw;
    text-align: center;
    background-color: floralwhite;
}

.topback{
    position: fixed;
    margin-left: 3vw;
    top: 5vw;
}

.topback img {
     width: 5vw;
}


</style>
