import React from 'react';
import { SvgIcons, Tooltip } from 'ui-kit';
import { SvgIconProps } from '../svg';
import './style.scss';

interface HintPointProps extends Omit<SvgIconProps, 'name'> {
  value: string;
  iconClassName?: string;
  icon: any;
}

function HintPoint(props: HintPointProps) {
  return (
    <Tooltip title={props.value} popperClassName="hint">
      <div className={props.className}>
        {props.icon || (
          <SvgIcons
            {...{ ...props, className: props.iconClassName }}
            name="hint"
            className="hintIcon"
          />
        )}
      </div>
    </Tooltip>
  );
}

export default HintPoint;
