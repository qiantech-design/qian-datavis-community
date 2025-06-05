<template>
  <div class="ui-workspace-wrap datavis-theme-dark">
    <visui-provider popupEl=".datavis-theme-dark">
      <el-header>
        <div class="ui-workspace-header">
          <div class="ui-workspace-header-left">{{ state.systemName }}</div>
          <div>
            <el-dropdown @command="handleCommand">
              <div class="ui-workspace-header-user">
                {{ state.user }}
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="240px">
          <div class="ui-workspace-side">
            <div class="ui-workspace-menu">
              <ul class="ui-workspace-menu-content">
                <el-scrollbar>
                  <div class="menu-item-box">
                    <li
                      class="menu-item"
                      v-for="(item, index) in state.menuList"
                      :key="index"
                      @click="handleRouter(item)"
                      :class="{ 'is-active': item.path === route.fullPath }"
                    >
                      <visui-icon class="menu-item-icon" :name="item.icon" :size="24" />
                      <div>{{ item.title }}</div>
                    </li>
                  </div>
                </el-scrollbar>
              </ul>
            </div>
          </div>
        </el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </visui-provider>
  </div>
</template>
<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const state = reactive({
  user: '',
  systemName: 'DATAVIS',
  menuList: [
    {
      title: '大屏模板',
      icon: 'vis-sucaiguangchang',
      path: '/workspace/market'
    },
    {
      title: '用户大屏',
      icon: 'ele-platform',
      path: '/workspace/screen'
    },
    {
      title: '模块',
      icon: 'vis-tuyuan',
      path: '/workspace/module'
    },
    {
      title: '素材',
      icon: 'vis-shejizhongxin',
      path: '/workspace/resource'
    }
    // {
    //   title: '主题',
    //   icon: 'ele-magicStick',
    //   path: '/workspace/theme'
    // }
  ]
})

const handleRouter = (row: any) => {
  router.push({
    path: row.path
  })
}
const handleCommand = (command: any) => {
  switch (command) {
    case 'logout':
      handleLogout()
      break
  }
}
const handleLogout = () => {
  localStorage.clear()
  router.push({
    path: '/login'
  })
}

onMounted(() => {
  state.user = localStorage.getItem('DATAVIS_USER')
})
</script>
