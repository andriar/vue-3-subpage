import { type App, createApp, h } from 'vue';

export const useHtmlToString = (Component: any) => {
  let app: App | null = null;
  let div: HTMLDivElement | null = null;
  let htmlResult: string | null = null;

  const render = () => {
    if (htmlResult) {
      return htmlResult; // Return cached result if already rendered
    }

    div = document.createElement('div');
    app = createApp({
      render() {
        return h(Component);
      },
    });
    app.mount(div);
    htmlResult = div.innerHTML;
    app.unmount(); // Clean up the app instance immediately after getting HTML
    div = null; // Clean up reference
    app = null; // Clean up reference
    return htmlResult;
  };

  // Automatically render when the composable is used
  // This will ensure 'htmlResult' is populated right away
  render();

  return htmlResult as unknown as string; // Return the directly rendered HTML string
};
