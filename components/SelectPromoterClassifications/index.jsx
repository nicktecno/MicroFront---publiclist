import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import * as S from "./style";

import { MenuItem } from "@mui/material";

export default function SelectPromoterClassifications({
  classifications,
  classificationName,
  setClassificationName,
  setStatusUpdate,
}) {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setClassificationName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    setStatusUpdate(false);
  };

  return (
    <>
      {classifications.length > 0 ? (
        <S.GeneralContainer>
          <FormControl sx={{ m: 1, width: 250 }}>
            <InputLabel
              sx={{ borderColor: "grey.500" }}
              id="demo-multiple-checkbox-label"
              style={{
                color: "#000",
              }}
            >
              Selecione suas classificações
            </InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={classificationName}
              onChange={handleChange}
              input={<OutlinedInput label="Selecione suas classificações" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
              style={{
                color: "#000",
              }}
            >
              {classifications.length > 0 &&
                classifications.map((classification) => (
                  <MenuItem key={classification.id} value={classification.name}>
                    <Checkbox
                      style={{
                        color: "#000",
                      }}
                      checked={
                        classificationName.indexOf(classification.name) > -1
                      }
                    />
                    <ListItemText
                      style={{
                        color: "#000",
                      }}
                      primary={classification.name}
                    />
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </S.GeneralContainer>
      ) : (
        <S.ContainerLoading>
          <img src="/images/loadingIcon.svg" alt="Loading..." />
        </S.ContainerLoading>
      )}
    </>
  );
}
