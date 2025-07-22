<script lang="ts" setup>
import { computed } from 'vue';

import Input from '@/components/form/Input.vue';

interface IModel {
  token: string;
  username: string;
  name: string;
}
const props = withDefaults(defineProps<{ modelValue: IModel }>(), {
  modelValue: () => ({
    token: '',
    username: '',
    name: '',
  }),
});

const emit = defineEmits(['update:modelValue']);

const formData = computed({
  get() {
    return props.modelValue;
  },
  set(newValue: IModel) {
    emit('update:modelValue', newValue);
  },
});
</script>

<template>
  <div class="rounded-xl border border-gray-300 bg-gray-200 p-6">
    <p class="mb-4 text-xs text-gray-800">
      Fill in the required credentials below to connect with your Telegram Channel.
    </p>
    <Input id="input-bot-token" v-model="formData.token" label="Bot Token" class="max-w-[472px]"
      placeholder="Insert your bot token" />
  </div>

  <div class="rounded-xl p-6 shadow-card">
    <h3 class="font-semibold text-black-700">Bot Information</h3>
    <p class="mb-4 text-xs text-gray-800">Your bot profile will shown here</p>

    <div class="flex gap-x-8 gap-y-4 flex-col md:flex-row">
      <Input id="input-bot-token" label="Bot Username" class="max-w-[472px] flex-1"
        placeholder="This field fills in automatically when you're linked to Telegram." disabled
        v-model="formData.username" />
      <Input id="input-bot-token" label="Bot name" class="max-w-[472px] flex-1"
        placeholder="This field fills in automatically when you're linked to Telegram." disabled
        v-model="formData.name" />
    </div>
  </div>
</template>
