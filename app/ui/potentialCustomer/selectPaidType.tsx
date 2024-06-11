/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { Select, SelectItem } from "@nextui-org/select";
import { useState } from "react";

export default function SelectPaidType({
  paidType,
  setCreateClient,
  isSendForm,
  setSendForm,
  value,
}) {
  const paidTypeObjectDefault = {
    monthly: "Mensual",
    punctual: "Puntual",
  };
  const [defaultValue, setDefaultValue] = useState(
    new Set([paidTypeObjectDefault[value]])
  );
  const handleChange = (e) => {
    if (isSendForm) setSendForm(false);
    const statusObject = {
      Mensual: "monthly",
      Puntual: "punctual",
    };
    setDefaultValue(new Set([e.currentKey]));
    setCreateClient((prev) => ({
      ...prev,
      paid_type: statusObject[e.currentKey],
    }));
    setSendForm(true);
  };
  return (
    <Select
      onSelectionChange={handleChange}
      selectedKeys={defaultValue}
      label="Tipo de pago"
      className="max-w-s"
      variant="bordered"
      classNames={{
        trigger:
          "h-12 data-[hover=true]:hover:border-[#794BD8] data-[focus=true]:border-[#794BD8]",
        listbox: "p-0 shadow-transparent",
        listboxWrapper: "shadow-transparent",
      }}
      popoverProps={{
        classNames: {
          content: "p-0 shadow shadow-transparent",
        },
      }}
    >
      {paidType.map((item) => (
        <SelectItem
          key={item.label}
          value={item.id}
          style={{
            textAlign: "center",
          }}
        >
          {item.label}
        </SelectItem>
      ))}
    </Select>
  );
}
