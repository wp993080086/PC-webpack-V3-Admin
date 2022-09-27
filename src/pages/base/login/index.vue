<template>
  <div id="login_box" @click.self="handleChangePanda(0)">
    <div class="login_box_center">
      <div class="login_box_content">
        <img :src="loginState.panda[loginState.focus]" class="panda" />
        <div class="logo">
          <img src="../../../static/images/pdd.png" />
        </div>
        <div class="form_box">
          <el-form ref="loginFormRef" label-position="top" :rules="loginState.rules" :model="loginState.info">
            <el-form-item prop="phone">
              <el-input v-model="loginState.info.phone" placeholder="账号" clearable @focus="handleChangePanda(1)" />
            </el-form-item>
            <el-form-item prop="pwd">
              <el-input
                v-model="loginState.info.password"
                placeholder="密码"
                clearable
                show-password
                @keyup.enter="submitForm"
                @focus="handleChangePanda(2)"
              />
            </el-form-item>
            <el-form-item>
              <div class="login_btn">
                <el-button type="primary" @click="submitForm" v-loading="loginState.loading">登录</el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="footer_btn">
          <span class="sign_in_text" @click="toSignin">去注册</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElForm } from 'element-plus'
import CreateSnow from '@/utils/snowflake'
import panda1 from '@/static/images/login/panda_1.png'
import panda2 from '@/static/images/login/panda_2.png'
import panda3 from '@/static/images/login/panda_3.png'
import snow1 from '@/static/images/login/snow1.png'
import snow2 from '@/static/images/login/snow2.png'
import { Toast } from '@/utils/toast'
import loginHttp from '@/servers/api/login'

const router = useRouter()
// 登录信息
const loginFormRef = ref<InstanceType<typeof ElForm>>()
const loginState = reactive({
  info: {
    phone: 'admin',
    password: '123456'
  },
  rules: {
    phone: [
      { required: true, message: '请输入账号', trigger: 'blur' },
      { min: 5, max: 18, message: '长度在 5 到 18 个字符', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
    ]
  },
  panda: [panda1, panda2, panda3],
  focus: 0,
  cookie: '',
  token: '',
  userMsg: '', // 用户信息
  loading: false
})
// 修改熊猫
const handleChangePanda = (type: number) => {
  loginState.focus = type
}
// 登录成功
const handleLoginSucceed = () => {
  Toast('登录成功，即将跳转', { type: 'success' })
  loginState.loading = false
  console.log(router)
  // router.push({
  //   name: 'home'
  // })
}
// 登录
const handleLogin = async () => {
  loginState.loading = true
  try {
    const res = await loginHttp.login({
      userName: loginState.info.phone,
      password: loginState.info.password
    })
    console.log(res)
    handleLoginSucceed()
  } catch (error) {
    loginState.loading = false
    console.error(error)
  }
}
// 登录校验
const submitForm = () => {
  loginFormRef.value?.validate(valid => {
    if (valid) {
      handleLogin()
    }
  })
}
// 去注册
const toSignin = () => false

// 雪花
const snowTimes = ref<ReturnType<typeof setTimeout>>()
const startSnow = (src1: TAny, src2: TAny, num: number) => {
  const snowArr: Array<TAny> = []
  for (let j = 0; j < num; j++) {
    snowArr.push(new CreateSnow('login_box', src1, src2))
  }
  snowTimes.value = setInterval(() => {
    // 找到数组中的最新的一个
    for (let i = snowArr.length - 1; i >= 0; i--) {
      if (snowArr[i]) {
        snowArr[i].move()
      }
    }
  }, 30)
}
// 挂载
onMounted(() => {
  startSnow(snow1, snow2, 30)
})
// 销毁
onUnmounted(() => {
  clearInterval(snowTimes.value)
})
</script>

<style lang="scss" scoped src="./styles.scss"></style>
