<template>
  <div id="app">
    <el-form ref="form" :model="formData">
      <d-form ref="dform" :structure="structureForm" v-model="formData"/>
    </el-form>
    <button @click="submit">submit</button>
  </div>
</template>

<script>
import DForm from '@/components/DynamicForm/index.js'
export default {
  name: 'App',
  components: {
    'd-form': DForm
  },
  data() {
    return {
      v: '',
      formData: {
        // device: {
        //   type: 'Modbus',
        //   port: 'ttyO3'
        // },
        // usePatterns: [{
        //   type: 'Aliyun'
        // }]
      },
      structureForm: null
    }
  },
  created() {
    this.$http.get('/json.json').then(res => {
      if (res.status=== 200) {
        const structure = res.data
        this.structureForm = structure
      }
    })
  },
  mounted() {
  },
  methods: {
    submit() {
      this.$refs.form.validate(valid => {
        console.log(valid)
        console.log(this.formData)
      })
    }
  }
};
</script>

