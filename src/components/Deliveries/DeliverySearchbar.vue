<template>
  <div class="delivery-searchbar">
      <div class="delivery">
        <p>{{deliveryNameLike}}</p>
      </div>
      <div class="around">
         <p>{{around}}</p>
      </div>
  </div>
</template>

<script>
export default {
    name: 'DeliverySearchbar',
    props: {
        deliveryNameLike: String,
        around: String
    }
}
</script>

<style>

</style>