<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

import Button from '@/components/common/Button.vue';
import { BackIcon, NextIcon } from '@/components/icons';
import CallToAction from '@/components/ui/widget-preview/CallToAction.vue';
import ChatFormLoading from '@/components/ui/widget-preview/ChatFormLoading.vue';
import LoginFormLoading from '@/components/ui/widget-preview/LoginFormLoading.vue';
import WelcomingPage from '@/components/ui/widget-preview/WelcomingPage.vue';
import { useColorWidgetStore } from '@/stores/integration/widget-builder/color';

const { colorWidgetState } = storeToRefs(useColorWidgetStore());

const carouselContainer = ref<HTMLElement>();
const currentIndex = ref(0);
const totalSlides = 3;

const scrollToSlide = (index: number) => {
  if (!carouselContainer.value) return;

  const container = carouselContainer.value;
  const slideWidth = container.scrollWidth / totalSlides;
  container.scrollTo({
    left: slideWidth * index,
    behavior: 'smooth',
  });
  currentIndex.value = index;
};

const goToPrevious = () => {
  const newIndex = currentIndex.value > 0 ? currentIndex.value - 1 : totalSlides - 1;
  scrollToSlide(newIndex);
};

const goToNext = () => {
  const newIndex = currentIndex.value < totalSlides - 1 ? currentIndex.value + 1 : 0;
  scrollToSlide(newIndex);
};
</script>

<template>
  <div class="flex gap-2">
    <Button
      id="previous-btn"
      intent="flat"
      disableAnimation
      class="border-button-primary border !px-3 !py-1"
      @click="goToPrevious"
    >
      <template #prefixIcon>
        <BackIcon :size="18" />
      </template>
      <span class="text-xs font-semibold">Previous</span>
    </Button>

    <Button
      id="next-btn"
      intent="flat"
      disableAnimation
      class="border-button-primary border !px-3 !py-1"
      @click="goToNext"
    >
      <template #suffixIcon>
        <NextIcon :size="18" />
      </template>
      <span class="text-xs font-semibold">Next</span>
    </Button>
  </div>
  <div
    ref="carouselContainer"
    class="flex w-100 snap-x snap-mandatory gap-10 overflow-x-hidden px-5 py-4"
  >
    <!-- Welcome Page -->
    <div class="flex min-w-full snap-center flex-col items-end gap-4">
      <WelcomingPage
        title="Hello there!"
        subtitle="Welcome to Qiscus!"
        :textColor="colorWidgetState"
        :isUsingIconSkeleton="true"
        :imageUrl="''"
        :actions="[]"
      />

      <CallToAction :color="colorWidgetState" />
    </div>

    <!-- Login Form -->
    <div class="flex min-w-full snap-center flex-col items-end gap-4">
      <LoginFormLoading
        title="Hello there,"
        subtitle="Welcome to Qiscus!"
        description="Please fill the details below before chatting with us!"
        :color="colorWidgetState"
      />

      <div class="bg-surface-disable h-16 w-16 rounded-full" />
    </div>

    <!-- Chat Form -->
    <div class="flex min-w-full snap-center flex-col items-end gap-4">
      <ChatFormLoading>
        <template #bubble>
          <div class="flex justify-end">
            <div
              class="rounded-t-[24px] rounded-br-[4px] rounded-bl-[24px] p-4 text-sm text-white"
              :style="{ backgroundColor: colorWidgetState }"
            >
              Hello there, Im Qiscus Folks!
            </div>
          </div>
        </template>
      </ChatFormLoading>

      <div class="bg-surface-disable h-16 w-16 rounded-full" />
    </div>
  </div>
</template>
