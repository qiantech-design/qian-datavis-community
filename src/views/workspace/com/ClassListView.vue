<template>
  <div class="ui-workspace-list">
    <div class="ui-workspace-list-header">
      <button class="ui-workspace-list-header-action full-width" @click="handleCommandClass('add')">
        <visui-icon name="ele-plus"></visui-icon>
        <span>{{ title }}</span>
      </button>
    </div>
    <ul class="ui-workspace-list-content">
      <el-scrollbar>
        <div class="ui-workspace-list-content-padding">
          <li class="ui-workspace-list-item" v-for="(item, index) in data" :key="index">
            <div class="node-content" :class="{ 'is-active': activeKey === item[props.id] }"
              @click="handleChangeClass(item)">
              <div class="content">
                <visui-icon name="ele-folder" />
                <div class="content-text">{{ item[props.name] }}</div>
              </div>
              <div class="action">
                <el-dropdown @command="type => handleCommandClass(type, item)">
                  <visui-icon name="ele-moreFilled" />
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item command="edit">编辑</el-dropdown-item>
                      <el-dropdown-item command="delete">删除</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
            </div>
          </li>
        </div>
      </el-scrollbar>
    </ul>
    <div class="ui-workspace-list-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script setup lang="ts">

defineProps({
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
      name: 'name'
    })
  }
})

const emit = defineEmits(['command'])
const handleChangeClass = (row: any) => {
  emit('command', 'change', row)
}

const handleCommandClass = (type: string, row?: any) => {
  switch (type) {
    case 'add':
      emit('command', 'add')
      break
    case 'edit':
      emit('command', 'edit', row)
      break
    case 'delete':
      emit('command', 'delete', row)
      break
  }
}
</script>