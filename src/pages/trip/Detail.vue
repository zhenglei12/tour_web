<template>
  <a-drawer :visible="visible" title="行程详情" width="500" @close="close">
    <a-descriptions :column="1">
      <a-descriptions-item label="行程名称">{{ R.name }}</a-descriptions-item>
      <a-descriptions-item label="行程地区">{{ R.area }}</a-descriptions-item>
      <a-descriptions-item label="行程天数">{{ R.day }}</a-descriptions-item>
      <a-descriptions-item label="创建时间">
        {{ R.created_at }}
      </a-descriptions-item>
    </a-descriptions>
    <a-divider></a-divider>
    <a-descriptions :column="1" title="具体行程安排">
      <a-descriptions-item
        v-for="(trip, index) in R.trip_info"
        :key="index"
        :label="trip.date"
      >
        {{ trip.content }}
      </a-descriptions-item>
    </a-descriptions>
  </a-drawer>
</template>

<script>
import detailMixin from "../../mixins/detail";

export default {
  mixins: [detailMixin],
};
</script>
