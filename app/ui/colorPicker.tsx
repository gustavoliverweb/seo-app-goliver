"use client";
import React, { forwardRef } from "react";
import { ChromePicker } from "react-color";

interface ColorPickerProps {
  setColor: (
    color: string
  ) => void | React.Dispatch<React.SetStateAction<string>>;
  color: string;
  showPicker: boolean;
  setShowPicker: React.Dispatch<React.SetStateAction<boolean>>;
  left?: string;
}
type Ref = HTMLDivElement;

export const ColorPicker = forwardRef<Ref, ColorPickerProps>(
  function ColorPicker(props, ref) {
    const { setShowPicker, showPicker, left, color, setColor } =
      props as ColorPickerProps;
    const handleClickShowColorPicker = () => {
      setShowPicker(!showPicker);
    };

    return (
      <div
        style={
          {
            // border: "2px solid blue",
          }
        }
        className="relative"
      >
        <div
          onClick={handleClickShowColorPicker}
          className="color-picker relative mt-2 rounded-md w-fit cursor-pointer"
        >
          <div className="w-36 relative flex items-center gap-2 rounded-md border border-gray-200 p-2">
            <div
              className="w-10 h-10 border border-gray-200 rounded-md"
              style={{ background: color }}
            ></div>
            <div>{color}</div>
          </div>
        </div>
        {showPicker ? (
          <div
            style={{ left: left ? left : "40px" }}
            className="color-picker-hex absolute left-10 top-[-244px] z-10"
            data-open={showPicker}
            ref={ref as React.RefObject<HTMLDivElement>}
          >
            <ChromePicker
              color={color}
              onChange={(colorChange) => setColor(colorChange.hex)}
            />
          </div>
        ) : null}
      </div>
    );
  }
);
