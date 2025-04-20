const TokenBox = ({ label, value, style }: { label: string; value: string; style?: React.CSSProperties }) => (
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8, gap: 16 }}>
    <div style={{ width: 200 }}>{label}</div>
    <div style={{ ...style, minWidth: 100, height: 40, border: '1px solid #eee' }} />
    <code style={{ marginLeft: 16 }}>{value}</code>
  </div>
);

export default TokenBox;
