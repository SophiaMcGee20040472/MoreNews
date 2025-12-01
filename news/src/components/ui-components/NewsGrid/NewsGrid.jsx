import { SimpleGrid } from "@chakra-ui/react";
import NewsItemCard from "../NewsItemCard/NewsItemCard";

function NewsGrid({ items, startIndex }) {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
      {items.map((item, i) => (
        <NewsItemCard key={item.key} item={item} rank={startIndex + i + 1} />
      ))}
    </SimpleGrid>
  );
}
export default NewsGrid;
