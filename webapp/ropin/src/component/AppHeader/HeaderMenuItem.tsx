import { Component, JSXElement } from "solid-js";
import style from "./HeaderMenuItem.module.scss";

const HeaderMenuItem: Component<{
    label: string;
    icon?: JSXElement;
    onClick?: (e: MouseEvent) => void;
}> = (props) => {
    return (
        <div class={style.headerMenuItem} onClick={props.onClick}>
            <div class={style.icon}>{props.icon}</div>
            <p class={style.label}>{props.label}</p>
        </div>
    );
};

export default HeaderMenuItem;
