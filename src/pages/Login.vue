<template>
  <div class="login-card">
    <a-form-model ref="form" class="login-form" :model="form" :rules="rules">
      <a-form-model-item prop="username">
        <a-input v-model="form.username" placeholder="用户名" allow-clear>
          <a-icon slot="prefix" type="user" class="login-form-icon" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item prop="password">
        <a-input
          type="password"
          v-model="form.password"
          placeholder="密码"
          allow-clear
        >
          <a-icon slot="prefix" type="lock" class="login-form-icon" />
        </a-input>
      </a-form-model-item>
      <a-button
        class="login-submit"
        size="large"
        type="primary"
        block
        :loading="loading"
        @click="login"
        >登录</a-button
      >
    </a-form-model>
  </div>
</template>

<script>
const rules = {
  username: [
    {
      required: true,
      message: "用户名不能为空！",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "密码不能为空！",
      trigger: "blur",
    },
  ],
};

export default {
  data() {
    return {
      rules,
      loading: false,
      form: {
        username: "admin",
        password: "admin",
      },
    };
  },
  methods: {
    login() {
      this.loading = true;
      this.$refs.form
        .validate()
        .then(() => {
          return this.$auth.login({ ...this.form }).then(() => {
            this.$message.success("登录成功");
            this.$router.push("/");
          });
        })
        .finally(() => (this.loading = false));
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  &-card {
    position: absolute;
    width: 100%;
    top: 35%;
    left: 0;
    transform: translateY(-50%);
    display: flex;
    justify-content: center;
  }

  &-form {
    width: 400px;

    &-icon {
      color: rgba(0, 0, 0, 0.25);
    }
  }

  &-submit {
    margin-top: 10px;
  }
}
</style>