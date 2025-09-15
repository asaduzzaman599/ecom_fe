'use client'
import React from "react";
import { MuiColorInput, matchIsValidColor } from "mui-color-input";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type Props<T extends FieldValues> = {
    control: Control<T>
    name: Path<T>
}
export default function ColorInput<T  extends FieldValues> ({control, name}: Props<T>) {
 

  return (
      <Controller
        name={name}
        control={control}
        rules={{ validate: matchIsValidColor }}
        render={({ field, fieldState }) => (
          <MuiColorInput
            {...field}
            format="hex"
            helperText={fieldState.invalid ? "Color is invalid" : ""}
            error={fieldState.invalid}
          />
        )}
      />
  )
}