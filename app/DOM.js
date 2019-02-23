
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

  const classes = type.match(/\.[a-z\-]*/g);
  if (classes) attributes['class'] = classes.map(c => c.slice(1)).join(' ');

  const id = type.match(/#[A-Za-z]*/g);
  if (id) attributes['id'] = id[0].slice(1);

  const element = document.createElement(type.match(/^[a-z]*/g));

  Object.keys(attributes).forEach(name => {
    element.setAttribute(name, attributes[name]);
  });

  children.map(
    child =>
      typeof child === 'number' || typeof child === 'string'
        ? text(child)
        : child
  ).forEach(child => element.appendChild(child));

  return element;
}

function text(content) {
  return document.createTextNode(content);
}
