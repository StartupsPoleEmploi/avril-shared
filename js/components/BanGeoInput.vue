<template>
  <div>
    <Autocomplete
      auto-select
      :placeholder="placeholder"
      :aria-label="placeholder"
      :get-result-value="getResultValue"
      :search="search"
      @submit="submit"
      :default-value="addressLabelify(value)"
      :debounceTime="300"
    >
      <template v-slot:result="{ result, props }">
        <li v-bind="props" class="autocomplete-result">
          <span v-html="getHtmlResultValue(result)"></span>
        </li>
      </template>
    </Autocomplete>
  </div>
</template>

<script type="text/javascript">
  import {include} from '../utils/array';
  import {
    addressLabelify,
    banToAddress,
    geoTypeToBanType
  } from '../utils/geo';
  import Autocomplete from '@trevoreyre/autocomplete-vue';

  export default {
    components: {
      Autocomplete,
    },
    methods: {
      search: async function(input) {
        if (input && input.replace(/[/s]/g, '').length >= 3) {
          const banFilter = geoTypeToBanType(this.type);
          const results = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${input}&${banFilter ? ('type='+banFilter) : ''}`)
          const data = await results.json();
          return data.features;
        } else {
          return [];
        }
      },
      addressLabelify,
      getResultValue: function(result) {
        return result.properties.label;
        return addressLabelify(banToAddress(this.type, result));
      },
      getHtmlResultValue: function(result) {
        return this.getResultValue(result).replace('\n', '<br />');
      },
      submit: function(result) {
        this.input(banToAddress(this.type, result));
      },
    },
    props: {
      input: {
        type: Function,
        required: true,
      },
      value: {
        type: Object,
      },
      placeholder: {
        type: String,
        default: 'Entrez une adresse',
      },
      type: {
        type: String,
        default: 'address',
        validator: value => include(['address', 'city'], value),
      },
      countries: {
        type: String,
        default: '',
      },
    },
  }
</script>

<style lang="scss" scoped>
  div ::v-deep {
    .autocomplete {
      .autocomplete-result-list {
        margin: 0;
        border: 1px solid rgba(0, 0, 0, 0.12);
        padding: 0;
        box-sizing: border-box;
        max-height: 296px;
        overflow-y: auto;
        background: #fff;
        list-style: none;
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.16);
        .autocomplete-result {
          cursor: pointer;
          background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjY2NjIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PGNpcmNsZSBjeD0iMTEiIGN5PSIxMSIgcj0iOCIvPjxwYXRoIGQ9Ik0yMSAyMWwtNC00Ii8+PC9zdmc+');
          background-repeat: no-repeat;
          background-position: 1rem center;
          padding: 1rem;
          padding-left: 3rem !important;
          &:hover, &[aria-selected="true"] {
            background-color: rgba(0, 0, 0, 0.06);
          }
        }
      }
      &[data-position="below"] .autocomplete-result-list {
        margin-top: -1px;
        border-top-color: transparent;
        border-radius: 0 0 8px 8px;
        padding-bottom: 8px;
      }

      &[data-position="above"] .autocomplete-result-list {
        margin-bottom: -1px;
        border-bottom-color: transparent;
        border-radius: 8px 8px 0 0;
        padding-top: 8px;
      }
    }
  }
</style>