import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { CommentsListContainer } from "@/widgets/CommentsListContainer";

import { Providers } from "@/app/providers";

describe("Comment widget container rendered", () => {
  test("renders", () => {
    render(
      <Providers>
        <CommentsListContainer />
      </Providers>,
    );

    expect(
      screen.getByText("Check, write, remove your comments..."),
    ).toBeDefined();

    expect(screen.findByTestId("comments-virtualized-list")).toBeDefined();
  });
});
