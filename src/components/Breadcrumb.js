import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <nav className="text-gray-600 text-sm mt-4">
            <Link to="/">Home</Link>
            {pathnames.map((value, index) => {
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                return (
                    <span key={to}>
                        {' / '}
                        <Link to={to} className="hover:underline">
                            {value.charAt(0).toUpperCase() + value.slice(1)}
                        </Link>
                    </span>
                );
            })}
        </nav>
    );
};

export default Breadcrumb;
