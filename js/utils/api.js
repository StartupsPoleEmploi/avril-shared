import get from 'lodash.get';
import {isArray, isString, isObject} from './boolean';
import {last, include} from './array';
import {rejectBlankValues} from './object';
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

const buildQuery = (name, objectType, params) => {
  return `{ ${name}${paramsToString(params)} ${shapes[objectType]} }`
}

const buildMutation = (name, objectType, params) => {
  return `mutation ${buildQuery(name, objectType, params)}`
}

const buildJSONBody = query => JSON.stringify({query});

const buildMultipartBody = (query, file) => {
  const formData = new FormData();
  formData.append('query', query);
  formData.append('file', file);

  return formData;
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
        headers,
        // headers: {
        //   cookie,
        // },
      }
    } = context;
    url = startsWithNoCase(url, 'http') ? url : prepend(url, serverToPhoenixUrl);

    const result = await fetch(url, {
      ...options,
      headers: {
        ...headers,
        // cookie,
        ...get(options, 'headers', {}),
      }
    });
    if (!context.res.headersSent){
      (result.headers.raw()['set-cookie'] || []).filter(cookie => cookie).forEach(cookie => {
        context.res.set('set-cookie', cookie);
      });
    }
    return result;
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

export const fetchApi = context => async body => {
  const result = await universalFetch(context)('/api/v2', {
    method: 'POST',
    headers: rejectBlankValues({
      'Accept': 'application/json',
      'Content-Type': isString(body) ? 'application/json' : null,
      'X-auth': get(context, 'env.serverAuthKey'),
      'X-hash': get(context, 'req.query.hash'),
      'X-delegate-hash': get(context, 'req.query.delegate_hash'),
    }),
    body,
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

const respondApiData = name => jsonData => {
  const successData = get(jsonData, `data.${name}`);
  if (successData)
    return successData;
  throw(jsonData);
}

export const queryApiWithContext = context => async queryInfos => {
  const {name, type, params} = isString(queryInfos) ? {name: queryInfos} : queryInfos;
  const query = buildQuery(name, type || singularize(name), params) ;

  const jsonData = await fetchApi(context)(buildJSONBody(query));
  return respondApiData(name)(jsonData);
}

export const queryApi = queryApiWithContext(null);

export const mutateApi = async ({name, type, params}) => {
  const query = buildMutation(name, type, params);

  const jsonData = await fetchApi(null)(buildJSONBody(query));
  return respondApiData(name)(jsonData);
}

export const mutateApiMultipart = async ({name, type, params}, file) => {
  const query = buildMutation(name, type, params);

  const jsonData = await fetchApi(null)(buildMultipartBody(query, file));
  return respondApiData(name)(jsonData);
}