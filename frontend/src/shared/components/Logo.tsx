import logo from '../assets/UNIwise_logo.png';


type LogoProps = {
  width?: number;
  height?: number;
};

export const Logo: React.FC<LogoProps> = ({
  width = 120,
  height = 120,

}) => {
  return (
    <img
      src={logo}
      width={width}
      height={height}
    />
  );
};