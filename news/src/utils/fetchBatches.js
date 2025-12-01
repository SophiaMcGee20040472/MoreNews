import { API_ENDPOINTS } from "./apiEndpoints";
async function fetchBatches(ids, batchSize = 30) {
  const results = [];
  for (let i = 0; i < ids.length; i += batchSize) {
    const batch = ids.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map((id) =>
        fetch(API_ENDPOINTS.ITEM_DETAIL(id))
          .then((r) => r.json())
          .catch(() => null)
      )
    );
    results.push(...batchResults);
  }
  return results;
}
export default fetchBatches
