import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  TextField,
  Button,
  Alert,
  Collapse,
  Card,
  CircularProgress
} from "@mui/material";
import { BASE_URL } from "../service";

const ScifiImage = () => {
  const theme = useTheme();
  //media
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  // states
  const [text, settext] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [isloading, setIsLoading] = useState(false);
  //register ctrl
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post(`${BASE_URL}/api/v1/openai/scifi-image`, { text });
      console.log(data);
      setImage(data);
    } catch (err) {
      console.log(error);
      if (err.response.data.error) {
        setError(err.response.data.error);
      } else if (err.message) {
        setError(err.message);
      }
      setTimeout(() => {
        setError("");
      }, 5000);
    }
    setIsLoading(false);
  };
  return (
    <Box
      width={isNotMobile ? "40%" : "80%"}
      p={"2rem"}
      m={"2rem auto"}
      borderRadius={5}
      sx={{ boxShadow: 5 }}
      backgroundColor={theme.palette.background.alt}
    >
      <Collapse in={error}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Collapse>
      <form onSubmit={handleSubmit}>
        <Typography variant="h3">Image Generator</Typography>

        <TextField
          placeholder="Add your text"
          type="text"
          multiline={true}
          required
          margin="normal"
          fullWidth
          value={text}
          onChange={(e) => {
            settext(e.target.value);
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ color: "white", mt: 2 }}
        >
          Submit
        </Button>
        <Typography mt={2}>
          Not this tool ? <Link to="/">GO BACK</Link>
        </Typography>
      </form>
      <center style={{
        margin: '10px 0'
      }}>
        {isloading && <CircularProgress color="success" />}
      </center>
      {image ? (
        <Card
          sx={{
            mt: 4,
            border: 1,
            boxShadow: 0,
            height: "500px",
            borderRadius: 5,
            borderColor: "natural.medium",
            bgcolor: "background.default",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
            <img src={image} alt="scifiimage" />
          </Box>
        </Card>
      ) : (
        <Card
          sx={{
            mt: 4,
            border: 1,
            boxShadow: 0,
            height: "500px",
            borderRadius: 5,
            borderColor: "natural.medium",
            bgcolor: "background.default",
          }}
        >
          <Typography
            variant="h5"
            color="natural.main"
            sx={{
              textAlign: "center",
              verticalAlign: "middel",
              lineHeight: "450px",
            }}
          >
            Your Image Will Appear Here
          </Typography>
        </Card>
      )}
    </Box>
  );
};

export default ScifiImage;