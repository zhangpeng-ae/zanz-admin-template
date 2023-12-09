import { defineStore } from 'pinia'
export const useUserStore = defineStore('user', {
  state: () => ({
    name: 'Evan You',
    age: 18,
  }),
  getters: {
    getNameWithAge(): string {
      return `${this.name} - ${this.age}`
    },
  },
  actions: {
    setName(name: string) {
      this.name = name
    },
    setAge(age: number) {
      this.age = age
    },
  },
})
