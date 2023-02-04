import { render, screen } from "@testing-library/react";
import App from "./App";
import data from "./data.json";

describe("Star Wars APP", () => {
  beforeAll(() => jest.spyOn(window, "fetch"));

  it("Should show a list of characters from the API", async () => {
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => data,
    });
    render(<App />);
    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(window.fetch).toHaveBeenCalledWith("http://swapi.dev/api/people/");

    for (let char of data.results) {
      expect(await screen.findByText(char.name)).toBeInTheDocument();
    }
  });

  it("Should show and error message when has a network error", async () => {
    window.fetch.mockRejectedValueOnce(new Error("Network error"));
    render(<App />);
    expect(await screen.findByText("Network error")).toBeInTheDocument();
  });
});
