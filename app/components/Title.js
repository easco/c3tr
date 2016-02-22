import Random from 'Random';
import TitleData from 'data/Title';

// Exports ---------------------------------------------------------------------

export default {
  create,
  generate
};

// Functions -------------------------------------------------------------------

function create(title) {
  return {
    key: 'title',
    value: title
  };
}

function generate() {
  const format = Random.from(TitleData.formats);
  const words = format.needs.map(need => Random.from(need));

  return create(format.fn(words));
}
