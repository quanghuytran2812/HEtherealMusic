import { Logo, SearchBar, UserAuthentication } from "./componentHeader";

const Header = () => {
  return (
    <div className="h-[64px] flex items-center justify-between p-2 m-[-8px] relative">
      <Logo />
      <div className="flex flex-1 absolute left-0 right-0 justify-center items-center w-full">
        <SearchBar />
      </div>
      <UserAuthentication />
    </div>
  );
};

export default Header;
