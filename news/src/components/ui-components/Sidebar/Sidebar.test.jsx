import { render, screen } from "@testing-library/react";
import Sidebar from ".";
import { navItems } from "../../../NavData/NavData";

describe("Sidebar component", () => {
  test("renders without crashing", () => {
    render(<Sidebar />);
  });

  test("renders logo images", () => {
    render(<Sidebar />);
    expect(screen.getByAltText("Logo")).toBeInTheDocument();
    expect(screen.getByAltText("Mobile Logo")).toBeInTheDocument();
  });

  test("renders all navigation items", () => {
    render(<Sidebar />);
    navItems.forEach((item) => {
      expect(screen.getAllByText(item.name)[0]).toBeInTheDocument();
    });
  });
});
