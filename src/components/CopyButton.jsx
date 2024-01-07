import * as React from "react";
function CopyButton(props) {

    const copyText = () => {
        const textToCopy = document.getElementById(props.elem);
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy.innerText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    };

    if(props.elem !== ''){
        return (
            <>
                <button onClick={copyText}>Copiar Texto</button>
            </>
        );
    }
}

export default CopyButton;
