import { onMounted } from 'vue'

type Settings = {
  confirmNotice: 'ok' | 'ng'
}

const settingKeys = {
  confirmNotice: 'confirm_notice'
}

export const useSession = () => {
  onMounted(() => {
    if (!getConfirmNoticeStatus()) {
      initSession()
    }
  })

  const initSession = () => {
    sessionStorage.setItem(settingKeys.confirmNotice, 'ng')
  }

  const getConfirmNoticeStatus = (): Settings['confirmNotice'] => {
    return (
      (sessionStorage.getItem(
        settingKeys.confirmNotice
      ) as Settings['confirmNotice']) ?? 'ng'
    )
  }

  const isConfirmNotice = (): boolean => {
    return getConfirmNoticeStatus() === 'ok'
  }

  const setConfirmNoticeStatus = () => {
    sessionStorage.setItem(settingKeys.confirmNotice, 'ok')
  }

  return {
    initSession,
    getConfirmNoticeStatus,
    setConfirmNoticeStatus,
    isConfirmNotice
  }
}
