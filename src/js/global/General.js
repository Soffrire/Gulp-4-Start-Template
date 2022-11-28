export default class General {
  checkTargets(component, button, target) {
    return !$(button).is(target) && $(button).has(target).length === 0 && !$(component).is(target) && $(component).has(target).length === 0
  }
}
