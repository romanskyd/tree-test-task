<script setup>
  import {NSpace} from 'naive-ui';
  import ListItem from '@/components/ListItem.vue';

  import {useTreeStore} from '@/stores/treeStore.js';
  const treeStore = useTreeStore();
</script>

<template>
  <n-space vertical style="padding: 1.5rem 0;">
    <ListItem
      v-for="node in treeStore.tree"
      :key="node.id"
      :node="node"
    />
  </n-space>
</template>