import { VStack } from "@chakra-ui/react";
import PastEventCard from "./PastEventCard";

const EventList = ({ events }) => {
  return (
    <VStack align="stretch" spacing={4}>
      {events.map((event) => (
        <PastEventCard key={event.id} event={event} />
      ))}
    </VStack>
  );
};

export default EventList;
