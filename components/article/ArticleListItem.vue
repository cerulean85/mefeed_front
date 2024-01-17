<script setup lang="ts">
defineProps({
  thumbnail: String,
  title: String,
  contents: String,
  createdAt: String,
  author: String
})

defineEmits(['detail'])
</script>

<template>
  <div class="row">
      <div class="layout">
        <img
          class="thumbnail-img"
          @click="$emit('detail')"
          :src="thumbnail"
        />
        <div class="text">
          <div class="title" @click="$emit('detail')">{{ title }}</div>
          <div class="contents" @click="$emit('detail')">{{ contents }}</div>          
          <div class="author">{{ author }}</div>
          <div class="date">{{ createdAt?.split(' ')[0] }}</div>
        </div>
      </div>
      <hr class="line" />
  </div>
</template>