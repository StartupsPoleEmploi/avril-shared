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

  export default {
    computed: {
      dateString() {
        return formatISODate(this.value);
      },
    },
    methods: {
      onInput(e) {
        const newDate = parseISODate(e.target.value);
        if (newDate) {
          this.$emit('input', newDate)
        }
      }
    },
    // TODO: forward refs
    // TODO: Add disabled Dates? :disabled-date="maxDate"
    // TODO: Add default-panel="year"
    props: {
      value: {
        type: Date,
      },
      disabledDate: {
        type: Date,
      },
      defaultPanel: {
        type: String,
      },
    }
  }
</script>