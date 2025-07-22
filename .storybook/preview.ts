import type { Preview } from '@storybook/vue3-vite';

import '../src/assets/css/style.css';
// Import Tailwind CSS with custom theme
import '../src/assets/css/tailwind.css';

// Import Tailwind CSS with custom theme

const preview: Preview = {
  parameters: {
    options: {
      storySort: (a, b) => {
        // Example: Prioritize 'docs' pages, then sort by ID (which includes folder structure)
        if (a.type === 'docs' && b.type !== 'docs') return -1;
        if (b.type === 'docs' && a.type !== 'docs') return 1;

        // Custom logic to sort based on folder structure
        // Assuming your story IDs are like 'components-button-primary'
        const aIdParts = a.id.split('-');
        const bIdParts = b.id.split('-');

        // Sort by top-level folder first (e.g., 'components' vs 'layouts')
        if (aIdParts[0] !== bIdParts[0]) {
          return aIdParts[0].localeCompare(bIdParts[0]);
        }

        // Then by sub-folder/component name
        if (aIdParts[1] !== bIdParts[1]) {
          return aIdParts[1].localeCompare(bIdParts[1]);
        }

        // Finally by story name within the component
        return a.id.localeCompare(b.id, undefined, { numeric: true });
      },
    },
    controls: {
      // storySort: {
      //   order: [
      //     'Components',
      //     ['Dropdown', 'Inputs', 'Information', 'Tab', 'Tag', '*'], // Nested order within 'Components', with '*' for others
      //   ],
      // },
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
