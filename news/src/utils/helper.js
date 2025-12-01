export async function fetchAll(ids, concurrency = 20, fetchFn) {
  const results = [];
  let index = 0;

  async function worker() {
    while (index < ids.length) {
      const id = ids[index++];
      try {
        const item = await fetchFn(id);
        results.push(item);
      } catch {
        results.push(null);
      }
    }
  }

  const workers = Array.from({ length: concurrency }, worker);
  await Promise.all(workers);

  return results;
}

export function getHost(url) {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return "self.hn";
  }
}

export const sortFunctions = {
  points: (a, b) => b.points - a.points,
  comments: (a, b) => b.comments - a.comments,
  newest: (a, b) => b.unix - a.unix,
  oldest: (a, b) => a.unix - b.unix,
  rank: (a, b) => a.rank - b.rank,
};

export function applySort(list, sortBy) {
  return [...list].sort(sortFunctions[sortBy] || sortFunctions.rank);
}
