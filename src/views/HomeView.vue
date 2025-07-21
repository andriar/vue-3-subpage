tabs
<script setup lang="ts">
import { onMounted, ref } from 'vue';

import Drawer from '@/components/common/Drawer.vue';
import Modal from '@/components/common/Modal.vue';
import Select from '@/components/form/Select.vue';
import { BroadcastIcon } from '@/components/icons';
import CloseIcon from '@/components/icons/CloseIcon.vue';
import AttentionGrabber from '@/components/ui/widget-preview/AttentionGrabber.vue';
import ChannelList from '@/components/ui/widget-preview/ChannelList.vue';
import ChannelListLoading from '@/components/ui/widget-preview/ChannelListLoading.vue';
import ChatFormLoading from '@/components/ui/widget-preview/ChatFormLoading.vue';
import LoginForm from '@/components/ui/widget-preview/LoginForm.vue';
import LoginFormLoading from '@/components/ui/widget-preview/LoginFormLoading.vue';
import WelcomingPage from '@/components/ui/widget-preview/WelcomingPage.vue';
import WelcomingPageLoading from '@/components/ui/widget-preview/WelcomingPageLoading.vue';
import { useSweetAlert } from '@/composables/useSweetAlert';
import { CHANNEL_BADGE_URL } from '@/utils/constant/channels';

import Badge from '../components/common/Badge.vue';
import Banner from '../components/common/Banner.vue';
import Button from '../components/common/Button.vue';
import Checkbox from '../components/common/Checkbox.vue';
import Collapsible from '../components/common/Collapsible.vue';
import CollapsibleGroup from '../components/common/CollapsibleGroup.vue';
import Switch from '../components/common/Switch.vue';
import MainTab from '../components/common/Tabs/MainTab.vue';
import SubTab from '../components/common/Tabs/SubTab.vue';
import Input from '../components/form/Input.vue';
import InputCustom from '../components/form/InputCustom.vue';
import Icon from '../components/icons/Icon.vue';
import { apiV2 } from '../utils/axios';

const handleClick = () => {
  console.log('Button clicked');
};

const isChecked = ref(false);

const activeTab = ref('Tab 1');
const pokemonDetail = ref<any>({});
const pokemon = ref<any[]>([]);
async function getPokemon() {
  const data = await apiV2.get<any>('/pokemon?limit=10&offset=0');
  pokemon.value = data.data?.results || [];
}

async function getPokemonDetail(url: string) {
  const data = await apiV2.get<any>(url);
  pokemonDetail.value = data.data || {};
}

const inputValue = ref('');
const isChecked2 = ref(false);

const faqItems = ref([
  {
    id: 'faq-1',
    title: 'What is your refund policy?',
    content:
      '<p class="text-gray-700">Our refund policy allows returns within 30 days of purchase. Please see our full terms for more details.</p>',
    initiallyOpen: true,
  },
  {
    id: 'faq-2',
    title: 'How do I contact support?',
    content:
      '<p class="text-gray-700">You can contact our support team via email at support@example.com or by calling 1-800-555-1234.</p>',
  },
  {
    id: 'faq-3',
    title: 'Can I change my password?',
    content:
      '<p class="text-gray-700">Yes, you can change your password from your account settings page.</p>',
  },
]);

const tabs = [
  {
    id: 'tab-1',
    label: 'Tab 1',
    icon: BroadcastIcon,
    children: [
      {
        id: 'tab-1-1',
        label: 'Tab 1 Apa Yaa',
        icon: CloseIcon,
      },
      {
        id: 'tab-1-2',
        label: 'Tab 2',
        icon: CloseIcon,
      },
    ],
  },
  {
    id: 'tab-2',
    label: 'Tab 2',
    icon: BroadcastIcon,
  },
  {
    id: 'tab-3',
    label: 'Tab 3',
    icon: BroadcastIcon,
    children: [
      {
        id: 'tab-3-1',
        label: 'Tab 1',
        icon: CloseIcon,
      },
      {
        id: 'tab-3-2',
        label: 'Tab 2',
        icon: CloseIcon,
      },
    ],
  },
];
const subTabsActive = ref<any>(tabs[0]);

const isDrawerOpen = ref<boolean>(false); // Explicitly type ref
const isModalOpen = ref<boolean>(false); // Explicitly type ref

const toggleDrawer = (): void => {
  isDrawerOpen.value = !isDrawerOpen.value;
};

const toggleModal = (): void => {
  isModalOpen.value = !isModalOpen.value;
};

const showAlertWarning = () => {
  const { showAlert } = useSweetAlert();
  showAlert
    .warning({
      title: 'Lorem ipsum dolor',
      text: 'Lorem ipsum dolor sit amet consectetur. Mauris tortor non mi nisl. Fermentum augue morbi nunc sit et nisi. Urna tellus venenatis sed euismod sit eget urna. Volutpat quis varius magna nec sed ridiculus.',
      confirmButtonText: 'Update Live Chat',
      cancelButtonText: 'Cancel',
      showCancelButton: true,
    })
    .then((result) => {
      console.log(result);
    });
};

const showAlertError = () => {
  const { showAlert } = useSweetAlert();
  showAlert
    .error({
      title: 'Lorem ipsum dolor',
      text: 'Lorem ipsum dolor sit amet consectetur. Mauris tortor non mi nisl. Fermentum augue morbi nunc sit et nisi. Urna tellus venenatis sed euismod sit eget urna. Volutpat quis varius magna nec sed ridiculus.',
      confirmButtonText: 'Update Live Chat',
      showCancelButton: false,
    })
    .then((result) => {
      console.log(result);
    });
};

const showAlertSuccess = () => {
  const { showAlert } = useSweetAlert();
  showAlert
    .success({
      title: 'Lorem ipsum dolor',
      text: 'Lorem ipsum dolor sit amet consectetur. Mauris tortor non mi nisl. Fermentum augue morbi nunc sit et nisi. Urna tellus venenatis sed euismod sit eget urna. Volutpat quis varius magna nec sed ridiculus.',
      showCancelButton: false,
    })
    .then((result) => {
      console.log(result);
    });
};

const selectedValue = ref('');

onMounted(() => {
  getPokemon();
});
</script>

<template>
  <div class="home">
    <h1 class="text-3xl font-bold underline">Home Page</h1>
    <p class="mt-4 text-gray-600">
      Welcome to the home page of your Vue 3 + TypeScript + Vue Router application!
    </p>
    <div class="mt-4 flex justify-center gap-4">
      <Button id="btn" @click="handleClick" intent="primary">Click me</Button>
      <Button id="btn" intent="primary" disabled>Click me</Button>
      <Button id="btn" intent="secondary">Click me</Button>
      <Button id="btn" intent="secondary" disabled>Click me</Button>
      <Button id="btn" intent="danger">Click me</Button>
      <Button id="btn" intent="danger" disabled>Click me</Button>
    </div>

    <div class="mt-4 flex justify-center gap-4">
      <Button id="btn" intent="primary" shape="rectangular">Click me</Button>
      <Button id="btn" intent="primary" shape="rectangular" disabled>Click me</Button>
      <Button id="btn" intent="secondary" shape="rectangular">Click me</Button>
      <Button id="btn" intent="secondary" shape="rectangular" disabled>Click me</Button>
      <Button id="btn" intent="danger" shape="rectangular">Click me</Button>
      <Button id="btn" intent="danger" shape="rectangular" disabled>Click me</Button>
    </div>

    <div class="mt-4 flex justify-center gap-4">
      <Button id="btn" intent="flat" shape="rounded" to="/about">Click me</Button>
      <Button id="btn" intent="flat" shape="rounded" to="/about" disabled>Click me</Button>
      <Button id="btn" intent="flat" shape="rounded" to="/about">Click me</Button>
      <Button id="btn" intent="flat" shape="rounded" to="/about" disabled>Click me</Button>
      <Button id="btn" intent="flat" shape="rounded" to="/about">Click me</Button>
    </div>

    <div class="mt-4 flex justify-center gap-4">
      <Switch v-model="isChecked" variant="success" aria-label="Success switch" />
      <Switch v-model="isChecked" variant="warning" aria-label="Warning switch" />
      <Switch v-model="isChecked" variant="danger" aria-label="Danger switch" />
      <Switch v-model="isChecked" variant="default" aria-label="Default switch" />
    </div>

    <div>
      <MainTab :tabs="['Tab 1', 'Tab 2', 'Tab 3']" v-model="activeTab" />
    </div>

    <div class="mt-4">
      <SubTab :tabs="tabs" v-model="subTabsActive" />
    </div>

    <div class="mt-4 flex flex-col gap-4 text-left text-sm font-medium">
      <Banner intent="positive" closeable>
        <div>
          To learn more regarding Line Messenger Integration, you can check this Documentation.
        </div>
      </Banner>

      <Banner intent="negative" closeable>
        <div>
          To learn more regarding Line Messenger Integration, you can check this Documentation.
        </div>
      </Banner>

      <Banner intent="warning" closeable>
        <div>
          To learn more regarding Line Messenger Integration, you can check this Documentation.
        </div>
      </Banner>

      <Banner intent="positive" type="outline" closeable>
        <div>
          To learn more regarding Line Messenger Integration, you can check this Documentation.
        </div>
      </Banner>

      <Banner intent="negative" type="outline" closeable>
        <div>
          To learn more regarding Line Messenger Integration, you can check this Documentation.
        </div>
      </Banner>

      <Banner intent="warning" type="outline" closeable>
        <div>
          To learn more regarding Line Messenger Integration, you can check this Documentation.
        </div>
      </Banner>
    </div>

    <div class="mt-4 text-left">
      <Input v-model="inputValue" placeholder="Enter your name" />
      <Input v-model="inputValue" placeholder="Enter your name" disabled />
      <Input v-model="inputValue" placeholder="Enter your name" error errorMessage="This is an error message" />
    </div>

    <div class="mt-4 flex w-full flex-col gap-4 text-left">
      <InputCustom v-model="inputValue" placeholder="Enter your name" clearable disabled>
        <template #suffix-icon>
          <Icon name="search" />
        </template>
      </InputCustom>
      <InputCustom v-model="inputValue" placeholder="Enter your name" type="text" clearable>
        <template #suffix-icon>
          <Icon name="eye" />
        </template>
        <template #append-button>
          <span>Copy</span>
          <Icon name="copy" class="text-primary h-4 w-4" />
        </template>
      </InputCustom>
      <InputCustom v-model="inputValue" placeholder="Enter your name" type="text" clearable />
      <InputCustom v-model="inputValue" placeholder="Enter your name" type="text" clearable
        errorMessage="This is an error message" error />
    </div>

    <div class="mt-4 flex flex-col gap-2 text-left">
      <Checkbox id="checkbox-1" v-model="isChecked2" label="Checkbox" />
      <Checkbox id="checkbox-2" v-model="isChecked2" label="Checkbox" disabled />
    </div>

    <div class="mt-4">
      <Collapsible>
        <template #title> Auto Responder </template>
        <p class="text-gray-700">
          This is the content for the auto-responder settings. You can put any HTML elements here.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </p>
      </Collapsible>
    </div>

    <div class="mt-4">
      <CollapsibleGroup :items="faqItems" />
    </div>

    <div class="mt-4">
      <ul class="flex flex-wrap gap-4">
        <li v-for="p in pokemon" :key="p.name">
          <Badge @click="getPokemonDetail(p.url)" intent="danger" size="medium" :disabled="true">
            {{ p.name }}
          </Badge>
        </li>
      </ul>
      <div v-if="pokemonDetail && Object.keys(pokemonDetail).length > 0" class="mt-4 rounded-lg bg-white p-4 shadow-md">
        <h1 class="mb-4 text-2xl font-bold capitalize">{{ pokemonDetail.name }}</h1>

        <img :src="pokemonDetail?.sprites?.back_default" :alt="pokemonDetail.name" class="mx-auto rounded-lg shadow-sm"
          width="150" height="150" />

        <div v-if="pokemonDetail?.abilities" class="mt-6">
          <h3 class="mb-2 text-xl font-semibold">Abilities</h3>
          <ul class="flex flex-wrap justify-center gap-2">
            <li v-for="a in pokemonDetail?.abilities" :key="a?.ability?.name"
              class="rounded-full bg-gray-100 px-3 py-1 text-gray-700 capitalize">
              {{ a?.ability?.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="mt-4">
      <Button id="btn" intent="primary" @click="toggleDrawer">Open Drawer</Button>
    </div>

    <Drawer :isOpen="isDrawerOpen" @close="toggleDrawer" />

    <div class="mt-4">
      <Button id="btn" intent="primary" @click="showAlertWarning">Show Alert Warning</Button>
      <Button id="btn" intent="primary" @click="showAlertError">Show Alert Error</Button>
      <Button id="btn" intent="primary" @click="showAlertSuccess">Show Alert Success</Button>
    </div>

    <div class="mt-4">
      <Button id="btn" intent="primary" @click="toggleModal">Open Modal</Button>
      <Modal :isOpen="isModalOpen" @close="toggleModal" width="w-[900px]">
        <template #title> Preview Your Qiscus Live Chat </template>
        <template #content>
          <p v-for="n in 100" :key="n">asd</p>
        </template>
      </Modal>
    </div>

    <div class="mt-4 text-left">
      <Select label="Select an option" :options="[
        { value: '1', text: 'Option 1' },
        { value: '2', text: 'Option 2' },
        { value: '3', text: 'Option 3' },
      ]" v-model="selectedValue" />
      <Select :options="[
        { value: '1', text: 'Option 1' },
        { value: '2', text: 'Option 2' },
        { value: '3', text: 'Option 3' },
      ]" v-model="selectedValue" error errorMessage="This is an error message" />
      <Select :options="[
        { value: '1', text: 'Option 1' },
        { value: '2', text: 'Option 2' },
        { value: '3', text: 'Option 3' },
      ]" v-model="selectedValue" disabled />
    </div>

    <div class="mt-4 flex flex-shrink-0 flex-wrap gap-4 text-left">
      <WelcomingPage :imageUrl="pokemonDetail?.sprites?.back_default" :title="pokemonDetail?.name"
        :subtitle="pokemonDetail?.name" :actions="[
          {
            label: 'Ask for Questions',
            iconUrl: '',
          },
        ]" />
      <WelcomingPageLoading />
      <AttentionGrabber
        image-url="https://fastly.picsum.photos/id/1/5000/3333.jpg?hmac=Asv2DU3rA_5D1xSe22xZK47WEAN0wjWeFOhzd13ujW4"
        title="Hello, there is Promo!" />
      <ChannelList
        imageUrl="https://fastly.picsum.photos/id/1/5000/3333.jpg?hmac=Asv2DU3rA_5D1xSe22xZK47WEAN0wjWeFOhzd13ujW4"
        title="Hello, there is Promo!" subtitle="Welcome to Qiscus!" introduction="Welcome to Qiscus!" :channels="[
          {
            label: 'WhatsApp',
            iconUrl: CHANNEL_BADGE_URL.whatsapp,
          },
          {
            label: 'Instagram',
            iconUrl: CHANNEL_BADGE_URL.instagram,
          },

          {
            label: 'TikTok',
            iconUrl: CHANNEL_BADGE_URL.tiktok,
          },
        ]" />
      <ChannelListLoading />
      <LoginForm title="Hello there," subtitle="Welcome to Qiscus!"
        description="Please fill the details below before chatting with us!" />
      <LoginFormLoading title="Hello there," subtitle="Welcome to Qiscus!"
        description="Please fill the details below before chatting with us!" />

      <ChatFormLoading />
    </div>
  </div>
</template>

<style scoped>
.home {
  padding: 2rem;
  text-align: center;
}
</style>
