import { useState, useEffect } from "react";
import { Button, Box, TextField } from '@mui/material';
import axios from 'axios';
import { useImageStore, useTokenStore } from '../store';

const FileInput = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [title, setTitle] = useState("")
  const [option1, setOption1] = useState("")
  const [option2, setOption2] = useState("")
  const [option3, setOption3] = useState("")
  const [option4, setOption4] = useState("")
  const [correctAns, setCorrectAns] = useState("")
  const [imageUrl, setImageUrl] = useState(null);

  const token = useTokenStore((state) => state.token)
  const fetchImages = useImageStore((state) => state.fetchImages)
  const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const handleDelete = () => {
    setImageUrl(null)
    setSelectedImage(null)
  }

  const handleSubmit = async () => {
    try {
      await axiosInstance({
        method: 'post',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',

        },
        data: {
          name: title,
          image: selectedImage,
          option1,
          option2,
          option3,
          option4,
          correctAns
        },
        url: '/upload',
      })
      localStorage.removeItem('images')

      try {
        await fetchImages()
      } catch (err) {
        console.log(err)
      }


    } catch (err) {
      console.log(err)
    }





    setImageUrl(null)
    setSelectedImage(null)
  }

  return (
    <>
      <input
        accept="image/*"
        type="file"
        id="select-image"
        encType="multipart/form-data"
        style={{ display: "none" }}
        onChange={(e) => setSelectedImage(e.target.files[0])}
      />
      <label htmlFor="select-image">
        <Button variant="contained" color="primary" component="span">
          Choose a image
        </Button>
      </label>
      {imageUrl && selectedImage && (
        <Box mt={2} textAlign="center">
          <div>Image Preview:</div>
          <img src={imageUrl} alt={selectedImage.name} height="100px" />
          <Box>
            <TextField id="title" label="title*" variant="outlined" sx={{ margin: "10px" }} onChange={(e) => setTitle(e.target.value)} />
          </Box>
          <Box>
            <TextField id="option-1" label="option 1*" variant="outlined" sx={{ margin: "10px" }} onChange={(e) => setOption1(e.target.value)} />
            <TextField id="option-2" label="option 2*" variant="outlined" sx={{ margin: "10px" }} onChange={(e) => setOption2(e.target.value)} />
            <TextField id="option-3" label="option 3*" variant="outlined" sx={{ margin: "10px" }} onChange={(e) => setOption3(e.target.value)} />
            <TextField id="option-4" label="option 4*" variant="outlined" sx={{ margin: "10px" }} onChange={(e) => setOption4(e.target.value)} />
          </Box>
          <Box>
            <TextField id="correctAns" label="Correct Answer*" variant="outlined" sx={{ margin: "10px" }} onChange={(e) => setCorrectAns(e.target.value)} />
          </Box>
          <Box>
            <Button variant="outlined" color="error" sx={{ margin: "10px" }} onClick={handleDelete}>Delete</Button>
            <Button variant='outlined' color="success" onClick={handleSubmit}>Submit</Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default FileInput;