import { API_ENDPOINTS } from "./apiEndpoints";

// fetchs multiple items in batches from API
async function fetchBatches(ids, batchSize = 30) {
  const results = []; // Array to store all fetched items

  // Loop through IDs in increments of batchSize
  for (let i = 0; i < ids.length; i += batchSize) {
    // Get the current batch of IDs
    const batch = ids.slice(i, i + batchSize);

    // Fetch all items in the current batch at the same time
    const batchResults = await Promise.all(
      batch.map((id) =>
        fetch(API_ENDPOINTS.ITEM_DETAIL(id)) // Fetch item details by ID
          .then((r) => r.json()) // Convert response to JSON
          .catch(() => null) // If fetch fails, return null instead of throwing
      )
    );

    // Add results batch to the main results array
    results.push(...batchResults);
  }

  return results; // Return all fetched items
}

export default fetchBatches;
