interface Props {
  items: {
    key: string;
    label: React.ReactNode;
    children: React.ReactNode;
  }[];
  defaultActiveKey?: string;
  activeKey?: string;
  onChange?: (key: string) => void;
}

export default ({
  items,
  defaultActiveKey,
  activeKey,
  onChange = () => {},
}: Props) => {
  return (
    <div>
      <div className="mb-4 flex justify-around">
        {items.map((t) => (
          <span
            key={t.key}
            className={`tabs-title ${
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
