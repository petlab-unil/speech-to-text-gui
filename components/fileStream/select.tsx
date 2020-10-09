import React, {ChangeEvent} from 'react';
import {StyledSelect} from "@components/fileStream/input";

export interface SelectOptions {
    text: string,
    value: string | number
}

interface SelectProps {
    options: SelectOptions[],
    value: string | number,
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

export const Select = ({options, value, onChange}: SelectProps) => {
    return (
        <StyledSelect value={value}
                onChange={(e) => onChange(e)}>
            {options
                .map(({text, value}) =>
                    <option key={value} value={value}>{text}</option>
                )}
        </StyledSelect>
    )
}