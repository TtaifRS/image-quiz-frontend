import { create } from 'zustand';
import axios from 'axios';
import { persist, devtools, } from 'zustand/middleware';


const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });

let imageStore = (set) => ({
  images: {},
  loading: true,
  error: null,
  ids: [],
  fetchImages: async () => {
    try {
      const { data } = await axiosInstance({
        method: 'get',
        url: '/images'
      })

      const imageId = data.images.map(image => (image._id))


      set({
        loading: false,
        images: data.images,
        ids: imageId,
        error: null,

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

let quizStore = (set) => ({
  steps: 0,
  maxStep: 0,
  idAns: [],
  increaseStep: (prev) => {
    set({
      steps: prev + 1
    })
  },
  resetSteps: () => {
    set({
      steps: 0
    })
  },
  setMaxStep: (length) => {
    set({
      maxStep: length
    })
  },
  setIdAns: (current) => {
    set((state) => ({
      idAns: [...state.idAns, current]
    }))
  },
  resetIdAns: () => {
    set({
      idAns: []
    })
  }
})

quizStore = devtools(quizStore)
quizStore = persist(quizStore, { name: 'quiz' })
export const useQuizStore = create(quizStore)

let results = (set) => ({
  allImages: [],
  loading: true,
  error: null,
  correctAns: [],

  fetchAllImages: async (ans) => {
    try {
      const { data } = await axiosInstance({
        method: 'get',
        url: '/all/images'
      })
      let correctArray = []
      if (data.success) {
        data.images.map((item) => correctArray.push(item.correctAns))
      }


      set({
        loading: false,
        allImages: data.images,
        correctAns: correctArray,
        error: null,

      })
    } catch (err) {
      set({
        error: err,
        loading: false
      })
    }
  }
})

results = devtools(results)
export const useResultStore = create(results)

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