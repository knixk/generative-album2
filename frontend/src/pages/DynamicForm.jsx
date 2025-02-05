import React, { useContext, useState } from "react";
// import { TextField, Typography, Box } from "@mui/material";
import {
  TextField,
  Typography,
  Card,
  CardContent,
  Stack,
  Container,
} from "@mui/material";

import { myContext } from "../App";

const DynamicForm = () => {
  //   const template = localState.main__form__text1 || "";

  const { localState, formValues, setFormValues, name, setName } =
    useContext(myContext);
  const { main__form__text1 } = localState;
  const template = main__form__text1 || "";

  const parts = template.split(/\{(\d+)\}/g);

  //   const [formValues, setFormValues] = useState({});

  // Correctly parse the template string
  const parseTemplate = (text) => {
    const regex = /\{(\d+)\}/g;
    let elements = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      // Add static text before the placeholder
      if (lastIndex < match.index) {
        elements.push({
          type: "text",
          content: text.slice(lastIndex, match.index),
        });
      }

      // Add an input field
      elements.push({ type: "input", id: match[1] });

      // Move the last index forward
      lastIndex = match.index + match[0].length;
    }

    // Add any remaining static text
    if (lastIndex < text.length) {
      elements.push({ type: "text", content: text.slice(lastIndex) });
    }

    return elements;
  };

  const formElements = parseTemplate(template);

  // Handle input changes
  const handleChange = (id, value) => {
    setFormValues((prev) => ({ ...prev, [id]: value }));
    console.log(formValues);
  };

  return (
    <Container maxWidth="sm">
      <Card variant="outlined" sx={{ p: 3, mt: 4, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
            Customize your image
          </Typography>
          <Stack spacing={2}>
            {parts.map((part, index) =>
              /^\d+$/.test(part) ? (
                <TextField
                  key={index}
                  fullWidth
                  variant="outlined"
                  value={formValues[part] || ""}
                  onChange={(e) => handleChange(part, e.target.value)}
                />
              ) : (
                <Typography key={index} variant="body1">
                  {part}
                </Typography>
              )
            )}

            <Typography key={"12312"} variant="body1">
              Enter your name
            </Typography>

            <TextField
              key={1231212}
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
              placeholder="Enter your name.."
            />
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};

export default DynamicForm;
