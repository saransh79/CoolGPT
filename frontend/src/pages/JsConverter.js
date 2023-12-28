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
  CircularProgress,
  ToggleButtonGroup,
  ToggleButton
} from "@mui/material";

import { BASE_URL } from "../service";

const JsConverter = () => {
  const theme = useTheme();
  //media
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  // states
  const [text, settext] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [lang, setLang] = useState("");
  //register ctrl
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    settext("");
    setLang("");
    try {
      const { data } = await axios.post(`${BASE_URL}/api/v1/openai/js-converter`, {
        text, lang
      });
      console.log(data);
      setCode(data)
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
    setIsLoading(false)
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
        <Typography variant="h3">Code Generator</Typography>

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
        <Typography variant="h5" fontWeight={500} p={1}>Select Language</Typography>

        <ToggleButtonGroup
          color="primary"
          value={lang}
          exclusive
          onChange={(e) => {
            setLang(e.target.value);
          }}
          aria-label="Platform"
        >
          <ToggleButton value="C++" >C++</ToggleButton>
          <ToggleButton value="Python">Python</ToggleButton>
          <ToggleButton value="Java">Java</ToggleButton>
          <ToggleButton value="Javascript">Javascript</ToggleButton>
        </ToggleButtonGroup>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ color: "white", mt: 2 }}
        >
          Generate
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
      {code ? (
        <Card
          sx={{
            mt: 4,
            border: 1,
            boxShadow: 0,
            height: "500px",
            borderRadius: 5,
            borderColor: "natural.medium",
            bgcolor: "background.dark",
            overflowY: "auto",
          }}
        >
          <pre style={{
            whiteSpace: 'pre-wrap'
          }}>
            <Typography p={2} variant="h6" color={"#fff"}
              component="div">
              {code}
            </Typography>
          </pre>
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
            bgcolor: "background.dark",
          }}
        >
          <Typography
            variant="h5"
            color="#fff"
            sx={{
              textAlign: "center",
              verticalAlign: "middel",
              lineHeight: "450px",
            }}
          >
            Your Code Will Appear Here
          </Typography>
        </Card>
      )}
    </Box>
  );
};

export default JsConverter;