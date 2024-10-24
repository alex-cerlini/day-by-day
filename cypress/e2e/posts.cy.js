describe("Posts page", () => {
  beforeEach(() => {
    cy.visit("localhost:3000");
  });

  it("should create a post", () => {
    cy.get("#create-post").type("Cypress post test");
    cy.wait(800);
    cy.get("#create-post-button").click();
    cy.contains("Cypress post test").should("be.visible");
    cy.contains("Alexander").should("be.visible");
  });

  it("should edit a post", () => {
    cy.get("#create-post").type("Cypress post test");
    cy.wait(800);
    cy.get("#create-post-button").click();
    cy.contains("Cypress post test").should("be.visible");
    cy.contains("Alexander").should("be.visible");

    cy.get("[data-test=post-edit-icon]").click();
    cy.get("[data-test=edit-form]").type("Edited post test").submit();

    cy.contains("Edited post test").should("be.visible");
  });

  it("should delete a post", () => {
    cy.get("#create-post").type("Cypress post test");
    cy.wait(800);
    cy.get("#create-post-button").click();
    cy.contains("Cypress post test").should("be.visible");
    cy.contains("Alexander").should("be.visible");

    cy.get("[data-test=post-trash-icon]").click();

    cy.contains("Cypress post test").should("not.exist");
  });
});
