<template>
  <div>
    <div class="cus-table-header">
      <list-search
        v-model="search"
        :condition="condition"
        :collection="collection"
      ></list-search>
      <a-button v-acl="'agent-add'" type="primary" @click="toEdit()"
        >新增代理</a-button
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
        <template v-acl="'agent-update'">
          <a-icon type="edit" title="编辑" @click="toEdit(data)" />
          <a-divider type="vertical"></a-divider>
        </template>
        <template v-acl="'agent-detail'">
          <a-icon type="eye" title="详情" @click="toDetail(data)" />
          <a-divider type="vertical"></a-divider>
        </template>
        <template v-acl="'agent-order.list'">
          <a-icon type="book" title="查看订单" @click="toOrder(data)" />
          <a-divider type="vertical"></a-divider>
        </template>
        <template v-acl="'agent-delete'">
          <a-popconfirm title="确认删除？" @confirm="toDelete(data.id)">
            <a-icon type="delete" title="删除" />
          </a-popconfirm>
        </template>
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
    placeholder: "代理名称",
  },
];

const columns = [
  {
    title: "代理名称",
    dataIndex: "name",
  },
  {
    title: "电话号码",
    dataIndex: "phone",
  },
  {
    title: "地区",
    dataIndex: "area",
  },
  {
    title: "店铺名称",
    dataIndex: "shop_name",
  },
  {
    title: "店铺地址",
    dataIndex: "address",
  },
  {
    title: "招商员",
    dataIndex: "merchants_name",
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
import AgentApi from "../../apis/agent";

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
      AgentApi.remove(e).then(() => {
        this.$message.success("操作成功");
        this._getList();
      });
    },
    toOrder(e) {
      this.$router.push(`/agent/order/${e.id}`);
    },
    _getList() {
      this.collection.loading = true;
      AgentApi.list(
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