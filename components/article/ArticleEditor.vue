<template>
  <button class="write-button" @click="open = true">글쓰기</button>

  <Teleport to="body">
    <div v-if="open" class="modal-base">
      <div class="modal-main">

        <ArticleBasicEditorComponent
          v-model:title="article.title"
          v-model:contents="article.contents"
          @handle-file-change="handleFileChange"
          @submit="() => { submit(); }"
          @close="() =>{ clear(); open = false }"
        />
      
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import ArticleBasicEditorComponent from './ArticleBasicEditorComponent.vue';
const open = ref(false)
const article = ref({
    title: "",
    contents: "",
})


function handleFileChange(event: any) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      // this.contents += `<img src=${e.target.result} />`;
      // this.imageSrc = e.target.result;

      const formData = new FormData();
      formData.append("file", file);
      fetch("http://localhost:8082/uploadFile", {
        method: "POST",
        mode: "cors", //no-cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: formData,
      })
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((data) => {
          article.value.contents += `\n[img]${data.url}\n\n`;
          
        })
        .catch((error) => {
          console.log(`error: ${error}`);
        });
    };

    reader.readAsDataURL(file);    
  }
}

function submit() {

  const articleValue = article.value
  let srcArr = articleValue.contents.split("\n");


  interface ArticleItem {
    no: number, contents: string, type: string
  }

  const articleObj = { 
    articleType: "basic", 
    author: "kkennib", 
    title: articleValue.title, 
    thumbnail: "", 
    inventory: new Array<ArticleItem>()
  };

  for (let text of srcArr) {

    if (text == "") continue;

    let type = "text";      
    if (text.substring(0, 5) == "[img]") {
      text = text.substring(5, text.length);
      articleObj.thumbnail = articleObj.thumbnail == "" ? text : articleObj.thumbnail
      type = "image";
    }

    articleObj.inventory.push({
      no: articleObj.inventory.length + 1,
      contents: text,
      type: type
    });
    
  }    

  fetch("http://localhost:8082/article", {
    method: "POST",
    mode: "cors", //no-cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(articleObj),
  })
  .then((response) => {
    console.log(response);
    clear();
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(`error: ${error}`);
  });
  
}

function clear() {
  article.value.title = "";
  article.value.contents = "";
}

</script>
