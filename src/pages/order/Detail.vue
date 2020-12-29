<template>
  <a-drawer
    :visible="visible"
    title="订单详情"
    width="800"
    destroyOnClose
    @close="close"
    wrapClassName="cus-drawer"
  >
    <table class="cus-table">
      <tr>
        <th colspan="8" class="title">计划确定书</th>
      </tr>
      <tr>
        <th>录单日期</th>
        <td colspan="2">{{ R.enter_date }}</td>
        <th>录单人</th>
        <td colspan="2">{{ R.name }}</td>
        <th>代理人</th>
        <td>{{ R.order_agent && R.order_agent.name }}</td>
      </tr>
      <tr>
        <th>游玩地区</th>
        <td colspan="2">{{ R.order_trip && R.order_trip.area }}</td>
        <th>路线名称</th>
        <td colspan="2">{{ R.order_trip && R.order_trip.name }}</td>
        <th>vip卡号</th>
        <td>{{ R.vip_card }}</td>
      </tr>
      <tr>
        <th>跟团日期</th>
        <td colspan="2">{{ R.up_group_date }}</td>
        <th>离团日期</th>
        <td colspan="2">{{ R.off_group_date }}</td>
        <th>人数</th>
        <td>
          {{ R.numbers }}
        </td>
      </tr>
      <tr>
        <th>总团费</th>
        <td>{{ R.tour_fee_amount }}</td>
        <th>定金</th>
        <td>{{ R.deposit_amount }}</td>
        <th>尾款金额</th>
        <td>{{ R.balance_amount }}</td>
        <th>代收款</th>
        <td>{{ R.collection_amount }}</td>
      </tr>
      <tr>
        <th>时间</th>
        <th colspan="5">行程安排</th>
        <th>用餐</th>
        <th>住宿</th>
      </tr>
      <tr v-for="(item, index) in R.order_trip_info" :key="'trip-' + index">
        <td>{{ item.date }}</td>
        <td colspan="5">{{ item.content }}</td>
        <td>{{ tripMealMap[item.meal] }}</td>
        <td>{{ tripStayMap[item.stay] }}</td>
      </tr>
      <tr>
        <th>姓名</th>
        <th colspan="4">证件号码</th>
        <th>联系号码</th>
        <th>类型</th>
        <th>证件</th>
      </tr>
      <tr v-for="(item, index) in R.order_staff" :key="'staff-' + index">
        <td>{{ item.name }}</td>
        <td colspan="4">{{ item.id_crad }}</td>
        <td>{{ item.phone }}</td>
        <td>{{ item.type }}</td>
        <td>{{ item.card_type }}</td>
      </tr>
      <tr>
        <th colspan="8">机票信息</th>
      </tr>
      <tr>
        <th>接站日期</th>
        <td colspan="2">{{ R.meet_day }}</td>
        <th>接站航班或者火车号</th>
        <td colspan="4">{{ R.meet_number }}</td>
      </tr>
      <tr>
        <th>送站日期</th>
        <td colspan="2">{{ R.leave_day }}</td>
        <th>送站航班或者火车号</th>
        <td colspan="4">{{ R.leave_number }}</td>
      </tr>
      <!-- <tr>
        <th colspan="8">上传航班照片</th>
      </tr>
      <tr>
        <th>去程航班（图）</th>
        <td colspan="2">图</td>
        <th>返程航班（图）</th>
        <td colspan="4">图</td>
      </tr> -->
      <tr>
        <th>备注</th>
        <td colspan="7">{{ R.remark }}</td>
      </tr>
    </table>
    <div class="cus-drawer-footer">
      <a-button v-acl="'order-exports'" type="dashed" @click="toExport"
        >导出</a-button
      >
      <template v-acl="'order-audit'" v-if="R.status == -1">
        <a-button type="danger" @click="toReject">驳回</a-button>
        <a-button type="primary" @click="toPass">通过</a-button>
      </template>
    </div>
  </a-drawer>
</template>

<script>
import detailMinxin from "../../mixins/detail";
import { tripMealMap, tripStayMap } from "../trip/mapping";
import OrderApi from "../../apis/order";
import utils from "../../libs/utils";

export default {
  mixins: [detailMinxin],
  data() {
    return {
      tripMealMap,
      tripStayMap,
    };
  },
  methods: {
    _getDetail(e) {
      return OrderApi.detail(e);
    },
    toExport() {
      OrderApi.export(this.R.id).then((res) => {
        utils
          .export(res, `订单-${this.R.ordersn}`)
          .then(() => this.$message.success("导出成功"));
      });
    },
    toReject() {
      OrderApi.reject(this.R.id).then((res) => {
        this.$message.success("操作成功");
        this.$emit("refresh", res);
        this.close();
      });
    },
    toPass() {
      OrderApi.pass(this.R.id).then((res) => {
        this.$message.success("操作成功");
        this.$emit("refresh", res);
        this.close();
      });
    },
  },
};
</script>

<style lang="less" scoped>
.cus-table {
  .title {
    font-size: 20px;
    text-align: center;
  }
}
</style>