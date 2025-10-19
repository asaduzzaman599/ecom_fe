'use client'
import React from "react";
import { MuiColorInput, matchIsValidColor } from "mui-color-input";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import styled from '@emotion/styled'


const MuiColorInputStyled = styled(MuiColorInput)`
  & .MuiOutlinedInput-root {
    width: 100%;
    border-radius: 0.375rem; /* rounded-md */
    background-color: #ffffff; /* bg-white */
    padding: 0.375rem 0.75rem; /* py-1.5 px-3 */
    font-size: 1rem; /* text-base */
    line-height: 1.5rem;
    color: #111827; /* text-gray-900 */

    /* Default border */
    outline: 1px solid #fff; /* gray-300 */
    outline-offset: -1px;
    transition: outline 0.2s, outline-offset 0.2s;

    /* Focus state */
    &:focus-within {
      outline: 2px solid #4f46e5; /* indigo-600 */
      outline-offset: -2px;
    }

    /* Error state */
    &.Mui-error {
      outline: 2px solid #dc2626; /* red-600 */
      outline-offset: -2px;
    }

    /* Small screens */
    @media (min-width: 640px) {
      width: 100%;
      font-size: 0.875rem; /* text-sm */
      line-height: 1.5rem; /* leading-6 */
    }
  }

  & .MuiOutlinedInput-input {
    width: 100%;
    padding: 0; /* remove default MUI padding */
  }

  & .MuiInputBase-input::placeholder {
    width: 100%;
    color: #9ca3af; /* gray-400 */
    opacity: 1;
  }
`;
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
          <MuiColorInputStyled
            {...field}
            format="hex"
                  fullWidth     
            helperText={fieldState.invalid ? "Color is invalid" : ""}
            error={fieldState.invalid}
          />
        )}
      />
  )
}