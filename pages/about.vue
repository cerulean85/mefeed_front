<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div id="main" class="about">
    <h1 class="title">About</h1>
    <hr />

    <div class="scroll-container">
      <div style="margin-bottom: 18px; margin-left: 12px; font-size:14px; color:gray">Updated: 2024-01-13</div>
      <ul>
        <h4>1. MeFeed의 기능 {{ store.selectedCategory }}</h4>
        <li>MeFeed는 사용자가 보다 수준 높은 글을 작성할 수 있도록 생성형 AI의 Feedback을 지원합니다.</li>
        <li>MeFeed는 사용자가 글을 작성하고 이미지를 업로드하고, 검색하는 기능을 제공합니다.</li>
        <li>MeFeed는 Open API를 이용하여 OpenAI의 ChatGPT와 Google의 Gemini의 API를 이용하여 상호작용합니다.</li>
      </ul>
      <br />
      <ul>
        <h4>2. MeFeed 개발진의 의무</h4>
        <li>MeFeed 개발진은 사용자 지향적인 Feedback 지원을 위해 Prompt를 지속적으로 탐구하여 AI 성능을 향상시킵니다.</li>
        <li>MeFeed 개발진은 사용자가 능숙하게 글을 작성하여 콘텐츠를 제작할 수 있도록 Editor 기능을 끊임없이 연구하여 업데이트합니다.</li>
      </ul>
      <ul>
        <h4>3. MeFeed의 현재</h4>
        <li>MeFeed는 아직 개발 단계이지만 사용자의 호의적인 반응을 얻는 멋진 서비스가 되기까지 서비스를 공개합니다.</li>
      </ul>
    </div>
  </div>
</template>

<!-- <style lang="scss">
@import "@/styles/contents.scss";
//@import "@/styles/timer.scss";
</style> -->
<script setup lang="ts">

import { ref, onMounted } from "vue";
import { useSelectedCategory } from "../stores/counterStore"

const store = useSelectedCategory();
store.selectedCategory = "about";

onMounted(() => {
  
  console.log(store.selectedCategory)
  console.log(store.selectedCategory)
  console.log(store.selectedCategory)
  console.log(store.selectedCategory)
  // alert("About")
//   const counter = useState('counter');
// const categories = useState('categories');
// categories.value[0]["selected"] = true;
// console.debug(categories.value[0])

});



</script>