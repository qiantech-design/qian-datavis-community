<template>
  <el-scrollbar>
    <div class="datavis-editor-pagebar">
      <template v-if="!isModule">
        <template v-if="frontend.length">
          <div
            v-for="(front, index) in frontend"
            :key="front.uid"
            class="page-bar_board_item front"
            :class="{ active: boardActiveKey === front.uid }"
            @click="handleChange(front, 'frontend')"
          >
            <span class="board-name">{{ front.name }}</span>
            <span class="board_item_delete" @click.stop="handleSub(index, 'frontend')">
              <visui-icon name="ele-delete"></visui-icon>
            </span>
          </div>
        </template>
        <div v-else class="page-bar_board_item front" @click="handleAdd('frontend')">
          <SvgBox name="back-screen"></SvgBox>
          <span class="board-name">前景</span>
        </div>
        <ul class="page-bar_board_list">
          <li
            class="page-bar_board_item"
            v-for="(item, index) in screen"
            :key="index"
            @click="handleChange(item, 'board')"
            @dblclick="handleEdit(item)"
            :class="{ active: boardActiveKey === item.uid }"
          >
            <template v-if="boardActiveKey === item.uid && editFlag">
              <input
                class="board-name_input"
                v-model="item.name"
                type="area"
                @blur="handleComplete"
                @keyup.enter="handleComplete"
                @keyup.esc="handleComplete"
                @click.stop=""
              />
            </template>
            <template v-else>
              <SvgBox name="back-screen"></SvgBox>
              <span class="board-name">{{ item.name }}</span>
            </template>
            <span class="board_item_delete" @click.stop="handleSub(index)">
              <visui-icon name="ele-delete"></visui-icon>
            </span>
          </li>
        </ul>

        <div class="append_board_item" @click="handleAdd('screen')">
          <span class="append_box">
            <visui-icon name="vis-tianjia" :size="12"></visui-icon>
          </span>
        </div>
        <template v-if="backend.length">
          <div
            v-for="(back, index) in backend"
            :key="back.uid"
            class="page-bar_board_item"
            :class="{ active: boardActiveKey === back.uid }"
            @click="handleChange(back, 'backend')"
          >
            <SvgBox name="back-screen"></SvgBox>
            <span class="board-name">背景大屏</span>
            <span class="board_item_delete" @click.stop="handleSub(index, 'backend')">
              <visui-icon name="ele-delete"></visui-icon>
            </span>
          </div>
        </template>
        <div v-else class="page-bar_board_item" @click="handleAdd('backend')">
          <SvgBox name="back-screen"></SvgBox>
          <span class="board-name">背景</span>
        </div>
      </template>
    </div>
  </el-scrollbar>
</template>
<script lang="ts" setup>
import { ref, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import SvgBox from './component/SvgBox.vue'

defineOptions({ name: 'datavisPageBar' })

const props = defineProps(['frontend', 'screen', 'backend', 'isModule', 'boardActiveKey'])
const emit = defineEmits(['command'])

const editFlag = ref(false)
const boardIndex = ref(0)

// 点击事件
const handleChange = (row: any, type: string) => {
  if (props.boardActiveKey.value === row.uid) {
    return
  }
  editFlag.value = false
  emitCommand('change', { data: row, type })
}

const handleEdit = (row: any) => {
  editFlag.value = true
  nextTick(() => {
    const inputEl: HTMLDivElement | null = document.querySelector('.board-name_input')
    if (inputEl) {
      inputEl.focus()
    }
  })
}
const handleComplete = () => {
  editFlag.value = false
}
const handleAdd = (type?: string) => {
  boardIndex.value = props.screen.length
  boardIndex.value += 1
  emitCommand('addition', { index: boardIndex.value, type })
}
const handleSub = (index: number, type?: string) => {
  if (!type) {
    if (props.screen.length === 1) {
      ElMessage.warning('请至少保留一个子屏')
      return
    }
  }
  emitCommand('decrease', { index, type })
}

const emitCommand = (actionType: any, row: any) => {
  emit('command', actionType, row)
}
</script>
