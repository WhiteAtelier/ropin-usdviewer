cmake_minimum_required(VERSION 3.30)

project(ropin-usdviewer
    VERSION 0.1.0
    DESCRIPTION "A simple USD viewer powered by roah-apine engine"
    LANGUAGES CXX
)

add_compile_definitions(
    ROPIN_PROJECT_MAJOR_VERSION=${CMAKE_PROJECT_VERSION_MAJOR}
    ROPIN_PROJECT_MINOR_VERSION=${CMAKE_PROJECT_VERSION_MINOR}
    ROPIN_PROJECT_PATCH_VERSION=${CMAKE_PROJECT_VERSION_PATCH}
)

if (WIN32)
    add_compile_definitions(
        VK_USE_PLATFORM_WIN32_KHR=1
        VKWP_USE_WIN32_SURFACE=1
    )
endif()

add_compile_options(
    "$<$<CXX_COMPILER_ID:MSVC>:/utf-8>"
    "$<$<CXX_COMPILER_ID:MSVC>:/EHsc>"
    "$<$<CXX_COMPILER_ID:MSVC>:/MP>"
    "$<$<CXX_COMPILER_ID:MSVC>:/W4>"
    "$<$<CXX_COMPILER_ID:MSVC>:/WX>"
)

add_compile_definitions(
    "$<$<CXX_COMPILER_ID:MSVC>:NOMINMAX>"
    "$<$<CXX_COMPILER_ID:MSVC>:LEAN_AND_MEAN>"
    "$<$<CXX_COMPILER_ID:MSVC>:UNICODE>"
    "$<$<CXX_COMPILER_ID:MSVC>:_CRT_SECURE_NO_WARNINGS=1>"

    "$<$<CONFIG:Debug>:ROPIN_DEBUG=1>"
)

find_package(apine REQUIRED)
find_package(apine-provider-usd REQUIRED)
find_package(apine-provider-cef REQUIRED)

apine_add_application(${CMAKE_PROJECT_NAME} WIN32
    LIBRARIES
        libroah::roah-logger
        libroah::roah-assert

    SOURCES
        app.cpp
        app.hpp
        main.cpp

    PROVIDERS
        apine-providers::apine-provider-usd
        apine-providers::apine-provider-cef
)

set_target_properties(${CMAKE_PROJECT_NAME}
    PROPERTIES
        VS_DEBUGGER_ENVIRONMENT "APINE_PROVIDER_CEF_EXPORT_TYPEDEF_DIR=${CMAKE_CURRENT_LIST_DIR}/webapp/ropin/src/types"
)
