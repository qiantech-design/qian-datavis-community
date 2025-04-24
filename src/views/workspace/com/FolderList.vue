<template>
  <div class="ui-workspace-list">
    <div class="ui-workspace-list-header">
      <button class="ui-workspace-list-header-action full-width" @click="handleCreate">
        <visui-icon name="ele-plus"></visui-icon>
        <span>{{ title }}</span>
      </button>
    </div>
    <ul class="ui-workspace-list-content">
      <el-scrollbar>
        <el-tree
          highlight-current
          ref="treeRef"
          :node-key="props.props.id"
          :data="data"
          :current-node-key="activeKey"
          :props="props.props"
          :default-expanded-keys="state.defaultExpandedKeys"
          @node-click="handleNodeClick"
        >
          <template #default="{ node, data }">
            <datavis-tree-node :label="node.label" :active="props.activeKey === data.id">
              <visui-icon
                name="vis-gengduo"
                :size="24"
                :class="{ active: state.target && data.id === state.target.id && state.dropdownVisible }"
                v-if="data.id"
                @click.stop="handleTooltipTarget(data, $event)"
              ></visui-icon>
            </datavis-tree-node>
          </template>
        </el-tree>
      </el-scrollbar>
    </ul>
    <datavis-virtual-tooltip placement="bottom-start" :offset="12" v-model:visible="state.dropdownVisible" :buttonRef="buttonRef">
      <slot name="dropdown" v-bind:item="state.target">
        <ul class="vis-list" style="min-width: 100px">
          <li class="vis-list-item" @click.stop="handleEdit">
            <span>编辑</span>
          </li>
          <li class="vis-list-item" @click.stop="handleDelete">
            <span>删除</span>
          </li>
        </ul>
      </slot>
    </datavis-virtual-tooltip>
  </div>
</template>
<script setup lang="ts">
import { nextTick, watch, ref, reactive } from 'vue'
import datavisTreeNode from './TreeNode.vue'
import datavisVirtualTooltip from './VirtualTooltip.vue'

const props = defineProps({
  title: {
    type: String,
    default: '新建分类'
  },
  data: {
    type: Array,
    default: () => []
  },
  activeKey: {
    type: [String, Number],
    default: ''
  },
  props: {
    type: Object,
    default: () => ({
      id: 'id',
      name: 'name',
      children: 'folders',
      label: 'name'
    })
  }
})

const buttonRef = ref()

const state = reactive({
  dropdownVisible: false,
  target: null as any,
  initFlag: false, // 初始化标记，防止多次触发初始化逻辑
  defaultExpandedKeys: [] as any[]
})
const treeRef = ref()

watch(
  () => props.activeKey,
  val => {
    nextTick(() => {
      treeRef.value.setCurrentKey(val)
    })
  }
)
watch(
  () => props.data,
  () => {
    if (!state.initFlag && props.data.length) {
      state.initFlag = true
      state.defaultExpandedKeys = props.data.map((item: any) => item[props.props.id])
    } else {
      if (treeRef.value) {
        const expandedKeys: any = []
        const { nodesMap } = treeRef.value.store
        Object.keys(nodesMap).forEach(key => {
          const node = nodesMap[key]
          if (node.expanded) {
            expandedKeys.push(key)
          }
        })
        state.defaultExpandedKeys = expandedKeys
      }
    }
    nextTick(() => {
      if (treeRef.value && props.activeKey) {
        treeRef.value.setCurrentKey(props.activeKey)
      }
    })
  }
)
const emit = defineEmits(['command'])

const handleNodeClick = (data: any) => {
  handleChangeClass(data)
}
const handleChangeClass = (row: any) => {
  emit('command', 'change', row)
}
const handleCreate = () => {
  const row = treeRef.value.getCurrentNode()
  handleCommandClass('add', row)
}
const handleEdit = () => {
  state.dropdownVisible = false
  handleCommandClass('edit', state.target)
}

const handleDelete = () => {
  state.dropdownVisible = false
  handleCommandClass('delete', state.target)
}

const handleCommandClass = (type: string, row?: any) => {
  switch (type) {
    case 'add':
      emit('command', 'add', row)
      break
    case 'edit':
      emit('command', 'edit', row)
      break
    case 'delete':
      emit('command', 'delete', row)
      break
  }
}

const handleTooltipTarget = (data: any, e: any) => {
  const isSameTarget = e.currentTarget === buttonRef.value
  state.target = data
  buttonRef.value = e.currentTarget
  if (isSameTarget) {
    state.dropdownVisible = !state.dropdownVisible
  } else {
    state.dropdownVisible = true
  }
}
</script>
