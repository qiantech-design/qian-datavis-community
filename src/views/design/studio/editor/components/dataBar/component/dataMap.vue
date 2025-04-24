<template>
  <div>
    <ul class="datavis-design-list" v-if="chartDataFieldMap">
      <li class="datavis-design-list_head">
        <div class="item_1">字段</div>
        <div class="item_2">描述</div>
        <div class="item_2">映射</div>
        <div class="item_1">操作</div>
      </li>
      <div class="parent-list-item" v-for="(analysisObj, analysisKey) in chartDataFieldMap" :key="analysisKey">
        <li class="datavis-design-list_item data-key-map" v-for="(item, index) in analysisObj.field"
          :key="'dimension' + index">
          <div class="item_1 desc hide-text">{{ item.fieldType }}{{ index + 1 }}</div>
          <div class="item_2">
            <el-input v-model="item.fieldAlias" size="small" @change="handleRefreshMap"></el-input>
          </div>
          <div class="item_2">
            <el-input v-model="item.fieldName" size="small" @change="handleRefreshMap"></el-input>
          </div>
          <div class="item_1">
            <el-icon class="iconfont-datavis" @click="handleAddMapKey(index, analysisKey)">
              <Plus />
            </el-icon>
            <el-icon class="iconfont-datavis" :class="{ disable: analysisObj.field.length < 2 }"
              @click="handleDeleteMapKey(index, analysisKey)">
              <Delete />
            </el-icon>
          </div>
        </li>
      </div>
    </ul>
    <ul class="datavis-design-list" v-if="dataFieldMap && dataFieldMap.length">
      <li class="datavis-design-list_head">
        <div class="item_1">描述</div>
        <div class="item_1">映射</div>
        <div class="item_2">取值key</div>
      </li>
      <div class="parent-list-item">
        <li class="datavis-design-list_item data-key-map" v-for="(item, index) in dataFieldMap" :key="index">
          <div class="item_1 desc hide-text">
            <span>{{ item.fieldDesc }}</span>
          </div>
          <div class="item_1">
            <span>{{ item.fieldName }}</span>
          </div>
          <div class="item_2">
            <el-input v-model="item.fieldAlias" size="small" @change="handleRefreshMap"></el-input>
          </div>
        </li>
      </div>
    </ul>
    <ul class="datavis-design-list" v-if="column && column.length">
      <li class="datavis-design-list_head">
        <div class="item_1">描述</div>
        <div class="item_1">映射</div>
      </li>
      <div class="parent-list-item">
        <li class="datavis-design-list_item data-key-map" v-for="(item, index) in column" :key="index"
          v-show="item.type === 'text'">
          <div class="item_1 desc hide-text">
            <span>{{ item.label }}</span>
          </div>
          <div class="item_1">
            <el-input v-model="item.prop" size="small" @change="handleRefreshMap"></el-input>
          </div>
        </li>
      </div>
    </ul>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'dataMap'
})
import { Delete, Plus } from '@element-plus/icons-vue'
const props = defineProps({
  chartDataFieldMap: {
    type: Object as any
  },
  dataFieldMap: {
    type: Array as any
  },
  column: {
    type: Array as any
  }
})

const emit = defineEmits(['refresh'])

const handleAddMapKey = (index: number, key: any) => {
  const filedList = props.chartDataFieldMap[key].field
  const keyIndex = filedList.length + 1
  const keyType = filedList[index].fieldType
  props.chartDataFieldMap[key].field.splice(index + 1, 0, {
    fieldName: `${keyType}${keyIndex}`,
    fieldAlias: '',
    fieldType: keyType,
    dataType: 'string'
  })
  handleRefreshMap()
}
const handleDeleteMapKey = (index: number, key: any) => {
  if (props.chartDataFieldMap[key].field.length < 2) return
  props.chartDataFieldMap[key].field.splice(index, 1)
  handleRefreshMap()
}
const handleRefreshMap = () => {
  emit('refresh')
}
</script>

<style lang="scss">
.datavis-design-list {
  list-style: none;
  color: #bcc9d4;
  padding: 8px 0;
  border-bottom: 1px solid #283445;
  margin-bottom: 8px;

  .datavis-design-list_add {
    display: flex;
    justify-content: space-between;
    padding-left: 10px;

    .datavis-design-list_add_title {
      font-size: 13px;
      color: #b2c7db;
    }
  }

  .datavis-design-list_head {
    display: flex;
    align-items: center;
    font-size: 12px;
    // margin-top: 10px;
    background-color: var(--ui-reset-background);
    color: #ffffff;
    font-weight: 600;
    height: 32px;
    line-height: 32px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    div:first-child {
      padding-left: 20px;
    }

    .item_1 {
      flex: 1;
      padding: 0 10px;
    }

    .item_2 {
      flex: 2;
      padding: 0 10px;
    }

    .flex_1 {
      flex: 1;
    }

    .flex_2 {
      flex: 2;
    }

    .flex_center {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .input_width {
      width: 65px;
    }

    .item-color {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .item-text {
      flex: 1;
      text-align: center;
    }

    .action-del {
      width: 40px;
      text-align: center;
    }
  }

  .parent-list-item {
    margin-top: 10px;
  }

  .datavis-design-list_item {
    display: flex;
    align-items: center;
    font-size: 12px;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.85);

    .desc {
      color: rgba(255, 255, 255, 0.7);
    }

    .hide-text {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    &.data-key-map {
      height: 24px;
      margin-bottom: 6px;

      &>div:first-child {
        padding-left: 20px;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }

    div.el-input input.el-input__inner {
      padding: 0 4px;
      height: 24px;
      line-height: 24px;
    }

    .item_1 {
      flex: 1;
      padding: 0 10px;
    }

    .item_2 {
      flex: 2;
      padding: 0 10px;
    }

    .flex_1 {
      flex: 1;
    }

    .flex_2 {
      flex: 2;
    }

    .flex_center {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .input_width {
      width: 65px;
    }

    .item-color {
      margin-left: 10px;
    }

    .padding {
      padding: 0 6px;
    }

    .action-del {
      width: 40px;
    }

    .iconfont-bi {
      cursor: pointer;

      &.disable {
        color: #fafafa;
        opacity: 0.3;
        cursor: not-allowed;
      }
    }

    .iconfont-bi+.iconfont-bi {
      margin-left: 10px;
    }
  }
}
</style>
