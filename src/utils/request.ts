// resultError, resultSuccess, getRequestToken

export function getRequestToken() {
  return '1231fa231adasdg23fsf123afsfsfasd1'
}

export function resultSuccess(data: object) {
  return {
    data,
    code: '200',
    messagge: '成功',
  }
}

export function resultError(messgae: string) {
  return {
    code: '500',
    messgae,
    data: {},
  }
}
