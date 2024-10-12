import "./loader.styles.css";

const Loader = ({ size = 50 }) => {
  return (
    <div className="loader" style={{ width: size, height: size }}>
      <div className="inner-circle"></div>
    </div>
  );
};

export default Loader;
