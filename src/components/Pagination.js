import _ from "lodash";
import React from "react";

const renderPages = (pages, currentPage, onSelectClick) =>
  _.times(pages, i => (
    <li
      key={i}
      className={i + 1 === currentPage ? "active" : ""}
      style={{ cursor: "pointer" }}
    >
      <a href="#!" data-page={i + 1} onClick={onSelectClick}>
        {i + 1}
      </a>
    </li>
  ));

const Pagination = ({
  pages,
  currentPage,
  onBackClick,
  onNextClick,
  onSelectClick
}) => {
  return (
    <div className="row">
      <ul className="pagination center-align">
        <li
          className={currentPage <= 1 ? "disabled" : ""}
          style={{ cursor: "pointer" }}
        >
          <a href="#!" onClick={onBackClick}>
            <i className="material-icons">chevron_left</i>
          </a>
        </li>

        {renderPages(pages, currentPage, onSelectClick)}

        <li
          className={currentPage >= pages ? "disabled" : ""}
          style={{ cursor: "pointer" }}
        >
          <a href="#!" onClick={onNextClick}>
            <i className="material-icons">chevron_right</i>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
