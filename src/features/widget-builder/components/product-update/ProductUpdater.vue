<template>
    <div class="flex flex-col items-center justify-center bg-white rounded-2xl overflow-hidden">
        <div id="default-carousel" class="relative w-full">
            <!-- Carousel wrapper -->
            <div class="relative overflow-hidden rounded-lg w-[850px] h-[380px] cursor-grab active:cursor-grabbing select-none"
                 @touchstart="handleDragStart"
                 @touchmove="handleDragMove"
                 @touchend="handleDragEnd"
                 @mousedown="handleDragStart"
                 @mousemove="handleDragMove"
                 @mouseup="handleDragEnd"
                 @mouseleave="handleDragEnd"
                 @dragstart.prevent>
                <!-- Item -->
                <div v-for="(animation, index) in ANIMATION_DATA" 
                     :key="index"
                     class="absolute inset-0 transform"
                     :class="{ 
                         'duration-700 ease-in-out transition-transform': !isDragging,
                         'translate-x-0': currentSlide === index && !isDragging,
                         '-translate-x-full': currentSlide !== index && index < currentSlide && !isDragging,
                         'translate-x-full': currentSlide !== index && index > currentSlide && !isDragging
                     }"
                     :style="isDragging ? { transform: `translateX(${getDragTransform(index)}px)` } : {}">
                    <Vue3Lottie 
                    :ref="(el) => setAnimationRef(el, index)"
                    :width="850" height="auto" :loop="false" @onComplete="nextSlide" :autoPlay="index === 0 ? true : false" :animationData="animation.data" />
                </div>
            </div>
            <!-- Slider indicators -->
            <div class="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-2 rtl:space-x-reverse items-center">
                <button 
                    v-for="(_, index) in ANIMATION_DATA"
                    :key="index"
                    type="button" 
                    class="rounded-full transition-colors hover:cursor-pointer"
                    :class="currentSlide === index ? 'bg-primary w-3 h-3' : 'bg-gray-300 w-[10px] h-[10px]'"
                    :aria-current="currentSlide === index ? 'true' : 'false'"
                    :aria-label="`Slide ${index + 1}`"
                    @click="goToSlide(index)"
                ></button>
            </div>
        </div>
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
import animationData_1 from '@/assets/lottie/product-update-hero_1.json';
import animationData_2 from '@/assets/lottie/product-update-hero_2.json';
import { Button, Checkbox } from '@/components/common/common';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { Vue3Lottie } from 'vue3-lottie';


// Create array to hold animation refs
const animationRefs = ref<any[]>([]);

const ANIMATION_DATA = [
    {data: animationData_1}, 
    {data: animationData_2}
];

// Function to set animation refs dynamically
const setAnimationRef = (el: any, index: number) => {
    if (el) {
        animationRefs.value[index] = el;
    }
};

const props = defineProps<{
    loading: boolean;
}>();

const isChecked = ref(false);
const emit = defineEmits(['cancel', 'update']);

const handleCancel = () => {
    emit('cancel');
}

const handleUpdate = () => {
    emit('update');
}


// Carousel control state
const currentSlide = ref(0);
const totalSlides = ANIMATION_DATA.length;

// Drag state
const isDragging = ref(false);
const dragStartX = ref(0);
const dragCurrentX = ref(0);
const dragDistance = ref(0);
const slideWidth = 850; // Width of each slide
const dragThreshold = 100; // Minimum distance to trigger slide change

const isAbleToUpdate = computed(() => {
    return isChecked.value && !props.loading;
});


// Carousel control functions
const goToSlide = (slideIndex: number) => {
    if (slideIndex >= 0 && slideIndex < totalSlides) {
        currentSlide.value = slideIndex;
        playAnimation(slideIndex);
    }
}

const nextSlide = () => {
    if (currentSlide.value < totalSlides - 1) {
        currentSlide.value++;
    } else {
        currentSlide.value = 0; // Loop back to first slide
    }
    playAnimation();
}

const previousSlide = () => {
    if (currentSlide.value > 0) {
        currentSlide.value--;
    } else {
        currentSlide.value = totalSlides - 1; // Loop back to last slide
    }
    playAnimation();
}

// Keyboard navigation
const handleKeydown = (event: KeyboardEvent) => {
    switch (event.key) {
        case 'ArrowLeft':
            previousSlide();
            break;
        case 'ArrowRight':
            nextSlide();
            break;
    }
}

const playAnimation = (index?: number) => {
    const slideIndex = index ?? currentSlide.value;
    if (animationRefs.value[slideIndex]) {
        animationRefs.value[slideIndex].goToAndPlay(0);
    }

    for (let i = 0; i < animationRefs.value.length; i++) {
        if (i !== slideIndex) {
            animationRefs.value[i].pause();
        }
    }
};

const onDragHandleAnimation = (index?: number) => {
    const slideIndex = index ?? currentSlide.value;

    for (let i = 0; i < animationRefs.value.length; i++) {
        if (i !== slideIndex) {
            animationRefs.value[i].goToAndStop(0);
        } else {
            animationRefs.value[i].pause();
        }
    }
}

// Drag functionality
const getEventX = (event: TouchEvent | MouseEvent) => {
    return 'touches' in event ? event.touches[0]?.clientX || 0 : event.clientX;
}

const handleDragStart = (event: TouchEvent | MouseEvent) => {
    isDragging.value = true;
    dragStartX.value = getEventX(event);
    dragCurrentX.value = dragStartX.value;
    dragDistance.value = 0;
    onDragHandleAnimation();
    // Prevent default to avoid text selection on desktop
    event.preventDefault();
}

const handleDragMove = (event: TouchEvent | MouseEvent) => {
    if (!isDragging.value) return;
    
    event.preventDefault();
    dragCurrentX.value = getEventX(event);
    dragDistance.value = dragCurrentX.value - dragStartX.value;
}

const handleDragEnd = () => {
    if (!isDragging.value) return;
    
    isDragging.value = false;
    
    // Determine if we should change slides based on drag distance
    if (Math.abs(dragDistance.value) > dragThreshold) {
        if (dragDistance.value > 0) {
            // Dragged right, go to previous slide
            previousSlide();
        } else {
            // Dragged left, go to next slide
            nextSlide();
        }
    } else {
        animationRefs.value[currentSlide.value].play();
    }
    
    // Reset drag state
    dragStartX.value = 0;
    dragCurrentX.value = 0;
    dragDistance.value = 0;
}

const getDragTransform = (index: number) => {
    const baseTransform = (index - currentSlide.value) * slideWidth;
    return baseTransform + dragDistance.value;
}

// Lifecycle hooks
onMounted(() => {
    window.addEventListener('keydown', handleKeydown);
    // Add global mouse event listeners for better drag support
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
    document.removeEventListener('mousemove', handleDragMove);
    document.removeEventListener('mouseup', handleDragEnd);
});
</script>