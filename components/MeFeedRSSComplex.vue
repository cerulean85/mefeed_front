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
            :key="feed.no"
            :style="{
              backgroundColor: isSelected(feed.no)
                ? '#FFCC25'
                : '#E6E6E9',
            }"
            @click="detail(typeof index === 'number' ? index : 0)"
          >
            <div class="feed-elements">
              <label
                class="title"
                v-if="feed.name == undefined || feed.name == ''"
                >Untitled</label
              >
              <label class="title" v-else>{{ feed.name }}</label>
              <label class="date">{{feed.feedCount}}개의 RSS Feed</label>
            </div>

            <img
              class="feed-thumbnail"
              :src="feed.logo"
              v-if="feed.logo"
            />
          </div>
        </div>
      </div>

      <div id="user-zone" class="user-zone">
        <div class="user-typing-zone">
          <div class="user-typing-title">
            <div class="title">
              <img class="logo" :src="currentFeed.logo" v-if="currentFeed.logo"/>
              {{ currentFeed.name }}
            </div>
          </div>
          <div class="user-typing-contents">
            <RSSViewer
              :items="inventory"
            ></RSSViewer>
          </div>
        </div>
      </div>

      <div id="zone-divider" class="zone-divider" style="visibility: collapse;"></div>

      <div id="bot-zone" class="bot-zone" style="visibility: collapse;">
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
              <img class="bot-selected-img" :src="currentBot.thumbnail" />
              <label class="bot-selected-lb">{{ currentBot.name }}</label>
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
            v-if="currentBot.type == feedbackItem.bot"
          >
            <div class="bot-challege-item">
              <label class="challenge-text">{{ currentBot.name }}</label>
              <div v-if="currentBot.type == feedbackItem.bot">
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
import RSSViewer from "./RSSViewer.vue";
import {
  getNewFeed,
  type Feed,  
  clearFeed,
  getNewFeedList,
} from "../scripts/interface_design";
import { getFeedbackMessage, feedbackState } from "../scripts/feed_state";

import { 
  fetchMediaAll, 
  fetchSearchMedia,
  fetchMediaRSSList,
  fetchBotState
} from "../scripts/fetch_data";

const logoAsset: any = {
  "jtbc": "/img/logo_jtbc.webp",
  "itworld": "/img/logo_itworld.jpg",
  "mk": "/img/logo_maekyung.jpg",
  "naver_d2": "/img/logo_naverd_2.jfif"
}

let feedList: any = ref([getNewFeedList()]);
let currentFeed: any = ref(getNewFeed());

let currentBot: any = ref(botChatGPT);
const isSelected = (no: string): boolean => {
  return no == currentFeed.value.no;
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
  setZoneDivider,
  botChatGPT,
  botGemini
} from "../scripts/bot_zone";
selectChatGPT();

async function loadData() {
  
  let resFeedList: any = undefined;
  if (searching()) {
    const data = await fetchSearchMedia(searchText.value);
    resFeedList = data;
  } else {
    const data = await fetchMediaAll();
    resFeedList = data;
  }

  if (resFeedList === undefined || resFeedList === null) return;

  setTimeout(() => {
    feedList.value = getNewFeedList();
    let curFeedList = feedList.value;
    for (var item of resFeedList) {
      item.logo = logoAsset[item.idx];
      curFeedList.push(item);
    }

    if (curFeedList.length > 0) detail(0);
  }, 500);
}

const inventory: any = ref(getNewFeedList());
async function detail (index: number) {  
  const curFeedItem = feedList.value[index];
  const curFeed = currentFeed.value;
  curFeed.no = curFeedItem.no;
  curFeed.idx = curFeedItem.idx;
  curFeed.name = curFeedItem.name;
  curFeed.logo = logoAsset[curFeed.idx];

  const rssList: any = await fetchMediaRSSList(curFeed.idx);  
  inventory.value.splice(0, inventory.value.length); // 이걸 해야 인식이 됨
  for (const rss of rssList) {

    // let updatedDate: string = "";
    // const tmp = rss.updatedAt.split(' ');
    // if (tmp.length > 0) {
    //   updatedDate = tmp[0].replaceAll('-', '.') + '.';
    // }

    inventory.value.push({
      no: rss.no,
      idx: rss.idx,
      title: rss.title,
      link: rss.link,    
      updatedAt: rss.updatedAt,
      name: curFeedItem.name
    })
  }
};

async function checkBotState(mediaNo: string, updateFeedbackAction: any) {
  const data = await fetchBotState("kkennib", mediaNo, currentBot.value.type)
  const state = data.state;
  feedbackStateMessage.value = getFeedbackMessage(state);
  updateFeedbackAction(data);
  switch (state) {
    case feedbackState.wait:
    case feedbackState.work:
      setTimeout(() => {
        checkBotState(mediaNo, updateFeedbackAction);
      }, 5000);
      break;
  }
}

onMounted(() => {
  
  initData();  
  setZoneDivider();

});

function selectChatGPT() {
  currentBot.value = botChatGPT;
  const curFeed = currentFeed.value;
  currentBot.value.checkStateAction(curFeed.mediaNo, (res: Feed) => {
    curFeed.feedback = res.feedback;
  });  
}

function selectGemini() {
  currentBot.value = botGemini;
  const curFeed = currentFeed.value;
  currentBot.value.checkStateAction(curFeed.mediaNo, (res: Feed) => {
    curFeed.feedback = res.feedback;
  });  
}

</script>