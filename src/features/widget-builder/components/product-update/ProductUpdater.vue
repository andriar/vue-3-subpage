<template>
  <teleport to="body">
    <transition name="drawer-backdrop-fade">
      <div v-if="isOpen" class="bg-opacity-50 fixed inset-0 z-[998] flex items-center justify-center bg-black-900/40"
        @click="closeDrawer"></div>
    </transition>

    <transition name="modal-scale-fade">
      <div @click.stop v-if="isOpen" id="modal-container" :class="[
        'z-[999] flex h-auto max-h-[90vh] max-w-full flex-col rounded-2xl bg-white shadow-xl',
        'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
      ]">
        <LottieCarousel 
          :animationData="animationData" 
          :loading="animationsLoading"
          :totalExpected="4"
        >
          <template #footer>
            <div class="flex w-full items-center justify-between p-4">
              <Checkbox v-model="isChecked" label="Yes, I’m ready to switch to the new Live Chat version."
                id="product-update-checkbox" />
              <div class="flex items-center gap-2">
                <Button id="cancel-product-update" @click="handleCancel" intent="secondary"
                  type="button">Cancel</Button>
                <Button id="update-product-update" @click="handleUpdate" :disabled="!isAbleToUpdate" intent="primary"
                  type="button">{{ loading ? 'Updating...' : 'Update' }}</Button>
              </div>
            </div>
          </template>
        </LottieCarousel>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import LottieCarousel from '@/components/common/Carousel/LottieCarousel.vue';
import { Button, Checkbox } from '@/components/common/common';
import { computed, ref, watch } from 'vue';

const animationData = ref<{ data: any }[]>([]);
const animationsLoading = ref(true);

const fetchAnimations = async (url: string) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to load animations:', error);
    return null;
  }
}

const loadAnimationDataBatched = async () => {
  animationsLoading.value = true;
  
  try {
    // Start all requests immediately
    const largeAnimationPromise = fetchAnimations('https://qiscus-sdk.s3.ap-southeast-1.amazonaws.com/public/qismo/animations/hero-1.json');
    const smallAnimationsPromise = Promise.all([
      fetchAnimations('https://qiscus-sdk.s3.ap-southeast-1.amazonaws.com/public/qismo/animations/hero-2.json'),
      fetchAnimations('https://qiscus-sdk.s3.ap-southeast-1.amazonaws.com/public/qismo/animations/hero-3.json'),
      fetchAnimations('https://qiscus-sdk.s3.ap-southeast-1.amazonaws.com/public/qismo/animations/hero-4.json'),
    ]);
    
    // Load smaller animations first and show them immediately
    const [data2, data3, data4] = await smallAnimationsPromise;
    animationData.value = [
      { data: null }, // placeholder for the large animation
      { data: data2 },
      { data: data3 },
      { data: data4 },
    ];
    animationsLoading.value = false; // User can start interacting
    
    // Load large animation in background and insert when ready
    const data1 = await largeAnimationPromise;
    if (animationData.value[0]) {
      animationData.value[0].data = data1;
    }
    
  } catch (error) {
    console.error('Failed to load animations:', error);
    animationsLoading.value = false;
  }
};


// Memory cleanup when component unmounts
const cleanup = () => {
  animationData.value = [];
};

const props = defineProps<{
  isOpen: boolean;
  loading: boolean;
}>();

const isChecked = ref(false);
const emit = defineEmits(['cancel', 'update']);

// Load animations only when modal opens
watch(() => props.isOpen, (newValue) => {
  if (newValue && animationData.value.length === 0) {
    loadAnimationDataBatched(); 
  } else if (!newValue) {
    cleanup();
  }
});

const handleCancel = () => {
  emit('cancel');
};

const handleUpdate = () => {
  emit('update');
};

const isAbleToUpdate = computed(() => {
  return isChecked.value && !props.loading;
});

function closeDrawer() {
  //
}
</script>

<style scoped>
/* Backdrop fade transitions */
.drawer-backdrop-fade-enter-active,
.drawer-backdrop-fade-leave-active {
  transition: opacity 0.3s ease;
}

.drawer-backdrop-fade-enter-from,
.drawer-backdrop-fade-leave-to {
  opacity: 0;
}

/* Modal scale and fade transitions */
.modal-scale-fade-enter-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-scale-fade-leave-active {
  transition: all 0.2s ease-in;
}

.modal-scale-fade-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.modal-scale-fade-enter-to {
  opacity: 1;
  transform: scale(1);
}

.modal-scale-fade-leave-from {
  opacity: 1;
  transform: scale(1);
}

.modal-scale-fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
