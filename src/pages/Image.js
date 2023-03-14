import React, { useEffect, useState } from 'react'
import { Box, Button, Chip, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material'
import { useSingleImageStore } from '../store'
import { Buffer } from 'buffer'
import { useParams } from 'react-router-dom'
import { Stack } from '@mui/system'
const Image = () => {
  const { id } = useParams()

  const loading = useSingleImageStore((state) => state.loading)
  const image = useSingleImageStore((state) => state.image)
  const fetchImage = useSingleImageStore((state) => state.fetchImage)
  const option1 = useSingleImageStore((state) => state.option1)
  const option2 = useSingleImageStore((state) => state.option2)
  const option3 = useSingleImageStore((state) => state.option3)
  const option4 = useSingleImageStore((state) => state.option4)
  const correctAns = useSingleImageStore((state) => state.correctAns)
  const [selected, setSelected] = useState("")
  const [checkAns, setCheckAns] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [radioDisable, setRadioDisable] = useState(false)
  useEffect(() => {

    const fetch = async () => {
      await fetchImage(id)
      console.log('fetching')
    }
    fetch()
    setSelected(option1)
  }, [fetchImage, id, option1])

  const handleClick = () => {

    if (selected === correctAns) {
      setIsCorrect(true)
    }
    else {
      setIsCorrect(false)
    }
    setCheckAns(true)
    setRadioDisable(true)

  }

  if (loading) {
    return (
      <>
        loading
      </>
    )
  }
  const base64String = Buffer.from(image.data.data, 'utf8').toString('base64');
  return (
    <div>
      <Box>
        <img
          src={`data:${image.contentType};base64,${base64String}`}
          alt={"uploaded"}
          loading="lazy"
        />
      </Box>
      <Box>
        <FormControl
        >
          <FormLabel id="demo-radio-buttons-group-label">Choose one</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            defaultValue=""
            onChange={(e) => setSelected(e.target.value)}

          >
            <FormControlLabel disabled={radioDisable} value={option1} control={<Radio />} label={option1} />
            <FormControlLabel disabled={radioDisable} value={option2} control={<Radio />} label={option2} />
            <FormControlLabel disabled={radioDisable} value={option3} control={<Radio />} label={option3} />
            <FormControlLabel disabled={radioDisable} value={option4} control={<Radio />} label={option4} />
          </RadioGroup>
        </FormControl>

      </Box>
      <Button variant='contained' onClick={handleClick}>Check Answer</Button>
      {
        checkAns ?
          (
            <>
              <Stack direction="row" spacing={1} sx={{ marginTop: "20px" }}>
                <Chip color={correctAns === option1 ? 'success' : 'default'} label={option1} />
                <Chip color={correctAns === option2 ? 'success' : 'default'} label={option2} />
                <Chip color={correctAns === option3 ? 'success' : 'default'} label={option3} />
                <Chip color={correctAns === option4 ? 'success' : 'default'} label={option4} />

              </Stack>
              <Typography color={isCorrect ? 'green' : 'red'} variant="h6" gutterBottom >
                you have selected {`${selected}`}
              </Typography>
            </>

          ) : ""
      }
    </div>
  )
}

export default Image