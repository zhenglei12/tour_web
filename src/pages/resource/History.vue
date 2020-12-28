<template>
  <div>
    <div class="cus-table-header">
      <list-search
        v-model="search"
        :condition="condition"
        :collection="collection"
      ></list-search>
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
      <!-- <template slot="operate" slot-scope="data">
        <a-icon type="edit" title="编辑" @click="toEdit(data)" />
        <a-divider type="vertical"></a-divider>
        <a-icon type="eye" title="详情" @click="toDetail(data)" />
        <a-divider type="vertical"></a-divider>
        <a-popconfirm title="确认删除？" @confirm="toDelete(data.id)">
          <a-icon type="delete" title="删除" />
        </a-popconfirm>
      </template> -->
    </a-table>
  </div>
</template>

<script>
const condition = [
  {
    key: "name",
    placeholder: "资源名",
  },
  {
    key: "man_name",
    placeholder: "业务员名称",
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
  // {
  //   title: "操作",
  //   scopedSlots: { customRender: "operate" },
  // },
];

import listMixin from "../../mixins/list";
import ResourceApi from "../../api/resource";

export default {
  mixins: [listMixin],
  data() {
    return {
      condition,
      columns,
    };
  },
  methods: {
    _getList() {
      this.collection.loading = true;
      ResourceApi.history(
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