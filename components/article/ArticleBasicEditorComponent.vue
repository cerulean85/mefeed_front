<script setup lang="ts">

defineProps({
  title: String,
  contents: String,
})

defineEmits(['update:title', 'update:contents', 'handleFileChange', 'submit', 'close'])
</script>

<template>
  <div class="editor">
    <h1>새 글 쓰기</h1>
    <div style="margin-bottom: 12px;">
      <input class="title" type="text" placeholder="제목을 입력하세요." 
            :value="title" @input="$emit('update:title', $event.target.value)"/>
    </div>

    <div>
      <input type="file" id="fileInput" @change="$emit('handleFileChange', $event)"/>
      <div style="margin-bottom: 4px;">
        <label for="fileInput" class="file-input-button">파일 추가</label>
      </div>
    </div>

    <div style="margin-bottom: 18px;">
      <textarea class="content" placeholder="내용을 입력해주세요."
                :value="contents" @input="$emit('update:contents', $event.target.value)">
      </textarea>
    </div>

    <div style="display: flex; justify-content: flex-end;">
      <button class="submit-button" style="margin-right: 6px;" @click="$emit('submit')">제출</button>
      <button class="close-button" @click="$emit('close')">닫기</button>
    </div>
  </div>
</template>