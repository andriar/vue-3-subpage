<template>
  <div>
    <Navbar />
    <main class="container mx-auto pl-[60px]">
      <router-view v-slot="{ Component }">
        <transition
          :enter-active-class="enterActiveClass"
          :enter-from-class="enterFromClass"
          :enter-to-class="enterToClass"
          :leave-active-class="leaveActiveClass"
          :leave-from-class="leaveFromClass"
          :leave-to-class="leaveToClass"
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <transition name="fade">
      <div v-if="loading">
        <MainLoading />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted, ref, watchEffect } from 'vue';
import { RouterView } from 'vue-router';

// Import the reactive navigationDirection
import Navbar from './components/ui/Navbar.vue';
import { useFetchFeature } from './composables/channels/useFetchFeature';
import { useSweetAlert } from './composables/useSweetAlert';
import { navigationDirection } from './router';
import { useAppDetailStore } from './stores/app-detail';
import { usePlanStore } from './stores/plan';

const MainLoading = defineAsyncComponent(() => import('./components/ui/MainLoading.vue'));

// Define reactive variables for transition classes
const enterActiveClass = ref('transition-all duration-100 ease-out');
const enterFromClass = ref('opacity-0 translate-x-5');
const enterToClass = ref('opacity-100 translate-x-0');
const leaveActiveClass = ref('transition-all duration-100 ease-in');
const leaveFromClass = ref('opacity-100 translate-x-0');
const leaveToClass = ref('opacity-0 -translate-x-5');

// Watch for changes in navigationDirection and update transition classes
watchEffect(() => {
  if (navigationDirection.value === 'back') {
    // Classes for "back" navigation (slide in from left, slide out to right)
    enterFromClass.value = 'opacity-0 -translate-x-5';
    enterToClass.value = 'opacity-100 translate-x-0';
    leaveFromClass.value = 'opacity-100 translate-x-0';
    leaveToClass.value = 'opacity-0 translate-x-5';
  } else {
    // Default classes for "forward" or "initial" navigation (slide in from right, slide out to left)
    enterFromClass.value = 'opacity-0 translate-x-5';
    enterToClass.value = 'opacity-100 translate-x-0';
    leaveFromClass.value = 'opacity-100 translate-x-0';
    leaveToClass.value = 'opacity-0 -translate-x-5';
  }

  // You can also adjust active classes if needed, e.g., different durations
  // For simplicity, keeping them consistent here.
  enterActiveClass.value = 'transition-all duration-100 ease-out';
  leaveActiveClass.value = 'transition-all duration-100 ease-in';
});

const feature = useFetchFeature();
const plan = usePlanStore();
const app = useAppDetailStore();

const { showAlert } = useSweetAlert();
const loading = ref<boolean>(false);

onMounted(() => {
  loading.value = true;
  Promise.all([feature.fetchFeature(), plan.getPlanData(), app.fetch()])
    .then(() => {
      loading.value = false;
    })
    .catch(() => {
      showAlert.error({
        title: 'Error',
        text: `Something went wrong.`,
        confirmButtonText: 'Okay',
        showCancelButton: false,
      });
    });
});
</script>
