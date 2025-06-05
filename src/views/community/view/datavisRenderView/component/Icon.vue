<template>
  <div class="datavis-renderer-icon">
    <svg v-if="props.name === 'fullscreen'" xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink" width="22px" height="22px" viewBox="0 0 22 22" version="1.1">
      <g id="全屏" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g transform="translate(-1063.000000, -1034.000000)">
          <g transform="translate(749.000000, 1020.000000)">
            <g transform="translate(314.000000, 14.000000)">
              <rect x="0" y="0" width="22" height="22" />
              <g transform="translate(4.354167, 4.354167)" stroke="#B2C7DB" stroke-linecap="round"
                stroke-linejoin="round" stroke-width="1.26041667">
                <polyline points="9.96875 0 13.2916667 0 13.2916667 3.32291667" />
                <polyline points="13.2916667 9.96875 13.2916667 13.2916667 9.96875 13.2916667" />
                <polyline points="3.32291667 13.2916667 0 13.2916667 0 9.96875" />
                <polyline points="0 3.32291667 0 0 3.32291667 0" />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
    <svg v-if="props.name === 'exitFullscreen'" xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink" width="22px" height="22px" viewBox="0 0 22 22" version="1.1">
      <g id="退出全屏" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g transform="translate(-1063.000000, -907.000000)">
          <g transform="translate(749.000000, 893.000000)">
            <g transform="translate(314.000000, 14.000000)">
              <rect x="0" y="0" width="22" height="22" rx="2" />
              <g transform="translate(3.437500, 3.437500)" stroke="#B2C7DB" stroke-linecap="round"
                stroke-linejoin="round" stroke-width="1.26041667">
                <polyline points="11.34375 0 11.34375 3.78125 15.125 3.78125" />
                <polyline points="3.78125 0 3.78125 3.78125 0 3.78125" />
                <polyline points="3.78125 15.125 3.78125 11.34375 0 11.34375" />
                <polyline points="11.34375 15.125 11.34375 11.34375 15.082776 11.34375" />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'vis-render-icon'
})
const props = defineProps({
  name: {
    type: String
  }
})
</script>