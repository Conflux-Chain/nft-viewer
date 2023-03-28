import { memo, useState } from "react";
import Select from "rc-select";
import "rc-select/assets/index.less";
import "./index.less";

export type SearchValueType = string[];

export default memo(
  ({ onChange }: { onChange: (value: SearchValueType) => void }) => {
    const [value, setValue] = useState<SearchValueType>([]);

    return (
      <div className="relative flex grow">
        <Select
          className="search mr-2 grow"
          dropdownClassName="hidden"
          placeholder="请输入藏品 ID 或名称"
          mode="tags"
          value={value}
          onChange={(val: string[], option) => {
            onChange(val);
            setValue(val);
          }}
        >
          {value.map((v, i) => (
            <Select.Option key={`${v}${i}`}>{v}</Select.Option>
          ))}
        </Select>
        <img
          className="absolute top-[0.5625rem] left-[0.5625rem] h-[1.125rem] w-[1.125rem]"
          src="/search.svg"
        ></img>
      </div>
    );
  }
);
