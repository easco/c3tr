import Random from 'Random';
import TitleData from 'data/Title';

// Data ------------------------------------------------------------------------

const TITLE = 'TITLE';

// Exports ---------------------------------------------------------------------

export default {
  generate,
  type: TITLE
};

// Functions -------------------------------------------------------------------

function generate() {
  const format = Random.from(TitleData.formats);
  const words = format.needs.map(need => Random.from(need));

  return {
    type: TITLE,
    value: format.fn(words)
  };
}
