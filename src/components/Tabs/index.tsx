interface Props {
  items: {
    key: string;
    label: React.ReactNode;
    children: React.ReactNode;
  }[];
  defaultActiveKey?: string;
  activeKey?: string;
  onChange?: (key: string) => void;
  type?: "center" | "left";
}

export default ({
  items,
  defaultActiveKey,
  activeKey,
  onChange = () => {},
  type = "center",
}: Props) => {
  const justify = type === "center" ? "justify-around" : "";

  return (
    <div>
      <div className={`mb-4 flex ${justify}`}>
        {items.map((t) => (
          <span
            key={t.key}
            className={`tabs-title ${type} ${
              t.key === (activeKey || defaultActiveKey) ? "active" : ""
            }`}
            onClick={() => onChange(t.key)}
          >
            {t.label}
          </span>
        ))}
      </div>
      <div>
        {
          items.filter((t) => t.key === activeKey || defaultActiveKey)?.[0]?.[
            "children"
          ]
        }
      </div>
    </div>
  );
};
