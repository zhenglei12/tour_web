
<template>
  <div>
    <div class="cus-table-header">
      <list-search
        v-model="search"
        :condition="condition"
        :collection="collection"
      ></list-search>
    </div>
    <div class="cus-table-header">
      <div class="statistic">
        <template v-if="statistic">
          <span>当月业绩：{{ statistic.month_count }}</span>
          <span>累计业绩：{{ statistic.count }}</span>
        </template>
      </div>
      <a-button type="primary" @click="toEdit()">录入订单</a-button>
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
      <template slot="user" slot-scope="data">
        {{ data.map((_) => _.name).join("、") }}
      </template>
      <template slot="status" slot-scope="data">
        {{ orderStatusMap[data] }}
      </template>
      <template slot="operate" slot-scope="data">
        <div class="cus-nowrap">
          <a-icon type="edit" title="编辑" @click="toEdit(data.id)" />
          <a-divider type="vertical"></a-divider>
          <a-icon type="eye" title="详情" @click="toDetail(data.id)" />
          <a-divider type="vertical"></a-divider>
          <a-icon type="export" title="导出" @click="toExport(data)" />
        </div>
        <!-- <a-divider type="vertical"></a-divider>
        <a-popconfirm title="确认删除？" @confirm="toDelete(data.id)">
          <a-icon type="delete" title="删除" />
        </a-popconfirm> -->
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
    placeholder: "制单人",
  },
  {
    key: "status",
    type: "select",
    options: [
      {
        label: "审核中",
        value: -1,
      },
      {
        label: "审核通过",
        value: 1,
      },
    ],
    placeholder: "订单状态",
  },
  {
    key: "vip_card",
    placeholder: "vip卡号",
  },
];

const columns = [
  {
    title: "订单编号",
    dataIndex: "ordersn",
  },
  {
    title: "路线名称",
    dataIndex: "order_trip.name",
  },
  {
    title: "游玩地区",
    dataIndex: "area",
  },
  {
    title: "出团日期",
    dataIndex: "up_group_date",
  },
  {
    title: "离团日期",
    dataIndex: "off_group_date",
  },
  {
    title: "总团费",
    dataIndex: "tour_fee_amount",
  },
  {
    title: "返利",
    dataIndex: "rebate_amount",
  },
  {
    title: "游客数",
    dataIndex: "numbers",
  },
  {
    title: "客户姓名",
    dataIndex: "order_staff",
    scopedSlots: { customRender: "user" },
  },
  {
    title: "VIP卡号",
    dataIndex: "vip_card",
  },
  {
    title: "制单人",
    dataIndex: "name",
  },
  {
    title: "订单状态",
    dataIndex: "status",
    scopedSlots: { customRender: "status" },
  },
  {
    title: "创建日期",
    dataIndex: "created_at",
  },
  {
    title: "操作",
    scopedSlots: { customRender: "operate" },
  },
];

import listMixin from "../../mixins/list";
import CusEdit from "./EditModal";
import CusDetail from "./Detail";
import OrderApi from "../../api/order";
import Utils from "../../libs/utils";
import { orderStatusMap } from "./mapping";

export default {
  components: {
    CusEdit,
    CusDetail,
  },
  mixins: [listMixin],
  data() {
    return {
      orderStatusMap,
      condition,
      columns,
      statistic: null,
      editVisible: false,
      detailVisible: false,
    };
  },
  created() {
    this.getStatistic();
  },
  methods: {
    toExport(e) {
      OrderApi.export(e.id).then((res) => {
        Utils.export(res, `订单-${e.ordersn}`);
      });
    },
    toDetail(e) {
      this.temp = e;
      this.detailVisible = true;
    },
    toEdit(e) {
      if (e) {
        OrderApi.detail(e).then((res) => {
          this.temp = res;
          this.editVisible = true;
        });
      } else {
        this.temp = e;
        this.editVisible = true;
      }
    },
    // toDelete(e) {
    //   OrderApi.remove(e).then(() => {
    //     this.$message.success("操作成功");
    //     this._getList();
    //   });
    // },
    getStatistic() {
      OrderApi.statistic().then((res) => {
        this.statistic = res;
      });
    },
    _getList() {
      this.collection.loading = true;
      OrderApi.list(
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

<style lang="less" scoped>
.statistic {
  font-size: 20px;
  color: red;

  span:first-of-type {
    margin-right: 50px;
  }
}
</style>