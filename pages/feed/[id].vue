<template>
  <p>{{ $route.params.id }}</p>
</template>
<script setup lang="ts">
const route = useRoute()

if (route.params.group === 'admins' && !route.params.id) {
  console.log('Warning! Make sure user is authenticated!')
}

import { 
  fetchGetArticle
} from "../../scripts/fetch_data";

onMounted(() => {

});

</script>