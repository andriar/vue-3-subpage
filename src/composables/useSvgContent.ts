import { computed, ref } from 'vue';

interface SvgCache {
  [url: string]: string;
}

// Utility function to create timeout promise
const createTimeout = (ms: number): Promise<never> => {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error(`Request timeout after ${ms}ms`)), ms);
  });
};

export const useSvgContent = () => {
  const svgCache = ref<SvgCache>({});
  const loading = ref<Set<string>>(new Set());
  const errors = ref<Set<string>>(new Set());

  const fetchSvgContent = async (url: string): Promise<string> => {
    // Return cached content if available
    if (svgCache.value[url]) {
      return svgCache.value[url];
    }

    // If already loading, wait for it with timeout
    if (loading.value.has(url)) {
      let attempts = 0;
      const maxAttempts = 100; // 5 seconds timeout (100 * 50ms)
      while (loading.value.has(url) && attempts < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, 50));
        attempts++;
      }
      return svgCache.value[url] || '';
    }

    loading.value.add(url);
    errors.value.delete(url); // Clear previous error

    try {
      // Method 1: Try direct fetch first (might work in some cases)
      let response: Response;
      try {
        response = await Promise.race([
          fetch(url, {
            mode: 'cors',
            headers: {
              Accept: 'image/svg+xml,image/*,*/*',
            },
          }),
          createTimeout(10000), // 10 seconds timeout
        ]);
      } catch (corsError) {
        // Method 2: Fallback to proxy approach using a CORS proxy service
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
        response = await Promise.race([
          fetch(proxyUrl),
          createTimeout(15000), // 15 seconds timeout for proxy
        ]);
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const svgContent = await response.text();

      // Validate that it's actually SVG content
      if (!svgContent.trim().startsWith('<svg') || !svgContent.includes('</svg>')) {
        throw new Error('Response is not valid SVG content');
      }

      // Convert to data URL for use in CSS
      const dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgContent)}`;

      svgCache.value[url] = dataUrl;
      return dataUrl;
    } catch (error) {
      console.error(`Failed to fetch SVG from ${url}:`, error);
      errors.value.add(url);

      // Return a fallback SVG as data URL
      const fallbackSvg = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
        <path d="M12 8v4l3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>`;
      const fallbackDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(fallbackSvg)}`;

      svgCache.value[url] = fallbackDataUrl;
      return fallbackDataUrl;
    } finally {
      loading.value.delete(url);
    }
  };

  const getSvgContent = (url: string): string => {
    return svgCache.value[url] || '';
  };

  const isLoading = (url: string): boolean => {
    return loading.value.has(url);
  };

  const hasError = (url: string): boolean => {
    return errors.value.has(url);
  };

  const clearCache = () => {
    svgCache.value = {};
    loading.value.clear();
    errors.value.clear();
  };

  // Add method to retry failed SVGs
  const retryFetch = async (url: string): Promise<string> => {
    errors.value.delete(url);
    delete svgCache.value[url];
    return await fetchSvgContent(url);
  };

  return {
    fetchSvgContent,
    getSvgContent,
    isLoading,
    hasError,
    clearCache,
    retryFetch,
    svgCache: computed(() => svgCache.value),
    loadingUrls: computed(() => Array.from(loading.value)),
    errorUrls: computed(() => Array.from(errors.value)),
  };
};
