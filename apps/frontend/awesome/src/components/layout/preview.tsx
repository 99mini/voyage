const Preview = ({ children }: { children: React.ReactNode }) => {
  return <div className="border rounded-lg py-4 px-8 shadow-md max-h-[400px] overflow-y-auto">{children}</div>;
};

export default Preview;
