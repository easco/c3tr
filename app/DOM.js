
// Data ------------------------------------------------------------------------

// Exports ---------------------------------------------------------------------

module.exports = {
  find,
  html,
  text
};

// Functions -------------------------------------------------------------------

function find(selector, context = document) {
  return context.querySelector(selector);
}

function html(type, attributes, children) {
  const element = document.createElement(type);

  Object.keys(attributes).forEach(name => {
    element.setAttribute(name, attributes[name]);
  });

  children.map(
    child =>
      typeof child === 'number' || typeof child === 'string'
      ? text(child)
      : child
    )
    .forEach(child => element.appendChild(child));

  return element;
}

function text(content) {
  return document.createTextNode(content);
}
