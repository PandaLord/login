<template>
  <div class="main">
    <div class="registerCard">
      <div class="titleArea">
        <h2>知乎</h2>
        <h4>
          {{isRegistered ? '登录' : '注册'}}知乎，发现更大的世界
        </h4>   
      </div>
      <form>
        <div class="inputArea">
            <el-input 
              class="textInput"
              placeholder="用户名或邮箱" 
              v-model="username"
              clearable>
            </el-input>
        </div>
        <div class="inputArea">
          <el-input
            class="textInput"
            placeholder='密码'  
            v-model="password"
            clearable></el-input>          
        </div>
        <div class="verifyArea" >
           <el-input
            class="textInput"
            placeholder="请再次输入密码"
            v-show="!isRegistered"
            v-model="passwordVerify"
            clearable>
            </el-input> 
            
        </div>
        <p class="warning" 
        v-show="password !== passwordVerify && !isRegistered">
        两次输入的密码不一致！
        </p>
        <div v-if="isRegistered" class="loginOption">
          <a class="mobileCodeLogin">手机验证码登录</a>
          <a class="forgetPassword">忘记密码？</a>
        </div>
        <button class="loginButton" @click.prevent="routerToAdmin">
          {{isRegistered ? '登录' : '注册'}}
        </button> 
      </form>
      <div v-if="isRegistered" class="loginPattern">
        <a class="twoCodeLogin">二维码登录</a>
        <span> 丶 </span>
        <a class="aboardMobileLogin">海外手机登录</a>
        <span> 丶 </span>
        <a class="socialLogin">社交帐号登录</a>
      </div>
      <div v-else class="registerPattern">
        <a class="zhihuProtocol">
          注册即代表你同意《知乎协议》
        </a>
        <a class="registerOrga">
          注册机构号
        </a>
      </div>
    </div>
    <div class="switchArea">
      <span>
        {{isRegistered ? '没有帐号？' : '已有帐号？'}}
        <a @click="registerToggle" >
          {{isRegistered ? '注册' : '登录'}}
        </a>  
      </span>
    </div>
  </div> 
</template>
<script>
export default {
  name: 'register',
  data () {
    return {
      username: '',
      password: '',
      passwordVerify:'',
      isRegistered: true,
    }
  },
  methods: {
    registerToggle () {
      this.isRegistered = !this.isRegistered
    },
    routerToAdmin () {
      var p = this
      let params = {
          account: p.username,
          password: p.password,
        }
      if (p.isRegistered) {
        p.$http.post("/api/login",params) // 本地测试加上api前缀 /api/createAccount
        .then(res => {
          if (res.data) {
            console.log("登录成功")
            p.$router.push('admin')
          } else {
            console.log("登录失败")
          }  
        })    
      } else {
        p.$http.post("/api/createAccount",params) // 本地测试加上api前缀 /api/createAccount
        .then(res => {
          if (res.data) {
            console.log("创建帐号成功")
            p.$router.push('admin')
          } else {
            console.log("建立账户失败")
          }      
        })
      } 
      
    }
  },
}
</script>
<style lang="less" scoped>
* {
  padding:0;
  margin:0;
}

.main {
  font-size:14px;
  width:100%;
  height:700px;
  padding:150px 0;
  background:url('../static/image/pics/registerBackground.png') round;
  
}
.registerCard {
  text-align:center;
  width:432px;
  height:450px;
  padding:20px;
  background-color:#fff;
  color:#2d84cc;
  margin: auto;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0,0,0,.1);
  box-sizing: border-box;

  h2 {
    font-size:70px;
    font-weight:500;
    margin-bottom:15px;

  }
  h4 {
    font-size:20px;
    margin-bottom:20px;
  }
  .loginOption {
    display: flex;
    justify-content: space-between;
    width:100%;
    .mobileCodeLogin,
    .forgetPassword {
      flex:0 1 auto;

    }

  }
  .loginButton {
    display: block;
    color:#fff;
    width:100%;
    height:40px;
    margin-left:-3px;
    background: #0f88eb;
    border:1px solid #0f88eb;
    border-radius:3px;
    margin-top:15px;
    cursor:pointer;
    &:hover {
      background-color: #0d79d1;
    }
  }

  form {
    text-align:justify;
    padding:0 20px;
    line-height:20px;
    white-space: nowrap;
    

    .inputArea,
    .verifyArea {
      font-size:20px;
      display: flex;
      width:100%;
      align-items: center;
      .textInput {
        flex:2 0 auto;
        font-size:20px;
        margin-left:-10px;
        margin-top:15px;
        padding:0;
        ::-webkit-input-placeholder {
          color:#000;
        }
      }
      .locationSelect {
        color:#888;
        margin-top:-1px;
        
      }
      .locationSelect,
      .msgAcquire {
        display:inline;
        font-size:16px;
        flex:1 0 auto;
        border:none;
        cursor: pointer;
        appearance: none;
      } 
    }
    .warning {
      color:red;
      font-size:12px;
      display:block;
    }
    
    
  }
}

.loginPattern {
  color: #8590a6;
  cursor: pointer;
}

.registerPattern {
  display: flex;
  padding:0 20px;
  cursor: pointer;
  justify-content: space-between;
  color: #8590a6;
  .zhihuProtocol,
  .registerOrga {
    flex:0 0 auto;
  }
}
    
.switchArea {
    background-color:#f7f8fa;
    width:432px;
    padding:20px 0;
    height:19px;
    font-size:17px;
    line-height:20px;
    border-top: 1px solid #e7eaf1;
    margin:0 auto;
    text-align:center;  
    a {
      color:#175199;
      cursor: pointer;
      text-decoration: none;
      &:link,
      &:visited {
        color:inherit;
      }
    } 
  }
</style>
