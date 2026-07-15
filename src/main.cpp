// Winmain

#include "app.hpp"

#include <roah/logger.hpp>

#include <windows.h>

#include <array>
#include <chrono>
#include <iostream>  // temp
#include <thread>
#include <vector>

#pragma warning(disable : 4100)

#if 1
namespace {

class Console final
{
public:
    Console()
        : allocated_{ false }
        , prev_code_page_{ 0 }
    {
        if (!AttachConsole(ATTACH_PARENT_PROCESS))
        {
            AllocConsole();
            std::cerr << "Console allocated." << std::endl;
            this->allocated_ = true;
        }
        this->prev_code_page_ = GetConsoleOutputCP();
        SetConsoleOutputCP(CP_UTF8);
    }

    ~Console() noexcept
    {
        SetConsoleOutputCP(this->prev_code_page_);
        if (this->allocated_)
        {
            FreeConsole();
        }
    }

private:
    bool allocated_;
    UINT prev_code_page_;
};
}  // namespace
#endif

int WINAPI
WinMain(HINSTANCE h_instance, HINSTANCE, LPSTR, int n_cmd_show)
{
    Console console;

    roah::initializeLogger(  //
        "ropin-usdviewer",
        {
            .console  = { .level = roah::LogLevel::Debug, .target = roah::LoggerConsoleOutputTarget::StdErr },
            .log_file = {},
            .webv     = { .level = roah::LogLevel::Trace },
        });

    return roah::apine::runApp<ropin::App>(h_instance, n_cmd_show);
}
