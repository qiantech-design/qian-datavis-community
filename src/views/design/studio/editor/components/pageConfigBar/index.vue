<template>
  <el-form label-width="90px" label-position="left" v-if="pageConfig">
    <visui-group style="padding-top: 14px">
      <visui-item label="屏幕大小">
        <div class="design-flex column">
          <el-select v-model="pageSize" placeholder="请选择屏幕尺寸" @change="handleScreenSizeChange">
            <el-option v-for="item in pageSizeOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
          <div class="design-flex row mt-8">
            <visui-input-number
              suffix="W"
              v-model="pageConfig.width"
              @change="handleEditorConfigChange(['width'], editor, pageConfig, true)"
            ></visui-input-number>
            <visui-input-number
              class="ml-8"
              suffix="H"
              v-model="pageConfig.height"
              @change="handleEditorConfigChange(['height'], editor, pageConfig, true)"
            ></visui-input-number>
          </div>
        </div>
      </visui-item>
      <visui-item label="背景颜色">
        <visui-select-color
          v-model="pageConfig.background"
          @recover="handleEditorConfigRecover(['background'], editor)"
          @input="handleEditorConfigChange(['background'], editor, pageConfig, false)"
          @change="handleEditorConfigChange(['background'], editor, pageConfig, true)"
        />
      </visui-item>
      <visui-item label="背景图片">
        <visui-select-image
          v-model="pageConfig.backgroundImage"
          isBackgroud
          @open="handleOpenImg"
          @recover="handleEditorConfigRecover(['backgroundImage'], editor)"
          @input="handleEditorConfigChange(['backgroundImage'], editor, pageConfig, false)"
          @change="handleEditorConfigChange(['backgroundImage'], editor, pageConfig, true)"
        />
      </visui-item>
      <visui-item label="预览设置">
        <visui-radio-group :row="false" v-model="pageConfig.renderMode" @change="handleEditorConfigChange(['renderMode'], editor, pageConfig, true)">
          <visui-radio :label="item.value" v-for="item in renderModeOptions" :key="item.value">{{ item.label }}</visui-radio>
        </visui-radio-group>
      </visui-item>
    </visui-group>
    <visui-collapse-item
      title="子屏工具栏"
      v-model="pageConfig.toolbar.enable"
      v-if="!isModule"
      @change="handleEditorConfigChange(['toolbar'], editor, pageConfig, true)"
    >
      <visui-item label="默认子屏">
        <visui-select
          class="full-width"
          v-model="pageConfig.defaultScreenId"
          @change="handleEditorConfigChange(['defaultScreenId'], editor, pageConfig, true)"
        >
          <visui-option v-for="item in screenList" :key="item.uid" :label="item.name" :value="item.uid"> </visui-option>
        </visui-select>
      </visui-item>
      <visui-item label="工具栏">
        <visui-checkbox
          v-model="pageConfig.toolbar.visiable"
          label="显示"
          @change="handleEditorConfigChange(['toolbar'], editor, pageConfig, true)"
        ></visui-checkbox>
      </visui-item>
      <visui-item label="大屏轮播">
        <visui-checkbox
          v-model="pageConfig.toolbar.playEnabled"
          @change="handleEditorConfigChange(['toolbar'], editor, pageConfig, true)"
        ></visui-checkbox>
      </visui-item>
      <visui-item label="停留时间">
        <visui-input-number
          v-model="pageConfig.toolbar.playInterval"
          suffix="s"
          placeholder="请输入停留时间"
          @change="handleEditorConfigChange(['toolbar'], editor, pageConfig, true)"
        >
        </visui-input-number>
      </visui-item>
    </visui-collapse-item>
    <visui-collapse-item
      v-for="(item, key) in pageConfig.interfaceApi"
      :title="item.desc"
      :key="key"
      v-model="item.enable"
      @change="handleEditorConfigChange(['interfaceApi'], editor, pageConfig, true)"
    >
      <template v-if="key.toString() === 'script'">
        <visui-item label="脚本">
          <el-button type="primary" @click="openCodeDialog('format', item)">配置脚本</el-button>
        </visui-item>
        <visui-item label="定时执行">
          <el-checkbox v-model="item.isPolling" @change="handleEditorConfigChange(['interfaceApi'], editor, pageConfig, true)"></el-checkbox>
        </visui-item>
        <visui-item label="时间间隔" v-if="item.isPolling">
          <visui-input-number
            v-model="item.timeInterval"
            :min="0"
            suffix="秒"
            placeholder="请输入时间间隔"
            @change="handleEditorConfigChange(['interfaceApi'], editor, pageConfig, true)"
          >
          </visui-input-number>
        </visui-item>
      </template>
      <template v-else-if="key.toString() === 'api'">
        <visui-item label="URL地址">
          <el-input type="textarea" :rows="2" v-model="item.url" @change="handleEditorConfigChange(['interfaceApi'], editor, pageConfig, true)" />
        </visui-item>
        <visui-item label="请求方法">
          <el-select v-model="item.method" placeholder="请选择" @change="handleEditorConfigChange(['interfaceApi'], editor, pageConfig, true)">
            <el-option v-for="item in methodOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </visui-item>
        <visui-item label="定时执行">
          <el-checkbox v-model="item.isPolling" @change="handleEditorConfigChange(['interfaceApi'], editor, pageConfig, true)"></el-checkbox>
        </visui-item>
        <visui-item label="时间间隔" v-if="item.isPolling">
          <visui-input-number
            v-model="item.timeInterval"
            suffix="秒"
            @change="handleEditorConfigChange(['interfaceApi'], editor, pageConfig, true)"
          ></visui-input-number>
        </visui-item>
        <visui-item label="请求头">
          <el-button type="primary" @click="openCodeDialog('headerFormat', item)">编辑函数</el-button>
        </visui-item>
        <visui-item label="请求参数">
          <el-button type="primary" @click="openCodeDialog('paramsFormat', item)">编辑函数</el-button>
        </visui-item>
        <visui-item label="数据处理">
          <el-button type="primary" @click="openCodeDialog('resFormat', item)">编辑函数</el-button>
        </visui-item>
      </template>
      <template v-else-if="key.toString() === 'websocket'">
        <visui-item label="URL地址">
          <el-input type="textarea" :rows="2" v-model="item.url" @change="handleEditorConfigChange(['interfaceApi'], editor, pageConfig, true)" />
        </visui-item>
        <visui-item label="请求参数">
          <el-button type="primary" @click="openCodeDialog('paramsFormat', item)">编辑函数</el-button>
        </visui-item>
        <visui-item label="数据处理">
          <el-button type="primary" @click="openCodeDialog('resFormat', item)">编辑函数</el-button>
        </visui-item>
      </template>
    </visui-collapse-item>
    <visui-collapse-item v-model="pageConfig.address.data.enable" @change="handleEditorConfigChange(['address'], editor, pageConfig, true)">
      <template #title>
        <span>数据地址配置</span>
        <el-tooltip popper-class="vis-el-tooltip" placement="top">
          <template #content>
            <p>配置了数据地址，图纸渲染时会请求该地址文件</p>
            <p>并将文件内容当做组件数据处理</p>
          </template>
          <visui-icon name="ele-info-filled" class="ml-4"></visui-icon>
        </el-tooltip>
      </template>
      <visui-item label="数据地址">
        <el-input
          aria-placeholder="请输入数据地址URL"
          v-model="pageConfig.address.data.url"
          @change="handleEditorConfigChange(['address'], editor, pageConfig, true)"
        />
      </visui-item>
    </visui-collapse-item>
    <visui-collapse-item v-model="pageConfig.address.script.enable" @change="handleEditorConfigChange(['address'], editor, pageConfig, true)">
      <template #title>
        <span>脚本地址配置</span>
        <el-tooltip popper-class="vis-el-tooltip" placement="top">
          <template #content>
            <p>图纸渲染时会请求该地址文件并执行</p>
            <p>注意：</p>
            <p class="ml-16">1. 脚本格式必须为js</p>
            <p class="ml-16">2. 脚本内函数必须命名为visExecuteScript</p>
          </template>
          <visui-icon name="ele-info-filled" class="ml-4"></visui-icon>
        </el-tooltip>
      </template>
      <visui-item label="脚本地址">
        <el-input
          aria-placeholder="请输入脚本地址URL"
          v-model="pageConfig.address.script.url"
          @change="handleEditorConfigChange(['address'], editor, pageConfig, true)"
        />
      </visui-item>
    </visui-collapse-item>
    <!-- 代码编辑器 -->
    <visui-code-dialog :modal="false" draggable ref="codeDialogRef" @finish="handleFinishCodeDialog"></visui-code-dialog>
  </el-form>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { interfaceApi, scriptContent, apiHeaderScriptContent, apiParamsScriptContent, apiResScriptContent, address } from './interface'
import { cloneDeep } from 'lodash-es'
import { eventTypes, pageOperationTypes, handleEditorConfigChange, handleEditorConfigRecover } from '../../utils'
import useEditor from '../../hooks/useEditor'
const { editor, screenList } = useEditor()
const componentName = 'datavisPageConfigBar'
defineOptions({ name: componentName })

defineProps({
  isModule: {
    type: Boolean
  }
})

const methodOptions = [
  {
    label: 'POST',
    value: 'POST'
  },
  {
    label: 'GET',
    value: 'GET'
  }
]

const pageSizeOptions = [
  {
    label: '大屏推荐尺寸1920*1080',
    value: '1920*1080'
  },
  {
    label: 'web推荐尺寸1366*768',
    value: '1366*768'
  },
  {
    label: 'web最小尺寸1024*768',
    value: '1024*768'
  },
  {
    label: '自定义',
    value: 'x*x'
  }
]

const renderModeOptions = [
  {
    label: '按原尺寸溢出滚动',
    value: 'standard'
  },
  {
    label: '铺满屏幕',
    value: 'full'
  },
  {
    label: '按屏幕比例适应',
    value: 'fit'
  }
  // {
  //   label: '横向溢出滚动',
  //   value: 'scrollX'
  // },
  // {
  //   label: '纵向溢出滚动',
  //   value: 'scrollY'
  // }
]

// 打开素材弹窗
const handleOpenImg = () => {
  editor.fire(eventTypes.pageOperation, {
    type: pageOperationTypes.imagePicker,
    data: {
      callback: ({ url }: any) => {
        handleBackgroundChange(url)
      }
    },
    source: componentName
  })
}

// 切换背景图
const handleBackgroundChange = (value: string) => {
  pageConfig.value.backgroundImage = value
  handleEditorConfigChange(['backgroundImage'], editor, pageConfig.value, true)
}

const pageSize = ref('')
const pageConfig = ref<any>(null) // 页面配置，其实就是canvasConfig，后续要统一这两个字段命名

const codeDialogRef = ref()
const codeRefData = ref<any>({})
const codeRefKey = ref<string>('')
const openCodeDialog = (key: string, item: any) => {
  let [title, code] = ['', '']
  codeRefData.value = item
  codeRefKey.value = key
  switch (key) {
    case 'format':
      title = '全局脚本'
      code = item[key] || scriptContent
      break
    case 'headerFormat':
      title = '请求头'
      code = item[key] || apiHeaderScriptContent
      break
    case 'paramsFormat':
      title = '请求参数'
      code = item[key] || apiParamsScriptContent
      break
    case 'resFormat':
      title = '数据处理'
      code = item[key] || apiResScriptContent
      break
  }
  codeDialogRef.value.handleOpenDialog({
    title,
    code,
    config: {
      tabSize: 2
    },
    height: 360
  })
}

const handleFinishCodeDialog = (code: string) => {
  codeRefData.value[codeRefKey.value] = code
  codeDialogRef.value.handleCloseDialog()
  handleEditorConfigChange(['interfaceApi'], editor, pageConfig.value, true)
}

// 初始化 pageSize
const initPageSize = () => {
  const config = pageConfig.value
  const sizeStr = `${config.width}*${config.height}`
  const findObj = pageSizeOptions.find(v => v.value === sizeStr)
  if (findObj) {
    pageSize.value = findObj.value
  } else {
    pageSize.value = 'x*x'
  }
}
const handleScreenSizeChange = (val: string) => {
  let [width, height]: any[] = val.split('*')
  if (width === 'x' && height === 'x') {
    return
  } else {
    width = parseInt(width)
    height = parseInt(height)
    pageConfig.value.width = width
    pageConfig.value.height = height
    handleEditorConfigChange(['width', 'height'], editor, pageConfig.value, true)
    editor.zoomHandler.zoomFitView()
  }
}

const handleHistoryChanged = () => {
  const { operation } = editor.historyHandler
  if (operation && operation.type === 'config') {
    pageConfig.value = cloneDeep(editor.config)
    initPageSize()
  }
}

onMounted(() => {
  if (!editor.config.interfaceApi) {
    editor.config.interfaceApi = cloneDeep(interfaceApi)
  }
  if (!editor.config.address) {
    editor.config.address = cloneDeep(address)
  }
  pageConfig.value = cloneDeep(editor.config)
  initPageSize()
  editor.on(eventTypes.historyChanged, handleHistoryChanged)
})
onBeforeUnmount(() => {
  editor.off(eventTypes.historyChanged, handleHistoryChanged)
})
</script>
