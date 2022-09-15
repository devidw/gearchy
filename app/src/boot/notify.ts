// @unocss-include

import { Notify } from 'quasar'

const defaultClasses = 'rounded-lg tracking-wide font-medium'

Notify.setDefaults({
  position: 'top',
  progress: true,
  timeout: 2000,
  classes: defaultClasses,
})

Notify.registerType('positive', {
  icon: 'eva-checkmark-outline',
  classes: defaultClasses + ' bg-lime-900 !text-lime-200',
})

Notify.registerType('negative', {
  icon: 'eva-alert-triangle-outline',
  classes: defaultClasses + ' bg-amber-900 !text-amber-200',
  actions: [
    {
      icon: 'eva-close-circle-outline',
      class: '!text-amber-200',
      flat: true,
      round: true,
    },
  ],
})
