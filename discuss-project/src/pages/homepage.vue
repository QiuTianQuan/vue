<template>
    <div>
        <router-view></router-view>
         <div class="article_list">
            <ul>
                <li v-for="i in list">
                <router-link :to="'/thread/' + i.aid">
                    <div class="title">{{ i.title }}</div>
                    <div class="author">作者：{{i.nicename}}</div>
                    <div class="creattime">{{i.posttime | getTime}}</div>
                    <div class="commentsNum">评论数：{{i.num}}</div>
                </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {    
        list: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.axios.get("http://localhost:8806/getlist").then(res => {               
                this.list = res.data.rs;
            }).catch(function (error) {
            console.log(error)
        })
    }
  }
}
</script>
<style scoped>
.article_list {
  margin: 0 auto;
  width: 80vw;
}

.article_list ul {
  padding: 0;
  margin-bottom: 20vw;
}

.article_list li {
  list-style-type: none;
  margin-top: 5vw;
  border: solid 1px #d3afce;
  padding: 2vw 5vw;
  border-radius: 10px;
  background-color: #fff;

}

a {
    text-decoration: none;
}

.title {
    padding: 2vh 0;
    color: #5a5858;
}

.author,.creattime{
    font-size: 2vw;
    color: #ada8a8;
    display: inline-block;
}

.commentsNum {
    display: inline-block;
    margin-left: 15vw;
    font-size: 3vw;
    color: #ada8a8;
}
</style>