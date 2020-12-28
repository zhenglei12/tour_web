<template>
  <a-modal
    :visible="visible"
    title="关联权限"
    destroyOnClose
    :confirmLoading="loading"
    width="1024px"
    @cancel="close"
    @ok="submit"
  >
    <div
      class="group-container"
      v-for="(group, index) in allPermission.items || []"
      :key="'group-' + index"
    >
      <div class="group-header">
        <a-checkbox
          :indeterminate="group.anyChecked"
          v-model="group.checked"
          :disabled="group.disabled"
          >{{ group.name }}</a-checkbox
        >
      </div>
      <div class="group-items">
        <a-checkbox
          v-for="(item, index) in group.items || []"
          v-model="item.checked"
          :disabled="item.disabled"
          :key="'item-' + index"
          class="item"
        >
          {{ item.alias }}
        </a-checkbox>
      </div>
    </div>
  </a-modal>
</template>

<script>
import editMixin from "../../mixins/edit";
import PermissionApi from "../../api/permission";
import { PermissionGroup } from "../../model/Permission";

export default {
  mixins: [editMixin],
  data() {
    return {
      loading: false,
      form: {},
      allPermission: {},
    };
  },
  watch: {
    visible(e) {
      if (e) {
        console.log(this.R);
      }
    },
  },
  created() {
    this.getAllPermission();
  },
  methods: {
    getAllPermission() {
      PermissionApi.all().then((res) => {
        this.allPermission = new PermissionGroup(res.list);
      });
    },
    beforeClose() {},
    submit() {
      //   this.loading = true;
      console.log(this.form);
    },
  },
};
</script>

<style lang="less" scoped>
.group-container {
  .group-header {
    background-color: #f0f2f5;
    font-weight: bold;
    padding: 4px 8px;
    position: sticky;
    top: 0;
    z-index: 1;
  }

  .group-items {
    display: flex;
    margin: 8px;

    .item {
      width: 120px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      vertical-align: sub;
      margin: 4px 8px 4px 0;
    }
  }
}
</style>