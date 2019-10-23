import PasteLinkify from 'slate-paste-linkify';
import PlaceholderPlugin from 'slate-react-placeholder';
import MarkdownShortcuts from './MarkdownShortcuts';
import KeyboardBehavior from './KeyboardBehavior';

const createPlugins = ({ placeholder }) => [
  PasteLinkify(),
  MarkdownShortcuts(),
  KeyboardBehavior(),
  PlaceholderPlugin({
    placeholder,
    when: 'showPlaceholder',
    style: { color: '#a0aec0', opacity: '1' },
  }),
];

export default createPlugins;
