<template>
  <div v-if="user">
    <div class="text-right">
      <a
        href="#"
        @click="index()"
        data-toggle="modal"
        :data-target="'#bet' + deal"
      >
        Lịch sử đặt cược
      </a>
    </div>

    <div :id="'bet' + deal" class="modal fade" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              &times;
            </button>
            <h4 class="modal-title">Lịch sử đặt cược</h4>
          </div>
          <div class="modal-body">
            <table class="table table-bordered" v-if="bets.length">
              <thead>
                <tr>
                  <th>Thời gian</th>
                  <th>Cược</th>
                  <th>Giá trị</th>
                  <th>Kết quả</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="bet in bets" :key="bet._id">
                  <td>{{ bet.createdAt | calendar }}</td>
                  <td>{{ bet.option.name }}</td>
                  <td>{{ bet.amount | currency }}</td>
                  <td>{{ bet.option.win ? "Thắng" : "" }}</td>
                </tr>
              </tbody>
            </table>
            <div class="text-center" v-else>Chưa có đặt cược</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PagingService from "@Plugin/core/views/js/services/paging_service";
import { mapState } from "vuex";
import ResourceService from "@CmsCore/vue/general/resources_service";

export default {
  name: "Bets",
  props: {
    deal: { type: String },
  },
  data() {
    return {
      pagingService: new PagingService(
        `${window.settings.services.webUrl}/deals/${this.deal}/bets`,
        20
      ),
      bets: [],
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
    }),
  },
  methods: {
    index() {
      this.pagingService.page = 0;
      this.pagingService.lastPage = false;
      this.pagingService.next().then(({ data }) => {
        this.bets = data.data;
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
