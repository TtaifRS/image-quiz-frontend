import React, { useEffect, useState } from 'react'
import { ImageList, ImageListItem, Button, Box } from "@mui/material"
import { Link } from 'react-router-dom'
import { Buffer } from 'buffer'
import { useImageStore, useQuizStore, useTokenStore } from '../store'
import FileInput from '../sections/FileInput'

const Images = () => {
  const ids = useImageStore((state) => state.ids)
  const images = useImageStore((state) => state.images)
  const fetchImages = useImageStore((state) => state.fetchImages)
  const loading = useImageStore((state) => state.loading)
  const error = useImageStore((state) => state.error)
  const token = useTokenStore((state) => state.token)
  const steps = useQuizStore((state) => state.steps)
  const maxStep = useQuizStore((state) => state.maxStep)
  const increaseStep = useQuizStore((state) => state.increaseStep)
  const setMaxStep = useQuizStore((state) => state.setMaxStep)
  const resetSteps = useQuizStore((state) => state.resetSteps)
  const resetIdAns = useQuizStore((state) => state.resetIdAns)
  const [id, setId] = useState('')


  useEffect(() => {
    resetSteps()
    resetIdAns()
    const localImages = JSON.parse(localStorage.getItem('images'))
    if (localImages && !localImages.state.loading && localImages.state.images.length === images.length) {
      setId(ids[steps])

    } else {
      const fetch = async () => {
        await fetchImages()

      }
      fetch()
      setId(ids[steps])

    }

    setMaxStep(ids.length)
    console.log(maxStep, ids.length)
  }, [fetchImages, images.length, ids, steps, maxStep])

  const handleSteps = () => {
    increaseStep(steps)
    console.log(steps)
  }

  if (loading) {
    return (
      <>
        loading
      </>
    )
  }

  if (error) {
    return (
      <>
        something went wrong
      </>
    )
  }
  const handleToken = () => {
    localStorage.removeItem('token')
  }

  return (
    <>
      <Box>
        <Link to="/signup">
          <Button onClick={handleToken}>Sign Up</Button>
        </Link>
        <Link to="/login">
          <Button onClick={handleToken}>Login</Button>
        </Link>

      </Box>
      {
        token !== null ? <FileInput /> : ''
      }

      {images ? (
        <ImageList sx={{ width: 600, height: 600 }} cols={3} rowHeight={20}>
          {images.map((item) => {
            const base64String = Buffer.from(item.img.data.data, 'utf8').toString('base64');
            return (
              <Link to={`/image/${item._id}`} key={item._id}>
                <ImageListItem >

                  <img
                    src={`data:${item.img.contentType};base64,${base64String}`}
                    alt={"uploaded"}
                    loading="lazy"
                  />

                </ImageListItem>
              </Link>
            )
          })}
        </ImageList>
      ) : ''}
      <Box>
        <Link to={`/quiz/${id}`} >
          <Button onClick={handleSteps}>Start Quiz</Button>
        </Link>
      </Box>
    </>
  )
}

export default Images