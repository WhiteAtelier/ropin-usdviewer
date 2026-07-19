import { Component } from "solid-js";
import style from "./App.module.scss";
import "./App.scss";
import AppHeader from "./component/AppHeader/AppHeader";
import TimeCode from "./component/TimeCode";
import ViewportController from "./component/ViewportController";

const App: Component = () => {
    const onResize = () => {
        const apine_api = apine.API.getInstance();
    };

    // addEventListener("wheel", (e: WheelEvent) => {
    //     if (e.ctrlKey) {
    //         e.preventDefault();
    //         e.stopPropagation();
    //     }
    // });
    addEventListener("keydown", (e: KeyboardEvent) => {
        if (e.key === "0" && e.ctrlKey) {
            e.preventDefault();
            e.stopPropagation();
            // reset view zoom
        }
    });

    return (
        <>
            <ViewportController />
            <div class={style.app} onResize={onResize}>
                <AppHeader />
                <TimeCode />
            </div>
        </>
    );
};

export default App;
