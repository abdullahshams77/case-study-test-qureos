import React from 'react';
const GridTemplate = (props: any) => {
    const { children, key } = props;
    return (
        <div className="grid" key={key}>
            {React.Children.map(children, child => (
                <div className="col-12 sm:col-6 md:col-4 lg:col-4 xl:col-3">
                    {child}
                </div>
            ))}
        </div>
    );
}

export default GridTemplate;
