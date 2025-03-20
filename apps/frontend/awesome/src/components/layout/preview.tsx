const Preview = ({ src }: { src: string }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <iframe src={src} className="border-none w-full h-96" />
    </div>
  );
};

export default Preview;
