<template>
  <select class="select is-large" :name="name" @input="inputWrapper" :value="valueWrapped">
    <option value="" disabled>{{placeholder}}</option>
    <option v-for="country in countries" :value="country.code">{{country.name}}</option>
  </select>
</template>

<script>
  import countries from '../constants/countries.js'

  export default {
    computed: {
      valueWrapped: function() {
        return this.value.code;
      },
    },
    data: function() {
      return {
        countries,
      }
    },
    methods: {
      inputWrapper: function(e) {
        const country = countries.find(e => e.target.value === e.code);
        console.log(country)
        this.input({
          country: country.name,
          countryCode: country.code,
        })
      },
    },
    props: {
      name: {
        type: String,
        required: true,
      },
      placeholder: String,
      input: {
        type: String,
        required: true,
      }
    }
  }
</script>
