import _ from "lodash";
import React, { Fragment } from "react";
import { connect } from "react-redux";

import Slideshow from "./Slideshow";
import Comments from "./Comments";
import {
  fetchHotelImages,
  fetchHotelComments,
  sendHotelComment
} from "../actions";

class HotelDetails extends React.Component {
  state = {
    showComments: false,
    fullName: "",
    comment: ""
  };

  componentDidMount() {
    const {
      location: {
        state: { hotelId }
      }
    } = this.props;

    this.props.fetchHotelImages(hotelId);
    this.props.fetchHotelComments(hotelId);
  }

  handleBackClick = () => {
    const { history } = this.props;
    history.push("/hotels");
  };

  handleCommentsClick = () => {
    this.setState((prevState, props) => {
      return { showComments: !prevState.showComments };
    });
  };

  handleNameChange = e => this.setState({ fullName: e.target.value });

  handleCommentChange = e => this.setState({ comment: e.target.value });

  handleSendComment = () => {
    const { fullName, comment } = this.state;
    const {
      sendHotelComment,
      fetchHotelComments,
      location: {
        state: { hotelId }
      }
    } = this.props;

    sendHotelComment(hotelId, fullName, comment);
    fetchHotelComments(hotelId);
    this.setState({ showComments: true, fullName: "", comment: "" });
  };

  renderStars = () => {
    const {
      details: { stars }
    } = this.props;

    let _stars = [];
    _.times(stars, i =>
      _stars.push(
        <i key={i} className="material-icons tiny" style={{ width: "20px" }}>
          star_rate
        </i>
      )
    );

    return _stars;
  };

  render() {
    const { images, details, comments } = this.props;
    const { showComments, fullName, comment } = this.state;

    return (
      <Fragment>
        <div className="section">
          <button className="btn btn-medium" onClick={this.handleBackClick}>
            <i className="material-icons left">arrow_back</i>
            Back to hotels
          </button>
        </div>

        <div className="row">
          <div className="col s12 m5">
            <Slideshow images={images} showThumbnails={false} />
          </div>
          <div className="col s12 m7">
            <div className="row">
              <div className="col s8">
                <h4 style={{ marginTop: 0 }}>{details.name}</h4>
              </div>
              <div
                className="col s4 right-align"
                style={{ paddingTop: "10px" }}
              >
                {this.renderStars()}
              </div>
            </div>

            <div className="row">
              <div className="col s12">
                {`${details.city}, ${details.country}`}
              </div>
            </div>

            <div className="row">
              <div className="col s12">
                <p className="flow-text">{details.description}</p>
              </div>
            </div>

            <div className="row">
              <div className="col s4">
                <button
                  className="btn btn-small"
                  onClick={this.handleCommentsClick}
                >
                  {!showComments && "Show reviews"}
                  {showComments && "Hide reviews"}
                </button>
              </div>
              <div className="col s3 offset-s5 right-align">
                {details.date_created}
              </div>
            </div>
          </div>
        </div>

        {showComments && <Comments items={comments} />}

        <div className="row">
          <h5>Add your precious comment</h5>
          <div className="input-field col s4">
            <input
              id="name"
              name="name"
              type="text"
              value={fullName}
              placeholder="Your glorious name"
              onChange={this.handleNameChange}
            />
            <label htmlFor="name" className="active">
              Name
            </label>
          </div>
          <div className="input-field col s12">
            <input
              id="comment"
              name="comment"
              type="text"
              value={comment}
              placeholder="Your nice comment"
              onChange={this.handleCommentChange}
            />
            <label htmlFor="comment" className="active">
              Comment
            </label>
          </div>
        </div>
        <div className="row">
          <button
            className="btn"
            onClick={this.handleSendComment}
            disabled={!fullName && !comment}
          >
            Send it <i className="material-icons right">send</i>
          </button>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (
  { hotels: { images, all, comments } },
  {
    location: {
      state: { hotelId }
    }
  }
) => ({ images, details: all[hotelId], comments });

export default connect(
  mapStateToProps,
  { fetchHotelImages, fetchHotelComments, sendHotelComment }
)(HotelDetails);
