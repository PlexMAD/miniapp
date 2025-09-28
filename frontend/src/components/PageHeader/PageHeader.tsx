import { type ReactNode } from 'react';

export const PageHeader = ({children}: {children: ReactNode}) => {
    return (
        <h1 className='text-center text-3xl font-bold'>
            {children}
        </h1>
    );
};

export default PageHeader;