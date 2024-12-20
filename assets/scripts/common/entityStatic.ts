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

@ccclass("entityStatic")
export class entityStatic extends Component {
  entity: Node;
  currentState;
  currentPoint: Record<"x" | "y", number>;
  animationComponent: AnimationComponent;
  hasDestroy: boolean = false;

  _stateMap: Record<string, IStateMap>;

  get stateMap(): Record<string, IStateMap> {
    return this._stateMap;
  }
  set stateMap(stateMap) {
    this._stateMap = stateMap;
  }

  get state() {
    return this.currentState;
  }

  set state(state) {
    this.currentState = state;
    this.animationComponent.play(this.currentState);
  }

  async init({ point, position, state, size = 4.5 * TileSize }) {
    const player = new Node();
    player.parent = find("Canvas/background");
    player.addComponent(UITransform).contentSize = new Size(size, size);
    const sprite = player.addComponent(Sprite);
    sprite.sizeMode = Sprite.SizeMode.CUSTOM;
    this.animationComponent = player.addComponent(Animation);
    this.entity = player;

    player.setWorldPosition(new Vec3(position.x, position.y, 0));
    this.currentPoint = point;
    await this.initAnimations();
    this.state = state;
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
}
