import React, { useEffect } from 'react'
import { ImageList, ImageListItem, Button, Box } from "@mui/material"
import { Link } from 'react-router-dom'
import { Buffer } from 'buffer'
import { useImageStore, useTokenStore } from '../store'
import FileInput from '../sections/FileInput'

const Images = () => {
  const images = useImageStore((state) => state.images)
  const fetchImages = useImageStore((state) => state.fetchImages)
  const loading = useImageStore((state) => state.loading)
  const error = useImageStore((state) => state.error)
  const token = useTokenStore((state) => state.token)
  useEffect(() => {

    const localImages = JSON.parse(localStorage.getItem('images'))
    if (localImages && !localImages.state.loading && localImages.state.images.length === images.length) {
      return
    } else {
      const fetch = async () => {
        await fetchImages()
        console.log('fetching')
      }
      fetch()
    }
  }, [fetchImages, images.length])


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
    </>
  )
}

export default Images