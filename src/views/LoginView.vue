<template>
    <div class="login-box">
        <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            status-icon
            :rules="rules"
            label-width="120px"
            class="demo-ruleForm"
            label-position="top"
        >
            <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm.username" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input
                    v-model="ruleForm.password"
                    type="password"
                />
            </el-form-item>
            <el-form-item>
                <el-button class="login-btn" type="primary" @click="submitForm(ruleFormRef)">Submit</el-button>
                <el-button class="login-btn" @click="resetForm(ruleFormRef)">Reset</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { reactive, toRefs, ref, markRaw, unref } from 'vue'
import { useRouter } from 'vue-router';
import type { FormInstance, FormRules } from 'element-plus'
import { login } from '../requset/api';
const ruleFormRef = ref<FormInstance>()
const router = useRouter();
const data = reactive({
    ruleForm: {
        username: '',
        password: ''
    }
})

const validatePassword = (rule: any, value: any, callback: any) => {
    const len = value.trim().length;
    if (!value) {
        callback(new Error('请输入用户密码'))
    } else if (len < 3 || len >= 10) {
        callback(new Error('用户密码长度3-10'))
    } else {
        callback()
    }
}
const validateUsername = (rule: any, value: any, callback: any) => {
    const len = value.trim().length;
    if (!value) {
        callback(new Error('请输入用户名'))
    } else if (len < 2 || len > 6) {
        callback(new Error('用户名长度2-6'))
    } else {
        callback()
    }
}


const rules = reactive<FormRules>({
  password: [{ validator: validatePassword, trigger: 'blur' }],
  username: [{ validator: validateUsername, trigger: 'blur' }]
})

const resetForm = (formEL: FormInstance | undefined) => {
    if (!formEL) return;
    formEL.resetFields()
    
}

const submitForm = (formEL: FormInstance | undefined) => {
    if (!formEL) return;
    console.log(123);
    formEL.validate((isValidate: boolean) => {
        if (isValidate) {
            login(unref(ruleForm)).then((res) => {   
                localStorage.setItem('userInfo', JSON.stringify(res))
                localStorage.setItem('token', res.token);
                router.push('/')
            });
            
        } else {
            return false;
        }
        
    })
}


const { ruleForm } = toRefs(data)
</script>

<style lang="scss" scoped>
.login-box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    .demo-ruleForm{
        width: 500px;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 20px;
        .login-btn{
            width: 240px;
        }
    }
}
</style>