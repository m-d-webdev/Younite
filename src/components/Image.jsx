import React, { useEffect, useRef, useState } from 'react';

const Image = React.forwardRef(({ src, className, alt, width, style = {}, height, title, onClick }, ref) => {
    const [isLoaded, setLoaded] = useState(false);
    const imgRef = ref ? ref : useRef();

    return (
        < >
            {
                !isLoaded &&
                <div className='imgNotLoadingYet'></div>
            }

            <img
                // loading='lazy'
                src={src}
                ref={imgRef}
                alt={alt}
                width={width}
                onLoad={() => setLoaded(true)}
                className={`${className} c-c-c  } `}
                height={height}
                style={{
                    objectFit: "cover",
                    cursor: onClick ? 'pointer' : 'default',
                    ...style
                }}
                title={title}
                onClick={onClick}

            />

        </>
    );
});

export default Image;
