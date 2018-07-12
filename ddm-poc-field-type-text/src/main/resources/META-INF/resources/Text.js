import {Config} from 'metal-state';
import Component from 'metal-component';
import Soy from 'metal-soy';
import FieldBase from 'ddm-poc-field-type-base';

import templates from './Text.soy.js';
import TextRegister from './TextRegister.soy.js';

class Text extends Component {
    static STATE = {
        /**
         * @default false
         * @instance
         * @memberof Text
         * @type {?bool}
         */
        editable: Config.bool().value(false),

        /**
         * @default undefined
         * @instance
         * @memberof Text
         * @type {?(string|undefined)}
         */
        id: Config.string(),

        /**
         * @default undefined
         * @instance
         * @memberof Text
         * @type {?(string|undefined)}
         */
        label: Config.string(),

        /**
         * @default undefined
         * @instance
         * @memberof Text
         * @type {?(string|undefined)}
         */
        placeholder: Config.string(),
        
        /**
         * @default false
         * @instance
         * @memberof Text
         * @type {?(bool|undefined)}
         */
        required: Config.bool().value(false),

        /**
         * @default true
         * @instance
         * @memberof Text
         * @type {?(bool|undefined)}
         */
        showLabel: Config.bool().value(true),

        /**
         * @default undefined
         * @instance
         * @memberof Text
         * @type {?(string|undefined)}
         */
        spritemap: Config.string(),
    }
}

Soy.register(Text, templates);

export default Text;