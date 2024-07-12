<script setup lang="ts">
import type { TreeNode } from '@/helpers/buildTree'
import { ref, watch, type PropType, defineEmits, computed } from 'vue'

const emit = defineEmits(['toggle'])

const { openedIds, node, index, parentIndex } = defineProps({
  node: {
    type: Object as PropType<TreeNode>,
    required: true
  },
  openedIds: {
    type: Array as PropType<string[]>,
    required: true
  },
  parentIndex: {
    type: Number,
    default: 0
  },
  index: {
    type: Number,
    required: true,
    default: 0
  }
})

const isOpen = ref(openedIds.includes(node.id))

// METHODS
const toggle = () => {
  isOpen.value = !isOpen.value
  emit('toggle', node.id)
}

const handleToggle = (id: string) => {
  emit('toggle', id)
}

// SIDE EFFECTS
const isOdd = computed(() => {
  const newIndex = parentIndex % 2 !== 0 ? index : index + 1
  return newIndex % 2 !== 0
})

watch(
  () => openedIds,
  (newOpenIds) => {
    isOpen.value = newOpenIds.includes(node.id)
  }
)
</script>

<template>
  <div :class="['tree-item', { odd: isOdd }]">
    <div @click="toggle" class="item-title">
      <span class="arrow" :class="{ open: isOpen }"></span>
      {{ node.title }}
    </div>
    <div v-if="isOpen">
      <TreeView
        v-for="(child, i) in node.children"
        :key="child.id"
        :node="child"
        :parent-index="index"
        :index="parentIndex % 2 !== 0 ? i : i + 1"
        :opened-ids="openedIds"
        @toggle="handleToggle"
      />
    </div>
  </div>
</template>

<style>
.tree-item {
  margin-left: 20px;
}

.item-title {
  cursor: pointer;
  padding: 5px;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  background-color: #e9e9e9;
}

.odd > .item-title {
  background-color: #f9f9f9;
}

.children {
  margin-left: 20px;
}

.arrow {
  width: 10px;
  height: 10px;
  margin-right: 10px;
  border-left: 2px solid #333;
  border-bottom: 2px solid #333;
  transform: rotate(-135deg);
  transition: transform 0.2s;
}

.arrow.open {
  transform: rotate(-45deg);
}
</style>
