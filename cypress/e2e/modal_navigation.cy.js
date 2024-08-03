describe("Prueba de Navegación Interna con Ventana Modal", () => {
  beforeEach(() => {
    cy.visit("/events"); // Ir al componente ManageEvents.
  });

  it("Debería abrir y cerrar el modal correctamente", () => {
    // Abre el modal
    cy.contains("Agregar Evento").click();

    // Verifica que el modal se abre
    cy.get(".modal").should("be.visible");

    // Cierra el modal
    cy.get(".btn-close").click();

    // Verifica que el modal se cierra
    cy.get(".modal").should("not.be.visible");
  });
});
