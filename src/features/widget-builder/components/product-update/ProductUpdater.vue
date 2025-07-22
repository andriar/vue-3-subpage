<template>
  <LottieCarousel :animationData="animationData">
    <template #footer>
      <div class="flex w-full items-center justify-between p-4">
        <Checkbox
          v-model="isChecked"
          label="Yes, I’m ready to switch to the new Live Chat version."
          id="product-update-checkbox"
        />
        <div class="flex items-center gap-2">
          <Button id="cancel-product-update" @click="handleCancel" intent="secondary" type="button"
            >Cancel</Button
          >
          <Button
            id="update-product-update"
            @click="handleUpdate"
            :disabled="!isAbleToUpdate"
            intent="primary"
            type="button"
            >{{ loading ? 'Updating...' : 'Update' }}</Button
          >
        </div>
      </div>
    </template>
  </LottieCarousel>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import animationData_1 from '@/assets/lottie/widget-update-v5/hero-1.json';
import animationData_2 from '@/assets/lottie/widget-update-v5/hero-2.json';
import animationData_3 from '@/assets/lottie/widget-update-v5/hero-3.json';
import animationData_4 from '@/assets/lottie/widget-update-v5/hero-4.json';
import LottieCarousel from '@/components/common/Carousel/LottieCarousel.vue';
import { Button, Checkbox } from '@/components/common/common';

const animationData = [
  { data: animationData_1 },
  { data: animationData_2 },
  { data: animationData_3 },
  { data: animationData_4 },
];

const props = defineProps<{
  loading: boolean;
}>();

const isChecked = ref(false);
const emit = defineEmits(['cancel', 'update']);

const handleCancel = () => {
  emit('cancel');
};

const handleUpdate = () => {
  emit('update');
};

const isAbleToUpdate = computed(() => {
  return isChecked.value && !props.loading;
});
</script>
