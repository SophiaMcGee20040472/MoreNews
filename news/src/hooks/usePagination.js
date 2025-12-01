import { useMemo } from "react";

export function usePagination(sorted, page, itemsPerPage, showAll) {
  const paginated = useMemo(() => {
    if (showAll) return sorted;
    const start = (page - 1) * itemsPerPage;
    return sorted.slice(start, start + itemsPerPage);
  }, [sorted, page, itemsPerPage, showAll]);

  const totalPages = Math.ceil(sorted.length / itemsPerPage);

  return { paginated, totalPages };
}
