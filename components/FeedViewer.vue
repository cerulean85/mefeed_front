<script setup lang="ts">

const props = defineProps(["textareaContents"]);
defineEmits(["updateContentsFunc", "updateFocusedIndex"]);
const textareaContents = props.textareaContents;

import {
  isImageUrl,
  isYoutubeUrl
} from "../scripts/check_text_format"

</script>

<template>
  <div v-for="(_, index) in textareaContents" :key="index">
    <div class="content" 
      v-if="!isImageUrl(textareaContents[index].contents) && !isYoutubeUrl(textareaContents[index].contents)">
      {{ textareaContents[index].contents }}
    </div>
    <div style="text-align: center">
      <img
        class="image"
        :src="textareaContents[index].contents"
        alt="Image"
        v-if="isImageUrl(textareaContents[index].contents)"
      />
    </div>
    <div style="text-align: center">
      <iframe width="560" height="315" 
              :src="textareaContents[index].contents" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowfullscreen
              v-if="isYoutubeUrl(textareaContents[index].contents)">
      </iframe>
    </div>
  </div>
</template>
