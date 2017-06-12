<template>
  <div id="login" @click="hidePanel($event)">
    <div class="login-panel">
      <div v-if="todo==='login'">
        <div class="title">
          <h4>登录</h4>
        </div>
        <form class="login-form">
          用户名:<br>
          <input type="text" id="user" name="username" v-model="loginData.username"><br>
          密码:<br>
          <input type="password" id="psd" name="password" v-model="loginData.password"><br>
        <input type="button" id="submit" value="登录" @click="validator()">
        <input type="button" id="register" value="去注册" @click="todo='register'">
      </form>
      </div>
      <div v-else>
        <div class="title">
          <h4>注册</h4>
        </div>
        <form class="login-form">
          用户名:<br>
          <input type="text" id="adduser" name="username" v-model="registerData.username"><br>
          密码:<br>
          <input type="password" id="addpsd" name="password" v-model="registerData.password"><br>
          确认密码:<br>
          <input type="password" id="confirmPsd" name="password" v-model="registerData.confirmPassword"><br>
          <input type="button" id="registerSubmit" value="注册" @click="registerValidator()">
          <input type="button" id="tologin" value="去登录" @click="todo='login'">
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    props:['todo'],
    created(){
    },
    data(){
      return {
        loginData:{
          username:'',
          password:''
        },
        registerData:{
          username:'',
          password:'',
          confirmPassword:''
        }
      }
    },
    methods:{
      validator(){
        if(this.loginData.username===''||this.loginData.password===''){
          alert('用户名和密码不能为空');
        }else{
          var xmlhttp=new XMLHttpRequest();
          xmlhttp.open("POST","/api/api/user/login",true);
          xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
          xmlhttp.setRequestHeader("withCredentials",true)
          xmlhttp.send(
            "username="+this.loginData.username
            +"&password="+this.loginData.password
          );
          var promise = new Promise((res,rej)=>{
            xmlhttp.onreadystatechange = (e)=>{
              if(xmlhttp.readyState===4&&xmlhttp.status===200){
                res(JSON.parse(xmlhttp.responseText))
              }
            }
          })

          promise.then((data)=> {
            if(data.code){
                alert(data.message);
                return;
            }
            //登录成功
            alert(data.message);
            window.location.reload();
            /*this.loginData.password='';
            this.$emit('hide');
            this.$emit('loginSuccess',data.userInfo);*/
          })
        }
      },
      registerValidator(){
        if(this.registerData.username===''||this.registerData.password===''||this.registerData.confirmPassword===''){
          alert('用户名和密码不能为空');
        }else{
          if(this.registerData.password!==this.registerData.confirmPassword){
            alert('两次密码输入不一致')
          }else{

            var xmlhttp=new XMLHttpRequest();
            xmlhttp.open("POST","/api/api/user/register",true);
            xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            xmlhttp.send("username="+this.registerData.username+
              "&password="+this.registerData.password+
              "&repassword="+this.registerData.confirmPassword);

            var promise = new Promise((res,rej)=>{
              xmlhttp.onreadystatechange = (e)=>{
                if(xmlhttp.readyState===4&&xmlhttp.status===200){
                  res(JSON.parse(xmlhttp.responseText))
                }
              }
            })

            promise.then((data)=> {
              //出错
              if (data.code) {
                alert(data.message);
                return;
              }

              //切换为登陆页面
              setTimeout(()=>{
                alert('注册成功')
                this.todo='login';
              })
            })
          }
        }
      },
      hidePanel(e){
         if(e.target===this.$el)
         this.$emit('hide');
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #login{
    position: fixed;
    width:100%;
    height:100%;
    z-index: 9999;
    background-color: rgba(0,0,0,0.5);
    top:0;
    left:0;
  }
  .login-panel{
    width:300px;
    height:300px;
    position: fixed;
    top:50%;
    left:50%;
    margin-left:-150px;
    margin-top:-150px;
    background-color: #fff;
  }
  .title{
    margin-top: 40px;
    text-align: center;
  }
  .login-form{
    width:200px;
    margin:20px auto;
  }
  #psd,#user,#confirmPsd{
    margin-bottom: 10px;
  }
</style>
