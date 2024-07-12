import axios from 'axios'

const instance = axios.create({
  baseURL: `https://64b4c8450efb99d862694609.mockapi.io`
})

export default instance
