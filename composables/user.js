//共享状态 
import {
  acceptHMRUpdate,
  defineStore
} from 'pinia'

export const useUserStore = defineStore('user', () => {
  /**
   * Current named of the user.
   */
  const savedName = ref('')
  const previousNames = ref(new Set())

  const usedNames = computed(() => Array.from(previousNames.value))
  const otherNames = computed(() => usedNames.value.filter(name => name !== savedName.value))

  /**
   * Changes the current name of the user and saves the one that was used
   * before.
   *
   * @param name - new name to set
   */
  function setNewName(name) {
    if (savedName.value)
      previousNames.value.add(savedName.value)

    savedName.value = name
  }

  return {
    setNewName,
    otherNames,
    savedName,
  }
})

if (
  import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore,
    import.meta.hot))