import Random from 'Random';
import TitleData from 'data/Title';

// Data ------------------------------------------------------------------------

const TITLE = 'title';

// Exports ---------------------------------------------------------------------

export default {
  create,
  generate,
  key: TITLE
};

// Functions -------------------------------------------------------------------

function create(title) {
  return {
    key: TITLE,
    value: title
  };
}

function generate() {
  const format = Random.from(TitleData.formats);
  const words = format.needs.map(need => Random.from(need));

  return create(format.fn(words));
}
