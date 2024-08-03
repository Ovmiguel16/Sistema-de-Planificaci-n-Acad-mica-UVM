describe("Consulta de Planificación Académica", () => {
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

    // Navegar a la página de planificación académica
    cy.get(".nav-link").contains("Planes").click();

    // Asegurarse de que la URL cambió a /planning
    cy.url().should("include", "/planning");
  });

  it("Debería mostrar las opciones en el select de profesores, despues que las solicitudes a la API se realicen", () => {
    // Verificar que el select de profesores está visible
    cy.get("select#profesor").should("be.visible");

    // Se espera que las solicitudes a la API se realicen correctamente y llenen las opciones del select de profesores
    cy.get("select#profesor option").should("have.length.greaterThan", 1); // Al menos una opción más allá del placeholder

    // Verificar que las opciones de profesores contengan texto
    cy.get("select#profesor option").each(($el, index) => {
      if (index > 0) {
        // Saltar el placeholder
        expect($el.text().trim()).to.not.be.empty;
      }
    });
  });

  it("Debería mostrar las opciones en el select de secciones, despues que las solicitudes a la API se realicen", () => {
    // Verificar que el select de secciones está visible
    cy.get("select#seccion").should("be.visible");

    // Se espera que las solicitudes a la API se realicen correctamente y llenen las opciones del select de secciones
    cy.get("select#seccion option").should("have.length.greaterThan", 1); // Al menos una opción más allá del placeholder

    // Verificar que las opciones de secciones contengan texto
    cy.get("select#seccion option").each(($el, index) => {
      if (index > 0) {
        // Saltar el placeholder
        expect($el.text().trim()).to.not.be.empty;
      }
    });
  });
});
