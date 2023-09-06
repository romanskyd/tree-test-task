<script setup>
import {reactive} from 'vue';
import ModalNames from '@/shared/modal-names.enum';
import {
  NModal,
  NSpace,
  NCard,
  NInput,
  NRadioGroup,
  NRadioButton
} from 'naive-ui';

import {useModalStore} from '@/stores/modalStore';
const modalStore = useModalStore();

const form = reactive({
  name: '',
  isFile: false,
})

const modalClose = () => {
  form.name = ''
  form.isFile = false
  modalStore.close(ModalNames.CREATE_NODE)
}

const onPositiveClick = () => {
  if (!form.name) return

  const data = modalStore.getModalVisibleList[ModalNames.CREATE_NODE]
  if (data && typeof data.callback === 'function') {
    data.callback(form)
  }

  modalClose()
}

const onNegativeClick = () => {
  modalClose()
}

const tabs = [
  {
    key: 'folder',
    value: false,
    label: 'Folder'
  },
  {
    key: 'file',
    value: true,
    label: 'File'
  },
]

</script>

<template>
  <n-modal
    :show="modalStore.isModalOpened(ModalNames.CREATE_NODE)"
    :mask-closable="false"
    preset="dialog"
    title="Dialog"
    content="Are you sure?"
    positive-text="Confirm"
    negative-text="Cancel"
    @positive-click="onPositiveClick"
    @negative-click="onNegativeClick"
    @close="onNegativeClick"
  >
    <n-space vertical>
      <n-radio-group v-model:value="form.isFile" name="radiobuttongroup1">
        <n-radio-button
          v-for="tab in tabs"
          :key="tab.key"
          :value="tab.value"
          :label="tab.label"
        />
      </n-radio-group>
      <n-card title="Add new item" size="medium">
        <n-input v-model:value="form.name" type="text" placeholder="Name" style="margin-bottom: 1rem;" />
      </n-card>
    </n-space>
  </n-modal>
</template>
