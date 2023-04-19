import React from "react";
import { render } from "@testing-library/react";
import ChatFlatList from "../ChatFlatList";
import '@testing-library/jest-dom';

describe("ChatFlatList component", () => {
  it("renders child elements", () => {
    const { getByText } = render(
      <ChatFlatList>
        <p>Child element 1</p>
        <p>Child element 2</p>
      </ChatFlatList>
    );
    const childElement1 = getByText("Child element 1");
    const childElement2 = getByText("Child element 2");
    expect(childElement1).toBeInTheDocument();
    expect(childElement2).toBeInTheDocument();
  });
});
