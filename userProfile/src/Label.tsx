import React, { ReactNode } from 'react';

interface Props {
    name: string;
    children?: ReactNode;
}

const Label = ({ name, children }: Props) => {
    return (
        <label>
            <span className={'label-text'}>{name}</span>
            {children}
        </label>
    );
};

export default Label;
