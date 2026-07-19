import {
    createEffect,
    createSignal,
    JSXElement,
    ParentComponent,
    Show,
} from "solid-js";
import style from "./MenuButton.module.scss";

const MenuButton: ParentComponent<{
    id: string;
    openedMenuID: string; // Global 状態
    onOpenMenu: (key: string) => void; // 開いたときに呼ぶ, Global 状態を更新
    label?: JSXElement | string;
    rightSide?: boolean;
}> = (props) => {
    const [isOpen, setIsOpen] = createSignal(false);

    createEffect(() => {
        if (props.openedMenuID !== props.id) {
            setIsOpen(false);
        }
    });
    const onClick = () => {
        if (isOpen()) {
            setIsOpen(false);
            props.onOpenMenu("");
        } else {
            setIsOpen(true);
            props.onOpenMenu(props.id);
        }
    };
    const onMouseMove = () => {
        if (props.openedMenuID !== "" && props.openedMenuID !== props.id) {
            setIsOpen(true);
            props.onOpenMenu(props.id);
        }
    };

    return (
        <div
            class={style.menuButton}
            classList={{
                [style.opened]: isOpen(),
                [style.menuLeftSide]: !props.rightSide,
                [style.menuRightSide]: props.rightSide,
            }}
            onClick={onClick}
            onMouseMove={onMouseMove}
        >
            <p class={style.menuLabel}>{props.label}</p>
            <Show when={isOpen()}>
                <div class={style.menuContents}>{props.children}</div>
            </Show>
        </div>
    );
};

export default MenuButton;
