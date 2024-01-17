import { ref } from "vue";

export interface Feed {
  no: number;
  bot: string;
  botType: string;
  articleId: string;
  articleType: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  thumbnail: string;
  feedback: any;
  inventory: any;
}

export function getNewFeed(): Feed {
  return {
    no: 0,
    bot: "",
    botType: "",
    articleId: "",
    articleType: "basic",
    author: "",
    createdAt: "",
    updatedAt: "",
    title: "",
    thumbnail: "",
    feedback: ref([]),
    inventory: [],
  };
}
export function getNewFeedList(): Feed[] {
  return [];
}
export function clearFeed(feed: Feed) {
  const curFeed = feed;
  curFeed.no = 0;
  curFeed.bot = "";
  curFeed.botType = "";
  curFeed.articleId = "";
  curFeed.articleType = "basic";
  curFeed.author = "";
  curFeed.createdAt = "";
  curFeed.updatedAt = "";
  curFeed.title = "";
  curFeed.thumbnail = "";
  curFeed.feedback = ref([]);

  for (const inven of curFeed.inventory) {
    inven.contents = "";
  }
  curFeed.inventory.splice(0, curFeed.inventory.length);
}

export class FeedList {
  items: Feed[];
  constructor(items: Feed[] = []) {
    this.items = items;
  }
}
