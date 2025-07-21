<script setup lang="ts">
import { computed, ref, watch } from 'vue';

import Chip from '@/components/common/Chip.vue';
import InputCustom from '@/components/form/InputCustom.vue';
import { PlusIcon } from '@/components/icons';

const itemDropdown = ref('');

const props = defineProps<{
  modelValue: { id: number; label: string }[];
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: { id: number; label: string }[]): void;
}>();

const items = ref<{ id: number; label: string }[]>(props.modelValue || []);

// Watch for prop changes
watch(
  () => props.modelValue,
  (newValue) => {
    items.value = newValue || [];
  },
  { immediate: true }
);

// Generate next ID
const nextId = computed(() => {
  const ids = items.value.map((item) => item.id);
  return ids.length > 0 ? Math.max(...ids) + 1 : 1;
});

const addItem = () => {
  if (itemDropdown.value.trim()) {
    const newItem = {
      id: nextId.value,
      label: itemDropdown.value.trim(),
    };
    items.value.push(newItem);
    emit('update:modelValue', items.value);
    itemDropdown.value = '';
  }
};

const removeItem = (itemToRemove: { id: number; label: string }) => {
  items.value = items.value.filter((item) => item.id !== itemToRemove.id);
  emit('update:modelValue', items.value);
};
</script>

<template>
  <div class="flex flex-col gap-4 rounded-lg border border-gray-300 bg-gray-200 p-4">
    <InputCustom label="Item Dropdown" v-model="itemDropdown">
      <template #append-button-icon>
        <PlusIcon :size="24" @click="addItem" />
      </template>
    </InputCustom>
    <div class="flex flex-wrap gap-2">
      <Chip
        v-for="item in items"
        :key="item.id"
        :label="item.label"
        :onClose="() => removeItem(item)"
      />
    </div>
  </div>
</template>
