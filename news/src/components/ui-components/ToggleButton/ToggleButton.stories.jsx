import React, { useState } from "react";
import ToggleButton from "./ToggleButton";

export default {
  title: "Components/ToggleButton",
  component: ToggleButton,
};

export const Default = () => {
  const [showAll, setShowAll] = useState(false);
  const [, setPage] = useState(1);

  return (
    <ToggleButton
      showAll={showAll}
      setShowAll={setShowAll}
      setPage={setPage}
    />
  );
};
