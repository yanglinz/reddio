import Rx from 'rxjs/Rx';

export default function redditEpic() {
  return Rx.Observable
    .of({ type: 'INITIALIZED_EPIC' });
}
