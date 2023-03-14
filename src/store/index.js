import { create } from 'zustand';
import axios from 'axios';
import { persist, devtools, } from 'zustand/middleware';


const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });

let imageStore = (set) => ({
  images: {},
  loading: true,
  error: null,
  fetchImages: async () => {
    try {
      const { data } = await axiosInstance({
        method: 'get',
        url: '/images'
      })

      set({
        loading: false,
        images: data.images,
        error: null
      })
    } catch (err) {
      set({
        error: err,
        loading: false
      })
    }
  }
})


imageStore = devtools(imageStore)
imageStore = persist(imageStore, { name: 'images' })


export const useImageStore = create(imageStore)



let singleImage = (set) => ({
  image: {},
  loading: true,
  error: null,
  option1: '',
  option2: '',
  option3: '',
  option4: '',
  correctAns: '',

  fetchImage: async (id) => {
    try {
      const { data } = await axiosInstance({
        method: 'get',
        url: `/image/${id}`
      })
      set({
        loading: false,
        image: data.data.img,
        option1: data.data.option1,
        option2: data.data.option2,
        option3: data.data.option3,
        option4: data.data.option4,
        correctAns: data.data.correctAns,
        error: null
      })
    } catch (err) {
      set({
        error: err,
        loading: false
      })
    }
  }
})

export const useSingleImageStore = create(singleImage)

let tokenStore = (set) => ({
  token: null,
  loading: false,
  error: null,

  fetchSignUp: async (name, email, password) => {
    try {
      const { data } = await axiosInstance({
        method: 'post',
        url: 'signup',
        data: {
          name,
          email,
          password
        }
      })

      set({
        loading: false,
        token: data.token,
        error: null
      })
    } catch (err) {
      set({
        error: err.errMessage,
        token: null,
        loading: true
      })
    }
  },
  fetchLogin: async (email, password) => {
    try {
      const { data } = await axiosInstance({
        method: 'post',
        url: '/login',
        data: {
          email,
          password
        }
      })

      set({
        loading: false,
        token: data.token,
        error: null
      })
    } catch (err) {
      set({
        error: err.errMessage,
        token: null,
        loading: true
      })
    }
  }
})

tokenStore = persist(tokenStore, { name: 'token' })
export const useTokenStore = create(tokenStore)