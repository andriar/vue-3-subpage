<script setup lang="ts">
import { Banner, Button, CollapsibleGroup, Switch } from '@/components/common/common';
import MainTab from '@/components/common/Tabs/MainTab.vue';
import InputCustom from '@/components/form/InputCustom.vue';
import { BackIcon, CopyIcon, HomeIcon } from '@/components/icons';
import { CHANNEL_BADGE_URL } from '@/utils/constant/channels';
import { ref } from 'vue';


const activeTab = ref<string>('Overview');
const agentId = ref<string>('asdasd')
const isEnableBot = ref<boolean>(false)
const isEnableBotChat = ref<boolean>(false)


const items = [
  {
    id: '1',
    title: 'Enable Telegram Integration',
    content:
      'Enabling Telegram Integration allows the bot to communicate seamlessly in a chat room, even if the feature is turned off. When activated, the bot can still send messages, ensuring that key updates and notifications are delivered without interruption.',
    initiallyOpen: true,
  },
  {
    id: '2',
    title: 'Auto Responder',
    content:
      'Auto Responder is a system that automatically sends messages only to this channel according to the customer service operating hours. Admin can set the auto responder message when services are both during and outside the office hour.',
  },
];

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}
</script>

<template>
  <div class="flex flex-col gap-8 px-12 py-8">
    <div class="flex items-center justify-between">
      <router-link to="/" replace class="text-primary flex items-center gap-2 font-semibold">
        <BackIcon :size="20" />
        Integration
      </router-link>

      <router-link to="/" replace class="text-primary flex items-center gap-2 font-semibold">
        <HomeIcon :size="20" />
        Integration
      </router-link>
    </div>

    <div class="mx-auto flex w-11/12 flex-col gap-8">
      <div class="flex items-center gap-3">
        <img :src="CHANNEL_BADGE_URL.bot" alt="Telegram Logo" class="h-6 w-6" width="24" height="24" />
        <h2 class="text-xl font-semibold text-[#0A0A0A]">New Integration - Bot</h2>
      </div>

      <Banner>
        <p class="text-sm font-medium text-[#0A0A0A]">
          To learn more regarding Bot Integration, you can check this
          <a class="text-notification-link font-semibold underline"
            href="https://documentation.qiscus.com/omnichannel-chat/bot-integration" target="_blank">Documentation</a>.
        </p>
      </Banner>

      <Banner type="outline">
        <div class="text-sm text-[#0A0A0A] leading-5">
          <p>
            Setting the Bot Integration will send the bot message to all channels <span
              class="text-[#EB5757] font-semibold">except
              WhatsApp Channel</span>. You must
            activate the third-party on the WhatsApp channel if you want to use a bot system for your WhatsApp channel.
            To
            access the auto-responder channel, follow this step:
          </p>

          <ul class="mt-4 list-decimal list-inside">
            <li>Go to <span class="font-semibold">Integration Menu</span></li>
            <li>Choose your <span class="font-semibold">WhatsApp Channel</span></li>
            <li>Click <span class="font-semibold">Third-Party Integration</span></li>
            <li>Activate the toggle</li>
          </ul>
        </div>
      </Banner>

      <MainTab :tabs="['Overview', 'Settings']" v-model="activeTab" />

      <transition name="fade">
        <form @submit.prevent="" v-show="activeTab == 'Overview'" class="flex flex-col gap-8">
          <div class="bg-white rounded-lg shadow-[box-shadow:_0px_4px_12px_0px_#0A0A0A1A] p-6">
            <div>
              <h2 class="text-[#0A0A0A] font-semibold text-sm">Step 1</h2>
              <p class="text-[#A0A0A0] text-xs mt-2">Use this credential to set up Bot Integration.</p>
            </div>

            <div class="grid grid-cols-2 gap-x-8 gap-y-4 mt-4">
              <InputCustom v-model="agentId" label="Agent ID" disabled>
                <template #append-button>
                  <button class="flex gap-2 text-primary cursor-pointer" @click="copyToClipboard(agentId)">
                    Copy
                    <CopyIcon :size="18" />
                  </button>
                </template>
              </InputCustom>
              <InputCustom v-model="agentId" label="App ID" disabled>
                <template #append-button>
                  <button class="flex gap-2 text-primary cursor-pointer" @click="copyToClipboard(agentId)">
                    Copy
                    <CopyIcon :size="18" />
                  </button>
                </template>
              </InputCustom>
              <InputCustom v-model="agentId" label="Qiscus Secret Key" type="password" disabled></InputCustom>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-[box-shadow:_0px_4px_12px_0px_#0A0A0A1A] p-6">
            <div>
              <h2 class="text-[#0A0A0A] font-semibold text-sm">Step 2</h2>
              <p class="text-[#A0A0A0] text-xs mt-2">Paste this URL to Bot Platform. This URL is the base url for bot
                platform
                needs to hit. You can visit HERE to see the specific API and request payload that bot platform needs
                to
                make. Please note that the base url for this request is in the section below.</p>
            </div>
            <div class="mt-4">
              <InputCustom v-model="agentId" disabled>
                <template #append-button>
                  <button class="flex gap-2 text-primary cursor-pointer" @click="copyToClipboard(agentId)">
                    Copy
                    <CopyIcon :size="18" />
                  </button>
                </template>
              </InputCustom>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-[box-shadow:_0px_4px_12px_0px_#0A0A0A1A] p-6">
            <div>
              <h2 class="text-[#0A0A0A] font-semibold text-sm">Step 3</h2>
              <p class="text-[#A0A0A0] text-xs mt-2">Input bot webhook URL generated by Bot Platform here. This
                endpoint
                will get
                request hit by Qiscus Omnichannel Chat. You can visit <a
                  class="text-notification-link font-semibold underline"
                  href="https://documentation.qiscus.com/omnichannel-chat/bot-human-collaboration#step-2--webhook-from-qiscus-omnichannel-chat"
                  target="_blank">HERE</a> to see how the payload of the request looks like.
              </p>
            </div>

            <div class="mt-4">
              <InputCustom v-model="agentId">
              </InputCustom>
            </div>
          </div>

          <div class="flex justify-end gap-4">
            <Button type="submit">Connect</Button>
          </div>
        </form>
      </transition>


      <transition name="fade">
        <CollapsibleGroup :items="items" v-show="activeTab == 'Settings'">
          <template #item-id-1="{ item }">
            <div class="flex justify-between gap-8 text-sm text-[#565656]">
              <div v-html="item.content"></div>
              <div>
                <Switch variant="success" v-model="isEnableBot" size="medium" />
              </div>
            </div>
          </template>
          <template #item-id-2="{ item }">
            <div class="flex justify-between gap-8 text-sm text-[#565656]">
              {{ item.content }}
              <div>
                <Switch variant="success" size="medium" v-model="isEnableBotChat" />
              </div>
            </div>
          </template>
        </CollapsibleGroup>
      </transition>
    </div>
  </div>
</template>

<style scoped>
/* Define the transition properties for both entering and leaving */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
  /* Adjust duration and easing as needed */
}

/* Starting state for entering, and ending state for leaving */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>