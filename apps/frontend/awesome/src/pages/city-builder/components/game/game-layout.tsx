type GameLayoutProps = {
  children: React.ReactNode;
};

const GameLayout = ({ children }: GameLayoutProps) => {
  return <section className="flex flex-1 relative border border-gray-800 border-2">{children}</section>;
};

export default GameLayout;
