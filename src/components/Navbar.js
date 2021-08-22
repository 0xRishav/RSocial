import DesktopButtons from "./DesktopButtons";
import Logo from "./Logo";
import { NavDiv } from "../pages/Landing";

const Navbar = () => {
  return (
    <div>
      <NavDiv>
        <Logo />
        <DesktopButtons />
      </NavDiv>
    </div>
  );
};

export default Navbar;
