import React, { useEffect, useState } from 'react'
import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import { useImageStore, useQuizStore, useSingleImageStore } from '../store'
import { Buffer } from 'buffer'
import { useParams, Link } from 'react-router-dom'

const Quiz = () => {
  const { id } = useParams()
  const maxStep = useQuizStore((state) => state.maxStep)
  const loading = useSingleImageStore((state) => state.loading)

  const image = useSingleImageStore((state) => state.image)
  const fetchImage = useSingleImageStore((state) => state.fetchImage)
  const option1 = useSingleImageStore((state) => state.option1)
  const option2 = useSingleImageStore((state) => state.option2)
  const option3 = useSingleImageStore((state) => state.option3)
  const option4 = useSingleImageStore((state) => state.option4)
  const steps = useQuizStore((state) => state.steps)

  const increaseStep = useQuizStore((state) => state.increaseStep)
  const ids = useImageStore((state) => state.ids)

  const resetSteps = useQuizStore((state) => state.resetSteps)
  const setIdAns = useQuizStore((state) => state.setIdAns)

  const [selected, setSelected] = useState('')
  const [nextId, setNextId] = useState('')


  useEffect(() => {
    setNextId(ids[steps])

    const fetch = async () => {
      await fetchImage(id)
      console.log('fetching')
    }
    fetch()
    setSelected(option1)
  }, [fetchImage, id, option1, ids, steps])

  const handleNext = () => {
    if (steps < maxStep) {
      increaseStep(steps)
    }

    increaseStep(steps)
    setIdAns({
      id,
      selected
    })
  }
  const handleResult = () => {
    resetSteps()
    setIdAns({
      id,
      selected
    })
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
            <FormControlLabel value={option1} control={<Radio />} label={option1} />
            <FormControlLabel value={option2} control={<Radio />} label={option2} />
            <FormControlLabel value={option3} control={<Radio />} label={option3} />
            <FormControlLabel value={option4} control={<Radio />} label={option4} />
          </RadioGroup>
        </FormControl>

      </Box>
      {
        (steps === maxStep) ? (
          (<Link to={`/result`} >
            <Button variant='contained' onClick={handleResult}>Result</Button>
          </Link>)
        ) : (<Link to={`/quiz/${nextId}`} >
          <Button variant='contained' onClick={handleNext}>next</Button>
        </Link>)
      }


    </div>
  )
}

export default Quiz