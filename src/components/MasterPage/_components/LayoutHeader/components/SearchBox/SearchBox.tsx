import React, { FC, useState, useEffect, useRef } from 'react';
import { Input } from 'antd';
import cn from 'classnames';
import { SearchOutlined } from '@ant-design/icons';
import './SearchBox.less';

type Props = {
    onTriggerFocus?: (focus: boolean) => void;
    responsive: null | 'narrow' | 'crowded';
}


let SearchBox: FC<Props> = ({ responsive, onTriggerFocus }) => {
    const inputRef = useRef(null);
    const [focused, setFocused] = useState(false);

    useEffect(() => {
        document.addEventListener("keyup", event => {
            if (event.keyCode === 83 && event.target === document.body) {
                inputRef.current.focus();
            }
        });
    }, []);
    
    function triggerFocus(focus: boolean) {
        setFocused(focus);
        onTriggerFocus?.(focus);
    }

    return (
        <div
            id="search-box"
            className={cn({
                'narrow-mode': responsive,
                focused,
            })}
            onClick={() => {
                inputRef.current.focus();
            }}
        >
            <SearchOutlined />
            <Input
                ref={inputRef}
                placeholder={"搜索"}
                onFocus={() => {
                    triggerFocus(true);
                }}
                onBlur={() => {
                    triggerFocus(false);
                }}
            />
        </div>
    )
}
export { SearchBox };