<script setup>
  import {NButton, NDialogProvider} from 'naive-ui';

  import DefaultList from '@/components/DefaultList.vue';
  import DefaultModal from '@/components/DefaultModal.vue';

  import {useModalStore} from '@/stores/modalStore';
  const modalStore = useModalStore();
  import {useTreeStore} from '@/stores/treeStore';
  const treeStore = useTreeStore();

  import ModalNames from '@/shared/modal-names.enum';

  const openModal = () => {
    modalStore.open({ modalName: ModalNames.CREATE_NODE, data: {
      callback: form => treeStore.create({...form, isRoot: true})
    } })
  }
</script>

<template>
  <n-dialog-provider>
    <main class="main">
      <n-button @click="openModal">Add root item</n-button>
      <DefaultList />
    </main>
    <DefaultModal />
  </n-dialog-provider>
</template>

<style scoped>
.main {
  max-width: 1024px;
  padding: 24px 12px;
  margin: auto;
}
</style>
