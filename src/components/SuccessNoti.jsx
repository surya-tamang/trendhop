const SuccessNoti = ({ message }) => {
  return (
    <div className="fixed top-5 left-4/12  max-w-sm w-52 p-4 rounded shadow-sm z-40 bg-green flex items-center justify-center gap-3">
      <div className="text-lg">
        <span className="text-white"> {message}</span>
      </div>
      <div className="rounded-full bg-white text-green py-1 px-2.5">
        <i className="fa-solid fa-check"></i>
      </div>
    </div>
  );
};

export default SuccessNoti;
