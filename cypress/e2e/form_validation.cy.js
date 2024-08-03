describe("Event Form Validation", () => {
  beforeEach(() => {
    // Simula la respuesta de la API para los eventos
    cy.intercept("GET", "/api/eventos", { fixture: "eventsData.json" }).as(
      "getEvents"
    );

    // Visita la página de gestión de eventos
    cy.visit("/events");

    // Espera que la petición de eventos se complete
    cy.wait("@getEvents");

    // Abre la ventana modal al hacer clic en el botón de "Agregar Evento"
    cy.get('button[data-cy="add-event"]').click();
  });

  it("should validate form inputs and submit the form", () => {
    // Intenta enviar el formulario con campos vacíos para verificar errores
    cy.get("form").within(() => {
      cy.contains("Guardar").click();
    });

    // Verifica los mensajes de error en campos obligatorios
    cy.get(".error-message").should("contain", "Este campo es requerido");

    // Rellena el formulario con datos correctos
    cy.get('input[name="titulo"]').type("Nueva Conferencia");
    cy.get('input[name="fecha"]').type("2024-08-20");
    cy.get('input[name="hora"]').type("14:00");
    cy.get('select[name="profesor_id"]').select("1");
    cy.get('select[name="materia_id"]').select("1");
    cy.get('select[name="seccion_id"]').select("1");
    cy.get('textarea[name="descripcion"]').type("Descripción del evento");
    cy.get('input[name="ubicacion"]').type("Auditorio");

    // Verifica que los mensajes de error ya no están presentes
    cy.get(".error-message").should("not.exist");

    // Simula la respuesta de la API para la creación de un nuevo evento
    cy.intercept("POST", "/api/eventos", {
      statusCode: 201,
      body: { success: true },
    }).as("createEvent");

    // Envía el formulario
    cy.get("form").within(() => {
      cy.contains("Guardar").click();
    });

    // Verifica que la petición POST se haya realizado correctamente
    cy.wait("@createEvent");

    // Verifica que la ventana modal esté cerrada después del envío
    cy.get(".modal").should("not.be.visible");
  });
});
