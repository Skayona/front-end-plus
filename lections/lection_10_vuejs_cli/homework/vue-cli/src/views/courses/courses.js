import course from '../../components/course/index';

export default {
  name: 'courses',
  components: {
    course
  },
  props: [],
  data () {
    return {
      studend: this.$route.params.name,
      courses: [
        {
          title: '1',
          desc: 'SDfsd'
        }, {
          title: '1w4',
          desc: 'SDdvsdfbsdffsd'
        }, {
          title: '1rte',
          desc: 'SDfdfcvdvdfcsd'
        }, {
          title: '1wetr',
          desc: 'SDfsdfbsdfbsgbsd'
        }
      ]
    }
  },
  computed: {

  },
  mounted () {
  },
  methods: {

  }
}
