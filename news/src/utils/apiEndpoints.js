const BASE_URL = "https://hacker-news.firebaseio.com/v0";

export const API_ENDPOINTS = {
  TOP_STORIES_LIST: `${BASE_URL}/topstories.json?print=pretty`,
  NEW_STORIES_LIST: `${BASE_URL}/newstories.json?print=pretty`,
  STORY_IDS: `${BASE_URL}/showstories.json?print=pretty`,
  ASK_IDS: `${BASE_URL}/askstories.json?print=pretty`,
  JOB_IDS: `${BASE_URL}/jobstories.json?print=pretty`,
  ITEM_DETAIL: (id) => `${BASE_URL}/item/${id}.json?print=pretty`,
};
// got help here from stackoverflow just to break down the hours and minutes then rewrote it to work for me.
// reference from https://stackoverflow.com/questions/19540077/converting-unix-time-to-minutes-ago-in-javascript
export const formatUnixTime = (unixTime) => {
  const now = Date.now() / 1000;
  const seconds = now - unixTime;

  if (seconds < 60) return `${Math.floor(seconds)} seconds ago`;

  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.floor(minutes)} minutes ago`;

  const hours = minutes / 60;
  if (hours < 24) return `${Math.floor(hours)} hours ago`;

  const days = hours / 24;
  return `${Math.floor(days)} days ago`;
};

//took inspiration from https://stackoverflow.com/questions/141348/how-to-parse-a-time-into-a-date-object-from-user-input-in-javascript and simplified.
export const parseTimeString = (timeStr) => {
  const parts = timeStr.split(" ");
  const value = parseInt(parts[0], 10);

  if (parts.length < 2 || isNaN(value)) return 0;

  const unit = parts[1].toLowerCase();

  if (unit.startsWith("hour")) return value * 60;
  if (unit.startsWith("minute")) return value;
  if (unit.startsWith("day")) return value * 24 * 60;

  return 0;
};
