<template>
  <div>
    <table class="cus-table">
      <tr>
        <th colspan="8" class="title">计划确定书</th>
      </tr>
      <tr>
        <th class="required">录单日期</th>
        <td colspan="2">
          <a-date-picker v-model="form.enter_date" valueFormat="YYYY-MM-DD" />
        </td>
        <th class="required">录单人</th>
        <td colspan="2">
          {{ form.name }}
        </td>
        <th class="required">代理人</th>
        <td>
          <a-select
            v-model="form.a_id"
            allowClear
            :dropdownMatchSelectWidth="false"
          >
            <a-select-option
              v-for="(option, index) in agentList"
              :key="index"
              :value="option.id | string"
            >
              {{ option.name }}
            </a-select-option>
          </a-select>
        </td>
      </tr>
      <tr>
        <th class="required">路线名称</th>
        <td colspan="2">
          <a-select
            v-model="form.t_id"
            allowClear
            :dropdownMatchSelectWidth="false"
            @change="tripChange"
          >
            <a-select-option
              v-for="(option, index) in tripList"
              :key="index"
              :value="option.id | string"
            >
              {{ option.name }}
            </a-select-option>
          </a-select>
        </td>
        <th class="required">游玩地区</th>
        <td colspan="2">
          <a-input v-model="form.area" />
        </td>
        <th class="required">vip卡号</th>
        <td>
          <a-input v-model="form.vip_card" />
        </td>
      </tr>
      <tr>
        <th class="required">跟团日期</th>
        <td colspan="2">
          <a-date-picker
            v-model="form.up_group_date"
            :disabledDate="disabledEndDate"
            valueFormat="YYYY-MM-DD"
            @change="formatTripList"
          />
          <!-- {{ form.up_group_date }} -->
        </td>
        <th class="required">离团日期</th>
        <td colspan="2">
          <a-date-picker
            v-model="form.off_group_date"
            :disabledDate="disabledStartDate"
            valueFormat="YYYY-MM-DD"
            @change="formatTripList"
          />
          <!-- {{ form.off_group_date }} -->
        </td>
        <th class="required">人数</th>
        <td>
          <a-input-number
            v-model="form.numbers"
            :min="1"
            @blur="numberChange"
          />
        </td>
      </tr>
      <tr>
        <th class="required">总团费</th>
        <td>
          <a-input-number v-model="form.tour_fee_amount" :min="0" />
        </td>
        <th class="required">定金</th>
        <td>
          <a-input-number v-model="form.deposit_amount" :min="0" />
        </td>
        <th class="required">尾款金额</th>
        <td>
          <a-input-number v-model="form.balance_amount" :min="0" />
        </td>
        <th class="required">代收款</th>
        <td>
          <a-input-number v-model="form.collection_amount" :min="0" />
        </td>
      </tr>
      <template v-if="form.t_id">
        <tr>
          <th>时间</th>
          <th colspan="5">行程安排</th>
          <th>用餐</th>
          <th>住宿</th>
          <th class="no-border">
            <a-icon
              type="plus"
              title="添加行程"
              class="btn-add"
              @click="addTrip"
            ></a-icon>
          </th>
        </tr>
        <tr v-for="(item, index) in form.trip_info" :key="'trip-' + index">
          <td>{{ item.date }}</td>
          <!-- <td>
            <a-date-picker
              v-model="item.date"
              placeholder="日期"
              valueFormat="YYYY-MM-DD"
            />
          </td> -->
          <!-- <td v-if="item.t_id" colspan="5">{{ item.content }}</td> -->
          <td colspan="5">
            <a-textarea
              v-model="item.content"
              placeholder="具体行程"
              :autoSize="{ minRows: 1, maxRows: 3 }"
            ></a-textarea>
          </td>
          <!-- <td v-if="item.t_id">{{ tripMealMap[item.meal] }}</td> -->
          <td>
            <a-select v-model="item.meal" placeholder="用餐安排" allowClear>
              <a-select-option
                v-for="(meal, i) in meals"
                :key="'meal-' + i"
                :value="meal.value"
                >{{ meal.label }}</a-select-option
              >
            </a-select>
          </td>
          <!-- <td v-if="item.t_id">{{ tripStayMap[item.stay] }}</td> -->
          <td>
            <a-select v-model="item.stay" placeholder="住宿安排" allowClear>
              <a-select-option
                v-for="(option, i) in stays"
                :key="'stay-' + i"
                :value="option.value"
                >{{ option.label }}</a-select-option
              >
            </a-select>
          </td>
          <td class="no-border btn-del">
            <a-icon type="delete" title="删除" @click="delTrip(index)"></a-icon>
          </td>
        </tr>
      </template>
      <tr>
        <th class="required">姓名</th>
        <th class="required" colspan="4">证件号码</th>
        <th class="required">联系号码</th>
        <th class="required">类型</th>
        <th class="required">证件</th>
      </tr>
      <tr v-for="(item, index) in form.order_staff" :key="'staff-' + index">
        <td>
          <a-input v-model="item.name" placeholder="姓名" />
        </td>
        <td colspan="4">
          <a-input v-model="item.id_crad" placeholder="证件号码" />
        </td>
        <td>
          <a-input v-model="item.phone" placeholder="联系号码" />
        </td>
        <td>
          <a-input v-model="item.type" placeholder="类型" />
        </td>
        <td>
          <a-input v-model="item.card_type" placeholder="证件" />
        </td>
      </tr>
      <tr>
        <th colspan="8">机票信息</th>
      </tr>
      <tr>
        <th>接站日期</th>
        <td colspan="2">
          <a-date-picker v-model="form.meet_day" valueFormat="YYYY-MM-DD" />
        </td>
        <th>接站航班或者火车号</th>
        <td colspan="4">
          <a-input
            v-model="form.meet_number"
            placeholder="接站航班或者火车号"
          />
        </td>
      </tr>
      <tr>
        <th>送站日期</th>
        <td colspan="2">
          <a-date-picker v-model="form.leave_day" valueFormat="YYYY-MM-DD" />
        </td>
        <th>送站航班或者火车号</th>
        <td colspan="4">
          <a-input
            v-model="form.leave_number"
            placeholder="送站航班或者火车号"
          />
        </td>
      </tr>
      <!-- <tr>
        <th colspan="8">上传航班照片</th>
      </tr>
      <tr>
        <th>去程航班（图）</th>
        <td colspan="2">
          <a-upload
            name="avatar"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          >
            <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
            <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
        </td>
        <th>返程航班（图）</th>
        <td colspan="4">
          <a-upload
            name="avatar"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          >
            <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
            <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
        </td>
      </tr> -->
      <tr>
        <th>备注</th>
        <td colspan="7">
          <a-textarea
            v-model="form.remark"
            :autoSize="{ minRows: 3, maxRows: 5 }"
            placeholder="备注"
          />
        </td>
      </tr>
    </table>
    <a-button
      v-if="!inModal"
      style="margin-top: 16px"
      type="primary"
      :loading="loading"
      @click="submit"
      >保存</a-button
    >
  </div>
</template>

<script>
import TripApi from "../../apis/trip";
import AgentApi from "../../apis/agent";
import OrderApi from "../../apis/order";
import Utils from "../../libs/utils";
import { tripMealMap, tripStayMap } from "../trip/mapping";
import * as moment from "moment";

export default {
  props: {
    data: Object,
    inModal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tripMealMap,
      tripStayMap,
      meals: Utils.mapToArray(tripMealMap),
      stays: Utils.mapToArray(tripStayMap),
      loading: false,
      form: Object.assign(
        {},
        {
          numbers: 1,
          order_staff: [{}],
          trip_info: [],
          name: this.$auth.user().name,
        },
        this.data
      ),
      tripList: [],
      agentList: [],
    };
  },
  created() {
    console.log(this.form);
    this.getTripList();
    this.getAgentList();
  },
  methods: {
    numberChange() {
      this.form.order_staff = new Array(this.form.numbers)
        .fill({})
        .map((_, i) => Object.assign({}, _, this.form.order_staff[i]));
    },
    getTripList() {
      return TripApi.select({
        page: 1,
        pageSize: 10000,
      }).then((res) => {
        console.log("行程列表", res.list);
        this.tripList = res.list;
      });
    },
    getAgentList() {
      return AgentApi.select({
        page: 1,
        pageSize: 10000,
      }).then((res) => {
        console.log("代理人列表", res.list);
        this.agentList = res.list;
      });
    },
    tripChange() {
      let trip = this.tripList.find((_) => _.id == this.form.t_id);
      if (trip) {
        this.form.trip_info = [...trip.trip_info];
        this.formatTripList();
      }
    },
    formatTripList() {
      let days;
      if (this.form.up_group_date && this.form.off_group_date) {
        days = moment(this.form.off_group_date).diff(
          moment(this.form.up_group_date),
          "days"
        );
        this.form.trip_info.splice(days + 1);
        if (this.form.trip_info.length < days) {
          this.form.trip_info = this.form.trip_info.concat(
            new Array(days - this.form.trip_info.length).fill()
          );
        }
        for (let i = 0; i <= days; i++) {
          this.form.trip_info[i] = this.form.trip_info[i] || {};
          this.form.trip_info[i].date = moment(this.form.up_group_date)
            .add(i, "days")
            .format("YYYY-MM-DD");
        }
      }
    },
    addTrip() {
      if (this.form.off_group_date) {
        this.form.off_group_date = moment(this.form.off_group_date)
          .add(1, "days")
          .format("YYYY-MM-DD");
      }
      this.form.trip_info.push({});
      this.formatTripList();
    },
    delTrip(index) {
      if (this.form.off_group_date) {
        this.form.off_group_date = moment(this.form.off_group_date)
          .subtract(1, "days")
          .format("YYYY-MM-DD");
      }
      this.form.trip_info.splice(index, 1);
      this.formatTripList();
    },
    submit(edit = false) {
      this.loading = true;
      if (edit === true) {
        return OrderApi.update({ ...this.form })
          .then(() => {
            this.$message.success("保存成功");
            this.reset();
          })
          .finally(() => (this.loading = false));
      } else {
        return OrderApi.create({ ...this.form })
          .then(() => {
            this.$message.success("保存成功");
            this.reset();
          })
          .finally(() => (this.loading = false));
      }
    },
    reset() {
      this.form = {
        numbers: 1,
        order_staff: [{}],
        trip_info: [],
      };
    },
    disabledStartDate(e) {
      if (this.form.up_group_date) {
        return (
          e < moment(this.form.up_group_date).endOf("day").subtract("days", 1)
        );
      }
      return false;
    },
    disabledEndDate(e) {
      if (this.form.off_group_date) {
        return e > moment(this.form.off_group_date).endOf("day");
      }
      return false;
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

  .btn-add {
    color: #49a9ee;
    cursor: pointer;
  }

  .btn-del {
    color: red;
  }

  .required {
    color: red;
  }
}
</style>