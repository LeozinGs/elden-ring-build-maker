const Container = ({ children, ...props }) => {
  return (
    <div className="container" {...props}>
      {children}
    </div>
  );
};
export default Container;
