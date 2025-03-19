type WheelTextProps = {
  text: string;
};

const WheelText = ({ text }: WheelTextProps) => {
  const textArray = text.split('');
  return (
    <div className="flex gap-4 justify-center items-center w-full">
      {textArray.map((char, index) => (
        <span key={index} className="text-2xl font-bold">
          {char}
        </span>
      ))}
    </div>
  );
};

export default WheelText;
