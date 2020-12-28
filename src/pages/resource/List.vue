<template>
  <div>
    <div class="cus-table-header">
      <list-search
        v-model="search"
        :condition="condition"
        :collection="collection"
      ></list-search>
      <div class="btns">
        <a-button type="primary" @click="allotVisible = true"
          >批量分配</a-button
        >
        <a-button type="primary" @click="importVisible = true"
          >导入资源</a-button
        >
        <a-button type="primary" @click="toEdit()">新增资源</a-button>
      </div>
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
        showTotal: (total) => `共 ${total} 条数据`,
      }"
      bordered
      rowKey="id"
      @change="listChange"
    >
      <template slot="operate" slot-scope="data">
        <a-icon type="edit" title="编辑" @click="toEdit(data)" />
        <!-- <a-divider type="vertical"></a-divider>
        <a-icon type="eye" title="详情" @click="toDetail(data)" /> -->
        <a-divider type="vertical"></a-divider>
        <a-popconfirm title="确认删除？" @confirm="toDelete(data.id)">
          <a-icon type="delete" title="删除" />
        </a-popconfirm>
      </template>
    </a-table>

    <!-- 编辑 -->
    <cus-edit v-model="editVisible" :data="temp" @refresh="_getList"></cus-edit>

    <!-- 导入 -->
    <cus-import v-model="importVisible" @refresh="_getList"></cus-import>

    <!-- 分配 -->
    <cus-allot v-model="allotVisible" @refresh="_getList"></cus-allot>

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
    key: "name",
    placeholder: "资源名",
  },
];

const columns = [
  {
    title: "资源名",
    dataIndex: "name",
  },
  {
    title: "电话号码",
    dataIndex: "phone",
  },
  {
    title: "收件地址",
    dataIndex: "address",
  },
  {
    title: "发货信息",
    dataIndex: "send_info",
  },
  {
    title: "业务员名称",
    dataIndex: "man_name",
  },
  {
    title: "买家昵称",
    dataIndex: "nickname",
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
import CusImport from "./Import";
import CusAllot from "./Allot";
import ResourceApi from "../../api/resource";

export default {
  components: {
    CusEdit,
    // CusDetail,
    CusImport,
    CusAllot,
  },
  mixins: [listMixin],
  data() {
    return {
      condition,
      columns,
      editVisible: false,
      // detailVisible: false,
      importVisible: false,
      allotVisible: false,
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
      ResourceApi.remove(e).then(() => {
        this.$message.success("操作成功");
        this._getList();
      });
    },
    _getList() {
      this.collection.loading = true;
      ResourceApi.list(
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