<template>
  <a-modal
    :visible="visible"
    title="导入资源"
    destroyOnClose
    :confirmLoading="loading"
    @cancel="close"
    @ok="submit"
  >
    <a-upload-dragger
      :fileList="fileList"
      :beforeUpload="beforeUpload"
      :customRequest="request"
      :remove="remove"
    >
      <p class="ant-upload-drag-icon">
        <a-icon type="inbox" />
      </p>
      <p class="ant-upload-text">点击或拖拽文件到此区域</p>
    </a-upload-dragger>
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
      fileList: [],
      fileType: ["xls", "xlsx", "csv"],
    };
  },
  methods: {
    beforeUpload(e) {
      let type = e.name.substring(e.name.lastIndexOf(".") + 1);
      if (!~this.fileType.indexOf(type.toLowerCase())) {
        this.$message.error(`文件${e.name}上传失败,不支持该文件类型!`);
        e.status = "unqualified";
        return false;
      }
      return true;
    },
    remove() {
      this.fileList = [];
    },
    request(e) {
      this.fileList = [e.file];
    },
    submit() {
      this.loading = true;
      let param = new FormData();
      param.set("excel", this.fileList[0]);
      ResourceApi.import(param)
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
