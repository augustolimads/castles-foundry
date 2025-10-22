Hooks.once("init", () => {
  // Adiciona um novo tipo de actor chamado "container"
  CONFIG.Actor.documentClass = class extends CONFIG.Actor.documentClass {
    static get schema() {
      const schema = super.schema;
      schema.type.enum.push("container");
      return schema;
    }
  };

  // Registra a nova ficha
  Actors.registerSheet("cnc-container", ContainerSheet, {
    types: ["container"],
    makeDefault: false,
    label: "Container"
  });
});

// Cria a classe ContainerSheet
class ContainerSheet extends ActorSheet {
  get template() {
    return "modules/cnc-container/templates/actor/container-sheet.hbs";
  }

  getData(options) {
    const context = super.getData(options);
    const items = this.actor.items.contents;
    
    // Soma o EV total dos itens
    const totalEV = items.reduce((acc, item) => acc + (item.system.ev || 0), 0);
    context.totalEV = totalEV;

    return context;
  }
}
