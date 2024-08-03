describe("Prueba del Formulario de Evento", () => {
  beforeEach(() => {
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

  it("Debería validar y enviar el formulario de evento", () => {
    // Abrir el modal
    cy.get("button").contains("Agregar Evento").click();
    cy.get(".modal.show").should("be.visible");

    // Rellenar el formulario
    cy.get("#tipo").select("evaluación").should("have.value", "evaluación");
    cy.get("#titulo").type("Evento de Prueba");
    cy.get("#fecha").type("2024-08-10");
    cy.get("#hora").type("10:00");
    cy.get("#descripcion").type("Descripción del evento");
    cy.get("#ubicacion").type("Valera centro");

    //eslint-disable-line cypress/unsafe-to-chain-command
    cy.get("#profesor").select(0).should("have.value", "1");
    cy.get("#materia").select(0).should("have.value", "1");
    cy.get("#seccion").select(0).should("have.value", "1");

    // Validar y enviar formulario.
    cy.get("#enviar_form").contains("Agregar").click();
  });
});
