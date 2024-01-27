let isZoneDragging = false;
function setDragState(drag: boolean) { isZoneDragging = drag; }
function isDragging() { return isZoneDragging; }

export function setZoneDivider() {
  setDragState(false);
  const divider = document.getElementById("zone-divider");
  if (divider == null) {
    console.error("Element not found");
    return;
  }

  /* Event listener for mousedown event to start dragging */
  divider.addEventListener("mousedown", function (e) {
    setDragState(true);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    e.preventDefault();
  });
}

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
  if (isDragging()) {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
    setDragState(false);
  }
}

class BotZone {
  thumbnail: string = ""
  type: string = ""
  name: string = ""
  checkStateAction: any = () => {}
  botNamespace: any = {
      "chat_gpt": "ChatGPT",
      "gemini": "Gemini"
    }

  constructor(
    type: string,
    thumbnail: string,
    checkStateAction: any
  ) {
    this.type = type;
    this.name = this.botNamespace[type];
    this.thumbnail = thumbnail;
    this.checkStateAction = checkStateAction;
  }
}

export const botChatGPT = new BotZone(
  "chat_gpt",
  "/img/chatgpt.svg",
  () => {}
)

export const botGemini = new BotZone(
  "chat_gpt",
  "/img/gemini.png",
  () => {}
)
