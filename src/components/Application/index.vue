<template>
  
   <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
    <n-notification-provider>
    <n-message-provider>
      <Message />
      <slot></slot>
    </n-message-provider>
  </n-notification-provider>
  </n-config-provider>
 
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
  import { zhCN, dateZhCN } from 'naive-ui'
</script>
