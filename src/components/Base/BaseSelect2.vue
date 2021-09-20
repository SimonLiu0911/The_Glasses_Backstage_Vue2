<template>
  <select>
    <slot></slot>
  </select>
</template>

<script>
/**
 * @param {*} options: {id: key, text: value}
 */
export default {
  props: {
    options: {
      type: Array,
      default() {
        return [];
      }
    },
    value: {
      type: [ Number, String ],
      default: ''
    }
  },
  mounted() {
    const vm = this;
    window.$(vm.$el).select2({
      theme: 'bootstrap4',
      data: vm.options
    })
      .val(vm.value)
      .trigger('change')
      .on('change', function() {
        vm.$emit('input', vm.value);
      });
  },
  methods: {
  },
  watch: {
    value: function(params) {
      window.$(this.$el).val(params).trigger('change');
    },
    options: function(params) {
      window.$(this.$el).select2({
        data: params
      });
    }
  },
  destroyed() {
    window.$(this.$el).off().select2('destroy');
  }
};
</script>

<style lang="scss" scoped></style>
