<template>
    <div>
        <router-view></router-view>
        <div class="myinfo">
            <div class="my_pageTop">
            <div class="topbox"></div>
            <div class="me">
                <div class="myatavar">
                    <img class="myhead myHead" src="">
                </div>
                <div class="myId">
                    <div v-if="isname">欢迎您：{{info[0].username}}</div>
                </div>
            </div>
            <div class="contentop">
                <div @click="getComments"  :class="myComments" class="chooseComments">
                    <p>我的回帖</p>
                </div>
                <div  @click="getPost"  :class="myPost" class="choosePost">
                    <p>我的发帖</p>
                </div>
            </div>
        </div>
        <div class="mycontents">
            <div v-show="isComments" class="allmyq">
                <div class="myquestion_contents">
                    <div class="my_list">
                        <ul>
                            <li v-for="i in comments_list">
                                <router-link :to="'/thread/' + i.pid">
                                    <p>{{i.art_content}}</p>
                                </router-link>
                            </li>
                        </ul>
                    </div> 
                </div>
                <div class="myqloadmore loadmore"></div>
            </div>
            <div v-show="isPost"  class="allmya">
                <div class="myanswer_contents">
                    <div class="my_list">
                        <ul>
                            <li v-for="i in thread_list">
                                <router-link :to="'/thread/' + i.aid">
                                    <p>{{i.art_title}}</p>
                                </router-link>
                            </li>
                        </ul>
                    </div> 
                </div>
                <div class="myaloadmore loadmore"></div>
            </div>
        </div>           
        </div>
    </div>
</template>

<script>
import Mynav from '@/components/mynav'
export default {
    data() {
        return {    
        thread_list: [],
        comments_list: [],
        info: [],
        isname :false,
        isComments:true,
        isPost:false,
        myComments:{
            chooseit:true,
            notchoose:false
            
        },
        myPost:{
            chooseit:false,
            notchoose:true
        }
    }
  },
  created() {
    this.getData(),
    this.getPostData()
  },
  methods: {
    getPostData() {
      this.axios.get("http://localhost:8806/getMyCommentsInfo", {
  }).then(res => {
      if(res.data.err!=1)
        {
            this.comments_list = res.data.rs;
           
        }else{
            alert(res.data.msg)
            this.$router.push('/')
        }
            
        }).catch(function (error) {
        console.log(error)
        })
    },
    getData() {
      this.axios.get("http://localhost:8806/getMyInfo", {
  }).then(res => {
        if(res.data.err!=1)
        {
            this.info = res.data.rs;
            console.log(res.data.rs)
            if(this.info[0].username!= null){
                    this.isname = true;
            }
        }else{
            this.$router.push('/')
        }
            
        }).catch(function (error) {
        console.log(error)
        })
    },
    getComments(){
        this.getPostData();
        this.isComments=true;
        this.isPost = false
        this.myComments.chooseit=true
        this.myComments.notchoose=false
        this.myPost.notchoose=true
        this.myPost.chooseit=false
    },
    getPost(){
        this.axios.get("http://localhost:8806/getMyPostInfo", {
  }).then(res => {
                this.thread_list = res.data.rs;
            }).catch(function (error) {
            console.log(error)
        })
        this.isComments=false;
        this.isPost = true
        this.myPost.chooseit=true
        this.myPost.notchoose=false
        this.myComments.notchoose=true
        this.myComments.chooseit=false
    }
    }
}
</script>
<style scoped>
.my_pageTop {
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: 88;
}
.topbox {
    width: 100%;
    height: 14.4vh;
    background-color: #b17275;
}

.me {
    width: 91.6%;
    height: 14vh;
    margin: 0 auto;
    border-radius: 10px;
    border: solid 1px #ebebeb;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    margin-top: -7vh;
}

.myatavar {
    width: 16.5vw;
    height: 16.5vw;
    border-radius: 50px;
    background-color: #ebebeb;
    margin-top: -4.6vh;
    overflow: hidden;
}

.myId {
    margin-bottom: 4vh;
}

.contentop {
    margin: 3vh 3vw 0 3vw;
    height: 6vh;
    border: solid 1px #ebebeb;
    border-bottom: none;
    border-radius: 10px 10px 0 0;
    overflow: hidden;
}

.chooseComments {
    background-repeat: no-repeat;
    background-size: cover;
    width: 50%;
    display: inline-block;
    text-align: center;
    -webkit-tap-highlight-color: rgba(255,0,0,0);
}

 .choosePost {
    background-repeat: no-repeat;
    background-size: cover;
    width: 50%;
    display: inline-block;
    text-align: center;
    -webkit-tap-highlight-color: rgba(255,0,0,0);
    float: right;
}

.notchoose{
    color: white;
    background-color: #b17275;
}

.chooseit {
    background-color: white;
    color: #b17275;
}

.mycontents {
    background-color: white;
    border: solid 1px #ebebeb;
    border-radius: 10px;
    position: fixed;
    overflow-y: scroll;
    margin: 30vh 3vw 0 3vw;
    height: 60vh;
    width: 93.5%;
    -webkit-overflow-scrolling: touch;
    
}

.my_list {
  margin: 0 auto;
  width: 80vw;
}

.my_list ul {
  padding: 0;
  margin-bottom: 20vw;
}

.my_list li {
  list-style-type: none;
  margin-top: 5vw;
  border: solid 1px #d3afce;
  padding: 2vw 5vw;
  border-radius: 10px;
  background-color: #fff;

}
</style>

