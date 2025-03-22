type GameLayoutProps = {
  children: React.ReactNode;
};

const GameLayout = ({ children }: GameLayoutProps) => {
  return <section className="flex flex-1 relative">{children}</section>;
};

export default GameLayout;
