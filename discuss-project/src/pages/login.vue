
<template>
    <div>
        <div class="loginbox">
            <div class="user info">
                <p>用户名：</p>
                <div class="userBox box">
                    <input  type="text" name="user" placeholder="请输入用户名"  v-model="userName">
                </div>
            </div>
            <div class="password info">
                <p>密码：</p>
                <div class="passBox box">
                    <input  type="password" name="password" placeholder="请输入六位密码" v-model="userPsd">
                </div>
            </div>
            <button @click="loginto" >登录</button>
            <router-link  :to="'/register'" class="toregister">注册</router-link>
        </div>
    </div>
</template>



<script>
import {setCookie} from '../js/setcookie.js'
export default {
    data() {
        return {
            userName:"" ,
            userPsd: ""
        }
    },
    created() {
        document.querySelector('.mint-tabbar').style.zIndex = -1;
    },
    methods: {
        loginto:function() {
            const self = this;
            var userId = this.userName;
            var psd = this.userPsd;
            if(userId==""||userId.length>12){
                alert("用户名不正确") 
                } else{
                    if(psd==""||psd.length!=6){
                        alert("密码错误")
                    }else{
                        var params = new URLSearchParams();
                        params.append('name', userId);
                        params.append('psd', psd);          
                        this.axios.post("http://localhost:8806/login",params).then(function(res) {
                            if(res.data.err==0)
                            {
                            self.$router.push("/homepage")
                            document.querySelector('.mint-tabbar').style.zIndex = 1;
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

<style >
    .loginbox {
        position: absolute;
        height: 60vw;
        width: 70vw;
        top: 0;
        bottom: 0;
        left: 0; 
        right: 0; 
        margin: auto;
        text-align: center
    }

    .info{
        margin: 0 auto;
        width: 90%;
    }
    .info p{
        display: inline-block;
        } 

        .box{
        display: inline-block;
        }
    input {
        outline: none;
        border: none;
    }

    .loginbox button{
        display: block;
        width: 30%;
        margin: 0 auto;
    }

    .toregister {
        margin-top: 5vw;
    }
</style>
