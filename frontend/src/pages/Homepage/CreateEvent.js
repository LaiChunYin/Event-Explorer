import React from "react";
import { useState } from "react";
import VerticalFlex from "../../layout/VerticalFlex";
import {
  TextField,
  Checkbox,
  Select,
  MenuItem,
  Modal,
  Backdrop,
  Slide,
  Grid,
  Box,
  InputLabel,
  FormControl,
  TextareaAutosize,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  IconButton,
  Input,
  Avatar,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticTimePicker from "@mui/lab/StaticTimePicker";
import TimePicker from "./TimePicker";
import HorizontalFlex from "../../layout/HorizontalFlex";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import SubmitButton from "../../components/SubmitButton";
import CloseButton from "../../components/CloseButton";
import SquareToggleButton from "../../components/SquareToggleButton";
import PersonIcon from "@mui/icons-material/Person";
import PrivacyButtonGroup from "../../components/PrivacyButtonGroup";
import SubmitIconButton from "../../components/SubmitIconButton";
import ImageIcon from "@mui/icons-material/Image";
import post from "../../lib/post";
const style = {
  //control the style of the modal container
  position: "absolute",
  left: "0",
  right: "0",
  marginLeft: "auto",
  marginRight: "auto",
  top: "50%",
  bottom: "50%",
  marginBottom: "auto",
  "@media (min-width: 0px)": {
    marginTop: "-340px",
    height: "680px",
  },
  "@media (min-width: 600px)": {
    marginTop: "-255px",
    width: "400px",
    height: "510px",
  },

  // "@media (max-width: 1025px)": {
  //   height: "700px",
  //   marginTop: "-350px",
  // },
  // "@media (min-width: 1026px)": {
  //   height: "500px",
  //   marginTop: "-250px",
  // },
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 10,
  p: 4,
};
function CreateEvent(props) {
  const handleClose = () => props.setShowCreateEvent(false);
  const [title, setTitle] = useState(null);
  const [titleError, setTitleError] = useState(false);
  const [category, setCategory] = useState(false);
  const [notification, setNotification] = useState(false);
  const [quota, setQuota] = useState(1);
  const [eventPic, setEventPic] = useState("");
  const [eventPicFailed, setEventPicFailed] = useState(undefined);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [location, setLocation] = useState("");
  const [privacy, setPrivacy] = useState("friend");
  const [maxParticipants, setMaxParticipants] = useState(1);
  const [remarks, setRemarks] = useState("");
  const validateTitle = (title) => {};
  const handleChangePrivacy = (event, newPrivacy) => {
    setPrivacy(newPrivacy);
  };
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const saveImage = async (e) => {
    try {
      const file = e.target.files[0];
      const eventPic = await convertBase64(file);
      console.log(eventPic);
      setEventPicFailed(!eventPic.startsWith("data:image"));
      setEventPic(eventPic);
    } catch (err) {
      setEventPicFailed(true);
      console.log(err);
    }
  };
  const createEvent = () => {
    let duration;
    let data = {
      name: title,
      category: category,
      time: startTime,
      duration: duration,
      location: location,
      max_participants: maxParticipants,
      photo: eventPic,
      remarks: remarks,
    };
    post("https://rfriend.herokuapp.com/api/event", data);
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={props.showCreateEvent}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      sx={{ overflow: "scroll" }}
    >
      <Slide in={props.showCreateEvent}>
        <Box sx={style}>
          <Box
            sx={{
              display: { xs: "flex" },
              flexDirection: { xs: "column" },
              aligenItems: "center",
              justifyContent: "space-around",
              gap: 1,
            }}
          >
            <Avatar
              variant="square"
              src={eventPic}
              style={{ width: "100%", height: "150px" }}
              sx={{ borderRadius: 3 }}
            >
              <ImageIcon />
            </Avatar>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                aligenItems: "center",
                justifyContent: "space-around",
                gap: 1,
              }}
            >
              <TextField
                error={titleError}
                helperText={titleError ? "Must fill in" : ""}
                type="text"
                label="title*"
                onChange={(e) => {
                  props.setTitle(e.target.value);
                  validateTitle(e.target.value);
                }}
              />
              <TextField
                type="text"
                label="location"
                onChange={(e) => {
                  props.setLocation(e.target.value);
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                aligenItems: "center",
                justifyContent: "space-around",
                gap: 1,
              }}
            >
              <TextField
                label="quota"
                type="number"
                value={quota}
                onChange={(e) => {
                  if (e.target.value > 0) setQuota(e.target.value);
                }}
              />
              <TextField
                label="remark"
                type="text"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "row" },
                aligenItems: "center",
                justifyContent: "space-around",
                gap: 1,
              }}
            >
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="Category">Category</InputLabel>
                <Select
                  labelId="Category"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                  label="Category"
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>

              {/* <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="Privacy">Privacy*</InputLabel>
                <Select
                  labelId="Privacy"
                  value={privacy}
                  onChange={(e) => {
                    setPrivacy(e.target.value);
                  }}
                  label="Privacy"
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl> */}
              <PrivacyButtonGroup
                value={privacy}
                onChange={handleChangePrivacy}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "row" },
                justifyContent: "space-around",
                aligenItems: "center",
                gap: 1,
              }}
            >
              <TimePicker />
              <SquareToggleButton
                selected={notification}
                onChange={() => {
                  setNotification((prev) => !prev);
                }}
                color="primary"
              >
                <NotificationsIcon />
              </SquareToggleButton>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "row" },
                justifyContent: "space-around",
                aligenItems: "center",
                gap: 1,
              }}
            >
              <TimePicker />
              <label htmlFor="icon-button-file">
                <Input
                  inputProps={{ accept: "image/*" }}
                  id="icon-button-file"
                  type="file"
                  sx={{ display: "none" }}
                  onChange={(e) => {
                    saveImage(e);
                  }}
                />
                {/* <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  sx={{ width: 54, height: 54 }}
                >
                  <PhotoCamera />
                </IconButton> */}
                <SubmitIconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  sx={{ width: 54, height: 54 }}
                  loading={false}
                  error={eventPicFailed}
                >
                  <PhotoCamera />
                </SubmitIconButton>
              </label>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column-reverse", sm: "row" },
                justifyContent: "space-around",
                alignItems: "center",
                gap: 1,
              }}
            >
              <CloseButton onClick={handleClose} sx={{ flexGrow: 0 }}>
                Cancel
              </CloseButton>
              <SubmitButton>Submit</SubmitButton>
            </Box>
          </Box>
        </Box>
      </Slide>
    </Modal>
  );
}

export default CreateEvent;
