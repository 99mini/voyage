type DescriptionProps = {
  children: React.ReactNode;
};

const Description = ({ children }: DescriptionProps) => {
  return <p className="text-sm text-gray-400 my-1">{children}</p>;
};

export default Description;
