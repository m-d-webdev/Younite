

function Rotate_svg({ condition }) {
    return (
        <>
            {
                condition ?
                    <svg style={{
                        transition: ".2s",
                        transform: "rotate(180deg)"
                    }} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" /></svg>

                    :
                    <svg style={{
                        transition: ".2s",
                        transform: "rotate(0deg)"
                    }} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" /></svg>
            }
        </>
    )
}

export default Rotate_svg
