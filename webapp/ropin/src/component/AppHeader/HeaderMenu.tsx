import { Component, ParentComponent } from "solid-js";
import style from "./HeaderMenu.module.scss";

const HeaderMenu: ParentComponent = (props) => {
    const onClick = (e: MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div class={style.headerMenu} onClick={onClick}>
            {props.children}
        </div>
    );
};

export default HeaderMenu;
