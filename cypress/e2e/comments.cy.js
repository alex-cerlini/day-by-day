describe("Comments tests", () => {
  beforeEach(() => {
    cy.visit("localhost:3000");
    cy.wait(800);
  });

  it("should create a comment", () => {
    cy.get("[data-test=new-comment-input]")
      .first()
      .type("Cypress comment test");
    cy.get("[data-test=new-comment-button]").first().click();

    cy.contains("Cypress comment test").should("be.visible");
    cy.contains("Alexander").should("be.visible");
  });

  it("should edit a post", () => {
    cy.get("[data-test=new-comment-input]")
      .first()
      .type("Cypress comment test");
    cy.get("[data-test=new-comment-button]").first().click();

    cy.contains("Cypress comment test").should("be.visible");
    cy.contains("Alexander").should("be.visible");

    cy.get("[data-test=comment-edit-icon]").click();
    cy.get("[data-test=edit-form]").type("Comment edited test").submit();

    cy.contains("Comment edited test").should("be.visible");
  });

  it("should delete a comment", () => {
    cy.get("[data-test=new-comment-input]")
      .first()
      .type("Cypress comment test");
    cy.get("[data-test=new-comment-button]").first().click();

    cy.contains("Cypress comment test").should("be.visible");
    cy.contains("Alexander").should("be.visible");

    cy.get("[data-test=comment-trash-icon]").click();

    cy.contains("Cypress comment test").should("not.exist");
  });
});
