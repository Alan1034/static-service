<!--
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2023-02-13 17:02:16
 * @LastEditTime: 2024-03-11 14:49:11
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 
 * @FilePath: \static-service\front\src\layouts\HeaderMenu.vue
 * 
-->
<template><h1 class="head">静态文件上传下载服务</h1></template>

<script>
export default {
  props: {
    activeIndex: String
  },
  methods: {
    handleSelect(key, keyPath) {
      this.$emit('update:activeIndex', key)
    }
  }
}
</script>

<style lang="less" scoped>
.head {
  padding: 0px 16px;
}
</style>