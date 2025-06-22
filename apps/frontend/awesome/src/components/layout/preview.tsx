const Preview = ({ children }: { children: React.ReactNode }) => {
  return <div className="border rounded-lg p-4 shadow-md max-h-[400px] overflow-y-auto">{children}</div>;
};

export default Preview;
