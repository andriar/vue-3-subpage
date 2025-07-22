<template>
  <div class="text-text-title flex min-h-screen flex-col gap-8 px-12 py-8 text-sm">
    <div class="flex items-center justify-between">
      <router-link to="/qiscus" class="text-primary flex items-center gap-2 font-semibold">
        <BackIcon :size="20" />
        Qiscus Live Chat List
      </router-link>

      <router-link to="/" id="route-integration" class="text-primary flex items-center gap-2 font-semibold">
        <HomeIcon :size="20" />
        Integration
      </router-link>
    </div>

    <div class="mx-auto flex w-11/12 flex-col gap-8">
      <div class="flex items-center gap-3">
        <Image :src="CHANNEL_BADGE_URL.qiscus" alt="Qiscus Logo" class="h-6 w-6" :width="24" :height="24" />

        <h2 class="text-text-title text-xl font-semibold">Qiscus Live Chat</h2>
      </div>

      <div v-if="!isAutoresponderFormOpen" class="flex flex-col gap-8">
        <MainTab :tabs="tabLabels" v-model="activeTab" />
        <!-- Dynamic component rendering -->
        <component 
          :channel-id="props.id" 
          :is="currentTabComponent" 
          v-if="currentTabComponent" 
          v-model="settingData"
          @open-auto-responder-form="handleOpenAutoResponderForm"
          @product-version-check="productVersionCheck"
          v-bind="activeTab.toLowerCase() === 'live chat builder' ? { 'is-latest-version': isLatestVersion } : {}"
        />
      </div>

      <form @submit.prevent="handleSubmitAutoResponder" v-if="isAutoresponderFormOpen">
        <AutoResponderForm v-model="channel.configs" :is-bot="isBot" />

        <div class="mt-8 flex justify-end gap-4">
          <Button id="cancel-btn" intent="secondary" @click="handleCancelAutoResponder">Cancel</Button>
          <Button id="submit-btn" type="submit">Save Changes</Button>
        </div>
      </form>
    </div>

    <!-- product update -->
    <ProductUpdater :is-open="isProductUpdateOpen" @cancel="handleCancelProductUpdate" @update="handleUpdateProductUpdate"
      :loading="loadingUpdateWidget" />
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import Button from '@/components/common/Button.vue';
import MainTab from '@/components/common/Tabs/MainTab.vue';
import { Image } from '@/components/common/common';
import { HomeIcon } from '@/components/icons';
import BackIcon from '@/components/icons/BackIcon.vue';
import { useFetchBot } from '@/composables/channels/bot';
import { useFetchQiscusDetail, useUpdateQiscus } from '@/composables/channels/qiscus';
import { useUpdateSecurityQiscus } from '@/composables/channels/qiscus/useUpdateSecurity';
import { useFetchConfig } from '@/composables/channels/useFetchConfigChannel';
import { useUpdateConfig } from '@/composables/channels/useUpdateConfigChannel';
import { useHtmlToString } from '@/composables/helpers/htmlToString';
import { useSweetAlert } from '@/composables/useSweetAlert';
import ProductUpdater from '@/features/widget-builder/components/product-update/ProductUpdater.vue';
import WidgetLiveChat from '@/features/widget-builder/pages/WidgetLiveChat.vue';
import AutoResponderForm from '@/features/widget/components/forms/AutoResponderForm.vue';
import QiscusTermConditionDescription from '@/features/widget/components/ui/QiscusTermConditionDescription.vue';
import WidgetCode from '@/features/widget/pages/WidgetCode.vue';
import WidgetOverview from '@/features/widget/pages/WidgetOverview.vue';
import WidgetSettings from '@/features/widget/pages/WidgetSetting.vue';
import { useQiscusLiveChatStore } from '@/stores/integration/qiscus-live-chat';
import type { IWidgetChannel } from '@/types/channels';
import { CHANNEL_BADGE_URL } from '@/utils/constant/channels';

type TabName = string;

interface Tab {
  label: TabName;
  component: any;
  queryParam: string;
}

// params.id as a props on router
const props = defineProps<{
  id: string | number;
}>();

const tabs: Tab[] = [
  {
    label: 'Overview',
    component: WidgetOverview,
    queryParam: 'overview',
  },
  {
    label: 'Live Chat Builder',
    component: WidgetLiveChat,
    queryParam: 'builder',
  },
  {
    label: 'Code Installation',
    component: WidgetCode,
    queryParam: 'code',
  },
  {
    label: 'Settings',
    component: WidgetSettings,
    queryParam: 'settings',
  },
];

const route = useRoute();
const router = useRouter();
const { showAlert } = useSweetAlert();

// Computed properties
const validQueryParams = computed(() => tabs.map((tab) => tab.queryParam));
const tabLabels = computed(() => tabs.map((tab) => tab.label));

const currentTabComponent = computed(() => {
  return tabs.find((tab) => tab.label === activeTab.value)?.component;
});

// Initialize activeTab with proper validation
const getInitialTab = (): TabName => {
  const tabFromQuery = route.query.sub as string;
  const matchedTab = tabs.find((tab) => tab.queryParam === tabFromQuery);
  return matchedTab ? matchedTab.label : 'Overview';
};

const activeTab = ref<TabName>(getInitialTab());

const isBot = ref(false);
const isAutoresponderFormOpen = ref(false);
const channel = reactive<IWidgetChannel>({
  app_code: '',
  id: '',
  badge_url: '',
  name: '',
  is_active: true,
  is_secure: true,
  is_secure_toc: false,
  configs: {
    is_enabled: false,
    offline_message: '',
    online_message: '',
    send_offline_each_message: false,
    send_online_if_resolved: false,
  },
});

const settingData = ref({
  is_enabled: false,
  is_secure: false,
});

const uBot = useFetchBot();
const uConfig = useFetchConfig();
const uQiscus = useUpdateQiscus();
const useConfig = useUpdateConfig();
const { fetchChannelById, data: widget } = useFetchQiscusDetail();
const { updateSecurity, error: errorUpdateSecurity } = useUpdateSecurityQiscus();

// --- URL sync watchers ---
watch(activeTab, (newTab) => {
  const selectedTab = tabs.find((tab) => tab.label === newTab);
  if (newTab.toLowerCase() === 'overview') {
    productVersionCheck();
  }
  router.push({
    path: route.path,
    query: {
      ...route.query,
      sub: selectedTab?.queryParam || 'overview',
    },
  });
});

watch(
  () => route.query.sub,
  (newQueryParam) => {
    if (typeof newQueryParam === 'string' && validQueryParams.value.includes(newQueryParam)) {
      const matchedTab = tabs.find((tab) => tab.queryParam === newQueryParam);
      if (matchedTab) {
        activeTab.value = matchedTab.label;
      }
    }
  }
);

watch(
  () => settingData.value,
  (newVal, oldVal) => {
    if (newVal) {
      if (newVal.is_enabled !== oldVal.is_enabled) {
        handleChangeAutoResponder(newVal.is_enabled);
      }

      if (newVal.is_secure !== oldVal?.is_secure) {
        handleChangeSecurity(newVal.is_secure, oldVal.is_secure);
      }
    }
  }
);

function setData() {
  channel.app_code = widget.value?.app_code ?? '';
  channel.name = widget.value?.name ?? '';
  channel.badge_url = widget.value?.badge_url ?? '';
  channel.configs = (uConfig.data.value as any) ?? {};

  settingData.value.is_secure = widget.value?.is_secure ?? false;
  settingData.value.is_enabled = channel.configs.is_enabled ?? false;
}

// --- API Interaction Functions ---
async function updateConversationSecurity(
  isSecure: boolean,
  oldValueIsSecure: boolean,
  payload: any
) {
  if (!channel.id) return;

  await updateSecurity(channel.id as string, payload);
  // --- Handle error
  if (errorUpdateSecurity.value) {
    showAlert.error({
      title: 'Failed',
      text: 'Failed to update conversation security. Please try again.',
      confirmButtonText: 'Okay',
      showCancelButton: false,
    });
    settingData.value.is_secure = oldValueIsSecure;
    return;
  }

  // --- Handle success ---
  showAlert.success({
    title: 'Success',
    showCancelButton: false,
    text: `Security enhancement settings for the Qiscus Live Chat channel have been successfully ${isSecure ? 'enabled' : 'disabled'
      }`,
  });
}

// --- Handle Functions ---
async function handleSubmitAutoResponder() {
  const payload: any = { ...channel.configs };

  if (channel.id) {
    await uQiscus.update(channel.id, payload);
  }

  if (uQiscus.error.value) {
    return showAlert.error({
      title: 'Failed',
      text: 'Failed to update Qiscus channel. Please try again.',
      confirmButtonText: 'Okay',
      showCancelButton: false,
    });
  }

  isAutoresponderFormOpen.value = false;
}

function handleCancelAutoResponder() {
  isAutoresponderFormOpen.value = false;
}

function handleOpenAutoResponderForm(isOpen: boolean = true) {
  isAutoresponderFormOpen.value = isOpen;
}

async function handleChangeAutoResponder(isEnabled: boolean) {
  if (!channel.id) return;

  useConfig.update(channel.id as string, {
    ...channel.configs,
    enabled: isEnabled,
    source: 'qiscus',
  });

  if (widget.value) {
    widget.value = {
      ...widget.value,
      configs: {
        ...widget.value.configs,
        is_enabled: isEnabled,
      },
    };
  }

  if (useConfig.error.value) {
    return showAlert.error({
      title: 'Failed',
      text: 'Failed to update auto responder. Please try again.',
      confirmButtonText: 'Okay',
      showCancelButton: false,
    });
  }

  showAlert.success({
    title: 'Success',
    text: isEnabled
      ? 'Success activating channel auto responder'
      : 'Success deactivating channel auto responder',
    confirmButtonText: 'Okay',
    showCancelButton: false,
  });
}
async function handleChangeSecurity(isSecure: boolean, oldValueIsSecure: boolean) {
  if (!channel.id) return;

  const payload = {
    app_code: channel.app_code,
    badge_url: channel.badge_url,
    id: channel.id,
    is_active: channel.is_active,
    is_secure: isSecure,
    name: channel.name,
    secret_key: null, //[ASK] its should be null?
    is_secure_toc: channel.is_secure_toc,
    configs: channel.configs,
  };

  if (isSecure) {
    showAlert
      .warning({
        title: 'Term of condition',
        text: useHtmlToString(QiscusTermConditionDescription),
        confirmButtonText: 'Agree and Enable',
        cancelButtonText: 'Cancel',
        showCancelButton: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          await updateConversationSecurity(isSecure, oldValueIsSecure, payload);
        } else {
          settingData.value.is_secure = oldValueIsSecure;
        }
      });
  } else {
    await updateConversationSecurity(isSecure, oldValueIsSecure, payload);
  }
}

// product update
const { update: updateWidget, error: errorUpdateWidget, loading: loadingUpdateWidget } = useUpdateQiscus();
const { postWidgetConfig } = useQiscusLiveChatStore();
const isProductUpdateOpen = ref(false);

const isLatestVersion = () => {
    const version = parseInt(widget.value?.widget_version || '0');
    if (version < 5) {
      return false;
    }
    return true;
};

const productVersionCheck = (val?: boolean) => {
  const isValid = val || isLatestVersion();
  if (!isValid) {
    isProductUpdateOpen.value = true;
    return
  } 
  isProductUpdateOpen.value = false;
};

const handleCancelProductUpdate = () => {
  isProductUpdateOpen.value = false;
};

const handleUpdateProductUpdate = async () => {
  if (!channel.id || !channel.app_code) return;

  await updateWidget(channel.id, {
    widget_version: '5',
  });

  if (errorUpdateWidget.value) {
    handleCancelProductUpdate();

    return showAlert.error({
      title: 'Failed',
      text: 'Failed to update Live Chat Version. Please try again.',
      confirmButtonText: 'Okay',
      showCancelButton: false,
    });
  };

  productVersionCheck(true);
  await postWidgetConfig(channel.app_code, channel.id);

  showAlert.success({
    title: 'Success',
    text: 'Success updating Live Chat Version.',
    confirmButtonText: 'Okay',
    showCancelButton: false,
  }).then(() => {
    fetchChannelById(channel.id as string);
  })
}

onMounted(async () => {
  channel.id = props.id ? String(props.id) : '';
  await fetchChannelById(channel.id);

  await uConfig.fetch(channel.id, 'qiscus');
  await uBot.fetch();
  isBot.value = uBot.data.value?.is_bot_enabled || false;

  // need to set data autoresponder
  // iConfig.data.value.is_enabled
  
  setData();
  
  // check after set data widget
  if(activeTab.value.toLowerCase() === 'overview') {
    productVersionCheck();
  }
});
</script>
