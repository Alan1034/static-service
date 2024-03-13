<!--
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2023-11-15 15:49:59
 * @LastEditTime: 2024-03-13 11:06:26
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 
 * @FilePath: \static-service\front\src\views\Home.vue
 * 
-->
<template>
  <main-layout>
    <div class="Home-content">
      <GeneralUpload :uploadFunction="uploadFunction" drag class="upload" prompt="将文件拖到此处或点击上传"> </GeneralUpload>
      <ImageSelecter ref="ImageSelecterRef" />
    </div>
  </main-layout>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import MainLayout from '@/layouts/MainLayout.vue'
import ImageSelecter from '@/components/ImageSelecter/index.vue'
import { GeneralUpload } from 'general-upload'
import { ElMessage } from 'element-plus'
// console.log(NODE_ENV)
const base = (NODE_ENV === 'online' ? '/static-service' : '') + '/assets'
const ImageSelecterRef = ref()
// watch(
//   () => ImageSelecterRef.value?.imgData,
//   (newVal) => {
//     console.log(newVal)
//   }
// )
const uploadFunction = async (file: any) => {
  // console.log(file)
  // console.log(ImageSelecterRef.value?.imgData)

  const { path: filePath = '', isLeaf, name = '' } = ImageSelecterRef.value?.imgData || {}
  const formData = new FormData()
  formData.append('file', file)
  const path = `${filePath}${isLeaf || name === '文件根目录' ? '' : '/' + name}`
  // formData.append('filePath', path)

  // const res = await fetch(`${base}/uploadImages`, {
  //   method: 'post',
  //   body: formData
  // })

  const res = await fetch(`${base}?filePath=${path}`, {
    method: 'post',
    body: formData
  })
  const resData = await res.json()

  const { message = '' } = resData
  ElMessage(message)
  const { status = 200 } = res
  if (status === 200) {
    ImageSelecterRef.value?.refresh()
  }
  return resData
}
</script>

<style lang="less" scoped>
.Home-content {
  padding: 20px;
}
</style>