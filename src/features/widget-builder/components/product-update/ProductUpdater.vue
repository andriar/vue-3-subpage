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
        <LottieCarousel :animationData="animationData">
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
import { computed, onMounted, ref } from 'vue';


const animationData = ref<{ data: any }[]>([]);

// Lazy load animation data
const loadAnimationData = async () => {
  const [data1, data2, data3, data4] = await Promise.all([
    import('@/assets/lottie/widget-update-v5/hero-1.json'),
    import('@/assets/lottie/widget-update-v5/hero-2.json'),
    import('@/assets/lottie/widget-update-v5/hero-3.json'),
    import('@/assets/lottie/widget-update-v5/hero-4.json'),
  ]);

  animationData.value = [
    { data: data1.default },
    { data: data2.default },
    { data: data3.default },
    { data: data4.default },
  ];
};

const props = defineProps<{
  isOpen: boolean;
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

function closeDrawer() {
  //
}

onMounted(() => {
  loadAnimationData();
});
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
