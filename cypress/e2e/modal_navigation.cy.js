describe("Prueba de Navegación de Modal", () => {
  beforeEach(() => {
    // Simular inicio de sesión
    cy.visit("/login");
    cy.get("input#email").type("juan.perez@ejemplo.com");
    cy.get("input#password").type("password123");
    cy.get("select.form-control").select("director");
    cy.get("#boton_login").click();

    // Asegurarse de que la redirección al dashboard se haya completado
    cy.url().should("include", "/dashboard");

    // Esperar a que el sidebar esté visible
    cy.get(".sidebar").should("be.visible");

    // Navegar a la página de eventos
    cy.get(".nav-link").contains("Eventos").click();

    // Asegurarse de que la URL cambió a /events
    cy.url().should("include", "/events");
  });

  it("Debería abrir y cerrar el modal de agregar evento", () => {
    // Utilizar el ID único para seleccionar el botón
    cy.get("#addEventButton").click();

    // Verificar que el modal esté visible
    cy.get('[data-test-id="add-event-button"]').should("be.visible");

    // Asegurarse de que el botón de cerrar es visible
    cy.get("#btn_cerrar_modal").should("be.visible");
    cy.get("#btn_cerrar_modal").click();

    // Verificar que el modal esté cerrado
    cy.get("#eventModal").should("not.have.class", "show");

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500);

    // Verificar que el modal no esté visible
    cy.get("#eventModal").should("not.be.visible");
  });
});
