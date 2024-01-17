<template>
  <div id="app" class="layout-app">

    <!-- <header>
      <div class="layout-title centered-content">
        <div>Awesome Mate!</div>
      </div>
      <div class="layout-main-menu">
        <div v-for="category in categories" :key="category.id">
          <NuxtLink class="router-main-menu-button" 
                      :to="category.to" :style="changeMainMenuColor(category)" 
                      @click="selectMainMenu(category.id)">
                      <div class="router-outer-inline-block">{{ category.name }}</div>
          </NuxtLink>
        </div>
      </div>
    </header> -->

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark" v-if="showMeFeed">
      <div class="container-fluid">
        <NuxtLink class="navbar-brand fw-bold" to="/" @click="()=> {
          meFeedCategories.forEach( e=> {
            e.selected = false;
          });
        }">MeFeed</NuxtLink>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">          
            <li class="nav-item" v-for="category in meFeedCategories" :key="category.id">
              <NuxtLink class="nav-link" 
              :class="{active: category.selected}" :to="category.to" 
              @click="() => {
                meFeedCategories.forEach( e => {
                  e.selected = false
                });
                category.selected = true
              }">{{ category.name }}</NuxtLink>
            </li>
          </ul>
<!--          <span class="material-icons-outlined md-32 md-light">account_circle</span>-->
        </div>        
      </div>
    </nav>

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark" v-if="showPlayBed">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">PlayBed</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">          
            <li class="nav-item" v-for="category in bedCategories" :key="category.id">
              <NuxtLink class="nav-link" 
              :class="{active: category.selected}" :to="category.to" 
              @click="() => {
                bedCategories.forEach( e => {
                  e.selected = false
                });
                category.selected = true
              }">{{ category.name }}</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <main>
      <NuxtPage />
    </main>

    <!-- <footer>
      <hr>
      <p>&copy; 2023 Awesome Mate. All rights reserved. Designed by kkennib.</p>
    </footer> -->

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const showMeFeed: any = ref(true);
const showPlayBed: any = ref(false);

interface Category {
  id: number;
  name: string;
  selected: boolean;
}

interface ColorStyle {
  color: string;
}

const meFeedCategories = ref([
  { id: 0, name: "About", to: "/about", selected: false },
  // { id: 1, name: "Articles", to: "/article_list", selected: false },
  // { id: 2, name: "MeFeed", to: "/mefeed", selected: true },
  // { id: 3, name: "BedLots", to: "/bed/lots", selected: false },
  // { id: 4, name: "BedFavorite", to: "/bed/favorite", selected: false },
  // { id: 1, name: "Release", to: "/release", selected: false },
]);

const bedCategories = ref([
  { id: 1, name: "제비뽑기", to: "/bed/lots", selected: true },
  { id: 2, name: "유용한 사이트", to: "/bed/favorite", selected: false },
  // { id: 1, name: "Release", to: "/release", selected: false },
]);

function selectMainMenu(categoryId: number): void {
  meFeedCategories.value.forEach((e) => {
    e.selected = e.id == categoryId ? true : false;
  });
}

function changeMainMenuColor(category: Category): ColorStyle {
  return {
    color: category.selected ? "black" : "#f5f5f5",
  };
}

onMounted(() => {
  // changeMainMenuColor(meFeedCategories.value[0]);
  // selectMainMenu(2);
});

const router = useRouter();
// router.push("/about");
// router.push("/");
// router.push('/game/lots');
// router.push("/bed/lots");
</script>