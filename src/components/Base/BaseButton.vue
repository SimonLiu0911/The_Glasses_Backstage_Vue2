<script>
export default {
  data() {
    return {};
  },
  props: {
    type: {
      type: String,
      default: 'button'
    },
    to: {
      type: [ Object, String ],
      default: ''
    },
    href: {
      type: String,
      default: ''
    },
    target: {
      type: String,
      default: ''
    },
    fn: {
      type: Function
    }
  },
  methods: {
    emitClick() {
      this.$emit('click', this.fn);
    }
  }
};
</script>

<template>
  <a
    v-if="href"
    :href="href"
    :target="target"
    @click="emitClick"
  >
    <slot></slot>
  </a>
  <router-link
    v-else-if="to"
    :to="to"
    :target="target"
    @click="emitClick"
  >
    <slot></slot>
  </router-link>
  <button
    v-else
    :type="type"
    :target="target"
    @click="emitClick"
  >
    <slot></slot>
  </button>
</template>
