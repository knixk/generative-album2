import React, { useContext, useState } from "react";
import { TextField, Typography, Box } from "@mui/material";
import { myContext } from "../App";

const DynamicForm = () => {
  //   const template = localState.main__form__text1 || "";

  const { localState, formValues, setFormValues } = useContext(myContext);
  const { main__form__text1 } = localState;
  const template = main__form__text1 || "";

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
    console.log(formValues)
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 1,
        alignItems: "center",
      }}
    >
      {formElements.map((element, index) =>
        element.type === "text" ? (
          <Typography key={index} variant="body1">
            {element.content}
          </Typography>
        ) : (
          <TextField
            key={index}
            variant="outlined"
            size="small"
            required
            onChange={(e) => handleChange(element.id, e.target.value)}
          />
        )
      )}
    </Box>
  );
};

export default DynamicForm;
