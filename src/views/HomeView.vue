<script setup lang="ts">
import TreeView from '../components/organism/TreeView.vue'
import { onMounted, ref } from 'vue'
import { API } from '@/services'
import { buildTree, type TreeNode } from '@/helpers/buildTree'

const treeNodes = ref<TreeNode[]>([])
const openedIds = ref<string[]>([])

// METHODS
const fetchTreeList = () => {
  API.tree.getTreeList().then((res) => (treeNodes.value = buildTree(res.data)))
}

const refresh = () => {
  fetchTreeList()
}

const handleToggle = (id: string) => {
  if (openedIds.value.includes(id)) {
    openedIds.value = openedIds.value.filter((openedId) => openedId !== id)
  } else {
    openedIds.value.push(id)
  }
  localStorage.setItem('openedIds', JSON.stringify(openedIds.value))
}

// SIDE EFFECTS
onMounted(() => {
  const savedopenedIds = localStorage.getItem('openedIds')
  if (savedopenedIds) {
    openedIds.value = JSON.parse(savedopenedIds)
  }
  fetchTreeList()
})
</script>

<template>
  <main>
    <button @click="refresh">fetch</button>
    <div class="tree">
      <TreeView
        v-for="(item, index) in treeNodes"
        :key="item.id"
        :node="item"
        :depth="0"
        :index="index"
        :opened-ids="openedIds"
        @toggle="handleToggle"
      />
    </div>
  </main>
</template>

<style>
.tree > .tree-item > .item-title {
  background-color: lightgrey;
}
</style>
