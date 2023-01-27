import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import * as S from "./style";
import notification from "../../services/notification";

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

export default function MultipleSelectCheckmarksPromoterClassifications({
  classificationName,
  classifications,
  option,
  setOption,
  activeNewImageModal,
  classificationNameFather,
  activeUpdateImageModal,
  localUpdateModalOption,
  statusUpdate,
  api,
  setLoading,
  setCartLength,
  wishListApi,
  headerUrl,
}) {
  const [optionsOfClassifications, setOptionsOfClassifications] =
    React.useState([]);

  const [localOption, setLocalOption] = React.useState([]);
  const [firstUpdate, setFirstUpdate] = React.useState(true);

  async function loadClassifications() {
    setLoading(true);
    const filterClassificationId = classifications.filter(
      (classificationFiltered) =>
        classificationName === classificationFiltered.name
    );
    if (activeNewImageModal === "active") {
      try {
        const { data: responseList } = await wishListApi.get(
          `/photobook/customer/classification/${filterClassificationId[0].id}`,
          {
            headers: {
              Type: "customer",
              "Url-Store": headerUrl,
            },
          }
        );

        setOptionsOfClassifications(responseList.data.options);

        setLoading(false);
      } catch (e) {
        if (e.response?.data.message === "Não Autorizado.") {
          notification("Sua sessão expirou, faça o login novamente", "error");
          sessionStorage.setItem("urlantiga", window.location.href);
          setLoading(false);
          setCartLength("0");
          setTimeout(function () {
            window.location.href = "/login";
          }, 3000);
        } else {
          console.log(e);
          notification(
            "Erro ao carregar as classificações de promotor",
            "error"
          );
          setLoading(false);
        }
      }
    } else {
      try {
        const { data: responseList } = await api.get(
          `/customer/classification/${filterClassificationId[0].id}`
        );

        setOptionsOfClassifications(responseList.data.options);
        setLoading(false);
      } catch (e) {
        if (e.response?.data.message === "Não Autorizado.") {
          notification("Sua sessão expirou, faça o login novamente", "error");
          sessionStorage.setItem("urlantiga", window.location.href);
          setLoading(false);
          setCartLength("0");
          setTimeout(function () {
            window.location.href = "/login";
          }, 3000);
        } else {
          console.log(e);
          notification(
            "Erro ao carregar as classificações de promotor",
            "error"
          );
          setLoading(false);
        }
      }
    }
  }

  async function loadClassificationsUpdate() {
    setLoading(true);
    const filterClassificationId = classifications.filter(
      (classificationFiltered) =>
        classificationName === classificationFiltered.name
    );

    try {
      const { data: responseList } = await wishListApi.get(
        `/photobook/customer/classification/${filterClassificationId[0].id}`,
        {
          headers: {
            Type: "customer",
            "Url-Store": headerUrl,
          },
        }
      );

      setOptionsOfClassifications(responseList.data.options);

      handleChangeUpdate(localUpdateModalOption, responseList.data.options);

      setLoading(false);
    } catch (e) {
      if (e.response?.data.message === "Não Autorizado.") {
        notification("Sua sessão expirou, faça o login novamente", "error");
        sessionStorage.setItem("urlantiga", window.location.href);
        setLoading(false);
        setCartLength("0");
        setTimeout(function () {
          window.location.href = "/login";
        }, 3000);
      } else {
        console.log(e);
        notification("Erro ao carregar as classificações de promotor", "error");
        setLoading(false);
      }
    }
  }

  React.useEffect(() => {
    if (firstUpdate === true) {
      setFirstUpdate(false);
      loadClassifications();

      if (
        activeUpdateImageModal === "active" &&
        statusUpdate !== undefined &&
        statusUpdate === true
      ) {
        loadClassificationsUpdate();
      }
      return;
    }

    setLocalOption([]);
    setOption([]);
    loadClassifications();
  }, [classifications, classificationNameFather]);

  const handleChangeUpdate = (options, classificationsResponse) => {
    const value = options
      .map((opt) => {
        const filter = classificationsResponse.filter(
          (filt) => filt.name === opt
        );
        if (filter.length > 0) {
          return opt;
        } else {
          return [];
        }
      })
      .flat();

    const refineId = value.map((refined) => {
      const filtering = classificationsResponse.filter(
        (refining) => refining.name === refined
      );
      return filtering[0].id;
    });

    setLocalOption(typeof value === "string" ? value.split(",") : value);

    if (option.length > 0) {
      const optionFilter = option.filter(
        (optionsName) => optionsName.name !== classificationName
      );
      if (optionFilter.length > 0) {
        const newArrayOption = [
          ...optionFilter,
          { refineId, name: classificationName },
        ];
        setOption(newArrayOption);
      } else {
        const newArrayOption = [{ refineId, name: classificationName }];
        setOption(newArrayOption);
      }
    } else {
      setOption([{ refineId, name: classificationName }]);
    }
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    const refineId = value.map((refined) => {
      const filtering = optionsOfClassifications.filter(
        (refining) => refining.name === refined
      );
      return filtering[0].id;
    });

    setLocalOption(typeof value === "string" ? value.split(",") : value);

    if (option.length > 0) {
      const optionFilter = option.filter(
        (optionsName) => optionsName.name !== classificationName
      );
      if (optionFilter.length > 0) {
        const newArrayOption = [
          ...optionFilter,
          { refineId, name: classificationName },
        ];
        setOption(newArrayOption);
      } else {
        const newArrayOption = [{ refineId, name: classificationName }];
        setOption(newArrayOption);
      }
    } else {
      setOption([{ refineId, name: classificationName }]);
    }
  };

  return (
    <>
      {optionsOfClassifications.length > 0 ? (
        <S.GeneralContainer>
          <FormControl sx={{ m: 1, width: 250 }}>
            <InputLabel
              sx={{ borderColor: "grey.500" }}
              id="demo-multiple-checkbox-label"
              style={{
                color: "#343A1C",
              }}
            >
              {`Opções de ${classificationName}`}
            </InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={localOption}
              onChange={handleChange}
              input={
                <OutlinedInput label={`Opções de ${classificationName}`} />
              }
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
              style={{
                color: "#343A1C",
              }}
            >
              {optionsOfClassifications.length > 0 &&
                optionsOfClassifications.map((classification) => (
                  <MenuItem key={classification.id} value={classification.name}>
                    <Checkbox
                      style={{
                        color: "#343A1C",
                      }}
                      checked={localOption.indexOf(classification.name) > -1}
                    />
                    <ListItemText
                      style={{
                        color: "#343A1C",
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
