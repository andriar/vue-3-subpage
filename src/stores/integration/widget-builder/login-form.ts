import { defineStore } from 'pinia';
import { computed, reactive, ref } from 'vue';

import type { ILoginFormState } from '@/types/live-chat';
import type { LoginForm } from '@/types/schemas/channels/qiscus-widget/config-qiscus-widget';
import { WIDGET_DEFAULTS } from '@/utils/constant/widget-default';

export const useLoginFormStore = defineStore('login-form', () => {
  const state = reactive<ILoginFormState>({ ...WIDGET_DEFAULTS.LOGIN_FORM });
  const originalState = ref<ILoginFormState>({ ...WIDGET_DEFAULTS.LOGIN_FORM });

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
    { text: 'Dropdown', value: 'select' },
  ]);

  const iconsAdditionalField = ref<{ name: string; icon: string }[]>([
    {
      name: 'Date',
      icon: 'https://qiscus-sdk.s3.ap-southeast-1.amazonaws.com/public/qismo/date.svg',
    },
    {
      name: 'Location',
      icon: 'https://qiscus-sdk.s3.ap-southeast-1.amazonaws.com/public/qismo/location.svg',
    },
    {
      name: 'Briefcase',
      icon: 'https://qiscus-sdk.s3.ap-southeast-1.amazonaws.com/public/qismo/briefcase.svg',
    },
    {
      name: 'Globe',
      icon: 'https://qiscus-sdk.s3.ap-southeast-1.amazonaws.com/public/qismo/globe.svg',
    },
    {
      name: 'Phone',
      icon: 'https://qiscus-sdk.s3.ap-southeast-1.amazonaws.com/public/qismo/phone.svg',
    },
  ]);

  const updateOriginalState = () => {
    originalState.value = JSON.parse(JSON.stringify(state));
  };

  const populateFromConfig = (config: LoginForm) => {
    const defaults = WIDGET_DEFAULTS.LOGIN_FORM;

    state.firstDescription = config?.formGreet ?? defaults.firstDescription;
    state.secondDescription = config?.formSecondGreet ?? defaults.secondDescription;
    state.formSubtitle = config?.formSubtitle ?? defaults.formSubtitle;
    state.buttonText = config?.loginFormButtonLabel ?? defaults.buttonText;
    state.customerIdentifier = config?.customerIdentifierInputType ?? defaults.customerIdentifier;
    state.extraFields = config?.extra_fields ?? [];
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

  const resetToDefaults = () => {
    Object.assign(state, { ...WIDGET_DEFAULTS.LOGIN_FORM });
    originalState.value = { ...WIDGET_DEFAULTS.LOGIN_FORM };
  };

  return {
    state,
    customerIdentifierOptions,
    fieldTypeOptionsAdditionalField,
    iconsAdditionalField,
    isDirty,
    populateFromConfig,
    getPayloadData,
    updateOriginalState,
    resetToDefaults,
  };
});
