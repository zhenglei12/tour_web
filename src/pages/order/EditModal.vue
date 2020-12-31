<template>
  <a-modal
    :visible="visible"
    :title="title"
    destroyOnClose
    :confirmLoading="loading"
    width="1024px"
    @cancel="close"
    @ok="submit"
  >
    <cus-edit ref="edit" :data="form" inModal></cus-edit>
  </a-modal>
</template>

<script>
import editMixin from "../../mixins/edit";
import CusEdit from "./Edit";

export default {
  components: {
    CusEdit,
  },
  mixins: [editMixin],
  data() {
    return {
      loading: false,
      form: null,
    };
  },
  watch: {
    visible(e) {
      if (e && this.isEdit) {
        this.form = {
          id: this.R.id,
          enter_date: this.R.enter_date,
          a_id: this.R.a_id,
          area: this.R.area,
          up_group_date: this.R.up_group_date,
          off_group_date: this.R.off_group_date,
          vip_card: this.R.vip_card,
          numbers: this.R.numbers,
          t_id: this.R.t_id,
          tour_fee_amount: this.R.tour_fee_amount,
          deposit_amount: this.R.deposit_amount,
          balance_amount: this.R.balance_amount,
          collection_amount: this.R.collection_amount,
          meet_day: this.R.meet_day,
          meet_number: this.R.meet_number,
          leave_day: this.R.leave_day,
          leave_number: this.R.leave_number,
          remark: this.R.remark,
          trip_info: this.R.order_t,
          order_staff: this.R.order_staff,
        };
      }
    },
  },
  computed: {
    title() {
      return this.isEdit ? "编辑订单" : "新增订单";
    },
  },
  methods: {
    beforeClose() {
      this.form = null;
    },
    submit() {
      this.$refs.edit.submit(this.isEdit).then(() => {
        this.$emit("refresh");
        this.close();
      });
    },
  },
};
</script>