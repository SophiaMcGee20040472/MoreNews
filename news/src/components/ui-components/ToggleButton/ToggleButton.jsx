import { Button } from "@chakra-ui/react";
import { styles } from "../../../styles/styles";

function ToggleButton({ showAll, setShowAll, setPage }) {
  return (
    <Button
    sx={styles.buttonStyle}
      size="sm"
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