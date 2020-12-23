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
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 19 }"
    >
      <a-form-model-item label="名称" required prop="alias">
        <a-input v-model="form.alias" allow-clear />
      </a-form-model-item>
      <a-form-model-item label="标识" required prop="name">
        <a-input v-model="form.name" allow-clear />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import editMixin from "../../mixins/edit";
import PermissionApi from "../../api/permission";

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
          alias: this.R.alias,
        };
      }
    },
  },
  computed: {
    title() {
      return this.isEdit ? "编辑权限" : "新增权限";
    },
  },
  methods: {
    submit() {
      this.loading = true;
      if (this.isEdit) {
        return PermissionApi.update({ ...this.form })
          .then((res) => {
            this.$message.success("保存成功");
            this.$emit("refresh", res);
            this.close();
          })
          .finally(() => (this.loading = false));
      } else {
        return PermissionApi.create({ ...this.form })
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
