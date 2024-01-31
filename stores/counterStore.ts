
import {defineStore} from "pinia"

export const useCounterStore = defineStore('counter', () => {
  const count = ref(125)
  function increment() {
    count.value++
  }
  const doubleCount = computed(() => count.value * 2)

  return { count, increment, doubleCount }
})

export const useSelectedCategory = defineStore('current_category', () => {

  const selectedCategory = "About";
  return { selectedCategory } ;

})