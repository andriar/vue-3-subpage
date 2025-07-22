<template>
  <teleport to="body">
    <transition name="drawer-backdrop-fade">
      <div v-if="isOpen" class="bg-opacity-50 fixed inset-0 z-[998] flex items-center justify-center bg-black-900/40"
        @click="closeDrawer"></div>
    </transition>

    <transition name="modal-slide-fade">
      <div @click.stop v-if="isOpen" id="modal-container" :class="[
        'z-[999] flex h-auto max-h-[90vh] max-w-full flex-col rounded-2xl bg-white shadow-xl',
        'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
      ]">
        <div v-if="animationData.length === 0"
          class="flex items-center justify-center bg-white rounded-2xl overflow-hidden min-w-[850px] min-h-[380px]">
          <div class="text-gray-500">Loading animations...</div>
        </div>
        <LottieCarousel v-if="animationData.length > 0" :animationData="animationData">
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
