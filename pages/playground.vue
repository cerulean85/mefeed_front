<template>

  <q-page-container>
    <q-page>
      <div class="flex justify-center q-mb-xl">

        <div class="row justify-center" style="width: 100%;" v-for="(feed, index) in feedList" v-if="!loading">
          <q-card flat bordered style="max-width: 600px; cursor: pointer" :class="{ 'q-mt-sm': index > 0 }">
            <q-item>
              <q-item-section avatar>
                  <img src="/img/cat_exp_square_48.png" style="border-radius: 50px; margin-top: 6px; margin-bottom: 4px;">
                <!-- <q-skeleton type="QAvatar" animation="fade" /> -->
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-bold">
                  {{ feed.title }}
                </q-item-label>
                <q-item-label caption>
                  
                </q-item-label>
              </q-item-section>
            </q-item>

            <!-- <q-skeleton height="200px" square animation="fade" /> -->

            <q-img
              :src="feed.thumbnail"
              spinner-color="white"
              style="height: 200px;"
              v-if="isImageUrl(feed.thumbnail)"
            />

            <!-- <q-skeleton height="200px" square animation="fade" v-if="!isImageUrl(feed.thumbnail)"/> -->

            <q-card-section>
              <q-item-label>
                {{ feed.contents }}
              </q-item-label>
              <!-- <q-skeleton type="text" class="text-subtitle2" animation="fade" />
              <q-skeleton type="text" width="50%" class="text-subtitle2" animation="fade" /> -->
            </q-card-section>
          </q-card>
        </div>

        <div class="row justify-center" style="width: 100%;" v-for="n in 3" v-if="loading">
          <q-card flat bordered style="max-width: 600px" :class="{ 'q-mt-sm': n > 0 }">
            <q-item>
              <q-item-section avatar>
                <q-skeleton type="QAvatar" animation="fade" />
              </q-item-section>

              <q-item-section>
                <q-item-label>
                  <q-skeleton type="text" animation="fade" />
                </q-item-label>
                <q-item-label caption>
                  <q-skeleton type="text" animation="fade" />
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-skeleton height="200px" square animation="fade" />

            <q-card-section>
              <q-skeleton type="text" class="text-subtitle2" animation="fade" />
              <q-skeleton type="text" width="50%" class="text-subtitle2" animation="fade" />
            </q-card-section>
          </q-card>
        </div>

      </div>
    </q-page>
  </q-page-container>


  <!-- <div>
    1. '/' 페이지는 기본적으로 가장 최근에 등록된 상위 10개의 피드를 먼저 노출
    2. 무한 스크롤 로딩
    
    1. 어디까지나 검색은 보조적으로 제공이 되어야 함
    2. 검색에 의해 기존 사용성이 무너져선 안됨
    3. 우측 상단에 돋보기 버튼으로 검색 기능을 제공
    4. 돋보기 버튼을 누르면 검색 페이지가 로드
    4. 
    1. 스켈레톤을 깐다.
  </div>

    <div>
    <q-splitter
      v-model="splitterModel"
      style="height: 400px"
    >

      <template v-slot:before>
        <div class="q-pa-md">
          <div class="text-h4 q-mb-md">Before</div>
          <div v-for="n in 20" :key="n" class="q-my-md">{{ n }}. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</div>
        </div>
      </template>

      <template v-slot:after>
        <div class="q-pa-md">
          <div class="text-h4 q-mb-md">After</div>
          <div v-for="n in 20" :key="n" class="q-my-md">{{ n }}. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</div>
        </div>
      </template>

    </q-splitter>
  </div>
  <div class="q-pa-md q-gutter-sm">
    <q-btn color="white" text-color="black" label="Standard" />
    <q-btn color="primary" label="Primary" />
    <q-btn color="secondary" label="Secondary" />
    <q-btn color="amber" glossy label="Amber" />
    <q-btn color="brown-5" label="Brown 5" />
    <q-btn color="deep-orange" glossy label="Deep Orange" />
    <q-btn color="purple" label="Purple" />
    <q-btn color="black" label="Black" />
  </div>

  <div class="q-pa-md row items-start q-gutter-md">
    <q-color v-model="hex" no-header class="my-picker" />
    <q-color v-model="hex" no-header-tabs class="my-picker" />
    <q-color v-model="hex" no-footer class="my-picker" />
    <q-color v-model="hex" no-header no-footer class="my-picker" />
  </div> -->
</template>

<script setup lang="ts">
import { ref } from 'vue';

const userId = "kkennib";
const loading: any = ref(true);

import { 
  fetchArticleAll, 
  fetchSearchArticle,
  fetchBotState
} from "../scripts/fetch_data";

import {
  getNewFeedList,
} from "../scripts/interface_design";


import {
  isImageUrl,
  isYoutubeUrl
} from "../scripts/check_text_format"


loadData();

const feedList: any = ref([getNewFeedList()]);
async function loadData() {
  const data: any = await fetchArticleAll(userId, 1);
  const resFeedList: any = data.list;
  if (resFeedList === undefined || resFeedList === null) return;

  const displayTextLength = 150;
  feedList.value = getNewFeedList();
  for (const e of resFeedList) {
    e.contents = "";
    for (let item of e.inventory) {
      
      if (e.thumbnail !== "" && isImageUrl(item.contents)) {
        e.thumbnail = item.contents;
      }

      if (item.type == "text" && !isImageUrl(item.contents) && !isYoutubeUrl(item.contents)) {
        e.contents += item.contents;
        if (e.contents.length > displayTextLength) {
          e.contents = e.contents.substring(0, displayTextLength) + "⋯";
          break;
        }
      }
    }

    feedList.value.push(e);
  }

  console.log("Loaded.");
  console.debug(feedList.value);
  loading.value = false;
}






</script>

<style lang="sass" scoped>
.my-picker
  width: 250px
</style>