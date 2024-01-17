<script setup lang="ts">
import { ref, onMounted, onUpdated, nextTick } from "vue";

const props = defineProps(["textareaContents"]);
defineEmits(["updateContentsFunc", "updateFocusedIndex"]);
const textareaContents = props.textareaContents; //ref([{ content: '' }])
const textareaRefs = ref([]);

const enterKey = async (index: number) => {
  const currentTextarea: HTMLTextAreaElement = textareaRefs.value[index];
  const currentIndex: number = currentTextarea.selectionStart;

  const currentText = textareaContents[index].contents;
  const newTextareaValue = currentText.substring(
    currentIndex,
    currentTextarea.value.length
  );
  textareaContents[index].contents = currentText.substring(0, currentIndex);

  textareaContents.splice(index + 1, 0, { contents: newTextareaValue });
  await nextTick();
  const newTextarea: HTMLTextAreaElement = textareaRefs.value[index + 1];
  newTextarea.focus();
  newTextarea.setSelectionRange(0, 0);
};

// Cursor가 Textarea의 첫번째 Index 위치 여부 반환
function isCursorLastIndex(textAreaIndex: number) {
  const currentTextarea: HTMLTextAreaElement =
    textareaRefs.value[textAreaIndex];
  const currentIndex: number = currentTextarea.selectionStart;
  const contentsLength: number =
    textareaContents[textAreaIndex].contents.length;
  return currentIndex === contentsLength;
}

// Cursor가 Textarea의 마지막 Index 위치 여부 반환
function isCursorFirstIndex(textAreaIndex: number) {
  const currentTextarea: HTMLTextAreaElement =
    textareaRefs.value[textAreaIndex];
  const currentIndex: number = currentTextarea.selectionStart;
  return currentIndex === 0;
}

const controlKeys = async (textAreaIndex: number, event: any) => {
  if (event.key === "Delete") {
    if (textAreaIndex == textareaRefs.value.length - 1) return; // Cursor가 마지막 Textarea에 있다면 [기본동작]
    if (!isCursorLastIndex(textAreaIndex)) return; // Cursor가 마지막 Index에 위치 하지 않는다면 [기본동작]

    // Cursor가 Textarea의 마지막 Index에 위치 한다면
    event.preventDefault();
    const currentTextarea: HTMLTextAreaElement =
      textareaRefs.value[textAreaIndex];
    const currentTextareaContentObj = textareaContents[textAreaIndex];
    const currentTextareaLastInedx = currentTextareaContentObj.contents.length;
    const nextTextareaContent = textareaContents[textAreaIndex + 1].contents;

    // 위 아래 Textarea 내용 합치기
    currentTextarea.value =
      currentTextareaContentObj.contents + nextTextareaContent;

    // 합친 후 Cursor의 위치는 두 Textarea 내용 사이에 위치
    currentTextarea.setSelectionRange(
      currentTextareaLastInedx,
      currentTextareaLastInedx
    );
    currentTextareaContentObj.contents = currentTextarea.value; // 위쪽 Textarea에 합친 내용 넣기
    textareaContents.splice(textAreaIndex + 1, 1); // 아래쪽 Textarea 삭제
  } else if (event.key === "Backspace") {
    if (textAreaIndex == 0) return; // 첫번째 Textarea라면 [기본동작]
    if (!isCursorFirstIndex(textAreaIndex)) return; // Cursor가 첫번째 index에 위치하지 않는다면 [기본동작]

    event.preventDefault();
    const currentTextarea: HTMLTextAreaElement =
      textareaRefs.value[textAreaIndex];
    const currentText = textareaContents[textAreaIndex].contents;
    const concatTextareaValue = currentText.substring(
      0,
      currentTextarea.value.length
    );
    const prevTextareaContentObj = textareaContents[textAreaIndex - 1];
    const prevTextareaLastInedx = prevTextareaContentObj.contents.length;
    const prevTextarea: HTMLTextAreaElement =
      textareaRefs.value[textAreaIndex - 1];

    prevTextarea.focus();
    textareaContents.splice(textAreaIndex, 1);

    // 위/아래 콘텐츠 합치기
    prevTextarea.value = prevTextareaContentObj.contents + concatTextareaValue;

    // 맨 끝으로 커서 보내기
    prevTextarea.setSelectionRange(
      prevTextareaLastInedx,
      prevTextareaLastInedx
    );

    prevTextareaContentObj.contents = prevTextarea.value;
  }

  if (event.shiftKey) {
    switch (event.keyCode) {
      case 37: // Left Key
      case 39: // Right Key
        return;
    }
  } else if (event.keyCode === 37) {
    // Left Key
    arrowLeftKey(textAreaIndex, event);
  } else if (event.keyCode === 38) {
    // Up Key
    arrowUpKey(textAreaIndex, event);
  } else if (event.keyCode === 39) {
    // Right Key
    arrowRightKey(textAreaIndex, event);
  } else if (event.keyCode === 40) {
    // Down Key
    arrowDownKey(textAreaIndex, event);
  }
};
const arrowUpKey = (textAreaIndex: number, event: any) => {
  if (isFirstTextarea()) return;
  if (isCursorFirstIndex(textAreaIndex)) {
    event.preventDefault();
    moveCursorToPrevTextareaAndFirstIndex();
  }
  function moveCursorToPrevTextareaAndFirstIndex() {
    const prevTextarea: HTMLTextAreaElement =
      textareaRefs.value[textAreaIndex - 1];
    const contentsLength = prevTextarea.value.length;
    prevTextarea.setSelectionRange(contentsLength, contentsLength);
    prevTextarea.focus();
  }
  function isFirstTextarea() {
    return textAreaIndex == 0;
  }
};
const arrowDownKey = (textAreaIndex: number, event: any) => {
  if (isLatTextarea()) return;
  if (isCursorLastIndex(textAreaIndex)) {
    event.preventDefault();
    moveCursorToNextTextareaAndFirstIndex();
  }

  function moveCursorToNextTextareaAndFirstIndex() {
    const nextTextarea: HTMLTextAreaElement =
      textareaRefs.value[textAreaIndex + 1];
    nextTextarea.setSelectionRange(0, 0);
    nextTextarea.focus();
  }
  function isLatTextarea() {
    return textAreaIndex == textareaRefs.value.length - 1;
  }
};

const arrowLeftKey = (textAreaIndex: number, event: any) => {
  const currentTextarea: HTMLTextAreaElement =
    textareaRefs.value[textAreaIndex];
  const currentIndex: number = currentTextarea.selectionStart;
  if (currentIndex == 0) arrowUpKey(textAreaIndex, event);
  else currentTextarea.setSelectionRange(currentIndex, currentIndex - 1);
};

const arrowRightKey = (textAreaIndex: number, event: any) => {
  const currentTextarea: HTMLTextAreaElement =
    textareaRefs.value[textAreaIndex];
  const currentIndex: number = currentTextarea.selectionStart;
  if (currentIndex == currentTextarea.value.length) {
    event.preventDefault();
    arrowDownKey(textAreaIndex, event);
  } else currentTextarea.setSelectionRange(currentIndex, currentIndex + 1);
};

const showImageTag = (contents: string) => {
  const imageUrlRegex = /(https?:\/\/[^\s]+)/g;
  const matches = contents.match(imageUrlRegex);
  return matches;
};

const calcHeight = () => {
  let lineCount = 0;
  const lineHeight = 30;
  for (var ref of textareaRefs.value) {
    const fontWidth = lineCount < 10 ? 12 : 8;
    const lineLength = ref.clientWidth / fontWidth;
    const textCount = ref.value.length;
    lineCount = Math.ceil(textCount / lineLength);
    lineCount = lineCount == 0 ? 1 : lineCount;

    const refHeight = lineCount * lineHeight;
    ref.style.height = refHeight + "px";
  }
};

onMounted(() => {
  window.addEventListener("resize", () => {
    calcHeight();
  });
});

onUpdated(() => {
  calcHeight();
});
</script>

<template>
  <div v-for="(_, index) in textareaContents" :key="index">
    <textarea
      class="content"
      v-model="textareaContents[index].contents"
      placeholder="내용을 입력해주세요."
      @keydown.enter.prevent="enterKey(index)"
      @keydown="controlKeys(index, $event)"
      @input="$emit('updateContentsFunc', index)"
      @focus="$emit('updateFocusedIndex', index)"
      ref="textareaRefs"
    >
    </textarea>
    <div style="text-align: center">
      <img
        class="image"
        :src="textareaContents[index].contents"
        alt="Image"
        v-if="showImageTag(textareaContents[index].contents)"
      />
    </div>
  </div>
</template>