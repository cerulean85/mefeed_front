const apiServerUrl = "https://rest.kkennib.net";
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