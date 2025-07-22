<script setup lang="ts">
import { CloseIcon } from '../icons';

const props = withDefaults(defineProps<{
    label: string;
    onClose?: () => void;
}>(), {
    label: '',
    onClose: () => { },
});
</script>

<template>
    <div class="flex items-center gap-2 border border-gray-500 rounded-lg px-2 py-1 max-w-full">
        <div class="text-xs font-medium text-text-title truncate">{{ props.label }}</div>
        <div class="flex items-center pl-2 border-l border-gray-500">
            <CloseIcon :size="18" class="cursor-pointer text-text-subtitle" @click="props.onClose" />
        </div>
    </div>
</template>