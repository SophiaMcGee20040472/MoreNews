import { Button } from "@chakra-ui/react";

function ToggleButton({ showAll, setShowAll, setPage }) {
  return (
    <Button
      size="sm"
      bg="#ff7600"
      color="white"
      border="1px solid #ff7600"
      _hover={{
        bg: "white",
        color: "black",
        border: "1px solid #ff7600",
      }}
      onClick={() => {
        setShowAll((prev) => !prev);
        setPage(1);
      }}
    >
      {showAll ? "Collapse" : "Show All"}
    </Button>
  );
}
export default ToggleButton