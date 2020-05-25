import {startsWith} from './string';

export const track = (component, params) => {
  if (!component || !params) return;
  if (startsWith(params, '?')) {
    const path = `${component.$router.options.base}${component.$route.path}${params}`.replace('//', '/')
    component.$ga.page(path)
  } else {
    const [category, action, label, value] = params.split('#');
    this.$ga.event(category, action, label, value);
  }
}