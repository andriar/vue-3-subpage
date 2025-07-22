<script setup lang="ts">
import Chip from '@/components/common/Chip.vue';
import InputCustom from '@/components/form/InputCustom.vue';
import { PlusIcon } from '@/components/icons';
import { ref } from 'vue';

const itemDropdown = ref('');

const props = defineProps<{
    modelValue: string[];
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: string[]): void;
}>();

const items = ref<string[]>(props.modelValue || []);

const addItem = () => {
    if (itemDropdown.value.trim()) {
        items.value.push(itemDropdown.value.trim());
        emit('update:modelValue', items.value);
        itemDropdown.value = '';
    }
};

const removeItem = (item: string) => {
    items.value = items.value.filter((i) => i !== item);
    emit('update:modelValue', items.value);
};

</script>

<template>
    <div class="flex flex-col gap-4 p-4 bg-gray-200 rounded-lg border border-gray-300">
        <InputCustom id="dropdown-input" label="Item Dropdown" v-model="itemDropdown">
            <template #append-button-icon>
                <PlusIcon :size="24" @click="addItem" />
            </template>
        </InputCustom>
        <div class="flex flex-wrap gap-2">
            <Chip v-for="item in items" :key="item" :label="item" :onClose="() => removeItem(item)" />
        </div>
    </div>
</template>