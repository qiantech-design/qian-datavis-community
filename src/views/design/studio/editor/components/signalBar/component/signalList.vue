<template>
  <div class="signal-list">
    <div class="signal-list-body">
      <ul class="signal-list-body-ul">
        <li class="signal-list-item">
          <div class="item-value" v-for="(item, index) in props.columns" :key="index">{{ item.label }}</div>
          <div class="item-action" v-if="!props.readonly">
            <div class="datavis-editor-signal-icon">
              <visui-icon name="ele-plus" @click="handleCommand('add')"></visui-icon>
            </div>
          </div>
        </li>
      </ul>
      <ul class="signal-list-body-ul p-b-20">
        <li class="signal-list-item" v-for="(item, index) in props.data" @click="handleCommand('select', item)"
          @dblclick="handleCommand('selectAndClose', item)" :class="{ 'is-active': item.value === props.activeValue }"
          :key="index">
          <template v-if="!props.readonly">
            <div class="item-value" v-for="(site, idx) in props.columns" :key="idx">
              <visui-input size="small" v-model="item[site.prop]" @change="handleCommand('change')"></visui-input>
            </div>
            <div class="item-action" v-if="!props.readonly">
              <div class="draw-signal-icon" @click="handleCommand('sub', index)">
                <visui-icon name="ele-minus"></visui-icon>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="item-value" v-for="(site, idx) in props.columns" :key="idx">{{ item[site.prop] }}</div>
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">

defineOptions({
  name: 'signalBar'
})
const emit = defineEmits(['command'])
const props = defineProps({
  data: Array,
  columns: {
    type: Array,
    default: () => {
      return []
    }
  },
  activeValue: String,
  readonly: {
    type: Boolean,
    default: false
  }
})

const handleCommand = (command: any, value?: any) => {
  if ((command === 'select' || command === 'selectAndClose') && !props.readonly) return
  emit('command', { command, value })
}

</script>