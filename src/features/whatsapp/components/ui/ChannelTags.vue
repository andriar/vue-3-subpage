<template>
    <div v-for="label in labels" class="flex items-center gap-2">
        <div class="flex items-center rounded-lg p-2 text-xs font-semibold" :class="labelClass(label)">
            {{ label }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    data: {
        isMmlite: boolean;
        isCoex: boolean;
    }
}>();

const labels = computed(() => {
    const labels = [];
    if (props.data.isMmlite) {
        labels.push('Marketing Optimization');
    }
    if (props.data.isCoex) {
        labels.push('Coexistence');
    }
    return labels;
})

const labelClass = (label: string) => {
    if (label === 'Marketing Optimization') {
        return 'bg-[#F1F9EF] text-[#288C7A]';
    }
    if (label === 'Coexistence') {
        return 'bg-[#EEFAFE] text-[#56CCF2]';
    }
    return '';
}
</script>