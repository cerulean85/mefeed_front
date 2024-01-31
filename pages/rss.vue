<template>
  <MeFeedRSSComplex></MeFeedRSSComplex>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import MeFeedRSSComplex from "../components/MeFeedRSSComplex.vue";
import { useSelectedCategory } from "../stores/counterStore"

const store = useSelectedCategory();
store.selectedCategory = "rss";

onMounted(() => {


});


</script>