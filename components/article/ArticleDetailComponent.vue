<script setup lang="ts">

defineProps({
  title: String,
  inventory: Array,
  updatedAt: String,
  author: String
})

defineEmits(['back'])
</script>

<template>
  <div class="article">
    <div style="text-align: right"><button @click="$emit('back')">목록으로</button></div>
    <h1 class="title">{{ title }}</h1>
    <hr class="line" />
    <div class="author">
      작성일: {{ updatedAt }} / 작성자: {{ author }}
    </div>

    <div v-for="item in inventory" :key="item.no">
      <div class="image-box">
        <img v-if="item.type == 'image'" class="attr" :src="item.contents" />
      </div>
      <div v-if="item.type == 'text'" class="text">{{ item.contents }}</div>
    </div>
    <div style="text-align: right"><button @click="$emit('back')">목록으로</button></div>
  </div>
</template>