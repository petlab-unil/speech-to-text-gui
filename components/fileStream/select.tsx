import React, {ChangeEvent} from 'react';
import {StyledSelect} from "@components/fileStream/input";

export interface SelectOptions {
    text: string,
    value: string | number
}

interface SelectProps {
    options: SelectOptions[],
    value: string | number,
    right: boolean,
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

export const Select = ({options, value, onChange, right}: SelectProps) => {
    return (
        <StyledSelect value={value} right={right}
                onChange={(e) => onChange(e)}>
            {options
                .map(({text, value}) =>
                    <option key={value} value={value}>{text}</option>
                )}
        </StyledSelect>
    )
}