<template>
  <input
    type="date"
    v-bind="$attrs"
    @input="onInput"
    :value="dateString"
    @click="$el.showPicker()"
  />
</template>

<script type="text/javascript">
  import { parseISODate, formatISODate } from '../utils/time';
  import {isString} from '../utils/boolean';
  export default {
    computed: {
      isStringValue() {
        return isString(this.value);
      },
      dateString() {
        return this.isStringValue ? this.value : formatISODate(this.value) ;
      },
    },
    methods: {
      onInput(e) {
        const newDateString = e.target.value;
        const newDate = parseISODate(newDateString);
        if (newDate) {
          this.$emit('input', this.isStringValue ? newDateString : newDate)
        }
      }
    },
    // TODO: forward refs
    // TODO: Add disabled Dates? :disabled-date="maxDate"
    // TODO: Add default-panel="year"
    // TODO: Show placeholder?
    props: {
      value: {
        type: [Date, String],
      },
      disabledDate: {
        type: Function,
      },
      defaultPanel: {
        type: String,
      },
    }
  }
</script>