export function getFeedbackMessage(state: string): string {
  switch (state) {
    case "idle":
      return "봇의 피드백을 요청하세요.";
    case "wait":
      return "봇의 피드백을 기다리고 있어요.";
    case "work":
      return "피드백 중입니다...";
    case "finish":
      return "아래와 같이 피드백 되었습니다.";
    case "stop":
      return "피드백이 중단되었습니다.";
    case "error":
      return "오류가 발생하였습니다.";
  }
  return "";
}

export const feedbackState = {
  idle: "idle",
  wait: "wait",
  work: "work",
  finish: "finish",
  stop: "stop",
  error: "error",
};
