describe("MenuItems", () => {
  test("checks if an array contains an object with specific properties", () => {
    const listItems = [
      { id: 1, name: "Home" },
      { id: 2, name: "Products" },
      { id: 3, name: "About Us" },
      { id: 4, name: "Contact Us" }
    ];
    expect(listItems).toContainEqual({ id: 1, name: "Home" });
    expect(listItems).toContainEqual({ id: 2, name: "Products" });
    expect(listItems).toContainEqual({ id: 3, name: "About Us" });
    expect(listItems).toContainEqual({ id: 4, name: "Contact Us" });
  });
});
