export default {
  name: 'course',
  components: {},
  props: ['name', 'description', 'id', 'favorites'],
  data() {
    return {}
  },
  computed: {
    getFavClass() {
      return {
        'course--favorites': this.favorites
      };
    }
  },
  mounted() {

  },
  methods: {
    toggleFav() {
      this.$store.dispatch('updateFav', this.id);
    }
  }
}