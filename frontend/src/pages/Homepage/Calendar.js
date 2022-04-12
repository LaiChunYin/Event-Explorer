import * as React from "react";
import { styled } from '@mui/material/styles';
import { Paper } from "@mui/material";
import TableCell from "@material-ui/core/TableCell";
import { darken, alpha, lighten } from "@material-ui/core/styles/colorManipulator";
import Typography from "@material-ui/core/Typography";
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
import classNames from "clsx";
import {
  Scheduler,
  MonthView,
  Appointments,
  Toolbar,
  DateNavigator,
  AppointmentTooltip,
  AppointmentForm,
  EditRecurrenceMenu,
  Resources,
  DragDropProvider,
} from "@devexpress/dx-react-scheduler-material-ui";
import WbSunny from "@mui/icons-material/WbSunny";
import FilterDrama from "@mui/icons-material/FilterDrama";
import Opacity from "@mui/icons-material/Opacity";
import ColorLens from "@mui/icons-material/ColorLens";
import { withStyles } from "@material-ui/core/styles";
import { owners } from "./calendar-data/tasks";
import { TurnedIn } from "@mui/icons-material";
import EventCardModal from "../../components/EventCardModal";
import { Box } from "@material-ui/core";
import CalendarEvent from './CalendarEvent';

const StyledAppointmentTooltipHeader = styled(AppointmentTooltip.Header)(() => ({
}));

const Header = ({ children, appointmentData, ...restProps }) => (
  //<StyledAppointmentTooltipHeader
  //  {...restProps}
  //  appointmentData={appointmentData}
  //>
   <Box
     sx={{
       display: "flex",
       flexDirection: "row",
       justifyContent: "end",
       alignContent: "center",
     }}
   >
    <EventCardModal appointmentData={appointmentData} children={children} {...restProps}/>
  </Box>
  //</StyledAppointmentTooltipHeader>
);

const appointments = [
  {
    id: 0,
    title: "3310 Project Meeting",
    startDate: new Date(2022, 3, 19, 22, 0),
    endDate: new Date(2022, 3, 19, 24, 0),
    allDay: true,
    ownerId: 1,
  },
  {
    id: 1,
    title: "Monthly Planning",
    startDate: new Date(2018, 5, 28, 9, 30),
    endDate: new Date(2018, 5, 28, 11, 30),
    ownerId: 1,
  },
  {
    id: 2,
    title: "Recruiting students",
    startDate: new Date(2018, 6, 9, 12, 0),
    endDate: new Date(2018, 6, 9, 13, 0),
    ownerId: 2,
  },
  {
    id: 3,
    title: "Oil Painting",
    startDate: new Date(2018, 6, 18, 14, 30),
    endDate: new Date(2018, 6, 18, 15, 30),
    ownerId: 2,
  },
  {
    id: 4,
    title: "Open Day",
    startDate: new Date(2018, 6, 20, 12, 0),
    endDate: new Date(2018, 6, 20, 13, 35),
    ownerId: 6,
  },
  {
    id: 5,
    title: "Watercolor Landscape",
    startDate: new Date(2018, 6, 6, 13, 0),
    endDate: new Date(2018, 6, 6, 14, 0),
    rRule: "FREQ=WEEKLY;BYDAY=FR;UNTIL=20180816",
    exDate: "20180713T100000Z,20180727T100000Z",
    ownerId: 2,
  },
  {
    id: 6,
    title: "Meeting of Instructors",
    startDate: new Date(2018, 5, 28, 12, 0),
    endDate: new Date(2018, 5, 28, 12, 30),
    rRule: "FREQ=WEEKLY;BYDAY=TH;UNTIL=20180727",
    exDate: "20180705T090000Z,20180719T090000Z",
    ownerId: 5,
  },
  {
    id: 7,
    title: "Oil Painting for Beginners",
    startDate: new Date(2018, 6, 3, 11, 0),
    endDate: new Date(2018, 6, 3, 12, 0),
    rRule: "FREQ=WEEKLY;BYDAY=TU;UNTIL=20180801",
    exDate: "20180710T080000Z,20180724T080000Z",
    ownerId: 3,
  },
  {
    id: 8,
    title: "Watercolor Workshop",
    startDate: new Date(2018, 6, 9, 11, 0),
    endDate: new Date(2018, 6, 9, 12, 0),
    ownerId: 3,
  },
];

const resources = [
  {
    fieldName: "ownerId",
    title: "Owners",
    instances: owners,
  },
];

const getBorder = (theme) =>
  `1px solid ${
    theme.palette.type === "light"
      ? lighten(alpha(theme.palette.divider, 1), 0.88)
      : darken(alpha(theme.palette.divider, 1), 0.68)
  }`;

const DayScaleCell = (props) => (
  <MonthView.DayScaleCell {...props} style={{ textAlign: "center", fontWeight: "bold" }} />
);

const styles = (theme) => ({
  cell: {
    color: "#78909C!important",
    position: "relative",
    userSelect: "none",
    verticalAlign: "top",
    padding: 0,
    height: 100,
    borderLeft: getBorder(theme),
    "&:first-child": {
      borderLeft: "none",
    },
    "&:last-child": {
      paddingRight: 0,
    },
    "tr:last-child &": {
      borderBottom: "none",
    },
    "&:hover": {
      backgroundColor: "white",
    },
    "&:focus": {
      backgroundColor: alpha(theme.palette.primary.main, 0.15),
      outline: 0,
    },
  },
  content: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    position: "absolute",
    alignItems: "center",
  },
  text: {
    padding: "0.5em",
    textAlign: "center",
  },
  opacity: {
    opacity: "0.5",
  },
  appointment: {
    borderRadius: "10px",
    "&:hover": {
      opacity: 0.6,
    },
  },
  apptContent: {
    "&>div>div": {
      whiteSpace: "normal !important",
      lineHeight: 1.2,
    },
  },
  flexibleSpace: {
    flex: "none",
  },
  flexContainer: {
    display: "flex",
    alignItems: "center",
  },
  tooltipContent: {
    padding: theme.spacing(3, 1),
    paddingTop: 0,
    backgroundColor: theme.palette.background.paper,
    boxSizing: "border-box",
    width: "400px",
  },
  tooltipText: {
    ...theme.typography.body2,
    display: "inline-block",
  },
  title: {
    ...theme.typography.h6,
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightBold,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  icon: {
    color: theme.palette.action.active,
    verticalAlign: "middle",
  },
  circle: {
    width: theme.spacing(4.5),
    height: theme.spacing(4.5),
    verticalAlign: "super",
  },
  textCenter: {
    textAlign: "center",
  },
  dateAndTitle: {
    lineHeight: 1.1,
  },
  titleContainer: {
    paddingBottom: theme.spacing(2),
  },
  container: {
    paddingBottom: theme.spacing(1.5),
  },
});

// #FOLD_BLOCK
const CellBase = React.memo(
  ({
    classes,
    startDate,
    formatDate,
    otherMonth,
    // #FOLD_BLOCK
  }) => {
    const iconId = Math.abs(Math.floor(Math.sin(startDate.getDate()) * 10) % 3);
    const isFirstMonthDay = startDate.getDate() === 1;
    const formatOptions = isFirstMonthDay ? { day: "numeric", month: "long" } : { day: "numeric" };
    return (
      <TableCell
        tabIndex={0}
        className={classNames({
          [classes.cell]: true,
          [classes.rainBack]: iconId === 0,
          [classes.sunBack]: iconId === 1,
          [classes.cloudBack]: iconId === 2,
          [classes.opacity]: otherMonth,
        })}
      >
        <div className={classes.content}></div>
        <div className={classes.text}>{formatDate(startDate, formatOptions)}</div>
      </TableCell>
    );
  }
);

const TimeTableCell = withStyles(styles, { name: "Cell" })(CellBase);

const Appointment = withStyles(styles, { name: "Appointment" })(({ classes, ...restProps }) => (
  <Appointments.Appointment {...restProps} className={classes.appointment} />
));

const AppointmentContent = withStyles(styles, { name: "AppointmentContent" })(({ classes, ...restProps }) => (
  <Appointments.AppointmentContent {...restProps} className={classes.apptContent} />
));

const FlexibleSpace = withStyles(styles, { name: "ToolbarRoot" })(({ classes, ...restProps }) => (
  <Toolbar.FlexibleSpace {...restProps} className={classes.flexibleSpace}></Toolbar.FlexibleSpace>
));

export default class Calendar extends React.PureComponent {
  // #FOLD_BLOCK
  constructor(props) {
    super(props);

    this.state = {
      data: appointments,
    };

    this.commitChanges = this.commitChanges.bind(this);
  }

  // #FOLD_BLOCK
  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map((appointment) =>
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment
        );
      }
      if (deleted !== undefined) {
        data = data.filter((appointment) => appointment.id !== deleted);
      }
      return { data };
    });
  }

  setCalendarEvent = (events) => {
    this.setState({ data: events });
  };

  render() {
    const { data } = this.state;

    return (
      <Paper>
        <CalendarEvent setCalendarEvent={this.setCalendarEvent}/>
        <Scheduler data={data}>
          <EditingState onCommitChanges={this.commitChanges} />
          <ViewState defaultCurrentDate={new Date()} />

          <MonthView timeTableCellComponent={TimeTableCell} dayScaleCellComponent={DayScaleCell} />

          <Appointments appointmentComponent={Appointment} appointmentContentComponent={AppointmentContent} />
          <Resources data={resources} />

          <Toolbar flexibleSpaceComponent={FlexibleSpace} />
          <DateNavigator />

          <EditRecurrenceMenu />
          <AppointmentTooltip
            headerComponent={Header}
            showCloseButton
            showDeleteButton
            //showOpenButton
          />
          <AppointmentForm />
          <DragDropProvider />
        </Scheduler>
      </Paper>
    );
  }
}
