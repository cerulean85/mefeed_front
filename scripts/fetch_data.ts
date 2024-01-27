const apiServerUrl = "http://localhost:8082"; //"https://rest.kkennib.net";
export async function fetchArticleAll(userId: string, pageNo: number) {
  const data = await $fetch(`${apiServerUrl}/articles/${userId}/${pageNo}`);
  return data;
}

export async function fetchSearchArticle(userId: string, searchText: string, pageNo: number) {
  const { data, pending, error, refresh } = await useAsyncData(
    'fetchSearchArticle',
    () => $fetch(`${apiServerUrl}/articles/search/${searchText}/${pageNo}`)
  )
  return data.value;
}

export async function fetchBotState(userId: string, articleId: string, botType: string) {
  const { data, pending, error, refresh } = await useAsyncData(
    'fetchBotState',
    () => $fetch(`${apiServerUrl}/chat/feedback/${userId}/${articleId}/${botType}`)
  )
  return data.value;
}

export async function fetchNewFeed(newFeed: any) {
  await useFetch(`${apiServerUrl}/article`, {
    method: 'post',
    body: newFeed
  })
}

export async function fetchUpdateFeed(newFeed: any) {
  await useFetch(`${apiServerUrl}/article`, {
    method: 'put',
    body: newFeed
  })
}

export async function fetchMediaRSSList(mediaIdx: string) {
  const data = await $fetch(`${apiServerUrl}/rss/feed/${mediaIdx}`);
  return data;
}

export async function fetchMediaAll() {
  const data = await $fetch(`${apiServerUrl}/rss/media/all`);
  return data;
}

export async function fetchSearchMedia(searchText: string) {

  const { data, pending, error, refresh } = await useAsyncData(
    'fetchSearchMedia',
    () => $fetch(`${apiServerUrl}/rss/media/${searchText}`)
  )
  return data.value;

  // return {
  //   list: [
  //     {
  //       "no": 1,
  //       "mediaId": "rss-maekyung",
  //       "title": "매일경제",
  //       "logo": "/img/logo_maekyung.jpg",
  //       "updatedAt": "2024.1.20.",
  //       "feedback": [],
  //       "inventory": [
  //         {
  //           "no": 1,
  //           "title": "(11 / MK) 테스트 글의 제목입니다.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  //           "contents": "(11 / MK) 테스트 글의 내용입니다.",
  //           "link": "(11 / MK) 테스트 글의 링크입니다."
  //         },
  //         {
  //           "no": 2,
  //           "title": "(22 / MK) 테스트 글의 제목입니다.",
  //           "contents": "(22 / MK) 테스트 글의 내용입니다.",
  //           "link": "(22 / MK) 테스트 글의 링크입니다."
  //         }
  //       ]
  //     },
  //     {
  //       "no": 2,
  //       "mediaId": "rss-jtbc",
  //       "title": "JTBC",
  //       "logo": "/img/logo_jtbc.webp",
  //       "updatedAt": "2024.1.20.",
  //       "feedback": [],
  //       "inventory": [
  //         {
  //           "no": 1,
  //           "title": "(11 / JTBC) 테스트 글의 제목입니다.",
  //           "contents": "(11 / JTBC) 테스트 글의 내용입니다.",
  //           "link": "(11 / JTBC) 테스트 글의 링크입니다."
  //         },
  //         {
  //           "no": 2,
  //           "title": "(22 / JTBC) 테스트 글의 제목입니다.",
  //           "contents": "(22 / JTBC) 테스트 글의 내용입니다.",
  //           "link": "(22 / JTBC) 테스트 글의 링크입니다."
  //         }
  //       ]
  //     }
  //   ]
  // }
}