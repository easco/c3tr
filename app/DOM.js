
// Data ------------------------------------------------------------------------

// Exports ---------------------------------------------------------------------

export default {
  find,
  html,
  text
};

// Functions -------------------------------------------------------------------

function find(selector, context = document) {
  return context.querySelector(selector);
}

function html(type, attributes = {}, children = []) {
  if (typeof attributes !== 'object' || Array.isArray(attributes)) {
    children = attributes;
    attributes = {};
  }

  if (!Array.isArray(children)) children = [children];

  const element = document.createElement(type);

  Object.keys(attributes).forEach(name => {
    element.setAttribute(name, attributes[name]);
  });

  children.map(
    child =>
      typeof child === 'number'
      || typeof child === 'string'
      ? text(child)
      : child
    )
    .forEach(child => element.appendChild(child));

  return element;
}

function text(content) {
  return document.createTextNode(content);
}
