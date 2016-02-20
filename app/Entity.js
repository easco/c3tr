
// Data ------------------------------------------------------------------------

// Exports ---------------------------------------------------------------------

module.exports = {
  Entity
}

// Functions -------------------------------------------------------------------

function Entity() {
  return {
    id: createId(),
    components: {},
    '__proto__': {
      addComponent: addComponent,
      removeComponent: removeComponent
    }
  }
}

function createId() {
  //@TODO: this could be more gooder
  return  '_' + Math.random().toString(36).substr(2, 9);
}

function addComponent(cmp) {
  this.components[cmp.name] = cmp;

  return this;
}

function removeComponent(cmpName) {
  delete this.components[cmpName];

  return this;
}
