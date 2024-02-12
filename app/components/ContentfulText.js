import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { INLINES } from '@contentful/rich-text-types';

const options = {
  renderNode: {
    [INLINES.HYPERLINK]: ({ data }, children) => (
      <a
        href={data.uri}
        target='_blank'
        rel='noreferrer noopener'
        className='text-slate-200 font-medium hover:text-cyan-200 transition-all'
      >
        {children}
      </a>
    )
  }
}

const ContentfulText = ({ document }) => {
  return documentToReactComponents(document, options);
}

export default ContentfulText;