import Rx from 'rxjs/Rx';

export default function redditEpic() {
  return Rx.Observable
    .interval(2500)
    .map(() => ({ type: 'PLAYER_EPIC' }));
}
