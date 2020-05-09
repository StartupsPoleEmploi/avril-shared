import get from 'lodash.get';
import {isArray, isString} from './boolean';
import {last, include} from './array';
import {singularize, capitalize, startsWithNoCase, prepend} from './string';
import {partition} from './object';

import shapes from '../constants/apiShapes';

const paramsToString = params => {
  if (!params) return '';
  return JSON.stringify(params)
    .replace(/"([^"]+)":/g, '$1:')
    .replace(/^{/, '(')
    .replace(/}$/, ')')
}

const buildQuery = (name, type, params) => {
  return `{ ${name}${paramsToString(params)} ${shapes[type]} }`
}

const universalFetch = context => async (url, options) => {
  if (process.client) {
    return window.fetch(url, options);
  } else {
    const fetch = require('node-fetch');
    const {
      env: {
        serverToPhoenixUrl
      },
      req: {
        headers: {
          cookie,
        },
      }
    } = context;
    url = startsWithNoCase(url, 'http') ? url : prepend(url, serverToPhoenixUrl);

    const result = await fetch(url, {
      ...options,
      headers: {
        cookie,
        ...get(options, 'headers', {}),
      }
    });
    console.log(result.headers);
    console.log(result.headers.raw()['set-cookie']);

    if (!context.res.headersSent){
      result.headers.raw()['set-cookie'].forEach(cookie => {
        context.res.set('set-cookie', cookie);
      })
    }
    return result
  }
}

const universalRedirect = context => to => {
  if (!to) return false;
  if (context) {
    if (!context.res.headersSent){
      context.redirect(to);
    }
    return true;
  } else if (process.client) {
    window.location.replace(to);
    return true;
  }
  return false;
}

export const fetchApi = context => async query => {
  const result = await universalFetch(context)('/api/v2', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-auth': get(context, 'env.serverAuthKey'),
      'X-hash': get(context, 'req.query.hash'),
    },
    body: JSON.stringify({query})
  });

  const jsonData = await result.json();

  if (result.ok) {
    return jsonData;
  } else {
    const redirected =
      get(jsonData, 'error.code') === 401 &&
      universalRedirect(context)(get(jsonData, 'error.redirect_to'))
    if (!redirected) {
      console.error('API query failed without redirection', jsonData)
      throw(jsonData);
    }
  }
}

export const queryApiWithContext = context => async queryInfos => {
  const {name, type, params} = isString(queryInfos) ? {name: queryInfos} : queryInfos;
  const query = buildQuery(name, type || singularize(name), params) ;

  const jsonData = await fetchApi(context)(query);
  return get(jsonData, `data.${name}`);
}

export const queryApi = queryApiWithContext(null);

export const mutateApi = async ({name, type, params}) => {
  const query = `mutation ${buildQuery(name, type, params)}`;

  const jsonData = await fetchApi(null)(query);
  return get(jsonData, `data.${name}`);
}