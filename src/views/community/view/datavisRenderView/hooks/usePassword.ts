// usePassword.ts

export function usePassword(props: { password: any }) {
  const { password } = props
  const sendPassword = () => {
    //没有配置,直接返回
    if (!password) {
      return false
    }
    if (password.enable) {
      if (sessionStorage.getItem('DATAVIS_PASSWORD') !== password.password) {
        return true
      }
      return false
    }
  }

  return {
    sendPassword
  }
}
