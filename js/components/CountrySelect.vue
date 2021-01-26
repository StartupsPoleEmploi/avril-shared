<template>
  <select class="select is-large" :name="name" @input="inputWrapper" :value="valueWrapped">
    <option value="" disabled>{{placeholder}}</option>
    <option v-for="country in countries" :value="country.code">{{country.name}}</option>
  </select>
</template>

<script>
  import sortBy from 'lodash.sortby';
  import countries from '../constants/countries.js'

  export default {
    computed: {
      valueWrapped: function() {
        console.log(this.value);
        return this.value && this.value.code;
      },
    },
    data: function() {
      return {
        countries: sortBy(countries, c => c.name),
      }
    },
    methods: {
      inputWrapper: function(e) {
        console.log(e);
        console.log(e.target);
        console.log(e.target.value);
        console.log(countries)
        const country = countries.find(c => e.target && (e.target.value === c.code));
        console.log(country)
        if (country) {
          this.input({
            country: country.name,
            countryCode: country.code,
          })
        }
      },
    },
    props: {
      name: String,
      placeholder: String,
      input: {
        type: Function,
        required: true,
      },
      value: {
        type: Object,
        required: true,
      }
    }
  }
</script>
