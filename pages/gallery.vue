<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div id="main" class="about">
    <h1 class="title">Art Gallery</h1>
    <hr />

    <section v-bind:id="o.page_id" v-for="o in artRows" :key="o.page_id">
      <div class="container">
        <div class="row" :style="{ marginTop: (o.index == 1 ? 180 : 180) + 'px' }">
          <div class="col-md-4" v-for="item in o.items" :key="item.idx">
            <img :src="item.url" class="img-fluid">
            <h3 style="margin-top: 12px;">{{ item.title }}</h3>
            <h4>{{ item.description }}</h4>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="container">
        <div class="row" style="margin-top: 200px;">
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">

import { ref, onMounted } from "vue";
import { useSelectedCategory } from "../stores/counterStore"

import { 
  fetchBotArtAll
} from "../scripts/fetch_data";

const store = useSelectedCategory();
store.selectedCategory = "gallery";

const artRows: any = ref([]);

onMounted(async () => {

  const data: any = await fetchBotArtAll();
  console.debug(data);
  let index: number = 1;
  let rowArr: any[] = []
  for (const item of data) {
    console.log(item)
    rowArr.push(item)
    if (rowArr.length === 3) {
      artRows.value.push({
        "index": index,
        "page_id": `page${index}`,        
        "items": rowArr
      });

      index = index + 1;
      rowArr = [];
    }
  }
  if (rowArr.length > 0) {
    artRows.value.push({
        "index": index,
        "page_id": `page${index}`,
        "items": rowArr
      });
  }
  console.debug(artRows.value)
  

  const lastPageId = ref(`page${index+1}`)
  let currentPage = 1; // 현재 페이지 번호
  function scrollToNextPage() {
    if (currentPage < 3) { // 페이지 수에 따라 조정
        currentPage++;
        const nextPage = document.getElementById(`page${currentPage}`);
        if (nextPage) {
            nextPage.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }
  }

  function scrollToPreviousPage() {
    if (currentPage > 1) {
    // alert("Prev!")
        currentPage--;
        const previousPage = document.getElementById(`page${currentPage}`);
        if (previousPage) {
            previousPage.scrollIntoView({ behavior: "smooth", block: currentPage == 1 ? "end" : "center" });
        }
    }
  }

  // 스크롤 휠 이벤트 처리
  document.addEventListener("wheel", function(event) {
    if (event.deltaY > 0) {        
      scrollToNextPage(); // 아래로 스크롤 시 다음 페이지로 이동
    } else {
      scrollToPreviousPage(); // 위로 스크롤 시 이전 페이지로 이동
    }
  });

});



</script>