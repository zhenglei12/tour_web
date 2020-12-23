<template>
  <div>
    <div class="cus-table-header">
      <list-search
        v-model="search"
        :condition="condition"
        :collection="collection"
      ></list-search>
      <a-button type="primary" @click="toEdit()">新增角色</a-button>
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
        <a-icon type="edit" title="编辑" @click="toEdit(data)" />
        <a-divider type="vertical"></a-divider>
        <a-icon type="eye" title="详情" @click="toDetail(data)" />
        <a-divider type="vertical"></a-divider>
        <a-icon type="api" title="关联权限" @click="toManager(data)" />
        <a-divider type="vertical"></a-divider>
        <a-popconfirm title="确认删除？" @confirm="toDelete(data.id)">
          <a-icon type="delete" title="删除" />
        </a-popconfirm>
      </template>
    </a-table>

    <!-- 编辑 -->
    <cus-edit v-model="editVisible" :data="temp" @refresh="_getList"></cus-edit>

    <!-- 详情 -->
    <cus-detail
      v-model="detailVisible"
      :data="temp"
      @refresh="_getList"
    ></cus-detail>
  </div>
</template>

<script>
const condition = [
  {
    key: "name",
    placeholder: "角色名",
  },
];

const columns = [
  {
    title: "角色名",
    dataIndex: "name",
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
import CusDetail from "./Detail";
import RoleApi from "../../api/role";

export default {
  components: {
    CusEdit,
    CusDetail,
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
    toDetail(e) {
      this.temp = e;
      this.detailVisible = true;
    },
    toEdit(e) {
      this.temp = e;
      this.editVisible = true;
    },
    toDelete(e) {
      RoleApi.remove(e).then(() => {
        this.$message.success("操作成功");
        this._getList();
      });
    },
    toManager(e) {
      console.log(e);
    },
    _getList() {
      this.collection.loading = true;
      RoleApi.list(
        Object.assign(
          {},
          {
            page: this.collection.page,
            pageSize: this.collection.pageSize,
          },
          this.search
        )
      ).then((res) => {
        this.collection.list = res.list;
        this.collection.total = res.total;
        this.collection.loading = false;
      });
    },
  },
};
</script>