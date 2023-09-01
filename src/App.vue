<script setup>
  import { reactive } from 'vue';

  import {useTreeStore} from '@/stores/treeStore.js';
  const treeStore = useTreeStore();

  import {NSpace, NCard, NInput, NCheckbox, NButton, NIcon, } from 'naive-ui';
  import {AddCircle32Regular} from '@vicons/fluent';
  import ListItem from '@/components/ListItem.vue';

  const form = reactive({
    name: '',
    isFile: false
  })

  const add = () => {
    treeStore.create(form)
    form.name = ''
    form.isFile = false
  }

</script>

<template>
  <main class="main">
    <n-space vertical>

      <n-card title="Add new item" size="medium">
        <n-input v-model:value="form.name" type="text" placeholder="Name" style="margin-bottom: 1rem;" />
        <n-checkbox v-model:checked="form.isFile">
          Is file?
        </n-checkbox>
        <n-button type="info" @click="add">
          <n-icon size="22" style="margin-right: 4px;">
            <AddCircle32Regular />
          </n-icon>
          Add
        </n-button>
      </n-card>
    </n-space>


    <ListItem
      v-for="node in treeStore.tree"
      :key="node.id"
      :node="node"
    />

  </main>
</template>

<style scoped>
.main {
  max-width: 1024px;
  padding: 24px 12px;
  margin: auto;
}
</style>
