const Navbar = () => {
  return (
    <div className="h-[60px] bg-white m-4 rounded-lg">
      <div className="font-medium rounded-lg text-xl flex justify-center items-center bg-blue-500">
        <img className="m-2" width={25} height={25} src="/firebase.svg" />
        <h1>Contact App</h1>
      </div>
    </div>
  );
};

export default Navbar;
