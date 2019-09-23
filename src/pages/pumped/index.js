import Pumped from './pumped';
import { compose, withMessageHandler, withPositionWatcher, withResize } from '../../hocs';

export default compose(
        withMessageHandler,
        withPositionWatcher,
        withResize,
    )(Pumped);