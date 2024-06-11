/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { Select, SelectItem } from "@nextui-org/select";
import { useState } from "react";

export default function SelectComponent({
  stateClient,
  setCreateClient,
  isSendForm,
  setSendForm,
  value,
}) {
  const statusObjectDefault = {
    proposal: "Propuesta",
    open: "Abierto",
    lost: "Perdido",
    won: "Ganado",
  };
  const [defaultValue, setDefaultValue] = useState(
    new Set([statusObjectDefault[value]])
  );
  // console.log(value);
  const handleMouseEnter = (e) => {
    const target = e.target.closest("[role=option]");
    switch (e.target.innerText) {
      case "Abierto":
        target.style.background = "#8E4188";
        break;
      case "Propuesta":
        target.style.background = "#575793";
        break;
      case "Perdido":
        target.style.background = "#490C0C";
        break;
      case "Ganado":
        target.style.background = "#348D5B";
        break;
    }
  };
  const handleMouseLeave = (e) => {
    const target = e.target.closest("[role=option]");
    switch (e.target.innerText) {
      case "Abierto":
        target.style.background = "#e667dc";
        break;
      case "Propuesta":
        target.style.background = "#7c7cd3";
        break;
      case "Perdido":
        target.style.background = "#6F1313";
        break;
      case "Ganado":
        target.style.background = "#4CD88A";
        break;
    }
  };

  const handleChange = (e) => {
    if (isSendForm) setSendForm(false);
    const statusObject = {
      Propuesta: "proposal",
      Abierto: "open",
      Perdido: "lost",
      Ganado: "won",
    };
    setDefaultValue(new Set([e.currentKey]));
    setCreateClient((prev) => ({
      ...prev,
      status: statusObject[e.currentKey],
    }));
    setSendForm(true);
  };
  // console.log(value);
  return (
    <Select
      onSelectionChange={handleChange}
      selectedKeys={defaultValue}
      // defaultSelectedKeys={value}
      label="Estado"
      className="max-w-s "
      variant="bordered"
      classNames={{
        trigger:
          "h-12 data-[hover=true]:hover:border-[#794BD8] data-[focus=true]:border-[#794BD8]",
        listbox: "p-0 bg-transparent",
        listboxWrapper: "bg-transparent",
      }}
      popoverProps={{
        classNames: {
          content: "p-0 shadow shadow-transparent",
        },
      }}
    >
      {stateClient.map((item) => (
        <SelectItem
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          key={item.label}
          value={item.id}
          style={{
            background: item.color,
            color: "white",
            textAlign: "center",
          }}
        >
          {item.label}
        </SelectItem>
      ))}
    </Select>
  );
}
