<template>
<div>
  <app-section/>
  <app-second-section/>
  <app-third-section/>
</div>
</template>

<script>
import AppSection from '~/components/AppSection.vue';
import AppSecondSection from '~/components/AppSecondSection.vue';
import AppThirdSection from '~/components/AppThirdSection.vue';
export default {
  components: {
    AppSection,
    AppSecondSection,
    AppThirdSection
  }
};
</script>
