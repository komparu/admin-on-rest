'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CheckboxGroupInput = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Checkbox = require('material-ui/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _Labeled = require('./Labeled');

var _Labeled2 = _interopRequireDefault(_Labeled);

var _translate = require('../../i18n/translate');

var _translate2 = _interopRequireDefault(_translate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * An Input component for a checkbox group, using an array of objects for the options
 *
 * Pass possible options as an array of objects in the 'choices' attribute.
 *
 * The expected input must be an array of identifiers (e.g. [12, 31]) which correspond to
 * the 'optionValue' of 'choices' attribute objects.
 *
 * By default, the options are built from:
 *  - the 'id' property as the option value,
 *  - the 'name' property an the option text
 * @example
 * const choices = [
 *     { id: 12, name: 'Ray Hakt' },
 *     { id: 31, name: 'Ann Gullar' },
 *     { id: 42, name: 'Sean Phonee' },
 * ];
 * <CheckboxGroupInput source="recipients" choices={choices} />
 *
 * You can also customize the properties to use for the option name and value,
 * thanks to the 'optionText' and 'optionValue' attributes.
 * @example
 * const choices = [
 *    { _id: 123, full_name: 'Leo Tolstoi' },
 *    { _id: 456, full_name: 'Jane Austen' },
 * ];
 * <CheckboxGroupInput source="recipients" choices={choices} optionText="full_name" optionValue="_id" />
 *
 * `optionText` also accepts a function, so you can shape the option text at will:
 * @example
 * const choices = [
 *    { id: 123, first_name: 'Leo', last_name: 'Tolstoi' },
 *    { id: 456, first_name: 'Jane', last_name: 'Austen' },
 * ];
 * const optionRenderer = choice => `${choice.first_name} ${choice.last_name}`;
 * <CheckboxGroupInput source="recipients" choices={choices} optionText={optionRenderer} />
 *
 * `optionText` also accepts a React Element, that will be cloned and receive
 * the related choice as the `record` prop. You can use Field components there.
 * @example
 * const choices = [
 *    { id: 123, first_name: 'Leo', last_name: 'Tolstoi' },
 *    { id: 456, first_name: 'Jane', last_name: 'Austen' },
 * ];
 * const FullNameField = ({ record }) => <span>{record.first_name} {record.last_name}</span>;
 * <CheckboxGroupInput source="recipients" choices={choices} optionText={<FullNameField />}/>
 *
 * The choices are translated by default, so you can use translation identifiers as choices:
 * @example
 * const choices = [
 *    { id: 'programming', name: 'myroot.category.programming' },
 *    { id: 'lifestyle', name: 'myroot.category.lifestyle' },
 *    { id: 'photography', name: 'myroot.category.photography' },
 * ];
 *
 * However, in some cases (e.g. inside a `<ReferenceInput>`), you may not want
 * the choice to be translated. In that case, set the `translateChoice` prop to false.
 * @example
 * <CheckboxGroupInput source="gender" choices={choices} translateChoice={false}/>
 *
 * The object passed as `options` props is passed to the material-ui <Checkbox> components
 */
var CheckboxGroupInput = exports.CheckboxGroupInput = function (_Component) {
    (0, _inherits3.default)(CheckboxGroupInput, _Component);

    function CheckboxGroupInput() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, CheckboxGroupInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = CheckboxGroupInput.__proto__ || Object.getPrototypeOf(CheckboxGroupInput)).call.apply(_ref, [this].concat(args))), _this), _this.handleCheck = function (event, isChecked) {
            var _this$props$input = _this.props.input,
                value = _this$props$input.value,
                onChange = _this$props$input.onChange;


            if (isChecked) {
                onChange([].concat((0, _toConsumableArray3.default)(value), [event.target.value]));
            } else {
                onChange(value.filter(function (v) {
                    return v != event.target.value;
                }));
            }
        }, _this.renderCheckbox = function (choice) {
            var _this$props = _this.props,
                value = _this$props.input.value,
                optionText = _this$props.optionText,
                optionValue = _this$props.optionValue,
                options = _this$props.options,
                translate = _this$props.translate,
                translateChoice = _this$props.translateChoice;

            var choiceName = _react2.default.isValidElement(optionText) ? // eslint-disable-line no-nested-ternary
            _react2.default.cloneElement(optionText, { record: choice }) : typeof optionText === 'function' ? optionText(choice) : choice[optionText];
            return _react2.default.createElement(_Checkbox2.default, (0, _extends3.default)({
                key: choice[optionValue],
                checked: value ? value.find(function (v) {
                    return v == choice[optionValue];
                }) !== undefined : false,
                onCheck: _this.handleCheck,
                value: choice[optionValue],
                label: translateChoice ? translate(choiceName, { _: choiceName }) : choiceName
            }, options));
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(CheckboxGroupInput, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                choices = _props.choices,
                label = _props.label,
                resource = _props.resource,
                source = _props.source;

            return _react2.default.createElement(
                _Labeled2.default,
                { label: label, source: source, resource: resource },
                _react2.default.createElement(
                    'div',
                    null,
                    choices.map(this.renderCheckbox)
                )
            );
        }
    }]);
    return CheckboxGroupInput;
}(_react.Component);

CheckboxGroupInput.propTypes = {
    addField: _propTypes2.default.bool.isRequired,
    choices: _propTypes2.default.arrayOf(_propTypes2.default.object),
    label: _propTypes2.default.string,
    source: _propTypes2.default.string,
    options: _propTypes2.default.object,
    input: _propTypes2.default.shape({
        onChange: _propTypes2.default.func.isRequired
    }),
    optionText: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func, _propTypes2.default.element]).isRequired,
    optionValue: _propTypes2.default.string.isRequired,
    resource: _propTypes2.default.string,
    translate: _propTypes2.default.func.isRequired,
    translateChoice: _propTypes2.default.bool.isRequired
};

CheckboxGroupInput.defaultProps = {
    addField: true,
    choices: [],
    options: {},
    optionText: 'name',
    optionValue: 'id',
    translateChoice: true
};

exports.default = (0, _translate2.default)(CheckboxGroupInput);