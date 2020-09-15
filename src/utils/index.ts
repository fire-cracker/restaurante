export const errorHandler = (payload: any): any => {
  if (payload && payload.status) {
    switch (payload.status) {
      case 500:
        return payload.data.message
      default:
        return payload.data.data.message
    }
  }
}
