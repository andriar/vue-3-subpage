<script setup lang="ts">
import InboxIcon from '../icons/InboxIcon.vue';
import IntegrationIcon from '../icons/IntegrationIcon.vue';
</script>

<template>
  <nav
    class="bg-primary fixed z-[998] flex h-screen w-72 flex-col items-center rounded-tr-2xl rounded-br-2xl text-white shadow-lg delay-500 duration-200 ease-linear hover:w-72"
  >
    <router-link to="/" class="text-lg font-bold">My App</router-link>
    <ul class="flex w-full flex-col gap-2.5">
      <li>
        <router-link to="/inbox">
          <div
            class="mr-5 flex h-10 items-center rounded-tr-4xl rounded-br-4xl pl-5 text-white hover:bg-[#ffffff33]"
          >
            <InboxIcon class="mr-2 inline-block min-w-10" />
          </div>
          <span>Inbox</span>
        </router-link>
      </li>
      <li>
        <router-link to="/">
          <div
            class=":focus-visible:bg-[#ffffff] mr-5 flex h-10 items-center rounded-tr-4xl rounded-br-4xl pl-5 text-white hover:bg-[#ffffff33]"
          >
            <IntegrationIcon class="mr-2 inline-block min-w-10" />
          </div>
          <span>Integration</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>
