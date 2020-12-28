<template>
  <a-modal
    :visible="visible"
    :title="title"
    destroyOnClose
    :confirmLoading="loading"
    width="700px"
    @cancel="close"
    @ok="submit"
  >
    <a-form-model
      ref="form"
      :model="form"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 19 }"
    >
      <a-form-model-item label="代理人名称" required prop="name">
        <a-input v-model="form.name" allow-clear />
      </a-form-model-item>
      <a-form-model-item label="电话号码" required prop="phone">
        <a-input v-model="form.phone" allow-clear />
      </a-form-model-item>
      <a-form-model-item label="地区" required prop="area">
        <a-input v-model="form.area" allow-clear />
      </a-form-model-item>
      <a-form-model-item label="店铺名称" required prop="shop_name">
        <a-input v-model="form.shop_name" allow-clear />
      </a-form-model-item>
      <a-form-model-item label="店铺地址" required prop="address">
        <a-input v-model="form.address" allow-clear />
      </a-form-model-item>
      <a-form-model-item label="招商员" required prop="merchants_name">
        <a-input v-model="form.merchants_name" allow-clear />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import editMixin from "../../mixins/edit";
import AgentApi from "../../api/agent";

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
          area: this.R.area,
          shop_name: this.R.shop_name,
          address: this.R.address,
          merchants_name: this.R.merchants_name,
        };
      }
    },
  },
  computed: {
    title() {
      return this.isEdit ? "编辑代理人" : "新增代理人";
    },
  },
  methods: {
    submit() {
      this.loading = true;
      if (this.isEdit) {
        return AgentApi.update({ ...this.form })
          .then((res) => {
            this.$message.success("保存成功");
            this.$emit("refresh", res);
            this.close();
          })
          .finally(() => (this.loading = false));
      } else {
        return AgentApi.create({ ...this.form })
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

<style lang="less" scoped>
/deep/ .sortable-chosen {
  cursor: move;
}
.block {
  border: 1px dashed #cccccc;
  border-radius: 4px;
  margin-top: 10px;
  padding: 5px 10px;
  background: #ffffff;
  cursor: move;

  &:first-of-type {
    margin: 0;
  }

  .close {
    color: red;
  }
}
</style>