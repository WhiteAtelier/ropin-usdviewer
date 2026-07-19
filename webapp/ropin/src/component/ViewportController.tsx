import { Component, createSignal, onMount } from "solid-js";
import style from "./ViewportController.module.scss";
import { ApineUsdFreeCamera } from "../types/apine";

type ViewportCameraControlMode = "translate" | "rotate";
interface ViewportCameraControlState {
    roll: number;
    pitch: number;
    yaw: number;
    up: [number, number, number];
    forward: [number, number, number];
    right: [number, number, number];
    position: [number, number, number];
    mousePos: { x: number; y: number };
    mode: ViewportCameraControlMode;
}

const ViewportController: Component = () => {
    // TODO: これではカメラの切り替えとかできないのでどうにかする
    let camera: ApineUsdFreeCamera | null = null;
    onMount(() => {
        const usd_api = apine.usd.API.getInstance();
        const ids = usd_api.getAllUsdViewLayerIDs(); // TODO:
        if (ids.length > 0) {
            const layer = usd_api.getUsdViewLayerByID(ids[0])!;
            camera = layer.getViewportCamera()?.getFreeCamera() ?? null;
        }
    });

    let mouseState: ViewportCameraControlState | null = null;

    const onMouseDown = (e: MouseEvent) => {
        if (!camera) return;

        // コントロールモード決定
        let mode: ViewportCameraControlMode | null = null;
        if (e.button === 1) {
            mode = "translate";
        } else if (e.button === 0 && e.altKey) {
            mode = "rotate";
        } else {
            return;
        }

        // 開始
        mouseState = {
            roll: camera.getRoll(),
            pitch: camera.getPitch(),
            yaw: camera.getYaw(),
            up: camera.getCameraUp(),
            forward: camera.getCameraForward(),
            right: camera.getCameraRight(),
            position: camera.getPivotPosition(),
            mousePos: { x: e.clientX, y: e.clientY },
            mode: mode!,
        };
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    };
    const onMouseUp = (e: MouseEvent) => {
        mouseState = null;
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
    };
    const onMouseMove = (e: MouseEvent) => {
        if (mouseState && camera) {
            const deltaX = e.clientX - mouseState.mousePos.x;
            const deltaY = e.clientY - mouseState.mousePos.y;
            if (mouseState.mode === "translate") {
                const bias = 0.001;
                const x =
                    mouseState.up[0] * deltaY * bias -
                    mouseState.right[0] * deltaX * bias +
                    mouseState.position[0];
                const y =
                    mouseState.up[1] * deltaY * bias -
                    mouseState.right[1] * deltaX * bias +
                    mouseState.position[1];
                const z =
                    mouseState.up[2] * deltaY * bias -
                    mouseState.right[2] * deltaX * bias +
                    mouseState.position[2];
                camera.setPivotPosition([x, y, z]);
            } else {
                const bias = -0.04;
                camera.setYaw(mouseState.yaw + deltaX * bias);
                camera.setPitch(mouseState.pitch + deltaY * bias);
            }
        }
    };
    const onWheel = (e: WheelEvent) => {
        if (!camera) return;
        if (e.ctrlKey) {
            return;
        }
        const delta = e.deltaY * 0.001;
        const forward = camera.getCameraForward();
        const position = camera.getPivotPosition();
        const x = position[0] + forward[0] * delta;
        const y = position[1] + forward[1] * delta;
        const z = position[2] + forward[2] * delta;
        camera.setPivotPosition([x, y, z]);
    };

    return (
        <div
            class={style.viewportController}
            onMouseDown={onMouseDown}
            onWheel={onWheel}
        />
    );
};

export default ViewportController;
