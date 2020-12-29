<template>
  <a-modal
    :visible="visible"
    :title="title"
    destroyOnClose
    :confirmLoading="loading"
    :bodyStyle="{
      maxHeight: '60vh',
      overflow: 'auto',
    }"
    width="700px"
    @cancel="close"
    @ok="submit"
  >
    <a-form-model
      ref="form"
      :model="form"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 19 }"
    >
      <a-form-model-item label="线路名称" required prop="name">
        <a-input v-model="form.name" allow-clear />
      </a-form-model-item>
      <a-form-model-item label="游玩地区" required prop="area">
        <a-input v-model="form.area" allow-clear />
      </a-form-model-item>
      <a-form-model-item label="行程天数" required prop="day">
        <a-input-number v-model="form.day" :min="0" />
      </a-form-model-item>
      <a-form-model-item label="行程具体安排" required prop="info">
        <draggable v-model="form.info" animation="300">
          <a-row v-for="(trip, index) in form.info" :key="index" class="block">
            <a-col span="2">D{{ index + 1 }}</a-col>
            <a-col span="20">
              <div class="cus-input-group">
                <a-date-picker v-model="trip.date" valueFormat="YYYY-MM-DD" />
                <a-select
                  v-model="trip.meal"
                  style="width: 102px"
                  placeholder="用餐安排"
                  allowClear
                >
                  <a-select-option
                    v-for="(meal, i) in meals"
                    :key="'meal-' + i"
                    :value="meal.value"
                    >{{ meal.label }}</a-select-option
                  >
                </a-select>
                <a-select
                  v-model="trip.stay"
                  style="width: 102px"
                  placeholder="住宿安排"
                  allowClear
                >
                  <a-select-option
                    v-for="(option, i) in stays"
                    :key="'stay-' + i"
                    :value="option.value"
                    >{{ option.label }}</a-select-option
                  >
                </a-select>
              </div>
              <div>
                <a-textarea
                  v-model="trip.content"
                  placeholder="具体行程"
                  rows="3"
                ></a-textarea>
              </div>
            </a-col>
            <a-col span="2">
              <a-button type="link" @click="removeTrip(index)">
                <a-icon class="close" type="close" />
              </a-button>
            </a-col>
          </a-row>
        </draggable>
        <a-button type="dashed" size="small" @click="addTrip">
          <a-icon type="plus" />
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import draggable from "vuedraggable";
import editMixin from "../../mixins/edit";
import Utils from "../../libs/utils";
import TripApi from "../../apis/trip";
import { tripMealMap, tripStayMap } from "./mapping";

export default {
  components: {
    draggable,
  },
  mixins: [editMixin],
  data() {
    return {
      loading: false,
      form: {},
      meals: Utils.mapToArray(tripMealMap),
      stays: Utils.mapToArray(tripStayMap),
    };
  },
  watch: {
    visible(e) {
      if (e) {
        console.log(this.R);
        this.form = {
          id: this.R.id,
          name: this.R.name,
          area: this.R.area,
          day: this.R.day,
          info: this.R.trip_info || [],
        };
      }
    },
  },
  computed: {
    title() {
      return this.isEdit ? "编辑行程" : "新增行程";
    },
  },
  methods: {
    addTrip() {
      this.form.info.push({});
    },
    removeTrip(index) {
      this.form.info.splice(index, 1);
    },
    submit() {
      this.loading = true;
      if (this.isEdit) {
        return TripApi.update({ ...this.form })
          .then((res) => {
            this.$message.success("保存成功");
            this.$emit("refresh", res);
            this.close();
          })
          .finally(() => (this.loading = false));
      } else {
        return TripApi.create({ ...this.form })
          .then((res) => {
            this.$message.success("保存成功");
            this.$emit("refresh", res);
            this.close();
          })
          .finally(() => (this.loading = false));
      }
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .sortable-chosen {
  cursor: move;
}
.block {
  border: 1px dashed #cccccc;
  border-radius: 4px;
  margin-top: 10px;
  padding: 5px 10px;
  background: #ffffff;
  cursor: move;

  &:first-of-type {
    margin: 0;
  }

  .close {
    color: red;
  }
}
</style>