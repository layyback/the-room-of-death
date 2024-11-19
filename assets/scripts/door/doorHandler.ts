import {
  _decorator,
  animation,
  AnimationClip,
  AnimationComponent,
  Component,
  Node,
  Sprite,
  Animation,
  SpriteFrame,
  tween,
  Vec3,
  Collider,
  RigidBody,
  BoxCollider2D,
  RigidBody2D,
  ERigidBody2DType,
  UITransform,
  Size,
  find
} from "cc";
const { ccclass, property } = _decorator;
import { loadReources } from "../utils";
import { MessageType, messageCenter } from "../game/messageCenter";
import {
  MoveDirection,
  PlayerState,
  EnemyState,
  TileSize,
  TileType,
  AttackDirection,
  DeathDirection,
  DoorState
} from "../utils/enum";
import { StateManager } from "../common/stateManager";
import { Game } from "../game/game";

interface IStateMap {
  spritePath: string;
  wrapMode: AnimationClip.WrapMode;
}

@ccclass("doorHandler")
export class doorHandler extends Component {
  entity: Node;
  currentState: DoorState = DoorState.CLOSETOP;
  currentPoint: Record<"x" | "y", number>;
  animationComponent: AnimationComponent;

  stateMap: Record<string, IStateMap> = {
    [DoorState.CLOSETOP]: {
      spritePath: "texture/door/idle/top",
      wrapMode: AnimationClip.WrapMode.Normal
    },
    [DoorState.CLOSELEFT]: {
      spritePath: "texture/door/idle/left",
      wrapMode: AnimationClip.WrapMode.Normal
    },
    [DoorState.OPEN]: {
      spritePath: "texture/door/idle/death",
      wrapMode: AnimationClip.WrapMode.Normal
    }
  };

  get state() {
    return this.currentState;
  }

  set state(state: DoorState) {
    this.currentState = state;
    this.animationComponent.play(this.currentState);
  }

  protected start(): void {
    messageCenter.subscribe(MessageType.InitDoor, this.init, this);
    messageCenter.subscribe(MessageType.onMove, this.onMove, this);
  }

  async init({ point, position, direction }) {
    const player = new Node("door");
    player.parent = find("Canvas/background");
    player.addComponent(UITransform).contentSize = new Size(240, 240);
    const sprite = player.addComponent(Sprite);
    sprite.sizeMode = Sprite.SizeMode.CUSTOM;
    this.animationComponent = player.addComponent(Animation);
    this.entity = player;
    const x = position.x;
    const y = position.y;
    player.setWorldPosition(new Vec3(x, y, 0));
    this.currentPoint = point;
    await this.initAnimations();
    this.state = direction;
  }

  async initAnimations() {
    const stateMap = this.stateMap;
    return Promise.all(
      Object.keys(stateMap).map(async state => {
        const idleState = await new StateManager(stateMap[state]).initState();
        this.animationComponent.addClip(idleState, state);
      })
    );
  }

  onMove({ playerPoint }) {
    if (
      playerPoint.x === this.currentPoint.x &&
      playerPoint.y === this.currentPoint.y
    ) {
      this.state = DoorState.OPEN;
      Game.nextLevel();
    }
  }
}
