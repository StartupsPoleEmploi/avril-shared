import {startsWith} from './string';

export const track = (component, params) => {
  if (!component || !component.$ga || !params) return;
  if (startsWith(params, '?')) {
    const path = `${component.$router.options.base || '/'}${component.$route.path}${params}`.replace('//', '/');
    console.log('Triggering page', path)
    component.$ga.page(path)
  } else {
    const [category, action, label, value] = params.split('#');
    console.log('Triggering event', category, action)
    component.$ga.event(category, action, label, value);
  }
}