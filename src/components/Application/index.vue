<template>
  <n-notification-provider>
    <n-message-provider>
      <Message />
      <slot></slot>
    </n-message-provider>
  </n-notification-provider>
</template>
<script lang="ts" setup>
import Message from "./Message.vue";
import {
  NConfigProvider,
  NDialogProvider,
  NNotificationProvider,
  NMessageProvider,
  NLoadingBarProvider,
} from "naive-ui";
</script>
