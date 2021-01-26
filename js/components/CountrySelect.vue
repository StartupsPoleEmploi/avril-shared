<template>
  <select v-bind="$props">
    <option value="" disabled selected>{{placeholder}}</option>
    <option v-for="country in countries"></option>
  </select>
</template>

<script>
  import countries from '../../fixtures/countries.json'

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
