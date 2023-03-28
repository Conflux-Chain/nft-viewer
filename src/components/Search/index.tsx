import { memo, useEffect, useState } from "react";
import Select from "rc-select";
import "rc-select/assets/index.less";
import "./index.less";

export type SearchValueType = string[];

export default memo(
  ({
    onChange,
    placeholder = "",
  }: {
    onChange: (value: SearchValueType) => void;
    placeholder?: string;
  }) => {
    const [value, setValue] = useState<SearchValueType>([]);

    return (
      <div className="relative flex grow">
        <Select
          className="search mr-2 grow"
          dropdownClassName="hidden"
          placeholder={placeholder}
          mode="tags"
          value={value}
          onChange={(val: string[], option) => {
            if (val.length > value.length) {
              onChange(val);
              setValue(val);
            }
          }}
          options={[]}
          onInputKeyDown={(e) => {
            // @ts-ignore
            if (e.keyCode === 8 && !e.target.value) {
              setValue(value.slice(0, value.length - 1));
            }
          }}
        ></Select>
        <img
          className="absolute top-[0.5625rem] left-[0.5625rem] h-[1.125rem] w-[1.125rem]"
          src="/search.svg"
        ></img>
      </div>
    );
  }
);
