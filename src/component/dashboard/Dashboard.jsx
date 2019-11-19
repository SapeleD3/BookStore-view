import React from "react";
import "../Home/styles.scss";
import { withStyles, useTheme, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import TablePagination from "@material-ui/core/TablePagination";
import Button from '@material-ui/core/Button'
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import { Link } from "react-router-dom";
// import Button from "@material-ui/core/Button";
//redux
import { connect } from "react-redux";
import { getUser } from "../../Redux/actions/userAction";
import { getMyStory, deleteAstory } from "../../Redux/actions/storyAction";

const styles = theme => ({
  root: {
    flexShrink: 0,
    margin: "auto",
    width: "90%",
    overflowX: "auto"
  },
  title: {
    color: "black"
  },
  table: {
    minWidth: 650
  },
  header: {
    background: "grey"
  }
});

const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5)
  }
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = event => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = event => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      page: 0,
      rowsPerPage: 5
    };
  }

  componentDidMount() {
    this.props.getMyStory();
  }

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: parseInt(event.target.value, 10) });
    this.setState({ page: 0 });
  };

  createData = (title, date, status) => {
    return { title, date, status };
  };

  handleDelete = (id) => {
    this.props.deleteAstory(id)
  }

  render() {
    const {
      classes,
      story: { story },
      user: { userData }
    } = this.props;
    const { page, rowsPerPage } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, story.length - page * rowsPerPage);

    return (
      <div className="welcome text-center">
        <div>
          <h3 className="greet">Welcome {userData.name}</h3>
          <p>Welcome to StoryBooks 1.0.0</p>
          <p>
            Post stories from the best and worst of your life and choose for
            them to be read by the world or completley private as your own
            personal diary
          </p>
          <Paper className={classes.root}>
            <Table className={classes.table} aria-label="paginated table">
              <TableHead className={classes.header}>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell align="left">Date</TableCell>
                  <TableCell align="left">Status</TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {story[0] ? story.map(row => (
                  <TableRow key={row._id}>
                        <TableCell
                          component="th"
                          scope="row"
                          className={classes.title}
                        >
                          <Link to={`/stories/${row._id}`}>{row.title}</Link>
                        </TableCell>
                        <TableCell align="left">
                          {moment(row.date).format("MMMM Do YYYY")}
                        </TableCell>
                        <TableCell align="left">{row.status}</TableCell>
                        <TableCell align="right">
                          <Link to={`/stories/edit/${row._id}`}>
                            <Button variant="success">
                              <i
                                className="fa fa-pencil"
                                style={{ marginRight: 5 }}
                              ></i>
                              Edit
                            </Button>
                          </Link>
                        </TableCell>
                        <TableCell align="right">
                          <Button onClick={() => this.handleDelete(row._id)}>
                            <i
                              className="fa fa-remove"
                              style={{ marginRight: 5 }}
                            ></i>
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                ) : <TableRow><p>Loading......</p></TableRow>}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    colSpan={3}
                    count={story.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: { "aria-label": "rows per page" },
                      native: true
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </Paper>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  story: state.story,
  UI: state.UI
});

const mapActionsToProps = {
  getUser,
  getMyStory,
  deleteAstory
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Dashboard));
