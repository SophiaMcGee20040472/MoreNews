import { SimpleGrid } from "@chakra-ui/react";
import NewsItemCard from "../NewsItemCard/NewsItemCard";

function NewsGrid({ items, startIndex }) {
  return (
    // SimpleGrid from Chakra UI 
    <SimpleGrid 
      columns={{ base: 1, md: 2, lg: 3 }} // responsive columns for different devices
      spacing={6} 
    >
      {/* Map through the news items and render a NewsItemCard for each */}
      {items.map((item, i) => (
        <NewsItemCard
          key={item.key} // Unique key for React rendering
          item={item} // Pass the news item data
          rank={startIndex + i + 1} // Calculate the item's overall rank
        />
      ))}
    </SimpleGrid>
  );
}

export default NewsGrid;
