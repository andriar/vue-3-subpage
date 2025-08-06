<template>
  <div class="group relative">
    <button type="button" @click="copyCode"
      class="absolute top-3 right-3 cursor-pointer rounded-md bg-gray-700 px-3 py-1.5 font-sans text-sm text-white opacity-0 transition-opacity duration-300 group-hover:z-10 group-hover:opacity-100">
      {{ copyButtonText }}
    </button>

    <pre :class="{ 'line-numbers': showLineNumbers }" class="rounded-xl !p-3 !m-0">
      <code class="pl-10" :class="languageClass"  v-html="code"></code>
    </pre>
  </div>
</template>

<script setup lang="ts">
import Prism from 'prismjs';
import { computed, onMounted, ref } from 'vue';

import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/themes/prism.min.css';

interface ICodeHighlightProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
}

const props = withDefaults(defineProps<ICodeHighlightProps>(), {
  language: 'markup',
  showLineNumbers: false,
});

const languageClass = computed<string>(() => `language-${props.language}`);


const copyButtonText = ref<string>('Copy Code');

const decodeHtmlEntities = (text: string): string => {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
};

const copyCode = async (): Promise<void> => {
  try {
    const decodedCode = decodeHtmlEntities(props.code);
    await navigator.clipboard.writeText(decodedCode);
    copyButtonText.value = 'Copied!';
    setTimeout(() => {
      copyButtonText.value = 'Copy Code';
    }, 2000);
  } catch (err) {
    copyButtonText.value = 'Failed';
  }
};

onMounted(() => {
  Prism.highlightAll();
});
</script>
