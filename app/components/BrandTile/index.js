import React, { PropTypes } from 'react';

import H3 from './H3';
import H4 from './H4';
import RoundedBox from './RoundedBox';

function Element({ item, onClick = () => { } }) { // eslint-disable-line react/prefer-stateless-function
  return (
    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
      <RoundedBox className="row" onClick={() => onClick(item)}>
        <div className="col-xs-12">
          <H3>{item.title}</H3>
          <H4>{item.totalProducts} devices</H4>
        </div>
      </RoundedBox>
    </div>
  );
}

Element.propTypes = {
  item: PropTypes.object,
  onClick: PropTypes.func,
};

export default Element;
