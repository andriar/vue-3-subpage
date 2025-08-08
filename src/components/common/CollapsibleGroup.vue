<script setup lang="ts">
import { onMounted, ref } from 'vue';

import Collapsible from './Collapsible.vue';

// Define the interface for an item in the collapsible group
interface CollapsibleGroupItem {
  id: string;
  title: string;
  content: string; // The HTML content for the collapsible body
  initiallyOpen?: boolean; // Optional: if this item should be open initially
}

// Define component props
interface Props {
  items: CollapsibleGroupItem[]; // Array of items to display in the group
}

const props = defineProps<Props>();

// Reactive state to hold the ID of the currently active (open) item
const activeItemId = ref<string | null>(null);

/**
 * Handles the collapse toggle event from a child CollapsibleComponent.
 * If the component is being opened, set it as the active item.
 * If it's being closed, set activeItemId to null.
 * @param id The ID of the item that was toggled.
 * @param isNowCollapsed The new collapsed state of the child component.
 */
const handleCollapseToggle = (id: string, isNowCollapsed: boolean) => {
  if (!isNowCollapsed) {
    // If the component is now open, make it the active one
    activeItemId.value = id;
  } else if (activeItemId.value === id) {
    // If the component is now closed AND it was the active one, clear activeItemId
    activeItemId.value = null;
  }
};

onMounted(() => {
  // Check if any item is marked as initially open and set it as active
  const initialOpenItem = props.items.find((item) => item.initiallyOpen);

  if (initialOpenItem) {
    activeItemId.value = initialOpenItem?.id;
  } else if (props.items.length > 0) {
    // Optionally, open the first item by default if none are explicitly set
    if (props.items[0]?.id) activeItemId.value = props.items[0]?.id;
  }
});
</script>

<template>
  <div class="shadow-base overflow-hidden rounded-lg">
    <Collapsible
      v-for="(item, index) in items"
      :key="item.id"
      :title="item.title"
      :collapsed="activeItemId !== item.id"
      :initiallyCollapsed="!item.initiallyOpen"
      :class="{
        'border-t border-gray-300': index !== 0,
      }"
      @update:collapsed="handleCollapseToggle(item.id, $event)"
    >
      <!-- Pass the content from the item data to the default slot of Collapsible -->
      <template #default>
        <!-- <div v-html="item.content"></div> -->
        <slot :name="`item-id-${item.id}`" :item="item">
          <div v-html="item.content"></div>
        </slot>
      </template>
      <!-- Pass the title from the item data to the title slot -->
      <template #title>
        {{ item.title }}
      </template>
    </Collapsible>
  </div>
</template>
