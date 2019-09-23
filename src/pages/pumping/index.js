import Pumping from './pumping';
import { compose, withMessageHandler, withPositionWatcher, withComputeCollision } from '../../hocs';

export default compose(
        withMessageHandler,
        withPositionWatcher,
        withComputeCollision,
    )(Pumping);