<template>
  <div class="layout-app">
    <q-layout view="hHh Lpr lff" container style="height: 100vh" class="shadow-2 ">
      <q-header elevated class="sty-q-header" style="height: 48px;">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>MeFeed</q-toolbar-title>
          <q-btn flat @click="drawer = !drawer" round dense icon="account_circle" />
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above
        :width="200"
        :breakpoint="500"
        overlay
        :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
      >
        <q-scroll-area class="fit">
          <q-list>

            <template v-for="(menuItem, index) in menuList" :key="index">
              <q-item clickable :active="menuItem.label === 'Outbox'" v-ripple>
                <q-item-section avatar>
                  <q-icon :name="menuItem.icon" />
                </q-item-section>
                <q-item-section>
                  <NuxtLink class="nav-link" :to="menuItem.to" >{{ menuItem.label }}</NuxtLink>
                </q-item-section>
              </q-item>
              <q-separator :key="'sep' + index"  v-if="menuItem.separator" />
            </template>

          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <q-page>
          <NuxtPage />
          <!-- <p v-for="n in 30" :key="n">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil praesentium molestias a adipisci, dolore vitae odit, quidem consequatur optio voluptates asperiores pariatur eos numquam rerum delectus commodi perferendis voluptate?
          </p> -->
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { ref } from 'vue'

const menuList = [
  {
    icon: 'inbox',
    label: 'About',
    separator: false,
    to: '/about'
  },
  {
    icon: 'feed',
    label: 'Feed',
    separator: false,
    to: '/'
  },
  {
    icon: 'send',
    label: 'RSS',
    separator: false,
    to: '/rss'
  },
  {
    icon: 'photo_library',
    label: 'Gallery',
    separator: false,
    to: '/gallery'
  },
  {
    icon: 'science',
    label: 'Playground',
    separator: true,
    to: '/playground'
  },
  {
    icon: 'science',
    label: 'Lab',
    separator: true,
    to: '/lab'
  }
]

export default {
  setup () {
    return {
      drawer: ref(false),
      menuList
    }
  }
}
</script>