export const validatePassword = () => {
  return (
    _rule: any,
    value: string,
    callback: (arg0?: Error | undefined) => void,
  ) => {
    if (value.length < 6) {
      callback(new Error('密码长度不能小于6位'))
    } else {
      callback()
    }
  }
}
