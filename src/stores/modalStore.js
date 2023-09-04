import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
  state: () => ({
    modalVisibleList: {}
  }),
  getters: {
    isModalOpened() {
      return (modalName) => !!this.modalVisibleList[modalName]
    },
    getModalVisibleList() {
      return this.modalVisibleList
    }
  },
  actions: {
    open({ modalName, data = {} }) {
      this.modalVisibleList[modalName] = data
    },
    close(modalName) {
      delete this.modalVisibleList[modalName]
    }
  }
})
