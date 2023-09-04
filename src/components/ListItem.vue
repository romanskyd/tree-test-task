<script setup>
  import { ref, computed } from 'vue';
  import { TreeNode } from '@/classes/TreeNode';
  import {useTreeStore} from '@/stores/treeStore.js';
  const treeStore = useTreeStore();

  import ListItem from '@/components/ListItem.vue';
  import {
    NCollapseTransition,
    NButton,
    NIcon,
    NInput,
    NSpace
  } from 'naive-ui';
  import {
    Document32Regular,
    Folder32Regular,
    ArrowCircleLeft32Regular,
    ArrowCircleDown32Regular,
    Delete28Regular,
    AddCircle32Regular,
    CheckmarkCircle24Regular,
    DismissCircle16Regular
  } from '@vicons/fluent';

  const isEdit = ref(false)
  const changedName = ref('')
  const props = defineProps([ 'node' ])
  const emit = defineEmits(['remove-child'])
  const node = computed(() => props.node)
  const name = computed(() => props.node.name)

  const switchToRename = () => {
    changedName.value = name.value
    isEdit.value = true
  }

  const removeChild = (childId) => {
    node.value.removeChildById(childId)
  }

  const remove = () => {
    console.log( 'REMOVE' )
    if (node.value.isRoot) {
      treeStore.removeById(node.value.id)
    }
    emit('remove-child', node.value.id)
  }

  const inputBlurHandler = () => {
    node.value.saveNewName(changedName.value)
    isEdit.value = false
  }

  const addChild = () => {
    node.value.addChild( new TreeNode({
      name: 'Child'
    }) )
  }
</script>

<template>
  <div class="list-item">

    <n-space align="center" justify="space-between">
      <n-space align="center" style="flex-grow: 1;">
        <n-icon size="28" style="margin-right: 4px;">
          <Document32Regular v-if="node.isFile" />
          <Folder32Regular v-else />
        </n-icon>
        <div
          class="list-item__name"
          @click="switchToRename"
          v-if="isEdit === false"
        >
          {{ name }}
        </div>
        <template v-else>
          <n-input
            size="small"
            v-model:value="changedName"
            type="text"
            placeholder="Set new name"
            @blur="inputBlurHandler"
          />
          <n-button tertiary circle type="warning" @click="isEdit = false">
            <template #icon>
              <n-icon>
                <DismissCircle16Regular />
              </n-icon>
            </template>
          </n-button>
          <n-button tertiary circle type="success" @click="inputBlurHandler">
            <template #icon>
              <n-icon>
                <CheckmarkCircle24Regular />
              </n-icon>
            </template>
          </n-button>
        </template>

      </n-space>


      <n-space>
        <template v-if="!node.isFile">
          <n-button tertiary circle type="info" @click="node.toggle()" v-if="node.children.length > 0">
            <template #icon>
              <n-icon>
                <ArrowCircleDown32Regular v-if="node.isOpen" />
                <ArrowCircleLeft32Regular v-else />
              </n-icon>
            </template>
          </n-button>
          <n-button tertiary circle type="success" @click="addChild">
            <template #icon>
              <n-icon>
                <AddCircle32Regular />
              </n-icon>
            </template>
          </n-button>
        </template>

        <n-button tertiary circle type="warning" @click="remove">
          <template #icon>
            <n-icon>
              <Delete28Regular />
            </n-icon>
          </template>
        </n-button>
      </n-space>
    </n-space>

    <n-collapse-transition :show="node.isOpen">
      <ListItem
        v-for="childNode in node.children"
        :key="childNode.id"
        :node="childNode"
        @remove-child="removeChild"
      />
    </n-collapse-transition>

  </div>
</template>

<style lang="scss">
  .list-item {
    padding: 12px 16px;
    font-size: 1rem;
    &:not(:first-child) {
      margin-top: 4px;
    }
    &__name {
      margin-right: auto;
    }
    &__content {
      display: flex;
    }
  }
</style>