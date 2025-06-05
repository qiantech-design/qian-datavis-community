<template>
  <el-dialog class="ui-workspace-dialog" v-model="state.visible" width="800px" @close="handleCloseDialog">
    <template #header>
      <div style="font-size: large">地图预览</div>
    </template>
    <div class="ui-workspace-chart-content" style="">
      <v-chart v-if="state.chartFlag" class="v-chart" :option="state.option" />
    </div>
    <template #footer>
      <span class="dialog-footer" style="text-align: right">
        <el-button type="primary" @click="handleCloseDialog">关 闭</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
import { useDatavisApi } from '../hooks/useDatavisApi'
import * as echarts from 'echarts/core'

const apiHook = useDatavisApi()

const state = reactive({
  visible: false,
  chartFlag: false,
  data: {},
  option: {}
})

const handleOpenDialog = (data: any) => {
  state.visible = true
  state.data = data as any
  initGetData()
  setTimeout(() => {
    state.chartFlag = true
  }, 300);
}

defineExpose({
  handleOpenDialog
})

const handleCloseDialog = () => {
  state.visible = false
  state.chartFlag = false
}

// 从接口获取数据,渲染上去
const initGetData = async () => {
  const url = apiHook.fileService + state.data.url
  const mapName = 'china_' + state.data.id
  const [err, res] = await apiHook.getJson(url)
  if (err) return
  echarts.registerMap(mapName, res)
  handleSetChart(mapName)
}

// 设置地图
const handleSetChart = (mapName) => {
  state.option = {
    geo: {
      show: true,
      map: mapName,
      label: {
        normal: {
          show: false
        },
        emphasis: {
          show: false,
        }
      },
      roam: true,
      itemStyle: {
        normal: {
          areaColor: '#031525',
          borderColor: '#3B5077',
        },
        emphasis: {
          areaColor: '#2B91B7',
        }
      }
    },
    series: [
      {
        name: '示例',
        type: 'scatter',
        mapType: 'chinaMap',
        coordinateSystem: 'geo',
        itemStyle: {
          normal: {
            label: {
              show: false
            }
          },
          emphasis: {
            label: {
              show: true
            }
          }
        },
        label: {
          normal: {
            show: true,
            textStyle: {
              color: "#246dff",
              fontSize: 12
            }
          },
          emphasis: {
            color: '#246dff',
          },
        },
        data: []
      }
    ]
  }
}

</script>