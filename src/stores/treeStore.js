import { defineStore } from 'pinia';
import { TreeNode } from '@/classes/TreeNode';

export const useTreeStore = defineStore(
  'tree',
  {
    state: () => ( {
      tree: [],
    }),
    getters: {

    },
    actions: {
      create(data) {
        this.tree.push( new TreeNode(data) )
      }
    }
  }
)