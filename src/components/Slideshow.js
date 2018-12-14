import _ from "lodash";
import React from "react";
import ImageGallery from "react-image-gallery";

const Slideshow = ({ images, ...rest }) => {
  if (_.isEmpty(images)) {
    return (
      <div className="progress">
        <div className="indeterminate" />
      </div>
    );
  }

  return <ImageGallery items={images} {...rest} />;
};

export default Slideshow;
