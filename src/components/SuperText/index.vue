<template>
  <span v-html="processedText"></span>
</template>

<script>
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'SuperText',
  props: {
    text: {
      type: String,
      required: true,
      default: ''
    }
  },
  setup(props) {
    // 处理文本，将<sup>x</sup>替换为^x
    const processedText = computed(() => {
      if (!props.text) return ''

      // 使用正则表达式替换<sup>内容</sup>为^内容
      // return props.text.replace(/<sup>(.*?)<\/sup>/g, '^$1')
      return props.text
    })

    return {
      processedText
    }
  }
})
</script>

<style scoped>
/* 不添加额外样式，以便继承父组件的样式 */
</style>
