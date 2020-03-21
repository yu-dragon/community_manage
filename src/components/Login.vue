<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avator_box">
        <img src="../assets/logo.png" />
      </div>
      <el-form ref="loginFormRef" :rules="rules" :model="loginForm" class="login_form" label-width="80px">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="iconfont icon-3702mima" show-password></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button class="leftBtn" type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 登录表单数据对象
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        },
        {
          min: 3,
          max: 6,
          message: '密码长度为3-6个字符',
          trigger: 'blur'
        }
        ],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        },
        {
          min: 6,
          max: 8,
          message: '密码长度为6-8个字符',
          trigger: 'blur'
        }
        ]
      }
    }
  },
  methods: {
    resetForm () {
      console.log(this)
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      // 获取表单引用对象，获取验证结果
      this.$refs.loginFormRef.validate(async valid => {
        console.log(valid)
        if (!valid) return
        const {
          data: result
        } = await this.$http.post('login', this.loginForm)
        console.log(result)
        if (result.meta.status == 200) {
          this.$message.success('登录成功！')
          console.log(result.data.token)
          // 登录成功之后将token保存到客户端的sessionStorage中
          window.sessionStorage.setItem('token', result.data.token)
          // 编程式导航，跳转到主页面
          this.$router.push('/home')
        } else {
          return this.$message.error('登录失败！')
        }
        /* this.$http.post('login', this.loginForm).then(result => {
            console.log(result.data);
            console.log(typeof result);
          }) */
      })
    }
  }
}
</script>

<!-- scoped保证该样式在只在当前组件作用 -->
<style lang="less" scoped>
  .login_container {
    background-color: #2b4b6b;
    height: 100%;
  }

  .login_box {
    height: 300px;
    width: 450px;
    background-color: #fff;
    border-radius: 5px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .avator_box {
      height: 130px;
      width: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px #ddd;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #FFFFFF;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }
  }

  .login_form {
    position: absolute;
    bottom: 0;
    width: 365px;
  }

  .btns {
    display: flex;
    justify-content: flex-end;
  }

  .leftBtn {
    margin-right: 8px;
  }
</style>
