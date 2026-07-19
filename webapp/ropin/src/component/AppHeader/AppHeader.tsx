import {
    Component,
    createSignal,
    onMount,
    ParentComponent,
    Show,
} from "solid-js";
import style from "./AppHeader.module.scss";
import HeaderMenu from "./HeaderMenu";
import HeaderMenuItem from "./HeaderMenuItem";
import MenuButton from "./MenuButton";
import HeaderMenuItemSeparator from "./HeaderMenuItemSeparator";
import HeaderMenuItemSectionLabel from "./HeaderMenuItemSectionLabel";

const [filePath, setFilePath] = createSignal("");

const openStage = () => {
    window.showOpenFilePicker({ multiple: false });
};

const resetFreeCamera = () => {
    const usd_api = apine.usd.API.getInstance();
    usd_api.getAllUsdViewLayerIDs().forEach((layerID) => {
        const freeCamera = usd_api
            .getUsdViewLayerByID(layerID)
            ?.getViewportCamera()
            ?.getFreeCamera();
        if (freeCamera) {
            freeCamera.setPivotPosition([0, 0, 0]);
            freeCamera.setRoll(0);
            freeCamera.setYaw(45);
            freeCamera.setPitch(-30);
        }
    });
};

const AppHeader: Component = () => {
    onMount(() => {
        const usd_api = apine.usd.API.getInstance();
        const stage = usd_api.getCurrentStage();
        if (stage) {
            const usdFilePath = stage.getRootLayerIdentifier();
            setFilePath(usdFilePath);
        } else {
            setFilePath("Untitled");
        }
    });

    const [openedMenuID, setOpenedMenuID] = createSignal("");
    const closeAndCall = (callback: () => void) => {
        setOpenedMenuID("");
        callback();
    };

    return (
        <>
            <div class={style.appHeader}>
                <div class={style.sideArea}>
                    <div class={style.appTitle}>
                        <p>ropin</p>
                    </div>

                    {/*****************************************************************************
                     * Stage Menu
                     ****************************************************************************/}
                    <MenuButton
                        id="stage"
                        openedMenuID={openedMenuID()}
                        onOpenMenu={setOpenedMenuID}
                        label={
                            <>
                                <i class="fa-solid fa-earth-asia fa-fw" />
                                <p class={style.buttonLabel}>Stage</p>
                            </>
                        }
                    >
                        <HeaderMenu>
                            <HeaderMenuItem
                                label="Open stage..."
                                icon={<i class="fa-solid fa-file" />}
                                onClick={() => closeAndCall(openStage)}
                            />
                            <HeaderMenuItemSeparator />
                            <HeaderMenuItem
                                label="Reload stage"
                                icon={<i class="fa-solid fa-arrows-rotate" />}
                            />
                            <HeaderMenuItem
                                label="Browse stage root layer"
                                icon={<i class="fa-solid fa-folder-open" />}
                            />
                            <HeaderMenuItemSeparator />
                            <HeaderMenuItem
                                label="Show stage prim tree"
                                icon={<i class="fa-solid fa-bars-staggered" />}
                            />
                            <HeaderMenuItemSeparator />
                            <HeaderMenuItem label="Close stage" />
                        </HeaderMenu>
                    </MenuButton>

                    {/*****************************************************************************
                     * Display Menu
                     ****************************************************************************/}
                    <MenuButton
                        id="display"
                        openedMenuID={openedMenuID()}
                        onOpenMenu={setOpenedMenuID}
                        label={
                            <>
                                <i class="fa-solid fa-display fa-fw" />
                                <p class={style.buttonLabel}>Display</p>
                            </>
                        }
                    >
                        <HeaderMenu>
                            <HeaderMenuItem
                                label="Change color mode"
                                icon={<i class="fa-solid fa-palette" />}
                            />
                            <HeaderMenuItem label="Show color checker" />
                            <HeaderMenuItemSeparator />
                            <HeaderMenuItem label="Set Render mode" />
                            <HeaderMenuItem label="Set Render purpose" />
                        </HeaderMenu>
                    </MenuButton>

                    {/*****************************************************************************
                     * Camera Menu
                     ****************************************************************************/}
                    <MenuButton
                        id="camera"
                        openedMenuID={openedMenuID()}
                        onOpenMenu={setOpenedMenuID}
                        label={
                            <>
                                <i class="fa-solid fa-camera fa-fw" />
                                <p class={style.buttonLabel}>Camera</p>
                            </>
                        }
                    >
                        <HeaderMenu>
                            <HeaderMenuItem label="Show scene camera list" />
                            <HeaderMenuItemSectionLabel label="Viewport free camera" />
                            <HeaderMenuItem label="Select viewport free camera" />
                            <HeaderMenuItem
                                label="Reset transform"
                                onClick={() => closeAndCall(resetFreeCamera)}
                            />
                            <HeaderMenuItemSeparator />
                            <HeaderMenuItem label="Save current image..." />
                        </HeaderMenu>
                    </MenuButton>
                </div>

                <p class={style.filePathArea}>{filePath()}</p>
                <div class={style.sideArea}>
                    <div style="flex-grow: 1" />
                    {/*****************************************************************************
                     * Settings Menu
                     ****************************************************************************/}
                    <MenuButton
                        id="settings"
                        openedMenuID={openedMenuID()}
                        onOpenMenu={setOpenedMenuID}
                        label={<i class="fa-solid fa-gear" />}
                        rightSide={true}
                    >
                        <HeaderMenuItem
                            label="Preference..."
                            icon={<i class="fa-solid fa-sliders" />}
                        />
                    </MenuButton>
                </div>
            </div>
            <Show when={openedMenuID() !== ""}>
                <div
                    class={style.background}
                    onClick={() => setOpenedMenuID("")}
                />
            </Show>
        </>
    );
};

export default AppHeader;
