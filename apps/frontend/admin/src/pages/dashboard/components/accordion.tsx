const Accordion = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <details>
      <summary className="mb-2 cursor-pointer">{title}</summary>
      {children}
    </details>
  );
};

export default Accordion;
