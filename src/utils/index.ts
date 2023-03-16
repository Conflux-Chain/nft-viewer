import { FORMAT_ADDRESS_CONFIG } from "./const";

const publishRequestError = (opts: any, type?: string) => {
  console.log("publishRequestError: ", opts, type);
};

const formatAddress = (
  address: string,
  front: number = FORMAT_ADDRESS_CONFIG.front,
  end: number = FORMAT_ADDRESS_CONFIG.end
) => {
  return address?.replace(new RegExp(`(.{${front}}).*(.{${end}})`), "$1...$2");
};

export { publishRequestError, formatAddress };
