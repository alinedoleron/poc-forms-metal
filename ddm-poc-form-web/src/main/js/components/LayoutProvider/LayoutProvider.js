import Component, { Fragment } from 'metal-jsx';
import {Config} from 'metal-state';

import { LayoutSupport } from 'ddm-poc-form-js-components/Layout/index.js';

/**
 * LayoutProvider listens to your children's events to 
 * control the `context` and make manipulations.
 * @extends Component
 */
class LayoutProvider extends Component {
    static PROPS = {
        /**
         * @default undefined
         * @instance
         * @memberof LayoutProvider
         * @type {?array}
         */
        context: Config.array()
    }

    static STATE = {
        /**
         * @default undefined
         * @instance
         * @memberof LayoutProvider
         * @type {?array}
         */
        context: Config.array(),

        /**
         * @default undefined
         * @instance
         * @memberof LayoutProvider
         * @type {?object}
         */
        fieldFocus: Config.object()
    }

    /**
	 * @inheritDoc
	 */
    constructor(props, context) {
        super(props, context);

        this.state.context = props.context;
    }

    /**
     * @param {!Object} indexAllocateField
     * @private
     */
    _handleFieldClicked(indexAllocateField) {
        this.setState({
            fieldFocus: indexAllocateField
        });
    }

    /**
     * @param {!Object}
     * @private
     */
    _handleFieldAdd({ target, fieldProperties, data }) {
        const { context, spritemap } = this.props;
        const { indexRow, indexPage, indexColumn } = target;

        fieldProperties = Object.assign({}, fieldProperties, {spritemap});

        let newContext = null;

        if (target.indexColumn === false) {
            let newRow = LayoutSupport.implAddRow(12, [fieldProperties]);
            newContext = LayoutSupport.addRow(context, indexRow, indexPage, newRow);
        } else {
            newContext = LayoutSupport.addColumn(context, indexPage, indexRow, indexColumn, fieldProperties);
        }

        this.setState({
            context: newContext,
            fieldFocus: {
                indexColumn,
                indexPage,
                indexRow,
                mode: 'edit',
                type: fieldProperties.type,
            },
        });
    }

    /**
     * @param {!Object}
     * @private
     */
    _handleFieldDelete({ indexRow, indexPage, indexColumn }) {
        const { context } = this.props;
        let newContext = LayoutSupport.removeFields(context, indexPage, indexRow, indexColumn);
        newContext = this._cleanRowEmpty(newContext, { indexRow, indexPage, indexColumn });

        this.setState({
            context: newContext,
            fieldFocus: {
                mode: 'add',
            }
        });
    }

    /**
     * @param {!Object}
     * @private
     */
    _handleFieldEdit({value, key}) {
        const { context } = this.state;
        const { fieldFocus } = this.state;
        const { indexColumn, indexPage, indexRow } = fieldFocus;
        const fieldSelected = LayoutSupport.getColumn(context, indexPage, indexRow, indexColumn);

        const implPropertiesField = {
            [key]: value
        }

        const newField = Object.assign({}, fieldSelected[0], implPropertiesField);

        const newContext = LayoutSupport.updateColumn(context, indexPage, indexRow, indexColumn, [newField]);

        this.setState( {
            context: this.state.context
        });

    }

    /**
     * @param {!Object}
     * @private
     */
    _handleFieldMove({ target, source, data }) {
        const { context } = this.props;
        const fieldSourceToMove = this._getFieldSourceToMove(context, source);

        let newContext = LayoutSupport.removeFields(context, source.indexPage, source.indexRow, source.indexColumn);

        if (target.indexColumn === false) {
            newContext = this._cleanRowEmpty(newContext, source);
            newContext = this._addFieldToRow(newContext, target, fieldSourceToMove);
        } else {
            newContext = this._addFieldToColumn(newContext, target, fieldSourceToMove);
            newContext = this._cleanRowEmpty(newContext, source);
        }

        this.setState({
            context: newContext,
            fieldFocus: {
                mode: 'add',
            }
        });

        newContext = null;
    }

    /**
     * @param {!Array} context
     * @param {!Object} source
     * @private
     * @return {Object}
     */
    _cleanRowEmpty(context, source) {
        const { indexRow, indexPage, indexColumn } = source;

        if (LayoutSupport.hasFieldsRow(context, indexPage, indexRow).length === 0) {
            return LayoutSupport.removeRow(context, indexPage, indexRow);
        }

        return context;
    }

    /**
     * @param {!Array} context
     * @param {!Object} field
     * @param {!Object} target
     * @private
     * @return {Object}
     */
    _addFieldToRow(context, target, field) {
        const { indexRow, indexPage } = target;
        const newRow = LayoutSupport.implAddRow(12, field);
        return LayoutSupport.addRow(context, indexRow, indexPage, newRow);
    }

    /**
     * @param {!Array} context
     * @param {!Object} field
     * @param {!Object} target
     * @private
     * @return {Object}
     */
    _addFieldToColumn(context, target, field) {
        const { indexRow, indexPage, indexColumn } = target;
        return LayoutSupport.addFields(context, indexPage, indexRow, indexColumn, field);
    }

    /**
     * @param {!Array} context
     * @param {!Object} source
     * @private
     * @return {Object}
     */
    _getFieldSourceToMove(context, source) {
        const { indexRow, indexPage, indexColumn } = source;
        return LayoutSupport.getColumn(context, indexPage, indexRow, indexColumn);
    }

    render() {
        const { children } = this.props;
        const { fieldFocus, context } = this.state;
        const Child = children[0];

        const events = {
            fieldAdd: this._handleFieldAdd.bind(this),
            fieldEdit: this._handleFieldEdit.bind(this),
            fieldClicked: this._handleFieldClicked.bind(this),
            fieldDelete: this._handleFieldDelete.bind(this),
            fieldMove: this._handleFieldMove.bind(this),
        };

        Object.assign(Child.props, {...this.otherProps(), events, context, fieldFocus});

        return Child;
    }
}

export default LayoutProvider;