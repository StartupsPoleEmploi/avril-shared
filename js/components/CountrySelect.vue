<template>
  <select v-bind="$props">
    <option value="" disabled selected>{{placeholder}}</option>
    <option v-for="country in countries"></option>
  </select>
</template>

<script>
  import countries from '../constants/countries.js'

  export default {
    data: function() {
      return {
        countries,
      }
    },
    props: {
      placeholder: String
    }
  }
</script>
