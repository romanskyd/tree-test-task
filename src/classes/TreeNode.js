import { v4 as uuidv4 } from 'uuid'

class TreeNode {
  constructor({ name = '', isFile = false, isRoot = false }) {
    this.id = uuidv4()
    this.name = name
    this.isOpen = false
    this.children = []
    this.isFile = isFile
    this.isRoot = isRoot
  }

  toggle() {
    this.isOpen = !this.isOpen
  }

  saveNewName(newName) {
    this.name = newName
  }

  addChild(childNode) {
    this.children.push(childNode)
  }

  removeChildById(childId) {
    this.children = this.children.filter(({ id }) => id !== childId)
  }
}

export { TreeNode }
