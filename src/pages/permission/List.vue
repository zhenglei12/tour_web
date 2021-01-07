<template>
  <div>
    <div class="cus-table-header">
      <list-search
        v-model="search"
        :condition="condition"
        :collection="collection"
      ></list-search>
      <a-button v-acl="'permission-add'" type="primary" @click="toEdit()"
        >新增权限</a-button
      >
    </div>
    <a-table
      :columns="columns"
      :data-source="collection.list"
      :loading="collection.loading"
      :pagination="{
        total: collection.total,
        current: collection.page,
        pageSize: collection.pageSize,
        showSizeChanger: true,
      }"
      bordered
      rowKey="id"
      @change="listChange"
    >
      <template slot="operate" slot-scope="data">
        <span v-acl="'permission-update'">
          <a-icon type="edit" title="编辑" @click="toEdit(data)" />
          <a-divider type="vertical"></a-divider>
        </span>
        <!-- <a-divider type="vertical"></a-divider>
        <a-icon type="eye" title="详情" @click="toDetail(data)" /> -->
        <span v-acl="'permission-delete'">
          <a-popconfirm title="确认删除？" @confirm="toDelete(data.id)">
            <a-icon type="delete" title="删除" />
          </a-popconfirm>
        </span>
      </template>
    </a-table>

    <!-- 编辑 -->
    <cus-edit v-model="editVisible" :data="temp" @refresh="_getList"></cus-edit>

    <!-- 详情 -->
    <!-- <cus-detail
      v-model="detailVisible"
      :data="temp"
      @refresh="_getList"
    ></cus-detail> -->
  </div>
</template>

<script>
const condition = [
  {
    key: "alias",
    placeholder: "权限名称",
  },
];

const columns = [
  {
    title: "权限名称",
    dataIndex: "alias",
  },
  {
    title: "权限标识",
    dataIndex: "name",
  },
  {
    title: "所属组",
    dataIndex: "_group",
  },
  {
    title: "创建时间",
    dataIndex: "created_at",
  },
  {
    title: "操作",
    scopedSlots: { customRender: "operate" },
  },
];

import listMixin from "../../mixins/list";
import CusEdit from "./Edit";
// import CusDetail from "./Detail";
import PermissionApi from "../../apis/permission";

export default {
  components: {
    CusEdit,
    // CusDetail,
  },
  mixins: [listMixin],
  data() {
    return {
      condition,
      columns,
      editVisible: false,
      detailVisible: false,
    };
  },
  methods: {
    // toDetail(e) {
    //   this.temp = e;
    //   this.detailVisible = true;
    // },
    toEdit(e) {
      this.temp = e;
      this.editVisible = true;
    },
    toDelete(e) {
      PermissionApi.remove(e).then(() => {
        this.$message.success("操作成功");
        this._getList();
      });
    },
    _getList() {
      this.collection.loading = true;
      PermissionApi.list(
        Object.assign(
          {},
          {
            page: this.collection.page,
            pageSize: this.collection.pageSize,
          },
          this.search
        )
      ).then((res) => {
        this.collection.list = res.list.map((_) => {
          try {
            _._group = _.name.split("-")[0];
          } catch (e) {
            console.warn(e);
          }
          return _;
        });
        this.collection.total = res.total;
        this.collection.loading = false;
      });
    },
  },
};
</script>