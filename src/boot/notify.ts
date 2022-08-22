// @unocss-include

import { Notify } from 'quasar'

const defaultClasses = 'rounded-lg tracking-wide font-medium'

Notify.setDefaults({
  position: 'top-right',
  progress: true,
  timeout: 1000,
  classes: defaultClasses,
})

Notify.registerType('positive', {
  icon: 'eva-checkmark-outline',
  classes: defaultClasses + ' bg-lime-9 !text-lime-2',
})

Notify.registerType('negative', {
  icon: 'eva-alert-triangle-outline',
  classes: defaultClasses + ' bg-amber-9 !text-amber-2',
})
