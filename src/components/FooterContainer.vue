<template>
  <div>
    <el-footer>
      <a
        :href="mailto"
        @mouseout="hideEmail"
        @mouseover="showEmail"
      >© Alexey Petrenko</a> |
      <a
        href="#"
        @click.prevent="dialogVisible = true"
      >{{ $t('text.licence') }}</a>
    </el-footer>
    <el-dialog
      :visible.sync="dialogVisible"
      title="Licence"
      width="80%"
    >
      <licence />
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >
          {{ $t('button.close') }}
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Licence from './Licence.vue';

@Component({
  /**
   * Components.
   */
  components: {
    Licence
  }
})
export default class FooterContainer extends Vue {
  dialogVisible: boolean = false;
  visibleEmail: boolean = false;

  /**
   * Mail to link.
   * @return string
   */
  get mailto (): string {
    const contact = 'YWxleC5wZXRyZW5rby5pbmJveEBnbWFpbC5jb20=';
    const subject = 'Rm9vIGltYWdlcg==';

    return this.visibleEmail ? `mailto:${atob(contact)}?subject=${atob(subject)}` : '#';
  }

  /**
   * Show email.
   */
  showEmail (): void {
    this.visibleEmail = true;
  }

  /**
   * Hide email.
   */
  hideEmail (): void {
    this.visibleEmail = false;
  }
}
</script>
