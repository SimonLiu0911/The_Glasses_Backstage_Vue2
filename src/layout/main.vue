<script>
export default {
  components: {
    TheHeader: () => import('./TheHeader.vue'),
    TheFooter: () => import('./TheFooter.vue')
  }
};
</script>

<template>
  <section>
    <TheHeader></TheHeader>
    <slot></slot>
    <TheFooter></TheFooter>
  </section>
</template>
