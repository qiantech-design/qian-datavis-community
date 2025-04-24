<template>
  <el-form>
    <el-form-item label="状态切换" v-if="node.states && node.states.length">
      <visui-item label="是否启用">
        <el-switch v-model="config.state.enable" @change="handleConfigChange"></el-switch>
      </visui-item>
      <template v-if="config.state.enable">
        <visui-item label="切换状态" class="full-width">
          <el-select v-model="config.state.index" @change="handleConfigChange">
            <el-option v-for="(item, index) in node.states" :key="index" :label="item.name || '状态' + (index + 1)" :value="index" />
          </el-select>
        </visui-item>
      </template>
    </el-form-item>
    <el-form-item label="打开弹窗">
      <visui-item label="是否启用">
        <el-switch v-model="config.dialog.enable" @change="handleConfigChange"></el-switch>
      </visui-item>
      <template v-if="config.dialog.enable">
        <visui-item label="弹窗名称" class="full-width">
          <el-input placeholder="请输入弹窗名称" v-model="config.dialog.type" @change="handleConfigChange"></el-input>
        </visui-item>
      </template>
    </el-form-item>
    <!-- <el-form-item label="发起请求">
      <visui-item label="是否启用">
        <el-switch v-model="config.request.enable" @change="handleConfigChange"></el-switch>
      </visui-item>
    </el-form-item> -->
    <el-form-item label="切换子屏" v-if="screenList.length">
      <visui-item label="是否启用">
        <el-switch v-model="config.page.enable" @change="handleConfigChange"></el-switch>
      </visui-item>
      <template v-if="config.page.enable">
        <visui-item label="切换至" class="full-width">
          <el-select v-model="config.page.pageId" @change="handleScreenChange">
            <el-option v-for="item in screenList" :key="item.uid" :label="item.name" :value="item.uid" />
          </el-select>
        </visui-item>
      </template>
    </el-form-item>
    <el-form-item label="执行脚本">
      <visui-item label="是否启用">
        <el-switch v-model="config.script.enable" @change="handleConfigChange"></el-switch>
        <el-button v-if="config.script.enable" type="primary" style="margin-left: 12px" @click="handleOpenCodeDialog()">脚本配置</el-button>
      </visui-item>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import useEditor from '../../hooks/useEditor'
defineOptions({
  name: 'eventConfig'
})
const { screenList } = useEditor()

defineProps({
  node: {
    type: Object,
    default: () => ({
      states: []
    })
  }
})

const config = defineModel<any>('config')

const handleScreenChange = (e: any) => {
  config.value.page.pageIndex = screenList.value.findIndex((item: any) => item.uid === e)
  handleConfigChange()
}
const handleConfigChange = () => {
  emit('change')
}
const emit = defineEmits(['codeDialogOpen', 'change'])
const handleOpenCodeDialog = () => {
  const path = 'script.code'
  const title = '脚本配置'
  const code = config.value.script.code || 'const executeScript = function (node) {\n\n}'
  emit('codeDialogOpen', { config: config.value, path }, { title, code })
}
</script>
