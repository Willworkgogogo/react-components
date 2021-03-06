import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import RcAlign from 'src/libs/rc-align';
import _ from 'lodash';

import { Wrap, BadgeWrap, Badge as SBadge } from './style';
import placements from './placements';

const Placement = _.keys(placements);

class Badge extends Component {
    static propTypes = {
        /** 显示内容 */
        value: PropTypes.node,
        /** 为数字时能显示的最大值，超过将显示最大值+ */
        maxValue: PropTypes.number,
        /** 显示为点状 */
        dot: PropTypes.bool,
        /** 定位 */
        placement: PropTypes.oneOf(Placement),
        /** 为 0 时是否隐藏 */
        hideWhenZero: PropTypes.bool,
        /** badge的样式 */
        badgeStyle: PropTypes.object,
        /** @ignore */
        children: PropTypes.node
    };
    static defaultProps = {
        maxValue: 99,
        placement: Placement[0]
    };
    renderBadge = () => {
        const { value: _v, maxValue, dot, badgeStyle } = this.props;
        const isNumber = /^\d+\.?\d*$/.test(_v);
        const value = isNumber ? +_v : _v;

        let content;
        if (dot) {
            content = null;
        } else if (isNumber && value > maxValue) {
            content = maxValue + '+';
        } else {
            content = value;
        }
        return (
            <SBadge dot={dot} style={badgeStyle}>
                {content}
            </SBadge>
        );
    };

    render() {
        /* eslint-disable no-unused-vars */
        const { value, maxValue, dot, placement, hideWhenZero, children, badgeStyle, ...rest } = this.props;
        /* eslint-enable no-unused-vars */
        const badge = this.renderBadge();
        if (!children) {
            return <Wrap {...rest}>{badge}</Wrap>;
        }
        /* eslint-disable react/no-find-dom-node */
        return (
            <Wrap {...rest}>
                {children}
                {hideWhenZero && (value === 0 || value === '0') ? null : (
                    <RcAlign target={() => ReactDOM.findDOMNode(this)} align={placements[placement]}>
                        <BadgeWrap>{badge}</BadgeWrap>
                    </RcAlign>
                )}
            </Wrap>
        );
        /* eslint-enable react/no-find-dom-node */
    }
}

export default Badge;

Badge.Placement = Placement;
