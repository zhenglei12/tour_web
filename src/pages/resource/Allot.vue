<template>
  <a-modal
    :visible="visible"
    title="批量分配"
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
      <a-form-model-item label="业务员名称" required prop="man_name">
        <!-- <a-input v-model="form.man_name" allow-clear /> -->
        <a-select
          v-model="form.man_name"
          allowClear
          :dropdownMatchSelectWidth="false"
        >
          <a-select-option
            v-for="(option, index) in allUser"
            :key="index"
            :value="option.name"
          >
            {{ option.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="条数" required prop="row">
        <a-input v-model="form.row" allow-clear />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import editMixin from "../../mixins/edit";
import ResourceApi from "../../apis/resource";
import PublicApi from "../../apis/public";

export default {
  mixins: [editMixin],
  data() {
    return {
      loading: false,
      form: {},
      allUser: [],
    };
  },
  watch: {
    visible(e) {
      if (e) {
        this.form = {
          man_name: this.R.man_name,
          row: this.R.row,
        };
      }
    },
  },
  created() {
    PublicApi.roleUserList("staff").then((res) => {
      this.allUser = res.list;
    });
  },
  methods: {
    submit() {
      this.loading = true;
      ResourceApi.allot({ ...this.form })
        .then((res) => {
          this.$message.success("保存成功");
          this.$emit("refresh", res);
          this.close();
        })
        .finally(() => (this.loading = false));
    },
  },
};
</script>
