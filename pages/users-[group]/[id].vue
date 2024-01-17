<template>
  <p>{{ $route.params.group }} - {{ $route.params.id }}</p>
</template>

<script setup lang="ts">

const route = useRoute();
// alert(route.params.id);
console.log(route.params.id);
console.log(route.params.id);
console.log(route.params.id);
console.log(route.params.id);
console.log(route.params.id);
console.log(route.params.id);
if (route.params.group === 'admins' && !route.params.id) {
  console.log("Warning! Make sure user is authenticated!");
}
</script>