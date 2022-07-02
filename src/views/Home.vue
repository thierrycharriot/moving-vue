<template>
  <div>
    <DoNotMiss/>
    <ServiceHonor/>
    <ServiceCategory/>
    <ServiceOfYourNeedsLayout/>
  </div>
</template>

<script>
import ServiceOfYourNeedsLayout from '@/components/ServiceOfYourNeedsLayout.vue';
import ServiceCategory from '@/components/ServiceCategory.vue';
import DoNotMiss from '@/components/DoNotMiss.vue';
import ServiceHonor from '@/components/ServiceHonor.vue';

export default {
  name: 'Home',
  components: {
    ServiceOfYourNeedsLayout,
    ServiceCategory,
    DoNotMiss,
    ServiceHonor,
  }
}
</script>

<style>

</style>