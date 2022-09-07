<template>
  <div class="flex flex-col w-full h-screen">
    <div class="flex-1 flex flex-col justify-between items-center w-full">
      <div class="flex py-7 px-4 box-border w-full">
        <div class="flex items-center">
          <img src="@/assets/vue.svg" />
          <div class="">COLD-ADMIN</div>
        </div>
      </div>
      <div class="max-w-[1200px] w-full">
        <div class="justify-center flex w-full">
          <div class="flex-1 flex items-center justify-between">
            <div class="w-[588px]">
              <div class="flex items-center justify-center">
                <div class="max-w-[588px] pt-5">
                  <img src="@/assets/loginBg.svg" alt="" class="w-[500px]" />
                </div>
              </div>
            </div>
            <div class="w-[400px]">
              <div class="bg-white rounded-lg w-[400px] p-10">
                <h2 class="text-3xl font-semibold text-gray-900">登录</h2>
                <n-form ref="formRef" :model="formValue" :rules="rules" :show-label="false">
                  <n-form-item label="用户名" path="username">
                    <n-input v-model:value="formValue.username" placeholder="用户名" />
                  </n-form-item>
                  <n-form-item label="密码" path="password">
                    <n-input v-model:value="formValue.password" type="password" placeholder="密码" />
                  </n-form-item>
                  <n-form-item>
                    <n-button
                      class="w-full mt-[10px]"
                      size="large"
                      type="success"
                      :loading="loading"
                      @click="handleLogin"
                      >登录</n-button
                    >
                  </n-form-item>
                </n-form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-start w-full">
        <div class="w-full text-left text-xs text-gray-900 p-3">Copyright © 2022 Cold-Admin . All rights reserved.</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ResultEnum } from '@/enums/httpEnum'
import { useUserStoreWidthOut } from '@/store'
import { FormInst, useMessage } from 'naive-ui'

defineOptions({
  name: 'Login'
})

const message = useMessage()
const userStore = useUserStoreWidthOut()
const router = useRouter()
const loading = ref(false)
const formRef = ref<FormInst | null>(null)
const formValue = reactive({
  username: 'admin',
  password: '123456'
})
const rules = {
  username: {
    required: true,
    message: '请输入用户名',
    trigger: ['input', 'blur']
  },
  password: {
    required: true,
    message: '请输入密码',
    trigger: ['input', 'blur']
  }
}

const handleLogin = (e: MouseEvent) => {
  e.preventDefault()

  formRef.value?.validate(async (errors) => {
    if (!errors) {
      message.loading('登录中...')
      loading.value = true
      try {
        const result = await userStore.login(formValue)
        message.destroyAll()
        if (result.code === ResultEnum.SUCCESS) {
          message.success('登录成功，即将进入系统')
          router.replace('/')
        } else {
          message.error(result.message)
        }
      } finally {
        loading.value = false
      }
    } else {
      message.error('请填写完整信息')
    }
  })
}
</script>

<style scoped lang="scss">
.n-card {
  width: 450px;
}
</style>
