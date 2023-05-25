import { memo, useState, useCallback, useEffect } from "react";
import Drawer from "../Drawer";
import { type NFTSetType } from "../../utils/request";

type SelectedKeys = NFTSetType["contract"][];

export default memo(
  ({
    items,
    selectedKeys: defaultSelectedKeys,
    onChange,
  }: {
    items: NFTSetType[];
    selectedKeys: SelectedKeys;
    onChange: (keys: SelectedKeys) => void;
  }) => {
    const [open, setOpen] = useState(false);
    const [selectedKeys, setSelectedKeys] =
      useState<SelectedKeys>(defaultSelectedKeys);
    const [selectedAll, setSelectedAll] = useState(
      items.length === defaultSelectedKeys.length
    );

    useEffect(() => {
      setSelectedAll(items.length === defaultSelectedKeys.length);
      setSelectedKeys(defaultSelectedKeys);
    }, [defaultSelectedKeys]);

    useEffect(() => {
      if (selectedKeys.length === items.length) {
        setSelectedAll(true);
      } else {
        setSelectedAll(false);
      }
    }, [selectedKeys]);

    const handleClose = () => {
      setOpen(false);
    };

    const onSwitch = () => {
      setOpen((open) => !open);
    };

    const handleCancel = () => {
      handleClose();
    };

    const handleConfirm = () => {
      onChange(selectedKeys);
      handleClose();
    };

    const handleSelect = (key: string) => {
      let keys = selectedKeys;

      if (selectedKeys.includes(key)) {
        keys = selectedKeys.filter((k) => k !== key);
      } else {
        keys = selectedKeys.concat(key);
      }

      setSelectedKeys(keys);
    };

    const handleSelectAll = () => {
      if (!selectedAll) {
        setSelectedKeys(items.map((t) => t.contract));
      } else {
        setSelectedKeys([]);
      }

      setSelectedAll(!selectedAll);
    };

    return (
      <>
        <div
          className="flex h-9 w-9 items-center justify-center bg-[#F5F5F5]"
          onClick={onSwitch}
        >
          <img src="/filter.svg" className="h-[1.125rem] w-[1.125rem]"></img>
        </div>
        <Drawer
          open={open}
          onClose={handleClose}
          title="筛选"
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        >
          <div className="flex h-full flex-col">
            <div className="mb-3 shrink-0">
              <div className="item control" onClick={handleSelectAll}>
                <span>
                  <img
                    src="/square.svg"
                    className={`h-[1.125rem] w-[1.125rem] ${
                      selectedAll ? "bg-cBlack" : ""
                    }`}
                  ></img>
                </span>
                <span className="ml-2.5 grow">所有系列</span>
              </div>
            </div>
            <div className="overflow-auto">
              {items.map((t) => (
                <div
                  className={`item ${
                    selectedKeys.includes(t.contract) ? "selected" : ""
                  }`}
                  key={t.contract}
                  onClick={() => handleSelect(t.contract)}
                >
                  {t.name}
                </div>
              ))}
            </div>
          </div>
        </Drawer>
      </>
    );
  }
);
