<template>
  <div id="main" class="mefeed-div">
    <div id="mefeed-main-zone" class="main">
      <div id="feed-zone" class="feed-zone">
        <div class="feed-search-zone">
          <input
            class="feed-search-input"
            type="text"
            @keyup.enter="search"
            placeholder="Search..."
            v-model="searchText"
          />
          <span
            class="feed-search-button material-icons-outlined md-36"
            @click="search"
            >search</span
          >
        </div>

        <div class="feed-list-zone" @scroll="attachData">
          <div
            class="feed-item-layout"
            v-for="(feed, index) in feedList"
            :key="feed.articleId"
            :style="{
              backgroundColor: isSelected(feed.articleId)
                ? '#FFCC25'
                : '#E6E6E9',
            }"
            @click="detail(typeof index === 'number' ? index : 0)"
          >
            <div class="feed-elements">
              <label
                class="title"
                v-if="feed.title == undefined || feed.title == ''"
                >Untitled</label
              >
              <label class="title" v-else>{{ feed.title }}</label>
              <label
                class="contents"
                v-if="feed.contents == undefined || feed.contents.length == 0"
                >No Contents.</label
              >
              <label class="contents" aria-relevant="" v-else>{{
                feed.contents
              }}</label>
              <label class="date">{{ feed.updatedAt }}</label>
            </div>

            <img
              class="feed-thumbnail"
              :src="feed.thumbnail"
              v-if="feed.thumbnail"
            />
          </div>
        </div>
      </div>

      <div id="user-zone" class="user-zone">

        <div class="user-typing-zone">
          <div class="user-typing-title">
            <div class="title">
              {{ currentFeed.title }}
            </div>
          </div>
          <div class="user-typing-contents">
            <FeedViewer
              :textareaContents="currentFeed.inventory"
              @update-focused-index="updateRowIndex"
              @update-contents-func="updateListHead"
            ></FeedViewer>
          </div>
        </div>
      </div>

      <div id="zone-divider" class="zone-divider"></div>

      <div id="bot-zone" class="bot-zone">
        <div class="bot-monit-zone">
          <img
            class="bot-thumbnail"
            src="https://cdn.imweb.me/upload/S20221129c3c04fdc67a8b/09e904cb8f26f.png"
          />
          <label class="bot-label">Gen AI의 피드백</label>

          <div class="bot-type_select btn-group me-4">
            <button
              type="button"
              class="btn btn-secondary dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="true"
            >
              <img class="bot-selected-img" :src="selectedBotImageUrl" />
              <label class="bot-selected-lb">{{ selectedBotName }}</label>
            </button>
            <ul class="bot-dropdown dropdown-menu">
              <li class="mb-2" @click="selectChatGPT">
                <img src="/img/chatgpt.svg" />ChatGPT
              </li>
              <li @click="selectGemini">
                <img src="/img/gemini.png" />Gemini
              </li>
            </ul>
          </div>
        </div>

        <div
          v-for="feedbackItem in currentFeed.feedback"
          :key="feedbackItem.bot"
        >
          <div
            class="bot-challenge-zone"
            v-if="selectedBotType == feedbackItem.bot"
          >
            <div class="bot-challege-item">
              <label class="challenge-text">{{ selectedBotName }}</label>
              <div v-if="selectedBotType == feedbackItem.bot">
                <div v-for="item in feedbackItem.inventory" :key="item.no">
                  <div class="content">
                    {{ item.contents.replaceAll("\\", "") }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import FeedViewer from "./FeedViewer.vue";
import {
  remoteAxiosPost,
  remoteAxiosDelete,
  remoteAxiosPut,
  remoteAxiosPutToForm,
  remoteAxiosGet,
  remoteAxiosDeleteToForm,
} from "../scripts/custom_axios";
import {
  getNewFeed,
  type Feed,  
  clearFeed,
  getNewFeedList,
} from "../scripts/interface_design";
import { remoteUrl } from "../scripts/app_config";
import { getFeedbackMessage, feedbackState } from "../scripts/feed_state";

const userId = "kkennib";

let selectedBotImageUrl: any = "/img/chatgpt.svg";
let feedList: any = ref([getNewFeedList()]);
let currentFeed: any = ref(getNewFeed());
let currentRowIndex = 0;
function updateRowIndex(idx: number) {
  currentRowIndex = idx;
}

let selectedBotType: any = ref("chat_gpt");
let botNamespace: any = { chat_gpt: "ChatGPT", gemini: "Gemini" };
let selectedBotName: any = ref(botNamespace["chat_gpt"]);


const isSelected = (articleId: string): boolean => {
  return articleId == currentFeed.value.articleId;
};
let feedbackStateMessage: any = ref(getFeedbackMessage(feedbackState.wait));

let page: any = ref(1);
let totalPageCount = -1;
let totalItemCount: any = ref(0);
let searchText: any = ref("");
const searching = (): boolean => searchText.value.length > 0;
async function search() {
  page.value = 1;
  feedList.value = getNewFeedList();
  totalPageCount = -1;
  totalItemCount.value = 0;
  await loadData();
}
async function initData() {
  await loadData();
}
async function attachData(e: any) {
  const { scrollHeight, scrollTop, clientHeight } = e.target;
  const isAtTheBottom = scrollHeight <= scrollTop + clientHeight;
  if (!isAtTheBottom) return;
  if (totalPageCount < page.value) return;
  await loadData();
}

import { 
  fetchArticleAll, 
  fetchSearchArticle,
  fetchBotState
} from "../scripts/fetch_data";
async function loadData() {
  
  let resFeedList: any = undefined;
  if (searching()) {
    const data = await fetchSearchArticle(userId, searchText.value, 1);
    resFeedList = data.list;
  } else {
    const data = await fetchArticleAll(userId, 1);
    resFeedList = data.list;
  }

  if (resFeedList === undefined || resFeedList === null) return;

  for (const e of resFeedList) {
    e.contents = "";
    for (let item of e.inventory) {
      if (item.type == "text") {
        e.contents = item.contents.substring(0, 50);
        break;
      }
    }
  }

  setTimeout(() => {
    feedList.value = getNewFeedList();
    let curFeedList = feedList.value;
    for (var item of resFeedList) {
      curFeedList.push(item);
    }

    if (curFeedList.length > 0) detail(0);
  }, 1000);

}

const detail = (index: number) => {
  const prevFeedId = currentFeed.value.articleId;
  if (prevFeedId != undefined && prevFeedId != "") {
    updateFeed();
  }

  const curFeed = currentFeed.value;
  const curFeedItem = feedList.value[index];
  curFeed.articleId = curFeedItem.articleId;
  curFeed.title = curFeedItem.title;
  curFeed.createdAt = curFeedItem.createdAt;

  const invenItemCount = curFeed.inventory.length;
  curFeed.inventory.splice(0, invenItemCount); // 이걸 해야 인식이 됨
  if (curFeedItem.inventory == undefined || curFeedItem.inventory.length == 0) {
    curFeed.inventory.push({ no: 1, contents: "", type: "text" });
  } else {
    for (const feed of curFeedItem.inventory) {
      curFeed.inventory.push({
        no: feed.no,
        contents: feed.contents,
        type: feed.type,
      });
    }
  }

  checkBotState(curFeed.articleId, (res: Feed) => {
    curFeed.feedback = res.feedback;
  });
};

async function checkBotState(articleId: string, updateFeedbackAction: any) {
  const data = await fetchBotState(userId, articleId, selectedBotType.value)
  const state = data.state;
  feedbackStateMessage.value = getFeedbackMessage(state);
  updateFeedbackAction(data);
  switch (state) {
    case feedbackState.wait:
    case feedbackState.work:
      setTimeout(() => {
        checkBotState(articleId, updateFeedbackAction);
      }, 5000);
      break;
  }
}

function updateListHead(idx: number) {
  const curFeed = currentFeed.value;
  if (curFeed == undefined || idx > 0) return;

  const curFeedList = feedList.value;
  for (var i in curFeedList) {
    const feedItem = curFeedList[i];
    if (feedItem.articleId !== curFeed.articleId) continue;

    feedItem.title = curFeed.title;
    if (feedItem.inventory.length > 0) {
      feedItem.contents = curFeed.inventory[0].contents;
    } else {
      feedItem.inventory.push({
        no: curFeed.inventory[0].no,
        contents: curFeed.inventory[0].contents,
        type: curFeed.inventory[0].type,
      });
    }
    curFeedList.splice(i, 1);
    curFeedList.splice(0, 0, feedItem);
  }
}

const updateFeed = async () => {
  if (currentFeed.value == undefined) return;

  const curFeed = currentFeed.value;
  const curFeedList = feedList.value;
  for (var feedItem of curFeedList) {
    if (feedItem.articleId !== curFeed.articleId) continue;

    feedItem.inventory.splice(0, feedItem.inventory.length);
    for (var editInvenItem of curFeed.inventory) {
      feedItem.inventory.push(editInvenItem);
    }
  }

  curFeed.author = userId;
  remoteAxiosPut(`${remoteUrl}/article`, curFeed);
};

onMounted(() => {
  
  initData();

  let isDragging = false;
  const divider = document.getElementById("zone-divider");
  if (divider == null) {
    console.error("Element not found");
    return;
  }

  /* Event listener for mousedown event to start dragging */
  divider.addEventListener("mousedown", function (e) {
    isDragging = true;
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    e.preventDefault();
  });

  /* Function to resize the left and right panels on mousemove */
  function onMouseMove(e: any) {
    if (!isDragging) {
      return;
    }

    const mainElement = document.getElementById("mefeed-main-zone");
    const feedElement = document.getElementById("feed-zone");
    const userElement = document.getElementById("user-zone");
    const botElement = document.getElementById("bot-zone");
    const dividerElement = document.getElementById("zone-divider");
    if (
      mainElement == null ||
      feedElement == null ||
      userElement == null ||
      botElement == null ||
      dividerElement == null
    ) {
      console.error("Element not found");
      return;
    }

    const userWidth = e.clientX - feedElement.clientWidth;
    if (userWidth <= 300 || userWidth > 1050) return;
    userElement.style.width = `${userWidth}px`;
  }

  function onMouseUp() {
    if (isDragging) {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      isDragging = false;
    }
  }
});

function selectChatGPT() {
  selectedBotImageUrl = "/img/chatgpt.svg";
  selectedBotType.value = "chat_gpt";
  selectedBotName.value = botNamespace[selectedBotType.value];

  const curFeed = currentFeed.value;
  checkBotState(curFeed.articleId, (res: Feed) => {
    curFeed.feedback = res.feedback;
  });
}

function selectGemini() {
  selectedBotImageUrl = "/img/gemini.png";
  selectedBotType.value = "gemini";
  selectedBotName.value = botNamespace[selectedBotType.value];

  const curFeed = currentFeed.value;
  checkBotState(curFeed.articleId, (res: Feed) => {
    curFeed.feedback = res.feedback;
  });
}

</script>
