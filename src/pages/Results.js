import React, { useEffect, useState } from 'react'
import { Buffer } from 'buffer'
import { useQuizStore, useResultStore } from '../store'
import { Box, Button, Chip, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const Results = () => {
  const fetchAllImages = useResultStore((state) => state.fetchAllImages)
  const allImages = useResultStore((state) => state.allImages)
  const loading = useResultStore((state) => state.loading)
  const idAns = useQuizStore((state) => state.idAns)
  const correctAns = useResultStore((state) => state.correctAns)
  const [selectedAns, setSelectedAns] = useState([])
  useEffect(() => {
    const fetch = async () => {
      await fetchAllImages()
    }
    fetch()


  }, [fetchAllImages])



  useEffect(() => {
    let ansArray = []
    idAns.map((ans) => ansArray.push(ans.selected))
    setSelectedAns(ansArray)
  }, [])

  console.log(selectedAns)
  console.log(correctAns)





  if (loading) {
    return (
      <>
        loading
      </>
    )
  }
  return (
    <>
      {
        allImages.map((image, index) => {
          const base64String = Buffer.from(image.img.data.data, 'utf8').toString('base64');
          return (
            <Box key={image._id}>
              <Box>
                <img
                  src={`data:${image.contentType};base64,${base64String}`}
                  alt={"uploaded"}
                  loading="lazy"
                />
              </Box>
              <Stack direction="row" spacing={1} sx={{ marginTop: "20px", marginBottom: '20px' }}>
                <Chip color={image.correctAns === image.option1 ? 'success' : 'default'} label={image.option1} />
                <Chip color={image.correctAns === image.option2 ? 'success' : 'default'} label={image.option2} />
                <Chip color={image.correctAns === image.option3 ? 'success' : 'default'} label={image.option3} />
                <Chip color={image.correctAns === image.option4 ? 'success' : 'default'} label={image.option4} />

              </Stack>
              <Typography color={selectedAns[index] === correctAns[index] ? 'green' : 'red'} variant="h6" gutterBottom >
                you have selected {`${selectedAns[index]}`}
              </Typography>

            </Box>
          )
        })
      }
      <Link to="/">
        <Button>Go back to home</Button>
      </Link>
    </>
  )
}

export default Results