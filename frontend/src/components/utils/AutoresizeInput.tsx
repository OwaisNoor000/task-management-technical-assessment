import React, { useRef } from 'react';

type AutoresizeInputProps = {
    className:string,
    placeholder:string
    value?:string
    setValue:(val:string)=>void
}

export default function AutoresizeInput({className,placeholder,value: defaultValue,setValue }:AutoresizeInputProps){
    const handleKeyDown = (e:any) =>{
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`; 
    // In case you have a limitation
    // e.target.style.height = `${Math.min(e.target.scrollHeight, limit)}px`;
    }

    return(
        <textarea onKeyDown={handleKeyDown} className={className} placeholder={placeholder} defaultValue={defaultValue}
        onChange={e=>{setValue(e.target.value)}}/>
    )

}