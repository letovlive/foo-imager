<template>
  <div
    id="app"
    class="app"
  >
    <el-row class="full-height">
      <el-col :xl="24">
        <header-container />
      </el-col>
      <el-col
        :lg="6"
        :md="8"
        :sm="24"
        :xs="24"
        class="container"
      >
        <sidebar v-model="image">
          <div slot="bottom">
            <el-form-item label="Text">
              <el-input
                v-model="text"
                :placeholder="fileName"
              />
            </el-form-item>
            <el-form-item
              :label="$t('label.filename')"
            >
              <el-input
                v-model="userFileName"
                :placeholder="fileName"
                name="fileName"
              />
            </el-form-item>
            <el-form-item
              :label="$t('label.extension')"
            >
              <el-select
                v-model="imageType"
                :placeholder="$t('placeholder.select_extension')"
                name="imageType"
              >
                <el-option
                  v-for="(type, key) in imageTypes"
                  :key="key"
                  :label="type.label"
                  :value="type.value"
                />
              </el-select>
            </el-form-item>
            <div class="el-form-submit-wrapper">
              <el-button
                slot="buttons"
                name="download"
                type="primary"
                @click.prevent="save"
              >
                {{ $t('button.download') }}
              </el-button>
            </div>
          </div>
        </sidebar>
      </el-col>
      <el-col
        :lg="18"
        :md="16"
        :sm="24"
        :xs="24"
        class="container"
      >
        <main-container
          :image="image"
          :text="text"
          :svg.sync="svg"
        />
      </el-col>
      <el-col
        :lg="24"
        :md="24"
        :sm="24"
        :xs="24"
      >
        <footer-container />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import Image from '@/interfaces/Image';
import Sidebar from '@/components/Sidebar.vue';
import MainContainer from '@/components/MainContainer.vue';
import FooterContainer from '@/components/FooterContainer.vue';
import HeaderContainer from '@/components/HeaderContainer.vue';
import Canvg from 'canvg';
import { saveAs } from 'file-saver';

@Component({
  /**
   * Components
   */
  components: {
    MainContainer,
    Sidebar,
    FooterContainer,
    HeaderContainer
  },
})
export default class TheApp extends Vue {
  /**
   * File name.
   */
  fileName: string = '';

  /**
   * Custom file name.
   */
  userFileName: string = '';

  /**
   * SVG container.
   */
  svg: HTMLElement = document.createElement('svg');

  /**
   * Image text.
   */
  text: string = '';

  /**
   * Image type.
   */
  imageType: string = 'png';

  /**
   * Image settings.
   */
  image: Image = {
    height: 200,
    width: 200,
    backgroundColor: 'rgba(19, 206, 102, 0.8)',
    fontColor: 'rgba(19, 206, 102, 0.8)'
  };

  /**
   * Image types
   */
  get imageTypes (): any[] {
    return [
      {
        label: 'PNG',
        value: 'png'
      },
      {
        label: 'JPG',
        value: 'jpg'
      },
      {
        label: 'GIF',
        value: 'gif'
      },
      {
        label: 'SVG',
        value: 'svg'
      }
    ];
  }

  /**
   * Mounted hook.
   */
  mounted () {
    this.setFileName();
  }

  /**
   * Save image.
   */
  save (): void {
    saveAs(this.imageType === 'svg' ? this.saveSvg() : this.saveImage(),
      `${this.userFileName || this.fileName}_${Date.now()}.${this.imageType}`);
  }

  /**
   * Set file name.
   */
  setFileName () {
    this.fileName = `${this.image.width}x${this.image.height}`;
  }

  /**
   * Save image.
   * @return {Blob}
   */
  saveImage () {
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    canvas.width = this.image.width || 0;
    canvas.height = this.image.height || 0;
    const svgParentNode: any = this.svg.parentNode;
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d') || new CanvasRenderingContext2D();

    Canvg.fromString(ctx, svgParentNode.innerHTML.trim()).start();

    const data = atob(canvas.toDataURL(`image/${this.imageType}`)
      .substring(`data:image/${this.imageType};base64,`.length));
    const dataLength: number = data.length;
    const asArray = new Uint8Array(dataLength);
    let i: number = 0;

    for (i; i < dataLength; ++i) {
      asArray[i] = data.charCodeAt(i);
    }

    const buffer: any = asArray.buffer;

    return new Blob([buffer], {
      type: `image/${this.imageType}`
    });
  }

  /**
   * Save SVG.
   * @return {Blob}
   */
  saveSvg (): Blob {
    return new Blob(['<?xml version="1.0" standalone="no"?>\r\n', this.svg.outerHTML],
      {
        type: 'image/svg+xml;charset=utf-8'
      });
  }

  /**
   * image.height watcher.
   */
  @Watch('image.height')
  heightChanged () {
    this.setFileName();
  }

  /**
   * image.width watcher.
   */
  @Watch('image.width')
  widthChanged () {
    this.setFileName();
  }
}
</script>
