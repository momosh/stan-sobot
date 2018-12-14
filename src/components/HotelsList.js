import _ from "lodash";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";

import Hotel from "./Hotel";

import {
  fetchHotels,
  nextHotelPage,
  prevHotelPage,
  selectHotelPage
} from "../actions";
import Pagination from "./Pagination";

const currentPageSelector = state => state.hotels.currentPage;
const pagesSelector = state => state.hotels.pages;
const allHotelsSelector = state => state.hotels.all;

const hotelsPerPageSelector = createSelector(
  allHotelsSelector,
  pagesSelector,
  currentPageSelector,
  (hotels, pages, currentPage) =>
    _.pick(hotels, _.get(pages[currentPage], "ids"))
);

class HotelsList extends React.Component {
  componentDidMount() {
    this.props.fetchHotels();
  }

  handleDetailsClick = hotelId => e =>
    this.props.history.push("hotels/details", { hotelId });

  handlePaginationBackClick = () => this.props.prevHotelPage();

  handlePaginationNextClick = () => this.props.nextHotelPage();

  handlePaginationSelectClick = e => {
    const { page } = e.target.dataset;
    this.props.selectHotelPage(parseInt(page));
  };

  renderHotels = () => {
    const { hotels } = this.props;

    return _.map(hotels, hotel => (
      <Hotel
        key={hotel.id}
        data={hotel}
        onDetailsClick={this.handleDetailsClick}
      />
    ));
  };

  render() {
    const { pagesNum, currentPage, hotels } = this.props;

    return (
      <Fragment>
        <div className="row">
          <h3>Nice hotels for you my friend</h3>

          <table className="striped responsive-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>City</th>
                <th>Country</th>
                <th>Price</th>
                <th>Stars</th>
                <th>Details</th>
              </tr>
            </thead>

            <tbody>{this.renderHotels()}</tbody>
          </table>
        </div>

        {_.isEmpty(hotels) && (
          <div className="progress">
            <div className="indeterminate" />
          </div>
        )}

        {!_.isEmpty(hotels) && (
          <Pagination
            currentPage={currentPage}
            pages={pagesNum}
            onBackClick={this.handlePaginationBackClick}
            onNextClick={this.handlePaginationNextClick}
            onSelectClick={this.handlePaginationSelectClick}
          />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  hotels: hotelsPerPageSelector(state),
  currentPage: currentPageSelector(state),
  pagesNum: state.hotels.pagesNum
});

export default connect(
  mapStateToProps,
  { fetchHotels, prevHotelPage, nextHotelPage, selectHotelPage }
)(HotelsList);
