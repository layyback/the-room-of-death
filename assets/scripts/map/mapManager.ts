import {
  _decorator,
  Component,
  Layers,
  Node,
  Size,
  Sprite,
  Vec2,
  UITransform,
  randomRange,
  randomRangeInt
} from "cc";
const { ccclass, property } = _decorator;
import { mapInfo } from "../game/level1";
import { loadReources } from "../utils";

@ccclass("mapManager")
export class mapManager extends Component {
  tileWidth = 55;
  tileHeight = 55;
  start() {
    this.generateMap();
  }

  async generateMap() {
    const tileList = await loadReources("texture/tile/tile");
    // console.log(tileList);

    mapInfo.forEach((row, rowIndex) => {
      row.forEach((tile, colIndex) => {
        // 根据tile的值生成对应的地图元素
        if (tile.src) {
          const tileNode = new Node(`tile_${tile.src}`);
          const tileUI = tileNode.addComponent(UITransform);
          tileUI.contentSize = new Size(this.tileWidth, this.tileHeight);

          const sprite = tileNode.addComponent(Sprite);
          sprite.sizeMode = Sprite.SizeMode.CUSTOM;

          let src = tile.src;
          if (
            [1, 5, 9].includes(src) &&
            rowIndex % 2 === 0 &&
            colIndex % 2 === 0
          ) {
            src += randomRangeInt(0, 4);
          }
          const tileImg = tileList.find(item => item.name === `tile (${src})`);

          sprite.spriteFrame = tileImg;
          tileNode.setPosition(
            rowIndex * this.tileWidth,
            -colIndex * this.tileHeight
          );
          tileNode.setParent(this.node);
        }
      });
    });
  }

  update(deltaTime: number) {}
}
