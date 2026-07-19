export {};
declare global {
    var apine: Apine_API;

    interface Window {
        apine: Apine_API;
    }

}

export interface Apine_API {
    API: ApineAPI_API;
    Layer: ApineLayer_API;
    Provider: ApineProvider_API;
    Window: ApineWindow_API;
    usd: ApineUsd_API;
}

export interface ApineAPI_API {
    /**
     * Get singleton API object
     */
    getInstance(): ApineAPI;

}

export interface ApineAPI {
    /**
     * Get all providers
     */
    getProviders(): (ApineProvider | null)[];

    /**
     * Get provider by ID
     */
    getProvider(id: number,): ApineProvider | null;

    /**
     * Get provider by name
     */
    getProviderByName(name: string,): ApineProvider | null;

    /**
     * Get all layers
     */
    getLayers(): (ApineLayer | null)[];

    /**
     * Get layer by ID
     */
    getLayer(id: number,): ApineLayer | null;

    /**
     * Get layer by name
     */
    getLayerByName(name: string,): ApineLayer | null;

    /**
     * Create a new layer
     */
    createLayer(provider_id: number,name: string,): ApineLayer | null;

    /**
     * Get all windows
     */
    getWindows(): (ApineWindow | null)[];

    /**
     * Get window by ID
     */
    getWindow(id: number,): ApineWindow | null;

}

export interface ApineLayer_API {
}

export interface ApineLayer {
    /**
     * Get the ID of the layer
     */
    getID(): number;

}

export interface ApineProvider_API {
}

export interface ApineProvider {
    /**
     * Get the ID of the provider
     */
    getID(): number;

    /**
     * Get the name of the provider
     */
    getName(): string;

}

export interface ApineWindow_API {
}

export interface ApineWindow {
    /**
     * Get window extent
     */
    getWindowExtent(): [(number), (number)];

    /**
     * Get screen extent
     */
    getScreenExtent(): [(number), (number)];

}

export interface ApineUsd_API {
    API: ApineUsdAPI_API;
    FreeCamera: ApineUsdFreeCamera_API;
    Layer: ApineUsdLayer_API;
    SdfLayer: ApineUsdSdfLayer_API;
    SdfPath: ApineUsdSdfPath_API;
    UsdObject: ApineUsdUsdObject_API;
    UsdPrim: ApineUsdUsdPrim_API;
    UsdStage: ApineUsdUsdStage_API;
    ViewportCamera: ApineUsdViewportCamera_API;
}

export interface ApineUsdAPI_API {
    /**
     * Get singleton API object.
     */
    getInstance(): ApineUsdAPI;

}

export interface ApineUsdAPI {
    /**
     * Get all USDView layer global IDs.
     */
    getAllUsdViewLayerIDs(): (number)[];

    /**
     * Get all USDView layer local IDs.
     */
    getUsdViewLayerCount(): number;

    /**
     * Get USDView layer by ID.
     */
    getUsdViewLayerByID(layerID: number,): ApineUsdLayer | null;

    /**
     * Get USDView layer by index.
     */
    getUsdViewLayerByIndex(index: number,): ApineUsdLayer | null;

    /**
     * Get current USD stage.
     */
    getCurrentStage(): ApineUsdUsdStage | null;

    /**
     * Set current USD stage.
     */
    setCurrentStage(stage: ApineUsdUsdStage | null,): boolean;

    /**
     * Open USD stage file.
     */
    openStage(filePath: string,): Promise<ApineUsdUsdStage | null>;

    /**
     * Create a new USD stage.
     */
    createStage(filePath: string,): Promise<ApineUsdUsdStage | null>;

    /**
     * Create a new USD stage in memory.
     */
    createStageInMemory(): Promise<ApineUsdUsdStage | null>;

}

export interface ApineUsdFreeCamera_API {
}

export interface ApineUsdFreeCamera {
    /**
     * Get the yaw of the free camera.
     */
    getYaw(): number;

    /**
     * Get the pitch of the free camera.
     */
    getPitch(): number;

    /**
     * Get the roll of the free camera.
     */
    getRoll(): number;

    /**
     * Set the yaw of the free camera.
     */
    setYaw(yaw: number,): boolean;

    /**
     * Set the pitch of the free camera.
     */
    setPitch(pitch: number,): boolean;

    /**
     * Set the roll of the free camera.
     */
    setRoll(roll: number,): boolean;

    /**
     * Get the pivot position of the free camera.
     */
    getPivotPosition(): [(number), (number), (number)];

    /**
     * Set the pivot position of the free camera.
     */
    setPivotPosition(position: [(number), (number), (number)],): boolean;

    /**
     * Get the up vector of the free camera in world space.
     */
    getCameraUp(): [(number), (number), (number)];

    /**
     * Get the right vector of the free camera in world space.
     */
    getCameraRight(): [(number), (number), (number)];

    /**
     * Get the forward vector of the free camera in world space.
     */
    getCameraForward(): [(number), (number), (number)];

}

export interface ApineUsdLayer_API {
}

export interface ApineUsdLayer {
    /**
     * Get the viewport camera of the Stage.
     */
    getViewportCamera(): ApineUsdViewportCamera | null;

}

export interface ApineUsdSdfLayer_API {
}

export interface ApineUsdSdfLayer {
    /**
     * Get the identifier of this layer.
     */
    getIdentifier(): string;

    /**
     * Set the identifier of this layer.
     */
    setIdentifier(identifier: string,): void;

    /**
     * Get the display name of this layer.
     */
    getDisplayName(): string;

    /**
     * Get the real path of this layer.
     */
    getRealPath(): string;

    /**
     * Get the file extension of this layer.
     */
    getFileExtension(): string;

    /**
     * Get the version of this layer.
     */
    getVersion(): string;

    /**
     * Get the repository path of this layer.
     */
    getRepositoryPath(): string;

    /**
     * Get the asset name of this layer.
     */
    getAssetName(): string;

}

export interface ApineUsdSdfPath_API {
    new (path: string,): ApineUsdSdfPath;

    /**
     * Create an empty path
     */
    emptyPath(): ApineUsdSdfPath | null;

    /**
     * Create an absolute root path
     */
    absoluteRootPath(): ApineUsdSdfPath | null;

    /**
     * Create a reflexive relative path
     */
    reflexiveRelativePath(): ApineUsdSdfPath | null;

    /**
     * Check if a name is a valid identifier
     */
    isValidIdentifier(name: string,): boolean;

    /**
     * Check if a name is a valid namespaced identifier
     */
    isValidNamespacedIdentifier(name: string,): boolean;

    /**
     * Tokenize a namespaced identifier into its components
     */
    tokenizeIdentifier(name: string,): (string)[];

    /**
     * Join components into a namespaced identifier
     */
    joinIdentifier(names: (string)[],): string;

    /**
     * Strip the namespace from a namespaced identifier
     */
    stripNamespace(name: string,): string;

}

export interface ApineUsdSdfPath {
    /**
     * Get the number of elements in the path
     */
    getPathElementCount(): number;

    /**
     * Check if the path is absolute
     */
    isAbsolutePath(): boolean;

    /**
     * Check if the path is an absolute root path
     */
    isAbsoluteRootPath(): boolean;

    /**
     * Check if the path is a prim path
     */
    isPrimPath(): boolean;

    /**
     * Check if the path is an absolute root or prim path
     */
    isAbsoluteRootOrPrimPath(): boolean;

    /**
     * Check if the path is a root prim path
     */
    isRootPrimPath(): boolean;

    /**
     * Check if the path is a property path
     */
    isPropertyPath(): boolean;

    /**
     * Check if the path is a prim property path
     */
    isPrimPropatyPath(): boolean;

    /**
     * Check if the path is a namespaced property path
     */
    isNamespacedPropertyPath(): boolean;

    /**
     * Check if the path is a prim variant selection path
     */
    isPrimVariantSelectionPath(): boolean;

    /**
     * Check if the path is a prim or prim variant selection path
     */
    isPrimOrPrimVariantSelectionPath(): boolean;

    /**
     * Check if the path contains a prim variant selection
     */
    containsPrimVariantSelection(): boolean;

    /**
     * Check if the path contains property elements
     */
    containsPropertyElements(): boolean;

    /**
     * Check if the path contains a target path
     */
    containsTargetPath(): boolean;

    /**
     * Check if the path is a relational attribute path
     */
    isRelationalAttributePath(): boolean;

    /**
     * Check if the path is a target path
     */
    isTargetPath(): boolean;

    /**
     * Check if the path is a mapper path
     */
    isMapperPath(): boolean;

    /**
     * Check if the path is a mapper arg path
     */
    isMapperArgPath(): boolean;

    /**
     * Check if the path is an expression path
     */
    isExpressionPath(): boolean;

    /**
     * Check if the path is empty
     */
    isEmpty(): boolean;

    /**
     * Get the string representation of the path
     */
    getString(): string;

    /**
     * Get the name of the path
     */
    getName(): string;

    /**
     * Get the element string of the path
     */
    getElementString(): string;

    /**
     * Replace the name of the path
     */
    replaceName(arg0: string,): ApineUsdSdfPath | null;

    /**
     * Get the target path
     */
    getTargetPath(): ApineUsdSdfPath | null;

    /**
     * Check if the path has a prefix
     */
    hasPrefix(arg0: ApineUsdSdfPath,): boolean;

    /**
     * Get the parent path
     */
    getParentPath(): ApineUsdSdfPath | null;

    /**
     * Get the prim path
     */
    getPrimPath(): ApineUsdSdfPath | null;

    /**
     * Get the prim or prim variant selection path
     */
    getPrimOrPrimVariantSelectionPath(): ApineUsdSdfPath | null;

    /**
     * Get the absolute root or prim path
     */
    getAbsoluteRootOrPrimPath(): ApineUsdSdfPath | null;

    /**
     * Strip all variant selections from the path
     */
    stripAllVariantSelections(): ApineUsdSdfPath | null;

    /**
     * Append a path to the current path
     */
    appendPath(new_suffix: ApineUsdSdfPath,): ApineUsdSdfPath | null;

    /**
     * Append a child to the current path
     */
    appendChild(child_name: string,): ApineUsdSdfPath | null;

    /**
     * Append a property to the current path
     */
    appendProperty(child_name: string,): ApineUsdSdfPath | null;

    /**
     * Append a variant selection to the current path
     */
    appendVariantSelection(variant_set: string,variant: string,): ApineUsdSdfPath | null;

    /**
     * Append a target path to the current path
     */
    appendTarget(target_path: ApineUsdSdfPath,): ApineUsdSdfPath | null;

    /**
     * Append a relation attribute to the current path
     */
    appendRelationalAttribute(target_path: string,): ApineUsdSdfPath | null;

    /**
     * Replace the target path
     */
    replaceTargetPath(new_target_path: ApineUsdSdfPath,): ApineUsdSdfPath | null;

    /**
     * Append a mapper to the current path
     */
    appendMapper(target_path: ApineUsdSdfPath,): ApineUsdSdfPath | null;

    /**
     * Append a mapper arg to the current path
     */
    appendMapperArg(arg_name: string,): ApineUsdSdfPath | null;

    /**
     * Append an expression to the current path
     */
    appendExpression(): ApineUsdSdfPath | null;

    /**
     * Append an element string to the current path
     */
    appendElementString(element: string,): ApineUsdSdfPath | null;

    /**
     * Replace the prefix of the current path
     */
    replacePrefix(old_prefix: ApineUsdSdfPath,new_prefix: ApineUsdSdfPath,fix_target_paths: boolean,): ApineUsdSdfPath | null;

    /**
     * Get the common prefix of the current path and another path
     */
    getCommonPrefix(path: ApineUsdSdfPath,): ApineUsdSdfPath | null;

    /**
     * Make the current path absolute
     */
    makeAbsolutePath(anchor: ApineUsdSdfPath,): ApineUsdSdfPath | null;

    /**
     * Make the current path relative
     */
    makeRelativePath(anchor: ApineUsdSdfPath,): ApineUsdSdfPath | null;

}

export interface ApineUsdUsdObject_API {
}

export interface ApineUsdUsdObject {
    /**
     * Get stage instance
     */
    getStage(): ApineUsdUsdStage | null;

    /**
     * Check if the UsdObject is valid
     */
    isValid(): boolean;

    /**
     * Get the name of the UsdObject
     */
    getName(): string;

    /**
     * Get the documentation of the UsdObject
     */
    getDocumentation(): string;

    /**
     * Set the documentation of the UsdObject
     */
    setDocumentation(documentation: string,): boolean;

    /**
     * Clear the documentation of the UsdObject
     */
    clearDocumentation(): boolean;

    /**
     * Get the display name of the UsdObject
     */
    getDisplayName(): string;

    /**
     * Set the display name of the UsdObject
     */
    setDisplayName(display_name: string,): boolean;

    /**
     * Clear the display name of the UsdObject
     */
    clearDisplayName(): boolean;

}

export interface ApineUsdUsdPrim_API {
}

export interface ApineUsdUsdPrim extends ApineUsdUsdObject {
    /**
     * Get the specifier of this prim.
     */
    getSpecifier(): string;

    /**
     * Set the specifier of this prim.
     */
    setSpecifier(specifier: string,): boolean;

    /**
     * Get the type name of this prim.
     */
    getTypeName(): string;

    /**
     * Set the type name of this prim.
     */
    setTypeName(typeName: string,): boolean;

    /**
     * Clear the type name of this prim.
     */
    clearTypeName(): boolean;

    /**
     * Check if this prim is active.
     */
    isActive(): boolean;

    /**
     * Set whether this prim is active.
     */
    setActive(active: boolean,): boolean;

    /**
     * Clear the active state of this prim.
     */
    clearActive(): boolean;

    /**
     * Check if this prim has an authored active state.
     */
    hasAuthoredActive(): boolean;

    /**
     * Check if this prim is a model.
     */
    isModel(): boolean;

    /**
     * Check if this prim is a group.
     */
    isGroup(): boolean;

    /**
     * Check if this prim is a component.
     */
    isComponent(): boolean;

    /**
     * Check if this prim is a subcomponent.
     */
    isSubComponent(): boolean;

    /**
     * Check if this prim is abstract.
     */
    isAbstract(): boolean;

    /**
     * Check if this prim is defined.
     */
    isDefined(): boolean;

    /**
     * Check if this prim has an authored class specifier.
     */
    hasClassSpecifier(): boolean;

    /**
     * Check if this prim has an authored defining specifier.
     */
    hasDefiningSpecifier(): boolean;

    /**
     * Get the applied schemas on this prim.
     */
    getAppliedSchemas(): (string)[];

    /**
     * Get the child prim with the given name.
     */
    getChild(name: string,): ApineUsdUsdPrim | null;

    /**
     * Get the child prims of this prim.
     */
    getChildren(): (ApineUsdUsdPrim | null)[];

    /**
     * Get all child prims of this prim.
     */
    getAllChildren(): (ApineUsdUsdPrim | null)[];

    /**
     * Get the names of the child prims of this prim.
     */
    getChildrenNames(): (string)[];

    /**
     * Get the names of all child prims of this prim.
     */
    getAllChildrenNames(): (string)[];

    /**
     * Get the children reorder of this prim.
     */
    getChildrenReorder(): (string)[];

    /**
     * Set the children reorder of this prim.
     */
    setChildrenReorder(newOrder: (string)[],): void;

    /**
     * Clear the children reorder of this prim.
     */
    clearChildrenReorder(): void;

    /**
     * Get the parent prim of this prim.
     */
    getParent(): ApineUsdUsdPrim | null;

    /**
     * Get the next sibling prim of this prim.
     */
    getNextSibling(): ApineUsdUsdPrim | null;

    /**
     * Check if this prim is the pseudo-root.
     */
    isPseudoRoot(): boolean;

}

export interface ApineUsdUsdStage_API {
}

export interface ApineUsdUsdStage {
    /**
     * Get the root layer identifier of the Stage.
     */
    getRootLayerIdentifier(): string;

    /**
     * Get the meters per unit of the Stage.
     */
    getStageMetersPerUnit(): number;

    /**
     * Set the meters per unit of the Stage.
     */
    setStageMetersPerUnit(arg0: number,): boolean;

    /**
     * Get the up axis of the Stage.
     */
    getStageUpAxis(): string;

    /**
     * Set the up axis of the Stage. Valid values are 'y' and 'z'.
     */
    setStageUpAxis(arg0: string,): boolean;

    /**
     * Get the pseudo-root prim of the Stage.
     */
    getPseudoRoot(): ApineUsdUsdPrim;

    /**
     * Get the default prim of the Stage. Returns null if no default prim is set.
     */
    getDefaultPrim(): ApineUsdUsdPrim | null;

    /**
     * Get the prim at the specified path. Returns null if no such prim exists.
     */
    getPrimAtPath(path: string,): ApineUsdUsdPrim | null;

}

export interface ApineUsdViewportCamera_API {
}

export interface ApineUsdViewportCamera {
    /**
     * Use the scene camera for rendering.
     */
    useSceneCamera(cameraPath: string,): void;

    /**
     * Use the free camera for rendering.
     */
    useFreeCamera(): void;

    /**
     * Get the path of the currently used scene camera.
     */
    getSceneCameraPath(): string;

    /**
     * Get the free camera. Returns null if the free camera is not used.
     */
    getFreeCamera(): ApineUsdFreeCamera | null;

}

