<!--
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2023-11-15 15:49:59
 * @LastEditTime: 2024-03-13 11:02:57
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 
 * @FilePath: \static-service\front\src\components\ImageSelecter\index.vue
 * 
-->
<template>
  <div>
    <el-button
      class="refresh"
      type="primary"
      :loading-icon="Basketball"
      :loading="loading"
      @click="refresh"
      >刷新</el-button
    >
    <div class="ImageSelecter-content">
      <el-tree
        class="tree"
        :data="dataSource"
        :props="props"
        :load="loadNode"
        lazy
        @node-click="nodeClick"
      >
        <template #default="{ node, data }">
          <span class="custom-tree-node">
            <span>{{ node.label }}</span>
            <span>
              <el-popconfirm
                v-if="data.isLeaf"
                title="确定要删除此文件吗?"
                @confirm.stop="remove(node, data)"
              >
                <template #reference>
                  <el-button link type="primary" style="margin-left: 8px"> 删除 </el-button>
                </template>
              </el-popconfirm>
              <a v-else @click="append(node, data)"> 添加目录 </a>
            </span>
          </span>
        </template>
      </el-tree>
      <el-card class="ImageSelecter-card">
        <template #header>{{ imgData?.name || '' }}</template>
        <el-image :src="imgUrl" style="width: 100%" :preview-src-list="[imgUrl]">
          <template #error>
            <div class="image-slot">
              <el-icon><icon-picture /></el-icon>
            </div>
          </template>
        </el-image>
        <template #footer>{{ imgUrlUse }}</template>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import type Node from 'element-plus/es/components/tree/src/model/node'
import { Picture as IconPicture, Basketball } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

interface Tree {
  name: string
  isLeaf?: boolean
}
const props = {
  label: 'name',
  isLeaf: 'isLeaf',
  children: 'children'
}
const imgData = ref()
const loading = ref()
const dataSource = ref<Tree[]>([{ name: '文件根目录' }])

const base = (NODE_ENV === 'online' ? '/static-service' : '') + '/assets'
const imgUrl = computed(() => {
  return `${base}${imgData.value?.basePath ? imgData.value?.basePath.replace(/\\/gm, '/') : ''}/${
    imgData.value?.name || ''
  }`
})
const imgUrlUse = computed(() => {
  // return imgUrl.value.replace('/api', '')
  return imgUrl.value
})
const loadNode = async (node: Node, resolve: (data: Tree[]) => void) => {
  // console.log(node)
  const { data: nodeData, level } = node
  if (level === 0) {
    return resolve([{ name: '文件根目录' }])
  }
  const { path = '', name = '' } = nodeData
  loading.value = true
  const res = await fetch(
    `${base}/assetsDir?filePath=${path}&name=${name === '文件根目录' ? '' : name}`,
    {
      method: 'get'
    }
  )
  const resData = await res.json()
  loading.value = false
  const { data = {} } = resData
  const { status = 200 } = res
  if (status !== 200) {
    const { message = '' } = resData
    ElMessage(message)
  }
  if (data) {
    const { fileObjs = [] } = data
    // console.log(data)
    // console.log(fileObjs)
    resolve(fileObjs as Tree[])
  } else {
    resolve([])
  }
}
const nodeClick = async (data: any, node: Node, TreeNode: any, event: any) => {
  // const { isLeaf } = data
  // console.log(data)
  // console.log(dataSource.value)
  imgData.value = data
}

const refresh = () => {
  loading.value = true
  imgData.value = null
  dataSource.value = [...dataSource.value]
  loading.value = false
}

const append = (node: any, data: any) => {
  console.log(node)
  console.log(data)
}
const remove = async (node: any, data: any) => {
  // console.log(node)
  // console.log(data)
  const { path = '', name = '' } = data
  loading.value = true
  const res = await fetch(`${base}?filePath=${path}&name=${name === '文件根目录' ? '' : name}`, {
    method: 'delete'
  })
  const resData = await res.json()
  loading.value = false
  // const { data = {} } = resData

  const { message = '' } = resData
  ElMessage(message)
  const { status = 200 } = res
  if (status === 200) {
    refresh()
  }
}
defineExpose({ imgData, refresh })
</script>

<style lang="less" scoped>
.refresh {
  margin: 20px 0px;
}
.ImageSelecter-content {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  .tree {
    flex: auto;
    .custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;
    }
  }
  .image-slot {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: var(--el-fill-color-light);
    color: var(--el-text-color-secondary);
    font-size: 30px;
  }
  .image-slot .el-icon {
    font-size: 30px;
  }
  .ImageSelecter-card {
    max-width: 480px;
    min-width: 200px;
    flex: auto;
  }
}
</style>