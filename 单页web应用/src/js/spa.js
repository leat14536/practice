/**
 * Created by Administrator on 2017/7/11 0011.
 */
import jquery from 'jquery'

export var spa = (function($) {
  let configMap = {
        extend_height: 434,
        extend_title: 'Click to retract',
        retracted_height: 16,
        retracted_title: 'Clickto extend',
        template_html: '<div class="spa-slider"></div>'
      },
      $chatSlider,
      toggleSlider,
      onclickSlider,
      initModule;

  toggleSlider = () =>{
    let slider_height = $chatSlider.height();

    if (slider_height === configMap.retracted_height) {
      // open panel
      $chatSlider
        .animate({height: configMap.extend_height})
        .attr('title', configMap.extend_title)
      return true
    } else if (slider_height === configMap.extend_height) {
      // close panel
      $chatSlider
        .animate({height: configMap.retracted_height})
        .attr('title', configMap.retracted_title)
      return true
    }
    return false
  }

  onclickSlider = () => {
    toggleSlider()
    return false
  }

  initModule = ($container) => {
    // render HTML
    $container.html(configMap.template_html);

    $chatSlider = $container.find('.spa-slider')

    $chatSlider.attr('title', configMap.retracted_title)
      .click(onclickSlider)
    return true
  }

  return {initModule}
})(jquery)
