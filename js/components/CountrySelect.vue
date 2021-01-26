<template>
  <select v-bind="$props">
    <option value="" disabled>{{placeholder}}</option>
    <option v-for="country in countries" :value="country.code">{{country.name}}</option>
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
