import { defineStore } from 'pinia'
import { TreeNode } from '@/classes/TreeNode'

export const useTreeStore = defineStore('tree', {
  state: () => ({
    tree: []
  }),
  getters: {},
  actions: {
    create(data) {
      this.tree.push(new TreeNode(data))
    },
    removeById(nodeId) {
      this.tree = this.tree.filter(({ id }) => id !== nodeId)
    }
  }
})
