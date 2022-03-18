
import { h, defineComponent } from 'vue'
import type { Component } from 'vue'
import { NIcon } from 'naive-ui'
export const renderIcon = (icon: Component) => {
    return () => {
      return h(NIcon, null, {
        default: () => h(icon)
      })
    }
  }