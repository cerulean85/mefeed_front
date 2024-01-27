<script setup lang="ts">

const props = defineProps(["items"]);
const rssItems = props.items;

function viewArticle(link: string) {
  const openNewWindow: (Window | null) = window.open("about:blank");
  if (openNewWindow !== null) {
    openNewWindow.location.href = link;
  }
}

</script>

<template>
  <div v-for="(_, index) in rssItems" :key="index">
    <div class="rss row">
      <div class="col-md-10">
        <div class="row">
          <label class="title">
            {{ rssItems[index].title }}
          </label>
        </div>
        <div class="row">
          <!-- <div class="col-10"> -->
            <!-- <div class="row"> -->
              <a class="link" :href="rssItems[index].link" target="_blank">{{ rssItems[index].link }}</a>
            <!-- </div> -->
          <!-- </div> -->
          <!-- <div class="col-2">
            <label class="date">{{ rssItems[index].updatedAt }}</label>
          </div>           -->
        </div>
        <div class="date">
          <label class="date">출처: {{ rssItems[index].name }} &nbsp;|&nbsp;   작성일: {{ rssItems[index].updatedAt }}</label>
        </div>
      </div>
      <div class="col-md-2 view-button">
        <button type="button" class="btn btn-secondary" @click="viewArticle(rssItems[index].link)">
          기사 보기
        </button>
      </div>
    </div>
  </div>
</template>
