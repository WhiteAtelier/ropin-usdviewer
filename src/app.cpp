#include "app.hpp"

#include <roah/apine/app_provider_manager.hpp>
#include <roah/apine/extent_2d.hpp>
#include <roah/apine/layer.hpp>
#include <roah/apine/protobuf/value.pb.h>
#include <roah/assert.hpp>

ropin::App::App()
    : roah::apine::App{ "App" }
{}

ropin::App::~App() noexcept = default;

void
ropin::App::setup()
{
    // Provider 起動する
    auto & provider_mgr = this->getProviderManager();

    auto provider_cef = provider_mgr.startProvider(  //
        "apine-provider-cef",
        { u8"--index-file=index.html" });
    ROAH_ASSERT(provider_cef);

    auto provider_usd = provider_mgr.startProvider(
        "apine-provider-usd",
        { u8"--open-stage", u8"C:/Users/shotaro/Downloads/Kitchen_set/Kitchen_set/Kitchen_set.usd" },
        { { u8"HGI_ENABLE_VULKAN", u8"1" } });
    ROAH_ASSERT(provider_usd);

    // auto provider = provider_mgr.startProvider("roah-canvas2d");
    // ROAH_ASSERT(provider);

    // Window 表示したりなど
    // ここは Window 表示前.
    // そして表示したい Window はここで最後に show() する.
    auto window = this->createWindow("MainWindow");

    window.show(roah::apine::WindowCreateInfo{
        .mode   = roah::apine::WindowMode::Windowed,
        .title  = u8"Sandbox App Window",
        .extent = roah::apine::Extent2D{ 1800, 750 },
    });
    const auto window_screen_extent = window.getScreenExtent();

#if 0
    auto sub_window = this->_createWindow("SubWindow");
    sub_window.show(roah::apine::WindowCreateInfo{
        .title         = u8"Sandbox App Sub Window",
        .extent        = apine::Extent2D{ 400, 300 },
        .parent_window = &window,
    });
    const auto sub_window_screen_extent = sub_window.getScreenExtent();
#endif

    {
        roah::apine::protobuf::PayloadValue create_args;
        auto &                              fields = *create_args.mutable_object_value()->mutable_fields();
        fields["rootPrimPath"].set_string_value("/");
        // fields["cameraPath"].set_string_value("/Camera");
        auto layer = this->createLayer(  //
            window,
            *provider_usd,
            window_screen_extent,
            0,
            std::move(create_args));
    }

    {
        //"https://www.youtube.com/watch?v=-uffiXj7_nU?autoplay=1&mute=1",
        //"https://youtu.be/-uffiXj7_nU?si=WU2NvEHe0GXwA-9s&t=2&autoplay=1&mute=1",
        //"https://www.polyphony.co.jp/",

        roah::apine::protobuf::PayloadValue create_args;
        auto &                              fields = *create_args.mutable_object_value()->mutable_fields();
        // fields["url"].set_string_value("https://www.polyphony.co.jp/");
        // fields["url"].set_string_value("https://youtu.be/-uffiXj7_nU?si=WU2NvEHe0GXwA-9s");
        // fields["url"].set_string_value("chrome://gpu/");
        fields["url"].set_string_value("http://localhost:3000/");
        fields["devtool"].set_bool_value(true);
        this->cef_layer_ = this->createLayer(window, *provider_cef, window_screen_extent, 0, std::move(create_args));
        this->cef_layer_.subscribeWindowEvent(true);
        this->cef_layer_.setDrawSizeMode(roah::apine::LayerDrawSizeMode::RenderTextureSize);
    }
}

void
ropin::App::onWindowScreenResized(roah::apine::Window & /*window*/, const roah::apine::Extent2D & extent)
{
    this->cef_layer_.resize(extent);
    // this->usd_layer_.resize(extent);
}
