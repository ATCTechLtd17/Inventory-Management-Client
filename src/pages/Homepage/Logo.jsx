import logoimg from "./../../assets/Cosmo-logo.jpg";

const Logo = () => {
  return (
    <div className="flex items-center gap-3 p-2 md:p-4">
      {/* Logo Image */}
      <div className="h-12 w-12 md:h-16 md:w-16 flex-shrink-0">
        <img
          src={logoimg}
          alt="logo"
          className="h-full w-full object-cover rounded-xl"
        />
      </div>

      {/* Logo Text */}
      <h5 className="text-xs md:text-sm lg:text-lg font-semibold tracking-wide text-white">
       InvenTory 
       {/* <span className="text-red-500">গ্রন্থ</span> কুটির */}
      </h5>
    </div>
  );
};

export default Logo;
