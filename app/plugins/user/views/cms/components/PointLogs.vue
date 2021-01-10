<template>
  <div class="row">
    <div class="col-12">
      <fieldset class="form-group">
        <label class="form-label">Current Point</label>
        <input
          v-model="currentPoint"
          type="text"
          class="form-control"
          :disabled="true"
        />
      </fieldset>
    </div>
    <div class="col-12">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Point</th>
            <th>Content</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                v-model="formData.point"
                type="number"
                class="form-control"
                data-vv-name="point"
                v-validate="'required'"
              />
            </td>
            <td>
              <input
                v-model="formData.content"
                type="text"
                class="form-control"
                data-vv-name="content"
                v-validate="'required'"
              />
            </td>
            <td>
              <button type="button" @click="save()" class="btn btn-success">
                <i class="fa fa-save"></i> Save
              </button>
            </td>
          </tr>
          <tr v-for="log in logs" :key="log._id">
            <td>{{ log.point }}</td>
            <td>{{ log.content }}</td>
            <td>{{ log.createdAt | formatDate }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import ResourcesService from "@general/resources_service";

export default {
  name: "PointLogs",
  props: {
    user: { type: String },
    point: { type: Number },
  },
  data() {
    return {
      logs: [],
      service: new ResourcesService(`${CMS_URL}/users/${this.user}/point_logs`),
      currentPoint: this.point,
      formData: {},
    };
  },
  components: {
    // Option,
  },
  methods: {
    save() {
      this.$validator.validateAll().then((res) => {
        if (!res) return;

        this.service.create(this.formData).then(({ data }) => {
          this.logs.unshift(data.data);
          this.currentPoint = data.data.after;
          this.formData = {};
        });
      });
    },
    index() {
      this.service
        .index({
          sort: "createdAt|desc",
        })
        .then(({ data }) => {
          this.logs = data.data;
        });
    },
  },
  created() {
    this.index();
  },
};
</script>

<style>
</style>
