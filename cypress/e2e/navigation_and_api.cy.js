describe("Prueba de Navegación y Recepción de Datos desde la API", () => {
  beforeEach(() => {
    // Intercepta la solicitud de la API y responde con los datos de la carpeta fixture de cypress
    cy.intercept("GET", "/api/planificacion", {
      fixture: "planningData.json",
    }).as("getPlanningData");

    cy.visit("/planning"); // Ir al componente AcademicPlanning.
  });

  it("Debería navegar a la vista de planificación académica y verificar la existencia de elementos clave", () => {
    // Verifica la existencia de un elemento clave en la vista
    cy.contains("Consulta de Planificación Académica").should("be.visible");

    // Comprueba que ciertos elementos existen
    cy.get("#profesor").should("exist");
    cy.get("#seccion").should("exist");

    // Espera la respuesta de la API
    cy.wait("@getPlanningData").then((interception) => {
      assert.isNotNull(
        interception.response.body,
        "Se recibieron datos de la API"
      );
    });

    // Verifica que los datos se muestran correctamente
    cy.get(".list-group-item").should("have.length.greaterThan", 0);
  });
});
