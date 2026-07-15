#ifndef ROPIN_APP_HPP
#define ROPIN_APP_HPP

#include <roah/apine/app.hpp>
#include <roah/apine/extent_2d.hpp>
#include <roah/apine/layer.hpp>

#include <memory>

namespace ropin {

class App final : public roah::apine::App
{
public:
    App();
    ~App() noexcept override;

    void
    setup() override;

    void
    onWindowScreenResized(roah::apine::Window & window, const roah::apine::Extent2D & extent) override;

private:
    roah::apine::Layer cef_layer_;
    roah::apine::Layer canvas2d_layer_;
};

}  // namespace ropin

#endif
