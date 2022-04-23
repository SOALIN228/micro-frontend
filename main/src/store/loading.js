import { ref } from 'vue'

export const loadingStatus = ref(true)

export const changeLoading = type => {
  loadingStatus.value = type
}
