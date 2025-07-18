<template>
    <div class="flex flex-col items-center justify-center bg-white rounded-2xl overflow-hidden">
        <Animate :loop="false" @onComplete="onComplete" :speed="1.5" height="auto" width="850" :source="productUpdateAnimationData" />
        <div class="flex items-center justify-between w-full p-4">
            <Checkbox v-model="isChecked" label="Yes, I’m ready to switch to the new Live Chat version." id="product-update-checkbox" />
            <div class="flex items-center gap-2">
                <Button @click="handleCancel" intent="secondary" type="button">Cancel</Button>
                <Button @click="handleUpdate" :disabled="!isAbleToUpdate" intent="primary" type="button">{{ loading ? 'Updating...' : 'Update' }}</Button>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import productUpdateAnimationData from '@/assets/lottie/product-update-hero_2.json';
import { Animate, Button, Checkbox } from '@/components/common/common';
import { computed, ref } from 'vue';

const props = defineProps<{
    loading: boolean;
}>();

const isChecked = ref(false);
const emit = defineEmits(['cancel', 'update']);

const isAbleToUpdate = computed(() => {
    return isChecked.value && !props.loading;
});

const handleCancel = () => {
    emit('cancel');
}

const handleUpdate = () => {
    emit('update');
}

const onComplete = () => {
    console.log('onComplete');
}

</script>