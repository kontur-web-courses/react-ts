import React, { ReactNode } from 'react';

type Task = {
    id: string;
    children: ReactNode;
};

export const Task = ({ id, children }: Task) => (
    <div>
        <h2>Task {id}</h2>
        {children}
    </div>
);
