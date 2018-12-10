<template>
    <div>
        <div class="loginbox">
            <div class="user info">
                <p>用户名：</p>
                <div class="userBox box">
                    <input  type="text" name="user" placeholder="请输入十二个字符以内的用户名"  v-model="userName">
                </div>
            </div>
            <div class="password info">
                <p>密码：</p>
                <div class="passBox box">
                    <input  type="password" name="password" placeholder="请输入六位密码" v-model="userPsd">
                </div>
            </div>
            <button @click="sureto" >确认</button>
            <router-link :to="'/'">返回</router-link>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userName:"" ,
            userPsd: ""
        }
    },
     methods: {
        sureto:function() {
            var name = this.userName;
            var psd = this.userPsd;
            if(name==""){
                alert("用户名不能为空")
            }else{
                if(psd==""){
                    alert("密码不能为空")
                }else{
                    if(name.length>12)
                    alert("请输入十二个字符以内的用户名")
                    else{
                        if(psd.length!=6)
                        alert("请输入六位密码")
                        else{
                            var params = new URLSearchParams();
                            params.append('name', name);
                            params.append('psd', psd);          
                            this.axios.post("http://localhost:8806/register",params).then(res => {
                                if(res.data.err==0){
                                    alert(res.data.msg)
                                    this.$router.push("/")
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
