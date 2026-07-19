import { Component, JSXElement } from "solid-js";
import style from "./HeaderMenuItemSectionLabel.module.scss";

const HeaderMenuItemSectionLabel: Component<{ label: JSXElement | string }> = (
    props,
) => {
    return <div class={style.headerMenuItemSectionLabel}>{props.label}</div>;
};

export default HeaderMenuItemSectionLabel;
