import { Component, Input } from '@angular/core';

@Component({
  selector: 'avatar',
  templateUrl: 'avatar.html'
})
export class AvatarComponent {

  @Input('avatar-text') avatarText: string;

}
