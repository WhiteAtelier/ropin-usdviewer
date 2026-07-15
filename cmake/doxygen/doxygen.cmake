
# https://qiita.com/yoyomion/items/16d152421ef4f7bfc8ac

option(BUILD_DOCS "Generate documents." OFF)

function(regist_doxygen_files ARG_FILE)
    if (NOT ${BUILD_DOCS})
        return()
    endif()

    get_property(PASTEL_DOXYGEN_HEADER_FILES GLOBAL PROPERTY doxygen_source_list)
    set_property(GLOBAL PROPERTY doxygen_source_list ${PASTEL_DOXYGEN_HEADER_FILES} ${ARG_FILE})
endfunction()

function(regist_markdown_files ARG_FILES)
    if (NOT ${BUILD_DOCS})
        return()
    endif()
    
    foreach(fpath IN LISTS ARGV)
        # すでに絶対パスでも問題ないらしい
        cmake_path(
            ABSOLUTE_PATH
                fpath
            BASE_DIRECTORY
                "${CMAKE_CURRENT_LIST_DIR}"
            OUTPUT_VARIABLE
                fpath_abspath)
        list(APPEND ARG_ABS_FILES "${fpath_abspath}")
        message(STATUS "Markdown: ${fpath_abspath}")
    endforeach()

    get_property(PASTEL_DOXYGEN_MARKDOWN_FILES GLOBAL PROPERTY doxygen_markdown_list)
    set_property(GLOBAL PROPERTY doxygen_markdown_list ${PASTEL_DOXYGEN_MARKDOWN_FILES} ${ARG_ABS_FILES})
endfunction()

function(add_doxygen_target)
    if (NOT ${BUILD_DOCS})
        return()
    endif()

    find_package(Doxygen REQUIRED)

    get_property(PASTEL_DOXYGEN_HEADER_FILES GLOBAL PROPERTY doxygen_source_list)
    get_property(PASTEL_DOXYGEN_MARKDOWN_FILES GLOBAL PROPERTY doxygen_markdown_list)
    string(REPLACE ";" " " PASTEL_DOXYGEN_HEADER_FILES_S "${PASTEL_DOXYGEN_HEADER_FILES}")
    string(REPLACE ";" " " PASTEL_DOXYGEN_MARKDOWN_FILES_S "${PASTEL_DOXYGEN_MARKDOWN_FILES}")

    set(DOXYFILE_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/doxygen)
    set(DOCUMENT_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/docs)
    message(TRACE "--DOXYFILE_OUTPUT_DIRECTORY: " ${DOXYFILE_OUTPUT_DIRECTORY})
    message(TRACE "--DOCUMENT_OUTPUT_DIRECTORY: " ${DOCUMENT_OUTPUT_DIRECTORY})
    message(TRACE "--Doxyfile.in : " ${CMAKE_CURRENT_FUNCTION_LIST_DIR}/Doxyfile.in)
    message(TRACE "--Doxyfile    : " ${DOXYFILE_OUTPUT_DIRECTORY}/Doxyfile)
    message(TRACE "--Document    : " ${DOCUMENT_OUTPUT_DIRECTORY}/index.html)

    file(MAKE_DIRECTORY ${DOXYFILE_OUTPUT_DIRECTORY})
    file(MAKE_DIRECTORY ${DOCUMENT_OUTPUT_DIRECTORY})

    add_custom_target(doxygen
        DEPENDS ${DOCUMENT_OUTPUT_DIRECTORY}/index.html
    )
    
    set_target_properties(doxygen
        PROPERTIES
            FOLDER
                "4_docs"
    )

    # Generate Doxyfile from Doxyfile.in
    add_custom_command(
        COMMAND
            ${CMAKE_COMMAND}
                -D "DOXYGEN_TEMPLATE=${CMAKE_CURRENT_FUNCTION_LIST_DIR}/Doxyfile.in"
                -D "DOXYGEN_DOXYFILE=${DOXYFILE_OUTPUT_DIRECTORY}/Doxyfile"
                -D "DOXYGEN_PROJECT_NAME=${CMAKE_PROJECT_NAME}"
                -D "DOXYGEN_PROJECT_DESC=${CMAKE_PROJECT_DESCRIPTION}"
                -D "DOXYGEN_PROJECT_VERSION=${CMAKE_PROJECT_VERSION_MAJOR}.${CMAKE_PROJECT_VERSION_MINOR}.${CMAKE_PROJECT_VERSION_PATCH}"
                -D "DOXYGEN_INPUT_SOURCES=${PASTEL_DOXYGEN_HEADER_FILES_S}"
                -D "DOXYGEN_INPUT_MARKDOWNS=${PASTEL_DOXYGEN_MARKDOWN_FILES_S}"
                -D "DOXYGEN_PROJECT_INCLUDE_DIR=${CMAKE_SOURCE_DIR}/include"
                -D "DOXYGEN_SOURCE_DIR=${CMAKE_CURRENT_FUNCTION_LIST_DIR}"
                -D "DOXYGEN_README_MD=${CMAKE_CURRENT_FUNCTION_LIST_DIR}/../../readme.md"
                -D "DOCUMENT_OUTPUT_PATH=${DOCUMENT_OUTPUT_DIRECTORY}"
                -D "DOXYGEN_DOCS_ROOT=${CMAKE_SOURCE_DIR}/docs"
                -D "DOXYGEN_PROJECT_ROOT=${CMAKE_SOURCE_DIR}"
                -P "${CMAKE_CURRENT_FUNCTION_LIST_DIR}/doxygen-script.cmake"
        DEPENDS
            "${CMAKE_CURRENT_FUNCTION_LIST_DIR}/Doxyfile.in"
            "${PASTEL_DOXYGEN_HEADER_FILES}"
            "${PASTEL_DOXYGEN_MARKDOWN_FILES}"
            "${CMAKE_CURRENT_FUNCTION_LIST_DIR}/../../readme.md"
        WORKING_DIRECTORY
            "${CMAKE_SOURCE_DIR}"
        OUTPUT
            "${DOXYFILE_OUTPUT_DIRECTORY}/Doxyfile"
        COMMENT
            "Generating Doxyfile"
    )

    # Generate doc index.html
    add_custom_command(
        COMMAND
            ${DOXYGEN_EXECUTABLE}
            ${DOXYFILE_OUTPUT_DIRECTORY}/Doxyfile
        DEPENDS
            ${CMAKE_CURRENT_FUNCTION_LIST_DIR}/icon.png
            ${DOXYFILE_OUTPUT_DIRECTORY}/Doxyfile
        WORKING_DIRECTORY
            ${DOXYFILE_OUTPUT_DIRECTORY}
        OUTPUT
            ${DOCUMENT_OUTPUT_DIRECTORY}/index.html
        COMMENT
            "Creating HTML documentation"
    )

    install(
        DIRECTORY
            ${DOCUMENT_OUTPUT_DIRECTORY}
        DESTINATION
            .
    )

endfunction()