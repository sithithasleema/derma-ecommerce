interface NullDataProps {
  title: string;
}

const NullData = ({ title }: NullDataProps) => {
  return (
    <div className="w-full h-[50vh] flex items-center justify-center text-xl md:text-2xl ">
      <p className="font-semibold text-slate-700 text-4xl">{title}</p>
    </div>
  );
};

export default NullData;
