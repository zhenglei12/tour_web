<template>
  <a-drawer :visible="visible" title="代理详情" @close="close">
    <a-descriptions :column="1">
      <a-descriptions-item label="代理名称">{{ R.name }}</a-descriptions-item>
      <a-descriptions-item label="电话号码">{{ R.phone }}</a-descriptions-item>
      <a-descriptions-item label="地区">{{ R.area }}</a-descriptions-item>
      <a-descriptions-item label="店铺名称">
        {{ R.shop_name }}
      </a-descriptions-item>
      <a-descriptions-item label="店铺地址">
        {{ R.address }}
      </a-descriptions-item>
      <a-descriptions-item label="招商员">
        {{ R.merchants_name }}
      </a-descriptions-item>
      <a-descriptions-item label="创建时间">
        {{ R.created_at }}
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
