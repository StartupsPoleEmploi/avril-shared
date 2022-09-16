import Vue from 'vue'
import {pluralize} from '../utils/string.js';

Vue.filter('pluralize', (word, number) => pluralize(word, number));