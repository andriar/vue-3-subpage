<script lang="ts" setup>
import { type Component, computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import RoundedTab from '@/components/common/Tabs/RoundedTab.vue';
import { Button, Drawer } from '@/components/common/common';
import {
  ChatOutlineIcon,
  IntegrationIcon,
  PaletteIcon,
  ServerIcon,
  TableIcon,
  ToggleLeftIcon,
} from '@/components/icons';
import { useSweetAlert } from '@/composables/useSweetAlert';
import CallToAction from '@/features/widget-builder/CallToAction.vue';
import Chat from '@/features/widget-builder/Chat.vue';
import LoginForm from '@/features/widget-builder/LoginForm.vue';
import WelcomeDialog from '@/features/widget-builder/WelcomeDialog.vue';
import Channels from '@/features/widget-builder/channels/Channels.vue';
import ColorScheme from '@/features/widget-builder/color-scheme/ColorScheme.vue';
import { useAppConfigStore } from '@/stores/app-config';
import { useWidgetConfig } from '@/stores/integration/widget-builder/widget-config';

// Props definition
const props = defineProps<{
  isLatestVersion: () => boolean;
}>();

const emit = defineEmits<{
  (e: 'product-version-check'): void;
}>();

type TabName = string;

interface Tab {
  label: TabName;
  icon: Component;
  component: Component;
  queryParam: string;
}

const tabs: Tab[] = [
  {
    label: 'Welcome Dialogue',
    icon: ServerIcon,
    component: WelcomeDialog,
    queryParam: 'welcome',
  },
  {
    label: 'Call to Action',
    icon: ToggleLeftIcon,
    component: CallToAction,
    queryParam: 'cta',
  },
  { label: 'Channels', icon: IntegrationIcon, component: Channels, queryParam: 'channels' },
  { label: 'Login Form', icon: TableIcon, component: LoginForm, queryParam: 'login' },
  { label: 'Chat', icon: ChatOutlineIcon, component: Chat, queryParam: 'chat' },
  {
    label: 'Color Scheme',
    icon: PaletteIcon,
    component: ColorScheme,
    queryParam: 'color',
  },
];

const route = useRoute();
const router = useRouter();

// Computed properties
const currentTabComponent = computed(() => {
  return tabs.find((tab) => tab.label === activeTab.value)?.component;
});

const validQueryParams = computed(() => tabs.map((tab) => tab.queryParam));

// Initialize activeTab with proper validation
const getInitialTab = (): TabName => {
  const tabFromQuery = route.query.section as string;
  const matchedTab = tabs.find((tab) => tab.queryParam === tabFromQuery);
  return matchedTab ? matchedTab.label : 'Welcome Dialogue';
};

const activeTab = ref<TabName>(getInitialTab());

// URL sync watchers
watch(activeTab, (newTab) => {
  const selectedTab = tabs.find((tab) => tab.label === newTab);
  router.replace({
    query: {
      ...route.query,
      section: selectedTab?.queryParam || 'welcome_dialog',
    },
  });
});

watch(
  () => route.query.section,
  (newQueryParam) => {
    if (typeof newQueryParam === 'string' && validQueryParams.value.includes(newQueryParam)) {
      const matchedTab = tabs.find((tab) => tab.queryParam === newQueryParam);
      if (matchedTab) {
        activeTab.value = matchedTab.label;
      }
    }
  }
);

// Store integration
const { postWidgetConfig, getWidgetConfig } = useWidgetConfig();
const { appId } = useAppConfigStore();
const { showAlert } = useSweetAlert();
const iframeSrc = ref(`${window.location.origin + window.location.pathname}/preview`);

// Drawer state
const isDrawerOpen = ref(false);
const isLoading = ref(false);

// Methods with error handling
const saveAndPreview = async () => {
  if (!params.id || !appId) {
    console.error('Missing required parameters');
    return;
  }

  const isValidVersion = props.isLatestVersion();

  // Handle if widget is not latest version
  if (!isValidVersion) {
    const resultShowAlert = await showAlert.warning({
      title: 'Live Chat Changes',
      text: 'Saving these settings means you agree to update your Live Chat to the latest version. You can view the installation code right after.',
      confirmButtonText: 'Update Live Chat',
      cancelButtonText: 'Stay On Old Version',
    });

    if (resultShowAlert.dismiss) {
      return;
    }

    if (resultShowAlert.isConfirmed) {
      emit('product-version-check');
      return;
    }
  }

  try {
    isLoading.value = true;
    await postWidgetConfig(appId, params.id as string);
    isDrawerOpen.value = true;
  } catch (error) {
    console.error('Failed to save widget configuration:', error);
    // Add user notification here
  } finally {
    isLoading.value = false;
  }
};

// Validate route params
const params = useRoute().params;
if (!params.id) {
  throw new Error('Channel ID is required');
}

onMounted(async () => {
  const { id } = params;
  if (!id) return;
  // Ensure id is string or number, not array
  const channelId = (Array.isArray(id) ? id[0] : id) as string;
  getWidgetConfig(appId, channelId);
});
</script>

<template>
  <div>
    <div class="bg-white-100 flex w-full flex-col rounded-2xl border-[1px] border-gray-300">
      <div
        class="bg-white-100 sticky top-0 z-50 flex w-full items-center justify-between gap-2 rounded-t-2xl border-b-[1px] border-gray-300 p-4"
      >
        <RoundedTab :tabs="tabs" v-model="activeTab" />
        <Button
          id="save-preview-btn"
          class="min-w-max"
          @click="saveAndPreview"
          :loading="isLoading"
          :disabled="isLoading"
        >
          Save & Preview
        </Button>
      </div>

      <div class="p-4">
        <!-- Dynamic component rendering -->
        <component :is="currentTabComponent" v-if="currentTabComponent" />
      </div>
    </div>

    <Drawer :isOpen="isDrawerOpen" @close="isDrawerOpen = false">
      <!-- Preview content should come from store/props -->
      <iframe
        ref="dynamicIframeRef"
        :src="iframeSrc"
        title="Live Chat Preview"
        style="width: 100%; height: 100%"
      ></iframe>
    </Drawer>
  </div>
</template>
