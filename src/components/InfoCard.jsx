import PropTypes from "prop-types";

function InfoCard({ title, description }) {
  return (
    <div className="col-6 col-md-4 d-flex align-items-center">
      <h4 className="h6">
        {title} : {description}
      </h4>
    </div>
  );
}

InfoCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.any,
};

export default InfoCard;
