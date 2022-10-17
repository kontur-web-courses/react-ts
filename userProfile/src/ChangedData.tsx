import React from 'react';

type ChangedData = {
    title: string;
    oldValue: string;
    newValue: string;
};

export const ChangedData = ({ title, oldValue, newValue }: ChangedData) => {
    return (
        <p style={{ display: oldValue && oldValue != newValue ? 'flex' : 'none' }}>
            {title}: было {oldValue} стало {newValue}
        </p>
    );
};
