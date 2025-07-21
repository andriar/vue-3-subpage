<template>
  <CollapsibleGroup :items="items">
    <template #item-id-1="{ item }">
      <div class="flex justify-between gap-8">
        {{ item.content }}
        <div>
          <Switch variant="success" size="medium" v-model="autoResponderEnabled" />
        </div>
      </div>
      <Button id="open-autoresponder-btn" intent="secondary" class="mt-4" @click="handleOpenAutoResponderForm">Set
        Channel
        Auto Responder</Button>
    </template>
    <template #item-id-2="{ item }">
      <div class="flex justify-between gap-8">
        <div v-html="item.content"></div>
        <div>
          <Switch variant="success" v-model="enhanceSecurityEnabled" size="medium" />
        </div>
      </div>
    </template>
  </CollapsibleGroup>
</template>
<script setup lang="ts">
import Button from '@/components/common/Button.vue';
import CollapsibleGroup from '@/components/common/CollapsibleGroup.vue';
import Switch from '@/components/common/Switch.vue';
import { computed } from 'vue';

const items = [
  {
    id: '1',
    title: 'Auto Responder',
    content:
      'Auto Responder is a system that automatically sends messages only to this channel according to the customer service operating hours. Admin can set the auto responder message when services are both during and outside the office hour.',
    initiallyOpen: true,
  },
  {
    id: '2',
    title: 'Enhance Conversation Security',
    content:
      "A new chat room will be created every time a customer uses a different device or browser to send messages to your Live Chat channel. See the <a href='https://documentation.qiscus.com/omnichannel-chat/widget#security-in-qiscus-widget' class='text-link-400' target='_blank' rel='noopener noreferrer'>documentation</a> for more detailed information.",
  },
];

const props = withDefaults(defineProps<{ modelValue: { is_enabled: boolean; is_secure: boolean; } }>(), {
  modelValue: () => ({
    is_enabled: false,
    is_secure: false,
  }),
});

const emit = defineEmits(['openAutoResponderForm', 'onChangeAutoResponder', 'onChangeSecure', 'update:modelValue']);

// Computed property for autoResponderEnabled
const autoResponderEnabled = computed({
  get: () => props.modelValue.is_enabled,
  set: (value: boolean) => {
    emit('update:modelValue', { ...props.modelValue, is_enabled: value });
    // You might still want to keep this for specific parent-level handling if needed
    // emit('onChangeAutoResponder', value);
  },
});

// Computed property for enhanceSecurityEnabled
const enhanceSecurityEnabled = computed({
  get: () => props.modelValue.is_secure,
  set: (value: boolean) => {
    emit('update:modelValue', { ...props.modelValue, is_secure: value });
    // You might still want to keep this for specific parent-level handling if needed
    // emit('onChangeSecure', value);
  },
});


const handleOpenAutoResponderForm = () => {
  emit('openAutoResponderForm', true);
};
</script>