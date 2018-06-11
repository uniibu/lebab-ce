<template>
  <b-jumbotron class="lb-container">
    <b-container fluid class="lb-cointainer-fluid">
        <lebab-editor/>
    </b-container>
  </b-jumbotron>
</template>
<script>
	import LebabEditor from '~/components/LebabEditor.vue'
	export default {
		components: {
			LebabEditor
		}
	}
</script>
