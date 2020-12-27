import DForm from '@/components/DynamicForm'

DForm.install = function(Vue) {
  Vue.component(DForm.name, DForm)
}

export default DForm
