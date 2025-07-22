<template>
    <div class="flex flex-col gap-8 px-12 py-8">
        <router-link to="/" id="route-integration" class="text-primary flex items-center gap-2 font-semibold">
            <BackIcon :size="20" class="text-primary" />
            Integration
        </router-link>

        <!-- Header -->
        <div class="flex items-center gap-2">
            <Image :src="CHANNEL_BADGE_URL.instagram" alt="Instagram Logo" class="h-6 w-6" :width="24" :height="24" />
            <h2 class="text-text-title text-xl font-semibold">Instagram</h2>
        </div>

        <!-- Banner documentation -->
        <InstagramBannerDoc />

        <!-- Table section -->
        <div class="shadow-large flex flex-1 items-center justify-between overflow-hidden rounded-2xl">
            <InstagramChannelTable />
        </div>
    </div>
</template>

<script setup lang="ts">
import { Image } from '@/components/common/common';
import { BackIcon } from '@/components/icons';
import InstagramBannerDoc from '@/features/instagram/components/ui/InstagramBannerDoc.vue';
import InstagramChannelTable from '@/features/instagram/pages/InstagramChannelTable.vue';
import { CHANNEL_BADGE_URL } from '@/utils/constant/channels';


</script>