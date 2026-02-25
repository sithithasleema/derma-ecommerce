interface StatusProps {
  text: string;
  color: string;
  bgColor: string;
}

const Status = ({ text, color, bgColor }: StatusProps) => {
  return (
    <div
      className={`${color} ${bgColor} px-5 py-1 text-sm rounded-full flex justify-center items-center`}
    >
      {text}
    </div>
  );
};

export default Status;
