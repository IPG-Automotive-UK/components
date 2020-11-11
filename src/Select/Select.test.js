import React from "react";
import Select from "./";
import { render } from "@testing-library/react";
import { selectMaterialUiSelectOption } from "../testUtils";

// list of options to display
const options = [
  "Apple",
  "Banana",
  "Coconut",
  "Date",
  "Elderberry",
  "Fig",
  "Grapefruit",
  "Honeydew melon"
];

/**
 * Test wrapper for Select
 *
 * Provides state for value to avoid errors changing from uncontrolled to controlled.
 */
const SelectWithState = ({ onChange, value: valueIn = "", ...rest }) => {
  const [value, setValue] = React.useState(valueIn);
  const handleChange = event => {
    setValue(event.target.value);
    onChange && onChange(event);
  };
  return <Select {...rest} onChange={handleChange} value={value} />;
};

/**
 * Tests
 */
describe("Select", () => {
  test("can select an item", async () => {
    const onChange = jest.fn(event => event.target.value);
    const { container } = render(
      <SelectWithState options={options} onChange={onChange} />
    );
    const value = options[3];
    await selectMaterialUiSelectOption(container, value);
    expect(onChange).toHaveReturnedWith(value);
  });
  test("shows error if no selection", () => {
    const { container } = render(
      <SelectWithState options={options} value="" required />
    );
    const inputBase = container.querySelector(".MuiInputBase-root");
    expect(inputBase).toHaveClass("Mui-error");
  });
});