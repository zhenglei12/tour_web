<template>
  <a-modal
    :visible="visible"
    :title="title"
    destroyOnClose
    :confirmLoading="loading"
    @cancel="close"
    @ok="submit"
  >
    <a-form-model
      ref="form"
      :model="form"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-model-item label="姓名" required prop="name">
        <a-input v-model="form.name" allow-clear />
      </a-form-model-item>
      <a-form-model-item label="电话号码" required prop="phone">
        <a-input v-model="form.phone" allow-clear />
      </a-form-model-item>
      <a-form-model-item label="收件地址" required prop="address">
        <a-input v-model="form.address" allow-clear />
      </a-form-model-item>
      <a-form-model-item label="发货信息" required prop="send_info">
        <a-input v-model="form.send_info" allow-clear />
      </a-form-model-item>
      <a-form-model-item label="买家昵称" required prop="nickname">
        <a-input v-model="form.nickname" allow-clear />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import editMixin from "../../mixins/edit";
import ResourceApi from "../../apis/resource";

export default {
  mixins: [editMixin],
  data() {
    return {
      loading: false,
      form: {},
    };
  },
  watch: {
    visible(e) {
      if (e) {
        this.form = {
          id: this.R.id,
          name: this.R.name,
          phone: this.R.phone,
          address: this.R.address,
          send_info: this.R.send_info,
          nickname: this.R.nickname,
        };
      }
    },
  },
  created() {
    let user = this.$auth.user();
    this.isService = !!user.roles.find((_) => _.alias == "staff");
  },
  computed: {
    title() {
      return this.isEdit ? "编辑资源" : "新增资源";
    },
  },
  methods: {
    submit() {
      this.loading = true;
      if (this.isEdit) {
        return ResourceApi.update({ ...this.form })
          .then((res) => {
            this.$message.success("保存成功");
            this.$emit("refresh", res);
            this.close();
          })
          .finally(() => (this.loading = false));
      } else {
        this.form.man_name = this.isService
          ? this.$auth.user().name
          : undefined;
        return ResourceApi.create({ ...this.form })
          .then((res) => {
            this.$message.success("保存成功");
            this.$emit("refresh", res);
            this.close();
          })
          .finally(() => (this.loading = false));
      }
    },
  },
};
</script>
