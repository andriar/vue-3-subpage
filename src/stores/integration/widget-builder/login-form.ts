import { defineStore } from 'pinia';
import { computed, reactive, ref } from 'vue';

import type { IconName } from '@/components/icons/Icon.vue';
import type { ILoginFormState } from '@/types/live-chat';
import type { LoginForm } from '@/types/schemas/channels/qiscus-widget/config-qiscus-widget';
import { WIDGET_DEFAULTS } from '@/utils/constant/widget-default';

export const useLoginFormStore = defineStore('login-form', () => {
  const state = reactive<ILoginFormState>({ ...WIDGET_DEFAULTS.LOGIN_FORM });
  const originalState = ref<ILoginFormState>(
    JSON.parse(JSON.stringify(WIDGET_DEFAULTS.LOGIN_FORM))
  );

  const isDirty = computed(() => {
    return JSON.stringify(state) !== JSON.stringify(originalState.value);
  });

  const customerIdentifierOptions = ref([
    { label: 'Email', value: 'email' },
    { label: 'Phone Number', value: 'phone' },
  ]);

  const fieldTypeOptionsAdditionalField = ref([
    { text: 'Input Text', value: 'input' },
    { text: 'Text Area', value: 'textarea' },
    { text: 'Dropdown', value: 'dropdown' },
  ]);

  const iconsAdditionalField = ref<{ name: string; icon: IconName }[]>([
    { name: 'Date', icon: 'date' },
    { name: 'Location', icon: 'pin' },
    { name: 'Briefcase', icon: 'briefcase' },
    { name: 'Globe', icon: 'globe' },
    { name: 'Phone', icon: 'phone' },
  ]);

  const updateOriginalState = () => {
    originalState.value = JSON.parse(JSON.stringify(state));
  };

  const populateFromConfig = (config: LoginForm) => {
    const defaults = WIDGET_DEFAULTS.LOGIN_FORM;

    state.firstDescription = config?.formGreet ?? defaults.firstDescription;
    state.formSubtitle = config?.formSubtitle ?? defaults.formSubtitle;
    state.buttonText = config?.loginFormButtonLabel ?? defaults.buttonText;
    state.extraFields = config?.extra_fields ?? [];
    state.customerIdentifier = config?.customerIdentifierInputType ?? defaults.customerIdentifier;
    state.secondDescription = config?.formSecondGreet ?? defaults.secondDescription;
    state.brandLogo = config?.loginBrandLogo ?? defaults.brandLogo;

    // Update original state
    updateOriginalState();
  };

  const getPayloadData = () => ({
    formGreet: state.firstDescription,
    formSecondGreet: state.secondDescription,
    formSubtitle: state.formSubtitle,
    loginFormButtonLabel: state.buttonText,
    customerIdentifierInputType: state.customerIdentifier,
    extra_fields: state.extraFields,
    loginBrandLogo: state.brandLogo,
  });

  return {
    state,
    customerIdentifierOptions,
    fieldTypeOptionsAdditionalField,
    iconsAdditionalField,
    isDirty,
    populateFromConfig,
    getPayloadData,
    updateOriginalState,
  };
});
