import * as orderService from '@/services/order.service'

export const createOrder = async (ctx, body) => {
  try {
    const data = await orderService.create(body)
    return data
  } catch (err) {
    console.log(err)
    return false
  }
}

export default {
  createOrder,
}
