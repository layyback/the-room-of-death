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
  randomRangeInt,
  BoxCollider2D,
  RigidBody2D,
  ERigidBody2DType
} from "cc";
const { ccclass, property } = _decorator;
import { enemyInfo, mapInfo, playerInfo } from "../game/level1";
import { loadReources } from "../utils";
import { TileType, TileSize } from "../utils/enum";
import { MessageType, messageCenter } from "../game/messageCenter";

@ccclass("mapManager")
export class mapManager extends Component {
  tileSize: number = TileSize;
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
          tileUI.contentSize = new Size(this.tileSize, this.tileSize);

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
            rowIndex * this.tileSize,
            -colIndex * this.tileSize
          );
          tileNode.setParent(this.node);

          // 生成玩家
          this.generatePlayer({ tileNode, rowIndex, colIndex });
          // 生成敌人
          this.generateEnemy({ tileNode, rowIndex, colIndex });
        }
      });
    });
  }

  generatePlayer({ tileNode, rowIndex, colIndex }) {
    if (playerInfo.x === rowIndex && playerInfo.y === colIndex) {
      messageCenter.publish(MessageType.InitPlayer, {
        point: {
          x: rowIndex,
          y: colIndex
        },
        position: tileNode.getWorldPosition()
      });
    }
  }

  generateEnemy({ tileNode, rowIndex, colIndex }) {
    enemyInfo.forEach(enemy => {
      if (enemy.x === rowIndex && enemy.y === colIndex) {
        messageCenter.publish(MessageType.InitEnemy, {
          point: {
            x: rowIndex,
            y: colIndex
          },
          position: tileNode.getWorldPosition()
        });
      }
    });
  }

  update(deltaTime: number) {}
}