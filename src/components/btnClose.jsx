
function BtnClose({ onClick, style= { } }) {
    return (
        <button className="btnClose" onClick={onClick} style={style}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
        </button>
    )
}

export default BtnClose
