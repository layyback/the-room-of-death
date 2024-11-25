import { _decorator, AudioClip, AudioSource, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("audioManager")
export class audioManager extends Component {
  audioSource: AudioSource = null;
  moveAudio: AudioClip = null;
  start() {
    this.audioSource = this.getComponent(AudioSource);
    this.moveAudio = this.audioSource.clip;
  }

  play() {
    this.audioSource.playOneShot(this.moveAudio);
  }

  update(deltaTime: number) {}
}
