
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
      <template slot="user" slot-scope="data">
        {{ data.map((_) => _.name).join("、") }}
      </template>
      <template slot="status" slot-scope="data">
        {{ orderStatusMap[data] }}
      </template>
      <template slot="operate" slot-scope="data">
        <a-icon type="eye" title="详情" @click="toDetail(data.id)" />
      </template>
    </a-table>

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
    title: "代理人",
    dataIndex: "order_agent.name",
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
import CusDetail from "../order/Detail";
import AgentApi from "../../apis/agent";
import { orderStatusMap } from "../order/mapping";

export default {
  components: {
    CusDetail,
  },
  mixins: [listMixin],
  data() {
    return {
      orderStatusMap,
      condition,
      columns,
      detailVisible: false,
    };
  },
  methods: {
    toDetail(e) {
      this.temp = e;
      this.detailVisible = true;
    },
    _getList() {
      this.collection.loading = true;
      AgentApi.order(
        Object.assign(
          {},
          {
            id: this.$route.params.id,
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